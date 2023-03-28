import axios from "axios";
import getAccessToken from "./getAccessToken";
import getProfile from "./getProfile";

const getUserPlaylists = async (userId, getUserOnly, providedToken, isTokenValid) => {
  let token
  if (isTokenValid === true) {
    token = providedToken
  } else {
    token = await getAccessToken();
    token = token.data.access_token;
  }
  const playlists = [];
  console.log("Token: ", token);
  try {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        query: {
          limit: 50,
        },
      }
    );
    if (getUserOnly === true) {
      for (let i = 0; i < data.items.length; i++) {
        console.log(data.items[i].owner.id, userId);

        if (data.items[i].owner.id === userId) {
          playlists.push(data.items[i]);
        }
      }
      return {
        next: data.next,
        previous: data.previous,
        items: playlists,
      };
    }
    else {
      return data
    }
  } catch (e) {
    return e;
  }
};
export default getUserPlaylists;
