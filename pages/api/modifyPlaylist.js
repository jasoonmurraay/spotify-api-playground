import axios from 'axios'
import getAccessToken from './getAccessToken'
import getPlaylist from './getPlaylist'
import getPlaylistTracks from './getPlaylistTracks'

const modifyPlaylist = async (playlistId) => {
    console.log("Modifying playlist id ", playlistId)
    let token = await getAccessToken()
    token = token.data.access_token
    console.log("Got token! ", token)
    let playlist = await getPlaylistTracks(playlistId)
    console.log("Got tracks!")
    let scoreArray = []
    const length = playlist.length
    for (let i = 0; i < length; i++) {
        const trackUrl = `https://api.spotify.com/v1/audio-features/${playlist[i].track.id}`
        let score = 0
        await axios.get(trackUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(data => {
            let track = data.data
            // make a score for each track, and add uri and score to array
            score += (track.danceability + track.energy + track.loudness + track.mode + track.tempo + track.valence - (track.instrumentalness / 2) + (track.speechiness / 2))
            scoreArray.push([track.name, track.id, track.uri, score, i])
        })        
    }
    // sort array of tracks by score
    scoreArray = scoreArray.sort((a, b) => {
        return a[3] - b[3]
    })
    let uriArray = []
    for (let i = 0; i<scoreArray.length; i++) {
        uriArray.push(scoreArray[i][2])
    }
    console.log("URI Array: ", uriArray)
    let lowerBound = 0
    let higherBound = (uriArray.length <= 100) ? uriArray.length : 100
    let start = 0
    // re-order playlist to match array order
    while (lowerBound < scoreArray.length) {
        await axios.put(`https://api.spotify.com/v1/playlist/${playlistId}/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            uris: uriArray.slice(lowerBound, higherBound),
            range_start: start
        }).then(() => {
            lowerBound += 100
            start += 100
            higherBound = (higherBound + 100 >= uriArray.length ? uriArray.length : higherBound + 100)
            console.log("Lower Bound: ", lowerBound)
            console.log("Higher Bound: ", higherBound)
        })
    }
    return await getPlaylist(playlistId)
}

export default modifyPlaylist