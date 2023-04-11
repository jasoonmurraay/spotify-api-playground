import axios from "axios";
import getAccessToken from "./getAccessToken";
import getProfile from "./getProfile";

const getUserPlaylists = async (userId, providedToken, isTokenValid) => {
  console.log("Getting user Playlists: ", userId, providedToken, isTokenValid)
  const id = userId
  let token
  if (isTokenValid === true) {
    token = providedToken
  } else {
    token = await getAccessToken();
    token = token.data.access_token;
  }
  const playlists = [];
  console.log("Token: ", token);
  let next = true
  let url = "https://api.spotify.com/v1/me/playlists"
  try {
    while (next) {
      const { data } = await axios.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          query: {
            limit: 50,
          },
        }
      );
      console.log("Playlists data: ", data)
      for (let i = 0; i < data.items.length; i++) {
        playlists.push(data.items[i]);
      }
      if (data.next) {
        url = data.next
      } else {
        next = false
      }
    }
    return playlists
  } catch (e) {
    return e;
  }
};
export default getUserPlaylists;
