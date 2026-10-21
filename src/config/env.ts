import "dotenv/config";

function getValueFromEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  spotifyClientId: getValueFromEnv("SPOTIFY_CLIENT_ID"),
  spotifyClientSecret: getValueFromEnv("SPOTIFY_CLIENT_SECRET"),
  isCI: process.env.CI === "true",
} as const;
