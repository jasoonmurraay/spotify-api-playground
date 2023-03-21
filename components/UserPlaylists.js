const UserPlaylists = (props) => {
    const playlists = props.playlists
    console.log("Playlists: ", playlists)
    const renderPlaylists = playlists.items.map(playlist => {
        return (
            <li key={playlist.id}>{playlist.name}</li>
        )
    })
    return (
        <ul>{renderPlaylists}</ul>
    )
}

export default UserPlaylists