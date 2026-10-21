import { SpotifyTokenResponse } from "../types/spotifyAuth.type";

function isSpotifyTokenResponse(value: unknown): value is SpotifyTokenResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (
    !("access_token" in value) ||
    !("token_type" in value) ||
    !("expires_in" in value)
  ) {
    return false;
  }

  const isTokenValid =
    typeof value.access_token === "string" && value.access_token.length > 0;

  const isTokenTypeValid =
    value.token_type === "Bearer" || value.token_type === "bearer";

  const isExpiresInValid =
    typeof value.expires_in === "number" &&
    Number.isInteger(value.expires_in) &&
    value.expires_in > 0;

  return isTokenValid && isTokenTypeValid && isExpiresInValid;
}

export { isSpotifyTokenResponse };
