import UserArtists from "@/components/UserArtists"
import { useEffect, useState, useContext } from "react"
import getProfileDataType from "../api/getProfileDataType"
import { SpotifyContext } from "@/context/spotifyContext"
import Navbar from "@/components/Navbar"

const artists = () => {
    const { spotifyTokenState, updateSpotifyToken } = useContext(SpotifyContext)
    const [artists, setArtists] = useState([])
    useEffect(() => {
        const retrieveArtists = async () => {
            return await getProfileDataType('artists', spotifyTokenState.token, spotifyTokenState.isTokenValid)
        }
        retrieveArtists().then(data => {
            console.log("Artist data: ", data)
            setArtists(data.data.items)
            if (data.token !== spotifyTokenState.token) {
                updateSpotifyToken(data.token, 3600)
            }
        })
    }, [])
    return (
        <>
            <Navbar />
            <UserArtists artists={artists} />
        </>
    )
}

export default artists