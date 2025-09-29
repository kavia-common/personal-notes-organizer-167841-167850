import Constants from 'expo-constants';

type AppConfig = {
  // Base URL for future backend API integration (optional for now)
  API_BASE_URL?: string;
};

// PUBLIC_INTERFACE
export function getConfig(): AppConfig {
  /** Read runtime configuration from Expo manifest extra or env. */
  // Prefer Expo extra, fallback to process.env when available
  const extra = (Constants?.expoConfig?.extra as Record<string, unknown>) ?? {};
  const env = (typeof process !== 'undefined' ? (process.env as Record<string, string | undefined>) : {}) || {};
  return {
    API_BASE_URL: (extra.API_BASE_URL as string) ?? env.API_BASE_URL ?? undefined,
  };
}
