import { env } from "../../src/config/env";
import { test, expect } from "../../src/fixtures/api.fixture";
import { isSpotifyTokenResponse } from "../../src/helpers/spotifyAuth.helper";
import { isSpotifyErrorResponse } from "../../src/helpers/spotifyError.helper";

test.describe("Spotify authentication", { tag: ["@auth"] }, () => {
  test(
    "should obtain Spotify access token",
    {
      tag: ["@smoke"],
    },
    async ({ spotifyAuth }) => {
      const response = await spotifyAuth.getAccessToken();

      expect(response.status()).toBe(200);

      const body: unknown = await response.json();

      expect(isSpotifyTokenResponse(body)).toBe(true);
    },
  );

  test(
    "should reject invalid client secret",
    {
      tag: ["@regression", "@negative"],
    },
    async ({ spotifyAuth }) => {
      const response = await spotifyAuth.getAccessToken({
        clientId: env.spotifyClientId,
        clientSecret: "invalid-secret",
      });

      expect(response.status()).toBe(400);

      const body: unknown = await response.json();
      const isErrorResponse = isSpotifyErrorResponse(body);

      expect(isErrorResponse).toBe(true);

      if (!isErrorResponse) {
        throw new Error("Spotify returned an invalid error response");
      }

      expect(body.error).toBe("invalid_client");
      expect(body.error_description).toBe("Invalid client secret");
    },
  );
});
