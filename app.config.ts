import type { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? 'LevelUp',
  slug: config.slug ?? 'levelup-mvp',
  experiments: {
    ...config.experiments,
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL || '',
  },
});
