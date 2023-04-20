import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import getProfileDataType from "../api/getProfileDataType";
import { SpotifyContext } from "@/context/spotifyContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import classes from '../../styles/UserArtists.module.css'

const artists = () => {
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
        <li key={artist.id}>
          <div
            className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}
          >
            <Link className={`${classes.link}`} href={`/artists/${artist.id}`}>
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
            </Link>
          </div>
        </li>
      );
    });
  };
  return (
    <>
      <Navbar />
      <div className={`${classes.content}`}>
        <Link href={"/profile"}>
          <button className={`${classes.profileButton}`}>
            Back to profile
          </button>
        </Link>
        <h1>Top Artists</h1>
        <ul className={`${classes.list}`}>{renderArtists()}</ul>
        <Link href={"/profile"}>
          <button className={`${classes.profileButton}`}>
            Back to profile
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default artists;
