import axios from "axios";
import getAccessToken from "./getAccessToken";

async function copyPlaylist(
  playlistId,
  providedToken,
  expirationTime,
  providedNewPlaylist = null,
  destinationPlaylistName = null,
  userId
) {
  let token, newPlaylist;
  if (providedToken && expirationTime > Date.now()) {
    token = providedToken;
  } else {
    token = await getAccessToken();
    token = token.data.access_token;
  }
  if (providedNewPlaylist) {
    newPlaylist = providedNewPlaylist;
  }

  try {
    // Get the source playlist details
    const sourcePlaylistResponse = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const sourcePlaylist = sourcePlaylistResponse.data;
    const trackUris = sourcePlaylist.tracks.items.map((item) => item.track.uri);
    let uriString = "";
    let start = 0;
    let upperBound = trackUris.length > 100 ? 100 : trackUris.length;

    if (!providedNewPlaylist) {
      const newPlaylistResponse = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: destinationPlaylistName,
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      newPlaylist = newPlaylistResponse.data.id;
    }
    while (start < trackUris.length) {
      for (let i = start; i < upperBound; i++) {
        let duplicate = false;
        if (providedNewPlaylist) {
          for (let j = 0; j < sourcePlaylist.tracks.items.length; j++) {
            if (trackUris[i] === sourcePlaylist.tracks.items[j].track.uri) {
              duplicate = true;
              break;
            }
          }
        }
        if (!duplicate) {
          uriString += (uriString.length === 0 ? "" : ",") + trackUris[i];
        }
      }
      if (uriString.length > 0) {
        await axios.post(
          `https://api.spotify.com/v1/playlists/${newPlaylist}/tracks`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              uris: uriString,
            },
          }
        );
      }
      start += 100;
      upperBound += 100;
      uriString = "";
    }
  } catch (error) {
    console.log("Error: \n", error);
  }
}

export default copyPlaylist;
