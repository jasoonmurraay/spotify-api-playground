import getUserPlaylists from "@/pages/api/getUserPlaylists";
import { useEffect, useState, useContext } from "react";
import { SpotifyContext } from "@/context/spotifyContext";
import classes from "./UserPlaylists.module.css"
import ButtonComponent from "./ButtonComponent";
import copyPlaylist from "@/pages/api/copyPlaylist";


const UserPlaylists = (props) => {
    const { spotifyTokenState, updateSpotifyToken, updateId } = useContext(SpotifyContext)
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
                <div className={`${classes.playlistItem}`}>
                    <li className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`} key={playlist.id}>
                        <a className={`${classes.name}`} href={playlist.external_urls.spotify}>
                            <div
                                className={`${classes.cardBody}`}
                            >
                                <img
                                    className={`${classes.img} card-img`}
                                    src={playlist.images[0].url}
                                    alt=""
                                />

                                <h2 className={` card-title`}>{playlist.name}</h2>

                                {playlist.owner.id !== spotifyTokenState.id && <p className={`${classes.creator}`}>{playlist.owner.display_name}</p>}

                            </div>
                        </a>
                    </li>
                    {playlist.owner.id === spotifyTokenState.id && <button className={`${classes.reorderButton}`} id={playlist.id} onClick={reorderHandler} >{`Re-order ${playlist.name}`}</button>}
                </div>
            );
        });
    };
    return (<>
        <div className={`${classes.content}`}>
            <h1>User Playlists</h1>
            <ul className={`${classes.list}`}>{renderPlaylists()}</ul>
        </div>
    </>
    )
}

export default UserPlaylists