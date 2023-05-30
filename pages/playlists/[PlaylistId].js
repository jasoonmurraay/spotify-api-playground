import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import getPlaylist from "../api/getPlaylist";
import { SpotifyContext } from "@/context/spotifyContext";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import modifyPlaylist from "../api/modifyPlaylist";
import classes from "../../styles/PlaylistId.module.css";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

const playlistId = () => {
  const [images, setImages] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [owner, setOwner] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { PlaylistId } = router.query;
  const { spotifyTokenState, updateSpotifyTokenState } =
    useContext(SpotifyContext);
  function setCommas(number) {
    let numStr = number.toString().split("");
    for (let i = numStr.length - 3; i > 0; i -= 3) {
      numStr.splice(i, 0, ",");
    }
    return numStr.join("");
  }
  useEffect(() => {
    if (!PlaylistId) {
      return;
    }
    renderPlaylist();
  }, [PlaylistId]);
  const renderPlaylist = async () => {
    async function fetchData() {
      return await getPlaylist(
        PlaylistId,
        spotifyTokenState.token,
        spotifyTokenState.expirationTime
      );
    }
    return fetchData().then((data) => {
      console.log("PlaylistData: ", data);
      setOwner(data.owner);
      setFollowers(setCommas(data.followers.total));
      setTracks(data.tracks.items);
      setImages(data.images);
      setName(data.name);
      setLoading(false);
    });
  };

  const renderTracks = () => {
    return tracks.map((track) => {
      return (
        <li className={classes.track} key={track.track.id}>
          <h2 className={classes.trackTitle}>{track.track.name}</h2>
          <ul className={classes.artistList}>
            {track.track.artists.map((artist) => {
              return (
                <li className={classes.artistList}>
                  <Link
                    className={classes.artistLink}
                    href={`/artists/${artist.id}`}
                  >
                    {artist.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      );
    });
  };

  const reorderHandler = async () => {
    return await modifyPlaylist(
      PlaylistId,
      spotifyTokenState.token,
      spotifyTokenState.expirationTime
    );
  };

  console.log("Owner: ", owner);

  return (
    <>
      <Navbar />
      {!loading && (
        <div className={classes.content}>
          <div className={classes.card}>
            <h1 className="">{name}</h1>
            {images.length && (
              <img className={classes.img} src={images[0].url} />
            )}
            <div className={classes.cardBody}>
              <p>{`Created by ${owner.display_name}`}</p>
              <p className="">{`${followers} ${
                followers === 1 ? "follower" : "followers"
              }`}</p>
              <p className={classes.playlistLength}>{`${tracks.length} ${
                tracks.length === 1 ? "song" : "songs"
              }`}</p>
              {owner && owner.id === spotifyTokenState.id && (
                <button
                  className={classes.reorderButton}
                  onClick={reorderHandler}
                >
                  Re-order playlist
                </button>
              )}
              <ol className={classes.trackList}>{renderTracks()}</ol>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div>
          <Loading />
        </div>
      )}

      <Footer />
    </>
  );
};

export default playlistId;
