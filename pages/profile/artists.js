import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import getProfileDataType from "../api/getProfileDataType";
import { SpotifyContext } from "@/context/spotifyContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import classes from "../../styles/UserArtists.module.css";

const artists = () => {
  const router = useRouter();
  const { spotifyTokenState, updateSpotifyToken } = useContext(SpotifyContext);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const retrieveArtists = async () => {
      return await getProfileDataType(
        "artists",
        spotifyTokenState.token,
        spotifyTokenState.isTokenValid
      );
    };
    retrieveArtists().then((data) => {
      console.log("Artist data: ", data);
      setArtists(data.data.items);
      if (data.token !== spotifyTokenState.token) {
        updateSpotifyToken(data.token, 3600);
      }
    });
  }, []);

  const renderArtists = () => {
    return artists.map((artist) => {
      return (
        <li
          key={artist.id}
          onClick={() => redirectHandler(`artists/${artist.id}`)}
        >
          <div
            className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}
          >
            {artist.images.length ? (
              <img
                className={`${classes.img} card-img`}
                src={artist.images[0].url}
                alt={`Image of ${artist.name}`}
              />
            ) : (
              <></>
            )}

            <h2 className={`${classes.artistName} card-title`}>
              {artist.name}
            </h2>
          </div>
        </li>
      );
    });
  };

  const profileBtn = (
    <button
      onClick={() => redirectHandler("profile")}
      className={`${classes.profileButton}`}
    >
      Back to profile
    </button>
  );

  const redirectHandler = (path) => {
    router.push(`/${path}`);
  };
  return (
    <>
      <Head>
        <title>Top Artists</title>
        <meta name="description" content="Your Top Artists" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={`${classes.content}`}>
        <h1>Top Artists</h1>
        {profileBtn}
        <ul className={`${classes.list}`}>{renderArtists()}</ul>
        {profileBtn}
      </div>
      <Footer />
    </>
  );
};

export default artists;
