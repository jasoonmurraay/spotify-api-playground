import { useRef } from "react"

const NewPlaylistInput = (props) => {
    const nameRef = useRef()
    const submitHandler = (event) => {
        event.preventDefault()
    }
    const cancelHandler = (event) => {
        event.preventDefault()
    }
    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="name">New Playlist name</label>
            <input ref={nameRef} id="name" type="text" />
            <button onClick={cancelHandler}>Cancel</button>
            <button onClick={submitHandler}>Submit</button>
        </form>
    )
}

export default NewPlaylistInput