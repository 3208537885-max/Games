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

grant select on public.player_profiles to anon, authenticated;
grant select on public.game_scores to anon, authenticated;
