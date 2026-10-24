export function publicCommunityConfig(url: string, key: string): boolean {
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url)) return false;
  if (/^sb_publishable_[A-Za-z0-9_-]+$/.test(key)) return true;
  // Legacy browser keys carry role=anon. Never accept a service_role JWT.
  try {
    const encoded = key.split('.')[1]; if (!encoded) return false;
    const value = JSON.parse(atob(encoded.replace(/-/g, '+').replace(/_/g, '/')));
    return value.role === 'anon' && key.split('.').length === 3;
  } catch { return false; }
}
