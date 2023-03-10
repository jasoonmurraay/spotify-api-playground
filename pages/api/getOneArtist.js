import axios from "axios";
import getAccessToken from "./getAccessToken";

const getOneArtist = async (url) => {
  let token = await getAccessToken()
  token = token.data.access_token
    try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            type: 'artist'
          }
        });
        console.log("Artist data: ", data)
        return data;
      } catch (error) {
        return error;
      }
}

export default getOneArtist