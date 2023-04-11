import axios from 'axios'
import getAccessToken from './getAccessToken'

const getPlaylist = async (id, providedToken, expirationTime) => {
    console.log("Provided Token: ", providedToken)
    console.log("Valid: ", expirationTime > Date.now())
    let token;
    if (providedToken && expirationTime > Date.now()) {
        token = providedToken
    } else {
        token = await getAccessToken()
        token = token.data.access_token
    }
    try {
        const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return data
    } catch (e) {
        return e
    }
}

export default getPlaylist