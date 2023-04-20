import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { SpotifyContext } from "@/context/spotifyContext";
import getUserPlaylists from "../api/getUserPlaylists";
import modifyPlaylist from "../api/modifyPlaylist";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import classes from "../../styles/UserPlaylists.module.css";
import Loading from "@/components/Loading";

const playlists = () => {
  const { spotifyTokenState } = useContext(SpotifyContext);
  const router = useRouter();
  const id = spotifyTokenState.id;
  console.log("playlist id: ", id);
  const newNameRef = useRef();
  const [fillForm, setFillForm] = useState(false);
  const [copyType, setCopyType] = useState(null);
  const [existingPlaylist, setExistingPlaylist] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (id) {
      async function retrievePlaylists() {
        return await getUserPlaylists(
          id,
          spotifyTokenState.token,
          spotifyTokenState.isTokenValid
        );
      }
      retrievePlaylists().then((data) => {
        console.log("Playlist response: ", data);
        setPlaylists(data);
        setIsLoading(false);
      });
    }
  }, [id]);

  const modifyPlaylistHandler = (playlistId) => {
    const modify = async (id) => {
      return await modifyPlaylist(id);
    };
    modify(playlistId).then((data) => {
      console.log("Playlist modified: ", data);
    });
    // router.reload()
  };

  const copySubmitHandler = async (event) => {
    event.preventDefault();
    let values = event.target.value.split(",");
    console.log(event.target.value);
    console.log("Playlists: ", values);
    await copyPlaylist(
      values[0],
      spotifyTokenState.token,
      spotifyTokenState.expirationTime,
      copyType === "existing" ? values[1] : null,
      copyType === "new"
        ? newNameRef.current.value.length
          ? newNameRef.current.value
          : "New Playlist"
        : null,
      spotifyTokenState.id
    );
    setFillForm(false);
    setCopyType(null);
    setExistingPlaylist(null);
    setNewPlaylist(null);
  };
  const cancelCopyHandler = (event) => {
    event.preventDefault();
    setFillForm(false);
    setExistingPlaylist(null);
    setNewPlaylist(null);
  };
  const renderPlaylistNames = () => {
    return playlists.map((playlist) => {
      if (playlist.owner.id === spotifyTokenState.id) {
        return (
          <>
            <input
              onClick={() => setNewPlaylist(playlist.id)}
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
        <li
          className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}
          key={playlist.id}
        >
          <div className={`${classes.playlistItem}`}>
            <Link
              className={`${classes.name}`}
              href={`/playlists/${playlist.id}`}
            >
              <div className={`${classes.cardBody}`}>
                {playlist.images.length && (
                  <img
                    className={`${classes.img} card-img`}
                    src={playlist.images[0].url}
                    alt=""
                  />
                )}

                <h2 className={` card-title`}>{playlist.name}</h2>

                {playlist.owner.id !== spotifyTokenState.id && (
                  <p className={`${classes.creator}`}>
                    {playlist.owner.display_name}
                  </p>
                )}
              </div>
            </Link>

            {playlist.owner.id === spotifyTokenState.id && (
              <button
                className={`${classes.reorderButton}`}
                id={playlist.id}
                onClick={modifyPlaylistHandler}
                value={playlist.id}
              >{`Re-order ${playlist.name}`}</button>
            )}
            <button
              className={`${classes.copyButton}`}
              onClick={() => {
                setFillForm(true);
                setExistingPlaylist(playlist.id);
                console.log("Existing playlist set: ", existingPlaylist);
              }}
              value={playlist.id}
            >{`Copy ${
              playlist.name.length > 20
                ? `${playlist.name.substring(0, 20)}...`
                : playlist.name
            }'s Items to Another Playlist`}</button>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Navbar />
          {fillForm && (
            <form
              className={`${classes.copyForm}`}
              onSubmit={copySubmitHandler}
            >
              <fieldset>
                <input
                  onClick={() => {
                    setCopyType("new");
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
                <label htmlFor="existingPlaylist">
                  Add to Existing Playlist
                </label>
              </fieldset>
              {copyType === "new" && (
                <>
                  <label htmlFor="name">New Playlist name</label>
                  <input ref={newNameRef} id="name" type="text" />
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
                  <button
                    value={[existingPlaylist, newPlaylist]}
                    onClick={copySubmitHandler}
                  >
                    Submit
                  </button>
                </>
              )}
            </form>
          )}
          <div className={`${classes.content}`}>
            <h1>User Playlists</h1>
            <ul className={`${classes.list}`}>{renderPlaylists()}</ul>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default playlists;
