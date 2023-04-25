import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { SpotifyContext } from "@/context/spotifyContext";
import getUserPlaylists from "../api/getUserPlaylists";
import modifyPlaylist from "../api/modifyPlaylist";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import classes from "../../styles/UserPlaylists.module.css";
import Loading from "@/components/Loading";
import copyPlaylist from "../api/copyPlaylist";
import Card from "@/components/Card";

const playlists = () => {
  const { spotifyTokenState } = useContext(SpotifyContext);
  const router = useRouter();
  const id = spotifyTokenState.id;
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
    router.reload();
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
    router.reload();
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
  // const redirectHandler = (path) => {
  //   router.push(path);
  // };
  const handleCardClick = (id) => {
    setNewPlaylist(id);
  };
  console.log("Existing Playlist: ", existingPlaylist);
  console.log("New Playlist: ", newPlaylist);
  const renderPlaylists = (type) => {
    return playlists.map((playlist) => {
      if (type === "all") {
        return (
          <>
            <li className={classes.card} key={playlist.id}>
              {type === "all" && (
                <Link
                  className={`${classes.name}`}
                  href={`/playlists/${playlist.id}`}
                >
                  <Card
                    link={`/playlists/${playlist.id}`}
                    img={playlist.images.length ? playlist.images[0].url : null}
                    header={
                      playlist.name.length > 20
                        ? `${playlist.name.substring(0, 20)}...`
                        : playlist.name
                    }
                  />
                </Link>
              )}
              {type === "all" && playlist.owner.id === spotifyTokenState.id && (
                <>
                  <button
                    className={`${classes.reorderButton}`}
                    id={playlist.id}
                    onClick={modifyPlaylistHandler}
                    value={playlist.id}
                  >{`Re-order ${playlist.name}`}</button>
                </>
              )}
              {type === "all" && (
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
              )}
            </li>
          </>
        );
      } else if (type === "user") {
        if (playlist.owner.id === spotifyTokenState.id && !newPlaylist) {
          return (
            <li
              className={`${classes.card} ${
                newPlaylist === playlist.id ? classes.selected : null
              }`}
              key={playlist.id}
            >
              <Card
                link={`/playlists/${playlist.id}`}
                img={playlist.images.length ? playlist.images[0].url : null}
                header={
                  playlist.name.length > 20
                    ? `${playlist.name.substring(0, 20)}...`
                    : playlist.name
                }
                onClickWhole={() => {
                  handleCardClick(playlist.id);
                }}
              />
            </li>
          );
        } else if (newPlaylist) {
          if (playlist.id === newPlaylist) {
            return (
              <li className={classes.card}>
                <Card
                  link={`/playlists/${playlist.id}`}
                  img={playlist.images.length ? playlist.images[0].url : null}
                  header={
                    playlist.name.length > 20
                      ? `${playlist.name.substring(0, 20)}...`
                      : playlist.name
                  }
                />
              </li>
            );
          }
        }
      }
    });
  };

  return (
    <>
      <Head>
        <title>Playlists</title>
        <meta name="description" content="Your Playlists" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Navbar />
          {fillForm && (
            <form
              className={`${classes.copyForm}`}
              onSubmit={copySubmitHandler}
            >
              <fieldset className={classes.copyFieldset}>
                <div class={`form-check ${classes.radio}`}>
                  <input
                    onClick={() => {
                      setCopyType("new");
                    }}
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    Create New Playlist
                  </label>
                </div>
                <div class="form-check">
                  <input
                    onClick={() => {
                      setCopyType("existing");
                    }}
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Use Existing Playlist
                  </label>
                </div>
              </fieldset>
              {copyType === "new" && (
                <>
                  <label htmlFor="name">New Playlist name</label>
                  <input ref={newNameRef} id="name" type="text" />
                </>
              )}
              {copyType === "existing" && (
                <>
                  <ul className={`${classes.list}`}>
                    {renderPlaylists("user")}
                  </ul>
                </>
              )}
              <div className={classes.copyBtnsDiv}>
                <button
                  className={classes.cancelBtn}
                  onClick={cancelCopyHandler}
                >
                  Cancel
                </button>
                {copyType === "new" ||
                  (copyType === "existing" && newPlaylist && (
                    <button
                      className={classes.copySubmitBtn}
                      value={[existingPlaylist, newPlaylist]}
                      onClick={copySubmitHandler}
                    >
                      Submit
                    </button>
                  ))}
              </div>
            </form>
          )}
          {!fillForm && (
            <div className={`${classes.content}`}>
              <h1>User Playlists</h1>
              <ul className={`${classes.list}`}>{renderPlaylists("all")}</ul>
            </div>
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default playlists;
