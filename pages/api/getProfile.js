import axios from "axios";
import getAccessToken from "./getAccessToken";

const getProfile = async (type) => {
    let token = await getAccessToken()
    token = token.data.access_token
    try {
        const { data } = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                type: `${type}`
            }
        });
        console.log("Profile data: ", data)
        return data;
    } catch (error) {
        return error;
    }
}

export default getProfile