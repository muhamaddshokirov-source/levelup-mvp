import { publicCommunityConfig } from '../domain/communityConfig';
/** Public Supabase project URL + publishable/anon key only. Never a service-role key. */
export const communityConfig = {
  url: (process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() || 'https://eodijrjdjhatirkvzmmk.supabase.co').replace(/\/$/, ''),
  key: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() || 'sb_publishable_MKKvaG7UaQf_84_sU0fbNQ_Y-cmbNwS',
};
export const communityConfigured = publicCommunityConfig(communityConfig.url, communityConfig.key);
