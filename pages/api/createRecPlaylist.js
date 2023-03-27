import getAccessToken from "./getAccessToken"
import axios from 'axios'
import createPlaylist from "./createPlaylist"
import addToPlaylist from "./addToPlaylist"

const createRecPlaylist = async (enteredData) => {
    let token = await getAccessToken()
    token = token.data.access_token
    try {
        const { recTracks } = await axios.get('https://api.spotify.com/v1/recommendations', {
            query: {
                seed_artists: enteredData.artists,
                seed_genres: enteredData.genres,
                seed_tracks: enteredData.tracks,
                limit: enteredData.limit,
                market: enteredData.market,
                target_acousticness: enteredData.acousticness,
                target_danceability: enteredData.danceability,
                target_energy: enteredData.energy,
                target_instrumentalness: enteredData.instrumentalness,
                target_liveness: enteredData.liveness,
                target_loudness: enteredData.loudness,
                target_mode: enteredData.mode,
                target_speechiness: enteredData.speechiness,
                target_tempo: enteredData.tempo,
                target_valence: enteredData.valence,
            }
        })
        let trackUris = ''
        for (let i = 0; i < recTracks.tracks.length; i++) {
            if (i === 0) {
                trackUris = recTracks.tracks[i].uri
            } else {
                trackUris = trackUris + ',' + recTracks.tracks[i].uri
            }
        }
        const { newPlaylist } = await createPlaylist(userId)
        const { addedNewSongs } = await addToPlaylist(newPlaylist.id, trackUris)
        return
    } catch (e) {
        return e
    }

}

export default createRecPlaylist