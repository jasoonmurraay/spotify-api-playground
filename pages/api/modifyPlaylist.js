import axios from 'axios'
import { resolve } from 'styled-jsx/css'
import corsHandler from './corsMiddleware'
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
    let audioStart = 0
    let audioUpper = length >= 100 ? 100 : length
    while (audioStart < length) {
        let audioIds = ''
        for (let i = audioStart; i < audioUpper; i++) {
            if (i === audioStart) {
                audioIds = audioIds + playlist[i].track.id
            } else {
                audioIds = audioIds + ',' + playlist[i].track.id
            }
        }
        const trackUrl = `https://api.spotify.com/v1/audio-features`
        let score = 0
        await axios.get(trackUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                ids: audioIds
            }
        }).then(data => {
            console.log("Audio features data: ", data)
            audioStart += 100
            audioUpper = (audioUpper + 100 > length) ? length : audioUpper + 100
            // make a score for each track, and add uri and score to array
            for (let i = 0; i < data.data.audio_features.length; i++) {
                let track = data.data.audio_features[i]
                score += (track.danceability + track.energy + track.loudness + track.mode + track.tempo + track.valence)
                scoreArray.push([track.id, track.uri, score, i])
            }
        })
    }
    console.log("Score Array: ", scoreArray)
    // sort array of tracks by score
    scoreArray = scoreArray.sort((a, b) => {
        return a[2] - b[2]
    })
    let uriArray = []
    for (let i = 0; i < scoreArray.length; i++) {
        uriArray.push(scoreArray[i][1])
    }
    console.log("URI Array: ", uriArray)
    let lowerBound = 0
    let higherBound = (uriArray.length <= 100) ? uriArray.length : 100
    let start = 0
    let uriArrayString = ''


    console.log("Token before request: ", token)
    let error = false
    const putUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    // re-order playlist to match array order
    while ((lowerBound < scoreArray.length) && error == false) {
        console.log("Lower: ", lowerBound)
        console.log("Higher: ", higherBound)
        for (let i = start; i < higherBound; i++) {
            if (i === 0) {
                uriArrayString += uriArray[i]
            } else {
                uriArrayString += ',' + uriArray[i]
            }

        }
        console.log("URI as string: ", uriArrayString)
        // await corsHandler()
        await axios({
            method: 'put',
            url: putUrl,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                'uris': uriArrayString
            },
            data: {
                'range_start': start
            }
        }).then((data) => {
            console.log("modified data: ", data)
            lowerBound += 100
            start += 100
            higherBound = (higherBound + 100 >= uriArray.length ? uriArray.length : higherBound + 100)
            uriArrayString = ''
        }).catch((e) => {
            console.log("Error: ", e)
            error = true
        })

    }
    return await getPlaylist(playlistId)
}

export default modifyPlaylist