import getAccessToken from "./getAccessToken"
import axios from 'axios'

const createRecPlaylist = async (enteredData) => {
    let token = await getAccessToken()
    token = token.data.access_token
    try {
        const { playlist } = await axios.get('https://api.spotify.com/v1/recommendations', {
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
        return playlist
    } catch (e) {
        return e
    }

}

export default createRecPlaylist