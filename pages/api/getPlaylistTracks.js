import axios from "axios";
import getAccessToken from "./getAccessToken";

const getPlaylistTracks = async (id) => {
    console.log("Fetching playlist tracks!")
  let token = await getAccessToken();
  token = token.data.access_token;
  console.log("Got token! ", token)
  let tracks = [];
  let url = `https://api.spotify.com/v1/playlists/${id}/tracks`
  try {
    let next = true;
    while (next) {
      const { data } = await axios.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Got tracks!", data.next)
      for (let i = 0; i<data.items.length; i++) {
        tracks.push(data.items[i])
      }
      if (!data.next) {
        next = false;
      } else {
        url = data.next
      }
    }

    console.log("Tracks: ", tracks);
    return tracks;
  } catch (e) {
    return e;
  }
};

export default getPlaylistTracks;
