import ProfilePage from "@/components/ProfilePage"
import { useState } from "react"
import { useEffect } from "react"
import getAccessToken from "./api/getAccessToken"


const profile = () => {
    const [token, setToken] = useState(null)
    useEffect(() => {
        async function retrieveToken() {
            return await getAccessToken()
        }
        retrieveToken().then((response) => {
            setToken(response.data.access_token)
        })
    }, [])
    return (
        <ProfilePage token={token} />
    )
}

export default profile