import getUserPlaylists from "@/pages/api/getUserPlaylists";
import { useEffect, useState, useContext } from "react";
import { SpotifyContext } from "@/context/spotifyContext";
import classes from "./ProfilePage.module.css"
import ButtonComponent from "./ButtonComponent";

const UserPlaylists = (props) => {
    const playlists = props.playlists
    const reorderHandler = (id) => {
        const reorderPlaylist = async (id) => {
            return await props.modify(id)
        }
        reorderPlaylist(id).then((data) => {
            console.log("Reorder data: ", data)
        })
    }
    const renderPlaylists = () => {
        return playlists.map((playlist) => {
            return (
                <li key={playlist.id}>
                    <div
                        className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}
                    >
                        <img
                            className={`${classes.img} card-img`}
                            src={playlist.images[0].url}
                            alt=""
                        />
                        <a href={playlist.external_urls.spotify}>
                            <h2 className="card-title">{playlist.name}</h2>
                        </a>
                        <ButtonComponent id={playlist.id} onClick={reorderHandler} text='Re-order playlist' />
                    </div>
                </li>
            );
        });
    };
    return (<>
        <h1>User Playlists</h1>
        <ul>{renderPlaylists()}</ul>
    </>
    )
}

export default UserPlaylists