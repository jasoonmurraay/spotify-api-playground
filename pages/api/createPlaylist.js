import axios from "axios"
import getAccessToken from "./getAccessToken"

const createPlaylist = async (userId, name) => {
    let token = await getAccessToken()
    token = token.data.access_token
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`
    const body = {
        name: name
    }
    const { data } = await axios({
        method: 'post',
        url: url,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(body)
    })
    console.log("Created playlist: ", data)
    return data
}

export default createPlaylist