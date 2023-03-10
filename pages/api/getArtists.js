import axios from "axios";
import getAccessToken from "./getAccessToken";



const getArtists = async (url, searchKey) => {
  let token = await getAccessToken()
  token = token.data.access_token
  console.log("Token in getArtists: ", token)
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    console.log("Artists data: ", data)
    return data;
  } catch (error) {
    return error;
  }
};

export default getArtists;
