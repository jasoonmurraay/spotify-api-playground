import axios from "axios"
import getAccessToken from "./getAccessToken"

const addToPlaylist = async (playlistId, uris = '') => {
    let token = await getAccessToken()
    token = token.data.access_token
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const { data } = await axios({
        method: 'post',
        url: url,
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            uris: uris
        }
    })
}

export default addToPlaylist