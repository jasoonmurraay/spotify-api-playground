import axios from "axios";
import getAccessToken from "./getAccessToken";

const getProfile = async () => {
  let token = await getAccessToken();
  token = token.data.access_token;
  console.log("Fetched profile token: ", token);
  try {
    const { data } = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      //   params: {
      //     type: `${type}`,
      //   },
    });
    console.log("Profile data: ", data);
    return data;
  } catch (error) {
    return error;
  }
};

export default getProfile;
