import ProfilePage from "@/components/ProfilePage"
import { useState } from "react"
import { useEffect } from "react"
import getAccessToken from "../api/getAccessToken"
import modifyPlaylist from "../api/modifyPlaylist"
import { useRouter } from "next/router"




const profile = () => {
    const router = useRouter()
    const [token, setToken] = useState(null)
    console.log(typeof window)
    useEffect(() => {
        async function retrieveToken() {
            return await getAccessToken()
        }
        retrieveToken().then((response) => {
            setToken(response.data.access_token)
            console.log(response.data.access_token)
        })
    }, [])
    const modifyPlaylistHandler = (playlistId) => {
        const modify = async (id) => {
            return await modifyPlaylist(id)
        }
        modify(playlistId).then((data) => {
            console.log("Playlist modified: ", data)
        })
        // router.reload()
    }
    return (
        <ProfilePage modify={modifyPlaylistHandler} token={token} />
    )
}

export default profile