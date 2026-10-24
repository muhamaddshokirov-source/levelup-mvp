import { publicCommunityConfig } from '../domain/communityConfig';
/** Public Supabase project URL + publishable/anon key only. Never a service-role key. */
export const communityConfig = {
  url: (process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() || '').replace(/\/$/, ''),
  key: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() || '',
};
export const communityConfigured = publicCommunityConfig(communityConfig.url, communityConfig.key);
