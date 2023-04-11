import getProfile from "@/pages/api/getProfile";
import { useState, useEffect, useContext } from "react";
import React from "react";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import ButtonComponent from "./ButtonComponent";
import getProfileDataType from "@/pages/api/getProfileDataType";
import getGenres from "@/pages/api/getGenres";
import Link from "next/link";
import getUserPlaylists from "@/pages/api/getUserPlaylists";
import classes from "./ProfilePage.module.css";
import modifyPlaylist from "@/pages/api/modifyPlaylist";
import getSeveralArtistsTopTracks from "@/pages/api/getSeveralArtistsTopTracks";
import { SpotifyContext } from "@/context/spotifyContext";

const ProfilePage = React.memo((props) => {
  const { spotifyTokenState, updateSpotifyToken, updateId } =
    useContext(SpotifyContext);
  console.log("Context: ", spotifyTokenState);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState(null);
  const [images, setImages] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [link, setLink] = useState("");
  const [country, setCountry] = useState("");
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      return await getProfile(
        spotifyTokenState.token,
        spotifyTokenState.isTokenValid
      );
    }
    fetchData().then((data) => {
      console.log("Profile Items: ", data);
      setDisplayName(data.data.display_name);
      setImages(data.data.images);
      setFollowers(data.data.followers.total);
      setLink(data.data.href);
      setCountry(data.data.country);
      setIsLoading(false);
      setUserId(data.data.id);
      console.log("ID: ", data.data.id);
      if (userId !== spotifyTokenState.id) {
        console.log("Updating user Id context!");
        updateId(data.data.id);
      }
      if (data.token !== spotifyTokenState.token) {
        console.log(
          "not equal: ",
          "New Token: ",
          data.token,
          "\n",
          "Old Token: ",
          spotifyTokenState.token
        );
        updateSpotifyToken(data.token, data.expires_in);
      }
    });
  }, []);
  console.log("Id: ", userId);

  return (
    <>
      {!isLoading && (
        <>
          <div className={`${classes.content}`}>
            <div
              className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}
            >
              <a href={link}>
                <h1 className="card-title">{displayName}</h1>
              </a>
              {images.length && (
                <img
                  className={`${classes.img} card-img`}
                  src={images[0].url}
                  alt=""
                />
              )}
              <p>
                {followers} {followers === 1 ? "follower" : "followers"}
              </p>
              <p>{country}</p>
            </div>
            <div className={`${classes.buttons}`}>
              <Link href={"/profile/toptracks"}>
                <button className={`${classes.buttonLink}`}>
                  Get Top Tracks
                </button>
              </Link>
              <Link href={"/profile/artists"}>
                <button className={`${classes.buttonLink}`}>
                  Get Top Artists
                </button>
              </Link>
              <Link href={"/profile/genres"}>
                <button className={`${classes.buttonLink}`}>
                  Get Top Genres
                </button>
              </Link>
              <Link href={"/profile/playlists"}>
                <button className={`${classes.buttonLink}`}>
                  Get Playlists
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
});

export default ProfilePage;
