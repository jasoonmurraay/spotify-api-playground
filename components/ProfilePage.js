import getProfile from "@/pages/api/getProfile";
import { useState, useEffect } from "react";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import ButtonComponent from "./ButtonComponent";
import getProfileDataType from "@/pages/api/getProfileDataType";
import getGenres from "@/pages/api/getGenres";
import Link from "next/link";
import getUserPlaylists from "@/pages/api/getUserPlaylists";
import classes from "./ProfilePage.module.css";
import modifyPlaylist from "@/pages/api/modifyPlaylist";
import getSeveralArtistsTopTracks from "@/pages/api/getSeveralArtistsTopTracks";

const ProfilePage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState(null);
  const [images, setImages] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [link, setLink] = useState("");
  const [country, setCountry] = useState("");
  const [fetchType, setFetchType] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      return await getProfile();
    }
    fetchData().then((data) => {
      console.log("Profile Items: ", data);
      setDisplayName(data.display_name);
      setImages(data.images);
      setFollowers(data.followers.total);
      setLink(data.href);
      setCountry(data.country);
      setIsLoading(false);
      setUserId(data.id);
      console.log("ID: ", data.id);
    });
  }, []);

  useDidMountEffect(() => {
    if (fetchType === "playlists") {
      async function fetchPlaylists() {
        return await getUserPlaylists(userId, true);
      }
      fetchPlaylists().then((data) => {
        setPlaylists(data);
        console.log("Playlists: ", data);
        setIsLoading(false);
      });
    } else if (fetchType === "genres") {
      async function fetchGenres() {
        return await getGenres();
      }
      fetchGenres().then((data) => {
        console.log("Fetched data type: ", data);
        // setGenres(data.slice(0, 10));
        setIsLoading(false);
      });
    } else {
      async function getType() {
        return await getProfileDataType(fetchType);
      }
      getType().then((data) => {
        console.log("fetched data type: ", data);
        if (fetchType === "tracks") {
          setTracks(data.items);
          setIsLoading(false);
        } else {
          setArtists(data.items);
          setIsLoading(false);
        }
      });
    }
  }, [fetchType]);
  const fetchHandler = (value) => {
    if (value.includes("Tracks")) {
      setFetchType("tracks");
      setIsLoading(true);
    } else if (value.includes("Playlists")) {
      setFetchType("playlists");
      setIsLoading(true);
    } else if (value.includes("Artists")) {
      setFetchType("artists");
      setIsLoading(true);
    } else if (value.includes("Genres")) {
      setFetchType("genres");
      setIsLoading(true);
    }
  };

  const reorderHandler = (id) => {
    const reorderPlaylist = async (id) => {
      return await props.modify(id)
    }
    reorderPlaylist(id).then((data) => {
      console.log("Reorder data: ", data)
    })
  }

  const renderTracks = () => {
    return tracks.map((track) => {
      return (
        <div className="card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center">
          <li key={track.id}>
            <img className="card-img" src={track.album.images[0].url} alt="" />
            <h2 className="card-title">{track.name}</h2>
            <div>
              {track.artists.length === 1 ? "Artist: " : "Artists: "}{" "}
              <ul>
                {track.artists.map((artist) => {
                  return (
                    <a key={artist.id} href={artist.external_urls.spotify}>
                      <li>{artist.name}</li>
                    </a>
                  );
                })}
              </ul>
            </div>
          </li>
        </div>
      );
    });
  };
  const renderArtists = () => {
    return artists.map((artist) => {
      return (
        <div
          className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}
        >
          <li key={artist.id}>
            {artist.images.length ? (
              <img
                className={`${classes.img} card-img`}
                src={artist.images[0].url}
                alt=""
              />
            ) : (
              <></>
            )}
            <a href={artist.external_urls.spotify}>
              <h2 className="card-title">{artist.name}</h2>
            </a>

          </li>
        </div>
      );
    });
  };
  const renderGenres = () => {
    return genres.map((genre) => {
      return <li key={genre[0]}>{genre[0]}</li>;
    });
  };
  const renderPlaylists = () => {
    return playlists.items.map((playlist) => {
      return (
        <div
          className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}
        >
          <li key={playlist.id}>
            <img
              className={`${classes.img} card-img`}
              src={playlist.images[0].url}
              alt=""
            />
            <a href={playlist.external_urls.spotify}>
              <h2 className="card-title">{playlist.name}</h2>
            </a>
            <ButtonComponent id={playlist.id} onClick={reorderHandler} text='Re-order playlist' />
          </li>
        </div>
      );
    });
  };
  const generatePlaylist = async (e) => {
    e.preventDefault()
    await getSeveralArtistsTopTracks(artists, country, userId)
  }
  return (
    <>
      {!fetchType && !isLoading && (
        <>
          <div className="card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center">
            <a href={link}>
              <h1 className="card-title">{displayName}</h1>
            </a>
            {images.length && <img className="card-img" src={images[0].url} alt="" />}
            <p>
              {followers} {followers === 1 ? "follower" : "followers"}
            </p>
            <p>{country}</p>
          </div>
        </>
      )}
      {fetchType === "tracks" && !isLoading && (
        <>
          <h1>Top Tracks</h1>
          <ol>{renderTracks()}</ol>
        </>
      )}
      {fetchType === "artists" && !isLoading && (
        <>
          <h1>Top Artists</h1>
          <button type='button' onClick={generatePlaylist} className="btn btn-primary">Generate Playlist</button>
          <ol>{renderArtists()}</ol>
        </>
      )}
      {fetchType === "genres" && !isLoading && (
        <>
          <h1>Top Genres</h1>
          <ol>{renderGenres()}</ol>
        </>
      )}
      {fetchType === "playlists" && !isLoading && (
        <>
          <h1>Playlists</h1>
          <ul>{renderPlaylists()}</ul>
        </>
      )}
      {fetchType !== "tracks" && !isLoading && (
        <ButtonComponent onClick={fetchHandler} text="Get top Tracks" />
      )}
      {fetchType !== "artists" && !isLoading && (
        <ButtonComponent onClick={fetchHandler} text="Get top Artists" />
      )}
      {fetchType !== "genres" && !isLoading && (
        <ButtonComponent onClick={fetchHandler} text="Get top Genres" />
      )}
      {fetchType !== "playlists" && !isLoading && (
        <ButtonComponent
          onClick={fetchHandler}
          text="Get user Playlists"
        ></ButtonComponent>
      )}
    </>
  );
};

export default ProfilePage;
