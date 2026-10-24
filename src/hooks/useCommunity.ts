import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { communityClient as client } from '../storage/communityClient';
export type Membership = { user_id: string; joined: boolean; name: string | null; hidden: boolean; banned: boolean; admin: boolean };
export type BoardRow = { user_id: string; display_name: string; xp: number; position: number };
export type Board = { rows: BoardRow[]; me: BoardRow | null; period: string; timezone: string };
export type AdminUser = { user_id: string; display_name: string; xp: number; hidden: boolean; banned: boolean; opted_in: boolean };
export type AuditRow = { id: number; actor: string; target: string; action: string; reason: string; created_at: string };
export type AdminData = { users: AdminUser[]; total: number; audit: AuditRow[] };
const safeError = (error: unknown) => {
  const message = error && typeof error === 'object' && 'message' in error ? String(error.message) : '';
  if (message.includes('ACCOUNT_BLOCKED')) return 'This account is blocked from earning ranked XP.';
  if (message.includes('ADMIN_REQUIRED')) return 'Administrator access is required.';
  if (message.includes('ADMIN_PROTECTED')) return 'Administrator accounts cannot be moderated here.';
  return 'Online request failed. Check your connection, account and project setup, then try again.';
};
export function useCommunity() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!client);
  const [member, setMember] = useState<Membership | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const awardLock = useRef(false);
  const [syncing, setSyncing] = useState(false);
  const epoch = useRef(0);
  const user = session?.user.id;
  useEffect(() => {
    if (!client) return;
    let alive = true;
    const { data } = client.auth.onAuthStateChange((_event, next) => { if (alive) { setSession(next); setReady(true); } });
    void client.auth.getSession().then(({ data, error }) => { if (alive) { if (error) setError(safeError(error)); setSession(data.session); setReady(true); } }).catch(() => { if (alive) { setReady(true); setError('Online session could not load. Try signing in again.'); } });
    const sub = AppState.addEventListener('change', state => { if (state === 'active') client?.auth.startAutoRefresh(); else client?.auth.stopAutoRefresh(); });
    return () => { alive = false; data.subscription.unsubscribe(); sub.remove(); };
  }, []);
  const reloadAccount = useCallback(async () => {
    if (!client || !user) return;
    const generation = epoch.current;
    const { data, error } = await client.rpc('rank_account');
    if (generation !== epoch.current) return;
    if (error) setError(safeError(error)); else { setMember(data as Membership); setError(''); }
  }, [user]);
  useEffect(() => { epoch.current++; setMember(null); setError(''); setNotice(''); void reloadAccount().catch(e => setError(safeError(e))); }, [reloadAccount]);
  const run = async (action: () => Promise<void>) => {
    if (lock.current) return false;
    lock.current = true; setBusy(true); setError(''); setNotice('');
    try { await action(); return true; } catch (e) { setError(safeError(e)); return false; }
    finally { lock.current = false; setBusy(false); }
  };
  const authenticate = (email: string, password: string, signup: boolean) => run(async () => {
    if (!client) throw new Error();
    const result = signup ? await client.auth.signUp({ email: email.trim(), password }) : await client.auth.signInWithPassword({ email: email.trim(), password });
    if (result.error) throw result.error;
    setNotice(signup && !result.data.session ? 'Check your email to confirm your account, then sign in.' : 'Signed in. Choose a public nickname to join the ranking.');
  });
  const join = (name: string) => run(async () => {
    if (!client) throw new Error();
    const { data, error } = await client.rpc('rank_join', { p_name: name }); if (error) throw error;
    setMember(data as Membership); setNotice('Ranking profile saved. Only your nickname and ranked XP are public.');
  });
  const leave = () => run(async () => {
    if (!client) throw new Error();
    const { error } = await client.rpc('rank_leave'); if (error) throw error;
    await reloadAccount(); setNotice('You are no longer shown in the ranking.');
  });
  const logout = () => run(async () => {
    if (!client) throw new Error();
    const { error } = await client.auth.signOut({ scope: 'local' }); if (error) throw error;
    setMember(null); setSession(null);
  });
  const award = async (kind: 'daily' | 'lesson', answer: string, lesson = '') => {
    if (!client || !user || !member?.joined || member.banned || awardLock.current) return;
    awardLock.current = true; setSyncing(true);
    const generation = epoch.current;
    try {
      const { data, error } = await client.rpc('rank_award', { p_kind: kind, p_lesson: lesson, p_answer: answer }); if (error) throw error;
      if (generation === epoch.current) { setError(''); setNotice(data.awarded ? `Ranked XP saved: +${data.awarded}` : 'This activity already has ranked XP. No duplicate points.'); }
    } catch (e) { if (generation === epoch.current) { setError(safeError(e)); setNotice('Online XP was not confirmed. Retry from Results with your current activity. Local progress is safe.'); } }
    finally { awardLock.current = false; setSyncing(false); }
  };
  return { configured: !!client, ready, session, member, error, notice, busy, syncing, authenticate, join, leave, logout, award, reloadAccount };
}
export type Community = ReturnType<typeof useCommunity>;
export async function fetchBoard(period: 'all' | 'week'): Promise<Board> {
  if (!client) throw new Error();
  const { data, error } = await client.rpc('rank_board', { p_period: period }); if (error) throw new Error('Ranking could not load. Try again.');
  return data as Board;
}
export async function fetchAdmin(page: number): Promise<AdminData> {
  if (!client) throw new Error();
  const { data, error } = await client.rpc('rank_admin_list', { p_page: page }); if (error) throw new Error('Administrator request failed. Check your access and try again.');
  return data as AdminData;
}
export async function moderateUser(user: string, hidden: boolean, banned: boolean, reason: string) {
  if (!client) throw new Error();
  const { error } = await client.rpc('rank_admin_moderate', { p_user: user, p_hidden: hidden, p_banned: banned, p_reason: reason });
  if (error) throw new Error('Moderation failed. Check your access and try again.');
}
