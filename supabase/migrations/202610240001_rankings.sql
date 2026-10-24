-- Run once in a new Supabase project's SQL editor. No service key belongs in the app.
create table public.rank_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 30),
  opted_in boolean not null default true,
  hidden boolean not null default false,
  banned boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.rank_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.rank_profiles(user_id) on delete cascade,
  event_key text not null,
  points integer not null check (points in (20,50)),
  created_at timestamptz not null default now(),
  unique(user_id,event_key)
);
create index rank_events_period on public.rank_events(created_at,user_id);
create table public.rank_admins (user_id uuid primary key references auth.users(id) on delete cascade);
create table public.rank_audit (
  id bigint generated always as identity primary key,
  actor uuid references auth.users(id) on delete set null,
  target uuid references auth.users(id) on delete set null,
  action text not null,
  reason text not null check (char_length(reason) between 3 and 500),
  created_at timestamptz not null default now()
);
alter table public.rank_profiles enable row level security;
alter table public.rank_events enable row level security;
alter table public.rank_admins enable row level security;
alter table public.rank_audit enable row level security;
-- No direct client table access/policies. Every mutation goes through a checked RPC.
revoke all on public.rank_profiles, public.rank_events, public.rank_admins, public.rank_audit from public, anon, authenticated;
revoke all on sequence public.rank_events_id_seq, public.rank_audit_id_seq from public, anon, authenticated;

create function public.rank_account() returns jsonb language plpgsql security definer set search_path = '' as $$
declare p public.rank_profiles; u uuid := auth.uid();
begin
  if u is null then raise exception 'AUTH_REQUIRED'; end if;
  select * into p from public.rank_profiles where user_id=u;
  return jsonb_build_object('user_id',u,'joined',coalesce(p.opted_in,false),'name',p.display_name,'hidden',coalesce(p.hidden,false),'banned',coalesce(p.banned,false),'admin',exists(select 1 from public.rank_admins where user_id=u));
end $$;
create function public.rank_join(p_name text) returns jsonb language plpgsql security definer set search_path = '' as $$
declare u uuid := auth.uid();
begin
  if u is null then raise exception 'AUTH_REQUIRED'; end if;
  if p_name is null or char_length(btrim(p_name)) not between 2 and 30 or p_name ~ '[[:cntrl:]]' then raise exception 'INVALID_NAME'; end if;
  insert into public.rank_profiles(user_id,display_name) values(u,btrim(p_name))
    on conflict(user_id) do update set display_name=excluded.display_name,opted_in=true;
  return public.rank_account();
end $$;
create function public.rank_leave() returns void language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'AUTH_REQUIRED'; end if;
  update public.rank_profiles set opted_in=false where user_id=auth.uid();
end $$;
create function public.rank_award(p_kind text,p_lesson text,p_answer text) returns jsonb language plpgsql security definer set search_path = '' as $$
declare u uuid := auth.uid(); p public.rank_profiles; k text; pts integer; n integer; awarded integer;
begin
  if u is null then raise exception 'AUTH_REQUIRED'; end if;
  select * into p from public.rank_profiles where user_id=u for update;
  if not found or not p.opted_in then raise exception 'JOIN_REQUIRED'; end if;
  if p.banned then raise exception 'ACCOUNT_BLOCKED'; end if;
  if p_answer is null or char_length(p_answer)>4000 then raise exception 'INVALID_ANSWER'; end if;
  select count(*) into n from regexp_matches(p_answer,$re$[a-zA-Z]+(?:['’-][a-zA-Z]+)*$re$,'g');
  if n<20 then raise exception 'INVALID_ANSWER'; end if;
  if p_kind='daily' then
    k := 'daily:' || (now() at time zone 'Asia/Tashkent')::date::text; pts:=50;
  elsif p_kind='lesson' and p_lesson=any(array['a1-intro','a1-day','a2-food','a2-memory','b1-goal','b1-choice','b2-work','b2-tech']) then
    k := 'lesson:' || p_lesson; pts:=20;
  else raise exception 'INVALID_ACTIVITY'; end if;
  -- Server chooses key/time/points. Client totals and historical dates are never accepted.
  insert into public.rank_events(user_id,event_key,points) values(u,k,pts) on conflict(user_id,event_key) do nothing;
  get diagnostics awarded = row_count;
  return jsonb_build_object('awarded',case when awarded=1 then pts else 0 end,'event',k);
end $$;
create function public.rank_board(p_period text default 'week') returns jsonb language plpgsql security definer set search_path = '' as $$
declare result jsonb;
begin
  if auth.uid() is null then raise exception 'AUTH_REQUIRED'; end if;
  if p_period is null or p_period not in ('week','all') then raise exception 'INVALID_PERIOD'; end if;
  with eligible as (
    select p.user_id,p.display_name,p.created_at,coalesce(sum(e.points),0) as xp
    from public.rank_profiles p left join public.rank_events e on e.user_id=p.user_id
      and (p_period='all' or e.created_at >= (date_trunc('week',now() at time zone 'Asia/Tashkent') at time zone 'Asia/Tashkent'))
    where p.opted_in and not p.hidden and not p.banned group by p.user_id
  ), ranked as (
    select user_id,display_name,xp,row_number() over(order by xp desc,created_at asc,user_id asc) as position from eligible
  ) select jsonb_build_object('rows',coalesce((select jsonb_agg(to_jsonb(x) order by x.position) from (select * from ranked order by position limit 50) x),'[]'::jsonb),
    'me',(select to_jsonb(r) from ranked r where r.user_id=auth.uid()),'period',p_period,'timezone','Asia/Tashkent') into result;
  return result;
end $$;
create function public.rank_admin_list(p_page integer default 0) returns jsonb language plpgsql security definer set search_path = '' as $$
declare result jsonb;
begin
  if not exists(select 1 from public.rank_admins where user_id=auth.uid()) then raise exception 'ADMIN_REQUIRED'; end if;
  if p_page is null or p_page not between 0 and 10000 then raise exception 'INVALID_PAGE'; end if;
  select jsonb_build_object('total',(select count(*) from public.rank_profiles),
    'users',coalesce((select jsonb_agg(to_jsonb(x)) from (select p.*,coalesce((select sum(e.points) from public.rank_events e where e.user_id=p.user_id),0) as xp from public.rank_profiles p order by p.created_at desc,p.user_id limit 25 offset p_page*25) x),'[]'::jsonb),
    'audit',coalesce((select jsonb_agg(to_jsonb(x) order by x.id desc) from (select * from public.rank_audit order by id desc limit 20) x),'[]'::jsonb)) into result;
  return result;
end $$;
create function public.rank_admin_moderate(p_user uuid,p_hidden boolean,p_banned boolean,p_reason text) returns void language plpgsql security definer set search_path = '' as $$
begin
  if not exists(select 1 from public.rank_admins where user_id=auth.uid()) then raise exception 'ADMIN_REQUIRED'; end if;
  if p_hidden is null or p_banned is null or p_reason is null or char_length(btrim(p_reason)) not between 3 and 500 then raise exception 'INVALID_MODERATION'; end if;
  if exists(select 1 from public.rank_admins where user_id=p_user) then raise exception 'ADMIN_PROTECTED'; end if;
  perform 1 from public.rank_profiles where user_id=p_user for update;
  if not found then raise exception 'USER_NOT_FOUND'; end if;
  update public.rank_profiles set hidden=p_hidden,banned=p_banned where user_id=p_user;
  insert into public.rank_audit(actor,target,action,reason) values(auth.uid(),p_user,jsonb_build_object('hidden',p_hidden,'banned',p_banned)::text,btrim(p_reason));
end $$;
-- Functions otherwise inherit PUBLIC execute privileges: revoke explicitly.
revoke all on function public.rank_account(),public.rank_join(text),public.rank_leave(),public.rank_award(text,text,text),public.rank_board(text),public.rank_admin_list(integer),public.rank_admin_moderate(uuid,boolean,boolean,text) from public,anon;
grant execute on function public.rank_account(),public.rank_join(text),public.rank_leave(),public.rank_award(text,text,text),public.rank_board(text),public.rank_admin_list(integer),public.rank_admin_moderate(uuid,boolean,boolean,text) to authenticated;
