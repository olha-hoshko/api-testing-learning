import { SpotifyErrorResponse } from "../types/spotifyError.type";

function isSpotifyErrorResponse(value: unknown): value is SpotifyErrorResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("error" in value) || !("error_description" in value)) {
    return false;
  }

  const isErrorValid =
    typeof value.error === "string" && value.error.length > 0;

  const isErrorDescriptionValid =
    typeof value.error_description === "string" &&
    value.error_description.length > 0;

  return isErrorValid && isErrorDescriptionValid;
}

export { isSpotifyErrorResponse };
