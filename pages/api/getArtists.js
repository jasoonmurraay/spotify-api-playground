import axios from "axios";
import getAccessToken from "./getAccessToken";

const getArtists = async (
  url,
  searchKey,
  providedToken,
  providedExpiryTime,
  queryOffset
) => {
  let token, expires_in;
  if (providedExpiryTime > Date.now()) {
    token = providedToken;
  } else {
    token = await getAccessToken();
    token = token.data.access_token;
  }
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey.length ? searchKey : "",
        offset: queryOffset ? queryOffset : null,
        type: "artist",
      },
    });
    console.log("Artists data: ", data);
    return {
      token,
      data,
    };
  } catch (e) {
    return { error: e };
  }
};

export default getArtists;
