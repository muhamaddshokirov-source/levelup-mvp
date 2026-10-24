import test from 'node:test';
import assert from 'node:assert/strict';
import { publicCommunityConfig } from './communityConfig';
test('community accepts only HTTPS project URLs and browser keys, never service roles', () => {
  const url = 'https://fixture.supabase.co';
  const jwt = (role: string) => `header.${Buffer.from(JSON.stringify({ role })).toString('base64url')}.signature`;
  assert.equal(publicCommunityConfig(url,'sb_publishable_fixture'),true);
  assert.equal(publicCommunityConfig(url,jwt('anon')),true);
  for (const key of ['', 'bad-key','sb_secret_fixture',jwt('service_role'),jwt('authenticated')]) assert.equal(publicCommunityConfig(url,key),false);
  for (const address of ['http://fixture.supabase.co','https://fixture.supabase.co.evil.test','https://username:password@fixture.supabase.co','https://fixture.supabase.co?key=x']) assert.equal(publicCommunityConfig(address,'sb_publishable_fixture'),false);
});
