import TopTracks from "@/components/TopTracks"
import { useState, useEffect, useContext } from "react"
import getProfileDataType from "../api/getProfileDataType"
import { SpotifyContext } from "@/context/spotifyContext"

const toptracks = () => {
    const { spotifyTokenState, updateSpotifyToken, updateId } = useContext(SpotifyContext)
    const [tracks, setTracks] = useState([])
    useEffect(() => {
        async function getTracks() {
            return await getProfileDataType('tracks', spotifyTokenState.token, spotifyTokenState.isTokenValid)
        }
        getTracks().then(data => {
            console.log("Track data: ", data)
            setTracks(data.data.items)
            if (data.token !== spotifyTokenState.token) {
                updateSpotifyToken(data.token, 3600)
            }
        })
    }, [])
    return (
        <TopTracks tracks={tracks} />
    )

}
export default toptracks