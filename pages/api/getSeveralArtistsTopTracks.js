import axios from "axios"
import addToPlaylist from "./addToPlaylist"
import createPlaylist from "./createPlaylist"
import getAccessToken from "./getAccessToken"

const getSeveralArtistsTopTracks = async (artists, country, userId) => {
    let token = await getAccessToken()
    token = token.data.access_token
    let artistsData = []
    for (let i = 0; i < artists.length; i++) {
        await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/artists/${artists[i].id}/top-tracks`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                market: country
            }
        }).then((data) => {
            console.log("Data: ", data)
            let upperBound = data.data.tracks.length > 5 ? 5 : data.tracks.length
            for (let i = 0; i < upperBound; i++) {
                artistsData.push(data.data.tracks[i])
            }
        })
    }
    let uris = ''
    for (let i = 0; i < artistsData.length; i++) {
        uris = uris + (i === 0 ? '' : ',') + artistsData[i].uri
    }
    console.log("Artists top tracks: ", artistsData)
    const { newPlaylist } = await createPlaylist(userId, "Top Artists' Top Songs").then(async (data) => {
        const addedSongs = await addToPlaylist(data.id, uris)
        console.log("Updated created playlist: ", addedSongs)
    })

}

export default getSeveralArtistsTopTracks