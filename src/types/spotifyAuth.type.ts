export type SpotifyTokenResponse = {
  access_token: string;
  token_type: "Bearer" | "bearer";
  expires_in: number;
};
