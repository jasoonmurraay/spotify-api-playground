import getUserPlaylists from "@/pages/api/getUserPlaylists";
import { useEffect, useState, useContext, useRef } from "react";
import { SpotifyContext } from "@/context/spotifyContext";
import classes from "./UserPlaylists.module.css";
import ButtonComponent from "./ButtonComponent";
import copyPlaylist from "@/pages/api/copyPlaylist";
import { render } from "react-dom";

const UserPlaylists = (props) => {
  const { spotifyTokenState, updateSpotifyToken, updateId } =
    useContext(SpotifyContext);
    const playlistRef = useRef()
  const [fillForm, setFillForm] = useState(false);
  const [copyType, setCopyType] = useState(null);
  const [existingPlaylist, setExistingPlaylist] = useState(null);
  const playlists = props.playlists;
  const copyHandler = async (event) => {
    setFillForm(true);
    console.log("Setting existing playlist: ", event.target.value)
    setExistingPlaylist(event.target.value)
  };
  const copySubmitHandler = (event) => {
    event.preventDefault()
    console.log('Copy: ', existingPlaylist)
  };
  const cancelCopyHandler = (event) => {
    event.preventDefault();
    setFillForm(false);
  };
  const reorderHandler = (id) => {
    const reorderPlaylist = async (id) => {
      return await props.modify(id);
    };
    reorderPlaylist(id).then((data) => {
      console.log("Reorder data: ", data);
    });
  };
  const renderPlaylistNames = () => {
    return playlists.map((playlist) => {
      if (playlist.owner.id === spotifyTokenState.id) {
        return (
          <>
            <input
              onClick={() => setExistingPlaylist(playlist.id)}
              type="radio"
              name="existPlaylistSelector"
              id={playlist.id}
              value={playlist.id}
            />
            <label htmlFor={playlist.id}>{playlist.name}</label>
          </>
        );
      }
    });
  };
  const renderPlaylists = () => {
    return playlists.map((playlist) => {
      return (
        <div className={`${classes.playlistItem}`}>
          <li
            className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}
            key={playlist.id}
          >
            <a
              className={`${classes.name}`}
              href={playlist.external_urls.spotify}
            >
              <div className={`${classes.cardBody}`}>
                <img
                  className={`${classes.img} card-img`}
                  src={playlist.images[0].url}
                  alt=""
                />

                <h2 className={` card-title`}>{playlist.name}</h2>

                {playlist.owner.id !== spotifyTokenState.id && (
                  <p className={`${classes.creator}`}>
                    {playlist.owner.display_name}
                  </p>
                )}
              </div>
            </a>
          </li>
          {playlist.owner.id === spotifyTokenState.id && (
            <button
              className={`${classes.reorderButton}`}
              id={playlist.id}
              onClick={reorderHandler}
            >{`Re-order ${playlist.name}`}</button>
          )}
          <button
            className={`${classes.copyButton}`}
            onClick={copyHandler}
            value={playlist.id}
          >{`Copy ${playlist.name}'s Items to Another Playlist`}</button>
        </div>
      );
    });
  };
  return (
    <>
      {fillForm && (
        <form onSubmit={copySubmitHandler}>
          <fieldset>
            <input
              onClick={() => {
                setCopyType("new");
                setExistingPlaylist(null);
              }}
              type="radio"
              value="new"
              id="newPlaylist"
              name="copyType"
            />
            <label htmlFor="newPlaylist">Create New Playlist</label>
            <input
              onClick={() => {
                setCopyType("existing");
              }}
              type="radio"
              value="existing"
              id="existingPlaylist"
              name="copyType"
            />
            <label htmlFor="existingPlaylist">Add to Existing Playlist</label>
          </fieldset>
          {copyType === "new" && (
            <>
              <label htmlFor="name">New Playlist name</label>
              <input id="name" type="text" />
            </>
          )}
          {copyType === "existing" && (
            <>
              <div>{renderPlaylistNames()}</div>
            </>
          )}
          {copyType && (
            <>
              <button onClick={cancelCopyHandler}>Cancel</button>
              <button onClick={copySubmitHandler}>Submit</button>
            </>
          )}
        </form>
      )}
      <div className={`${classes.content}`}>
        <h1>User Playlists</h1>
        <ul className={`${classes.list}`}>{renderPlaylists()}</ul>
      </div>
    </>
  );
};

export default UserPlaylists;
