import type { APIRequestContext, APIResponse } from "@playwright/test";

import { env } from "../config/env";
import { spotifyUrls } from "../config/urls";

type Credentials = {
  clientId: string;
  clientSecret: string;
};

export class SpotifyAuthClient {
  private readonly request;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAccessToken(
    credentials: Credentials = {
      clientId: env.spotifyClientId,
      clientSecret: env.spotifyClientSecret,
    },
  ): Promise<APIResponse> {
    const { clientId, clientSecret } = credentials;

    const authHeaderValue = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    );

    return this.request.post(spotifyUrls.token, {
      headers: {
        Authorization: `Basic ${authHeaderValue}`,
      },
      form: {
        grant_type: "client_credentials",
      },
    });
  }
}
