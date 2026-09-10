create table if not exists public.game_scores (
  user_id uuid not null references auth.users(id) on delete cascade,
  game_slug text not null,
  high_score integer not null default 0 check (high_score >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, game_slug)
);

alter table public.game_scores enable row level security;

drop policy if exists "排行榜允许公开读取" on public.game_scores;
create policy "排行榜允许公开读取"
on public.game_scores
for select
to anon, authenticated
using (true);

create or replace function public.submit_score(
  p_game_slug text,
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
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  if p_game_slug is null or p_game_slug !~ '^[a-z0-9-]{1,40}$' then
    raise exception 'invalid game slug';
  end if;

  if p_score is null or p_score < 0 or p_score > 100000000 then
    raise exception 'invalid score';
  end if;

  insert into public.game_scores (user_id, game_slug, high_score)
  values (v_user_id, p_game_slug, p_score)
  on conflict (user_id, game_slug)
  do update set
    high_score = greatest(game_scores.high_score, excluded.high_score),
    updated_at = case
      when excluded.high_score > game_scores.high_score then now()
      else game_scores.updated_at
    end
  returning * into v_result;

  return v_result;
end;
$$;

revoke execute on function public.submit_score(text, integer) from public, anon;
grant execute on function public.submit_score(text, integer) to authenticated;
