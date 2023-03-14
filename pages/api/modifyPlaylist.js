import axios from 'axios'
import getAccessToken from './getAccessToken'
import getPlaylist from './getPlaylist'

const modifyPlaylist = async (playlistId) => {
    let token = await getAccessToken()
    token = token.data.access_token
    let playlist = await getPlaylist(playlistId)
    let scoreArray = []
    const length = playlist.tracks.length
    for (let i = 0; i < length; i++) {
        let score = 0
        const { track } = await axios.get(`https://api.spotify.com/v1/audio-features/${playlist.tracks[i].id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        // make a score for each track, and add uri and score to array
        score += (track.danceability + track.energy + track.loudness + track.mode + track.tempo + track.valence - (track.instrumentalness / 2) + (track.speechiness / 2))
        scoreArray.push([track.name, track.id, track.uri, score, i])
    }
    // sort array of tracks by score
    scoreArray = scoreArray.sort((a, b) => {
        return a[3] - b[3]
    })
    // re-order playlist to match array order
    const reordered = await axios.put(`https://api.spotify.com/v1/playlist/${playlistId}/tracks`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        range_start: 0,
        range_length: length
    })
}

export default modifyPlaylist