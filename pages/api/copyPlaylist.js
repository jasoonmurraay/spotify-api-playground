import axios from 'axios'
import getAccessToken from './getAccessToken';


async function copyPlaylist(playlistId, providedToken, expirationTime, providedNewPlaylist = null, destinationPlaylistName = null) {
    let token, newPlaylist;
    if (providedToken && expirationTime > Date.now()) {
        token = providedToken
    } else {
        token = await getAccessToken()
        token = token.data.access_token
    }
    try {
        // Get the source playlist details
        const sourcePlaylistResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const sourcePlaylist = sourcePlaylistResponse.data;
        const trackUris = sourcePlaylist.tracks.items.map(item => item.track.uri);

        if (!providedNewPlaylist) {
            const newPlaylistResponse = await axios.post('https://api.spotify.com/v1/users/me/playlists', {
                name: destinationPlaylistName,
                public: false
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            newPlaylist = newPlaylistResponse.data;
        } else {
            // Add all the tracks from the source playlist to the new playlist

            await axios.post(`https://api.spotify.com/v1/playlists/${newPlaylist.id}/tracks`, {
                uris: trackUris
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        }
        console.log(`Playlist ${sourcePlaylist.name} copied to ${newPlaylist.name}`);
    } catch (error) {
        console.error(error);
    }
}

export default copyPlaylist
