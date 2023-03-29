import ProfilePage from "@/components/ProfilePage"
import { useState } from "react"
import { useEffect } from "react"
import getAccessToken from "../api/getAccessToken"
import modifyPlaylist from "../api/modifyPlaylist"
import { useRouter } from "next/router"




const profile = () => {
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
        <ProfilePage modify={modifyPlaylistHandler}  />
    )
}

export default profile