import getProfile from '@/pages/api/getProfile'
import { useState } from 'react'
import ButtonComponent from './ButtonComponent'

const ProfilePage = (props) => {
    const [fetchType, setFetchType] = useState(null)
    useEffect(() => {
        async function fetchData() {
            await getProfile(fetchType)
        }
        fetchData().then(data => {
            console.log("Profile Items: ", data.items)
        })
    }, [fetchType])
    const fetchHandler = (value) => {
        if (value.includes('Tracks')) {
            setFetchType('tracks')
        } else {
            setFetchType('artists')
        }
    }
    return (
        <>
            {!fetchType && <>
                <ButtonComponent onClick={fetchHandler} text='Get top Tracks' />
                <ButtonComponent onClick={fetchHandler} text='Get top Artists' />
            </>}
            {fetchType && (
                <>
                </>
            )}
        </>
    )
}

export default ProfilePage