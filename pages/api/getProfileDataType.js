import getAccessToken from "./getAccessToken"
import axios from "axios"


const getProfileDataType = async (type) => {
  console.log("Type: ", type)
  let token = await getAccessToken()
  token = token.data.access_token
  const url = `https://api.spotify.com/v1/me/top/${type}`
  let limitNo = 20
  let timeRange = 'long_term'
  console.log("Url: ", url)
  try {
    const { data } = await axios.get(url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: limitNo,
          time_range: timeRange
        }
      }
    );
    console.log("Profile data: ", data);
    return data;
  } catch (e) {
    return e
  }
}

export default getProfileDataType