-- Run this entire file in the Supabase SQL Editor.

create table if not exists public.player_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  nickname text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.player_profiles enable row level security;

drop policy if exists "玩家资料允许公开读取" on public.player_profiles;
create policy "玩家资料允许公开读取"
on public.player_profiles
for select
to anon, authenticated
using (true);

drop policy if exists "玩家只能修改自己的资料" on public.player_profiles;
create policy "玩家只能修改自己的资料"
on public.player_profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text := lower(nullif(trim(new.raw_user_meta_data ->> 'username'), ''));
  v_nickname text := nullif(trim(new.raw_user_meta_data ->> 'nickname'), '');
begin
  if v_username is null or v_username !~ '^[a-z0-9_]{3,24}$' then
    v_username := 'player_' || left(replace(new.id::text, '-', ''), 12);
  end if;

  if v_nickname is null then
    v_nickname := v_username;
  end if;

  insert into public.player_profiles (user_id, username, nickname)
  values (new.id, v_username, left(v_nickname, 24))
  on conflict (user_id) do update set
    username = excluded.username,
    nickname = excluded.nickname,
    updated_at = now();

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.game_scores (
  user_id uuid not null references auth.users(id) on delete cascade,
  game_slug text not null,
  difficulty text not null default 'normal',
  high_score integer not null default 0 check (high_score >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, game_slug, difficulty)
);

alter table public.game_scores add column if not exists difficulty text not null default 'normal';
alter table public.game_scores drop constraint if exists game_scores_difficulty_check;
alter table public.game_scores add constraint game_scores_difficulty_check check (difficulty in ('low', 'normal', 'high'));
alter table public.game_scores drop constraint if exists game_scores_pkey;
alter table public.game_scores add constraint game_scores_pkey primary key (user_id, game_slug, difficulty);
alter table public.game_scores enable row level security;

drop policy if exists "排行榜允许公开读取" on public.game_scores;
create policy "排行榜允许公开读取"
on public.game_scores
for select
to anon, authenticated
using (true);

drop function if exists public.submit_score(text, integer);
drop function if exists public.submit_score(text, text, integer);
create or replace function public.submit_score(
  p_game_slug text,
  p_difficulty text,
  p_score integer
)
returns public.game_scores
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_result public.game_scores;
  v_is_reaction boolean := p_game_slug in ('reaction', 'reaction-average');
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  if p_game_slug is null or p_game_slug !~ '^[a-z0-9-]{1,40}$' then
    raise exception 'invalid game slug';
  end if;

  if p_difficulty is null or p_difficulty not in ('low', 'normal', 'high') then
    raise exception 'invalid difficulty';
  end if;

  if p_score is null or p_score < 0 or p_score > 100000000 then
    raise exception 'invalid score';
  end if;

  insert into public.game_scores (user_id, game_slug, difficulty, high_score)
  values (v_user_id, p_game_slug, p_difficulty, p_score)
  on conflict (user_id, game_slug, difficulty)
  do update set
    high_score = case
      when v_is_reaction then least(game_scores.high_score, excluded.high_score)
      else greatest(game_scores.high_score, excluded.high_score)
    end,
    updated_at = case
      when v_is_reaction and excluded.high_score < game_scores.high_score then now()
      when not v_is_reaction and excluded.high_score > game_scores.high_score then now()
      else game_scores.updated_at
    end
  returning * into v_result;

  return v_result;
end;
$$;

revoke execute on function public.submit_score(text, text, integer) from public, anon;
grant execute on function public.submit_score(text, text, integer) to authenticated;

drop function if exists public.get_overall_leaderboard();
create or replace function public.get_overall_leaderboard()
returns table (
  user_id uuid,
  username text,
  nickname text,
  total_points integer,
  games_ranked integer,
  best_game_points integer
)
language sql
stable
security definer
set search_path = public
as $$
  with eligible_scores as (
    select user_id, game_slug, high_score
    from public.game_scores
    where high_score > 0
      and (
        (game_slug = 'snake' and difficulty = 'high')
        or (game_slug in ('tetris', '2048', 'breakout') and difficulty = 'normal')
      )
  ),
  game_leaders as (
    select
      game_slug,
      max(high_score) as leading_score
    from eligible_scores
    group by game_slug
  ),
  proportional_points as (
    select
      score.user_id,
      score.game_slug,
      round(100.0 * score.high_score / leader.leading_score)::integer as game_points
    from eligible_scores score
    join game_leaders leader using (game_slug)
  ),
  totals as (
    select
      user_id,
      sum(game_points)::integer as total_points,
      count(*)::integer as games_ranked,
      max(game_points)::integer as best_game_points
    from proportional_points
    group by user_id
  )
  select
    totals.user_id,
    profile.username,
    profile.nickname,
    totals.total_points,
    totals.games_ranked,
    totals.best_game_points
  from totals
  join public.player_profiles profile on profile.user_id = totals.user_id
  order by totals.total_points desc, totals.games_ranked desc, totals.best_game_points desc, profile.username asc
  limit 50;
$$;

revoke execute on function public.get_overall_leaderboard() from public;
grant execute on function public.get_overall_leaderboard() to anon, authenticated;

create table if not exists public.game_completions (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  game_slug text not null,
  created_at timestamptz not null default now()
);

alter table public.game_completions enable row level security;

create or replace function public.record_game_completion(p_game_slug text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_total bigint;
begin
  if p_game_slug is null or p_game_slug !~ '^[a-z0-9-]{1,40}$' then
    raise exception 'invalid game slug';
  end if;
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  insert into public.game_completions (user_id, game_slug) values (auth.uid(), p_game_slug);
  select count(*) into v_total from public.game_completions;
  return v_total;
end;
$$;

create or replace function public.get_total_play_count()
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select count(*) from public.game_completions;
$$;

revoke execute on function public.record_game_completion(text) from public;
grant execute on function public.record_game_completion(text) to authenticated;
revoke execute on function public.get_total_play_count() from public;
grant execute on function public.get_total_play_count() to anon, authenticated;

create table if not exists public.multiplayer_rooms (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references auth.users(id) on delete cascade,
  room_code text not null unique,
  status text not null default 'waiting' check (status in ('waiting', 'live', 'finished')),
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.multiplayer_players (
  room_id uuid not null references public.multiplayer_rooms(id) on delete cascade,
  player_token uuid not null,
  user_id uuid references auth.users(id) on delete set null,
  display_name text not null,
  score integer not null default 0 check (score >= 0),
  board_state jsonb not null default '[]'::jsonb,
  animation_state jsonb not null default '{}'::jsonb,
  finished boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (room_id, player_token)
);

alter table public.multiplayer_players add column if not exists board_state jsonb not null default '[]'::jsonb;
alter table public.multiplayer_players add column if not exists animation_state jsonb not null default '{}'::jsonb;

alter table public.multiplayer_rooms enable row level security;
alter table public.multiplayer_players enable row level security;
drop policy if exists "联机房间允许读取" on public.multiplayer_rooms;
create policy "联机房间允许读取" on public.multiplayer_rooms for select to anon, authenticated using (true);
drop policy if exists "联机玩家允许读取" on public.multiplayer_players;
create policy "联机玩家允许读取" on public.multiplayer_players for select to anon, authenticated using (true);

create or replace function public.create_multiplayer_room()
returns public.multiplayer_rooms
language plpgsql security definer set search_path = public
as $$
declare v_room public.multiplayer_rooms; v_code text;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  loop
    v_code := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
    begin
      insert into public.multiplayer_rooms (host_id, room_code) values (auth.uid(), v_code) returning * into v_room;
      return v_room;
    exception when unique_violation then end;
  end loop;
end;
$$;

create or replace function public.join_multiplayer_room(p_room_id uuid, p_player_token uuid, p_display_name text)
returns public.multiplayer_players
language plpgsql security definer set search_path = public
as $$
declare v_player public.multiplayer_players; v_count integer;
begin
  if p_display_name is null or length(trim(p_display_name)) not between 1 and 24 then raise exception 'invalid display name'; end if;
  select count(*) into v_count from public.multiplayer_players where room_id = p_room_id;
  if not exists (select 1 from public.multiplayer_rooms where id = p_room_id and status = 'waiting') then raise exception 'room unavailable'; end if;
  if v_count >= 2 and not exists (select 1 from public.multiplayer_players where room_id = p_room_id and player_token = p_player_token) then raise exception 'room full'; end if;
  insert into public.multiplayer_players (room_id, player_token, user_id, display_name)
  values (p_room_id, p_player_token, auth.uid(), trim(p_display_name))
  on conflict (room_id, player_token) do update set display_name = excluded.display_name, updated_at = now()
  returning * into v_player;
  return v_player;
end;
$$;

create or replace function public.start_multiplayer_room(p_room_id uuid)
returns public.multiplayer_rooms
language plpgsql security definer set search_path = public
as $$
declare v_room public.multiplayer_rooms;
begin
  update public.multiplayer_rooms set status = 'live', starts_at = now() + interval '3 seconds', ends_at = now() + interval '93 seconds'
  where id = p_room_id and host_id = auth.uid() and status = 'waiting'
    and (select count(*) from public.multiplayer_players where room_id = p_room_id) = 2
  returning * into v_room;
  if v_room.id is null then raise exception 'unable to start room'; end if;
  return v_room;
end;
$$;

drop function if exists public.report_multiplayer_score(uuid, uuid, integer, boolean);
drop function if exists public.report_multiplayer_score(uuid, uuid, integer, jsonb, boolean);
create or replace function public.report_multiplayer_score(p_room_id uuid, p_player_token uuid, p_score integer, p_board_state jsonb, p_animation_state jsonb, p_finished boolean default false)
returns public.multiplayer_players
language plpgsql security definer set search_path = public
as $$
declare v_player public.multiplayer_players;
begin
  if p_score < 0 or p_score > 100000000 then raise exception 'invalid score'; end if;
  update public.multiplayer_players set score = greatest(score, p_score), board_state = p_board_state, animation_state = p_animation_state, finished = finished or p_finished, updated_at = now()
  where room_id = p_room_id and player_token = p_player_token
    and exists (select 1 from public.multiplayer_rooms where id = p_room_id and status = 'live' and now() <= ends_at)
  returning * into v_player;
  if v_player.room_id is null then raise exception 'room is not live'; end if;
  return v_player;
end;
$$;

do $$ begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'multiplayer_rooms') then alter publication supabase_realtime add table public.multiplayer_rooms; end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'multiplayer_players') then alter publication supabase_realtime add table public.multiplayer_players; end if;
end $$;

revoke execute on function public.create_multiplayer_room() from public;
grant execute on function public.create_multiplayer_room() to authenticated;
revoke execute on function public.join_multiplayer_room(uuid, uuid, text) from public;
grant execute on function public.join_multiplayer_room(uuid, uuid, text) to anon, authenticated;
revoke execute on function public.start_multiplayer_room(uuid) from public;
grant execute on function public.start_multiplayer_room(uuid) to authenticated;
revoke execute on function public.report_multiplayer_score(uuid, uuid, integer, jsonb, jsonb, boolean) from public;
grant execute on function public.report_multiplayer_score(uuid, uuid, integer, jsonb, jsonb, boolean) to anon, authenticated;

grant select on public.player_profiles to anon, authenticated;
grant select on public.game_scores to anon, authenticated;
