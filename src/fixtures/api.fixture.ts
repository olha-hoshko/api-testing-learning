import { test as base } from "@playwright/test";
import { SpotifyAuthClient } from "../clients/spotifyAuth.client";

type ApiFixtures = {
  spotifyAuth: SpotifyAuthClient;
};

export const test = base.extend<ApiFixtures>({
  spotifyAuth: async ({ request }, use) => {
    const client = new SpotifyAuthClient(request);

    await use(client);
  },
});

export { expect } from "@playwright/test";
