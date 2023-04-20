import classes from '../../styles/ProfilePage.module.css'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContext, useState, useEffect } from 'react';
import { SpotifyContext } from '@/context/spotifyContext';
import getProfile from '../api/getProfile';
import Link from 'next/link';
import Loading from '@/components/Loading';

const profile = () => {
  const { spotifyTokenState, updateSpotifyToken, updateId } =
    useContext(SpotifyContext);
  console.log("Context: ", spotifyTokenState);
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  
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
      setData(data.data)
      console.log("Data ", data.data);
      if (data.id !== spotifyTokenState.id) {
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
    setIsLoading(false)
  }, []);
  console.log("Data: ", data)
  return (
    <>
      <Navbar />
      {!isLoading && data ? (
        <>
          <div className={`${classes.content}`}>
            <div
              className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}
            >
              <a>
                <h1 className="card-title">{data.display_name}</h1>
              </a>
              {data.images.length && (
                <img
                  className={`${classes.img} card-img`}
                  src={data.images[0].url}
                  alt=""
                />
              )}
              <p>
                {data.followers.total} {data.followers.total === 1 ? "follower" : "followers"}
              </p>
              <p>{data.country}</p>
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
      ) : <Loading />}
      <Footer />
    </>
  );
};

export default profile;
