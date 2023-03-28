import axios from "axios";
import getAccessToken from "./getAccessToken";

const getProfile = async (ProvidedToken, isTokenValid) => {
  let token
  if (isTokenValid === true) {
    token = ProvidedToken
    console.log("Provided token: ", token)
  } else {
    token = await getAccessToken();
    console.log("Got token: ", token)
    token = token.data.access_token;
    console.log("Fetched profile token: ", token);
  }
  try {
    const { data } = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Profile data: ", data);
    return data;
  } catch (error) {
    return error;
  }
};

export default getProfile;
