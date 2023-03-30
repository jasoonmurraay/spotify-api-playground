import axios from "axios";
import getAccessToken from "./getAccessToken";

const getProfile = async (ProvidedToken, isTokenValid) => {
  console.log("Provided token: ", ProvidedToken)
  console.log("provided tokenisvalid: ", isTokenValid)
  let token
  let expires_in = null
  let tokenValidity = isTokenValid
  if (isTokenValid === true) {
    token = ProvidedToken
    console.log("Provided token: ", token)
  } else {
    token = await getAccessToken();
    console.log("Got token: ", token)
    token = token.data.access_token;
    expires_in = 3600
    tokenValidity = true
    console.log("Fetched profile token: ", token);
  }
  try {
    const { data } = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Profile data: ", data);
    return {
      data,
      token,
      expires_in: expires_in === null ? localStorage.getItem('expires_in') : 3600,
      isTokenValid: tokenValidity
    };
  } catch (error) {
    return error;
  }
};

export default getProfile;
