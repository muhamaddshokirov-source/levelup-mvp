import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import { communityConfig, communityConfigured } from '../config/community';
export const communityClient = communityConfigured ? createClient(communityConfig.url, communityConfig.key, {
  auth: { storage: AsyncStorage, storageKey: '@levelup/community-auth/v1', persistSession: true, autoRefreshToken: true, detectSessionInUrl: Platform.OS === 'web' },
  global: { fetch: async (url, options) => {
    const controller = new AbortController();
    const abort = () => controller.abort();
    if (options?.signal?.aborted) controller.abort();
    options?.signal?.addEventListener('abort', abort);
    const timer = setTimeout(() => controller.abort(), 25000);
    try { return await fetch(url, { ...options, signal: controller.signal }); }
    finally { clearTimeout(timer); options?.signal?.removeEventListener('abort', abort); }
  } },
}) : null;
