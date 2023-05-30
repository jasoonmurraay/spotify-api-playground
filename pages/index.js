import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import login from "./api/login";
import getAccessToken from "./api/getAccessToken";
import AppContext from "@/context/spotifyContext";
import Footer from "@/components/Footer";
import classes from "../styles/Index.module.css";

export default function Home() {
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getToken() {
      return await getAccessToken();
    }
    getToken().then((response) => {
      setToken(response.data.access_token);
      console.log("token: ", response.data.access_token);
      setLoggedIn(true);
      window.localStorage.setItem("token", response.data.access_token);
    });
  }, []);
  const logoutHandler = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = "http://localhost:3000";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  return (
    <>
      <Head>
        <title>Spotify React </title>
        <meta
          name="description"
          content="A React Application for accessing and modifying Spotify Content"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={loggedIn} />
      <main className={classes.mainBody}>
        <h1>Spotify React</h1>
        {!token ? (
          <button className="btn btn-primary">
            <a
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
            >
              Login to Spotify
            </a>
          </button>
        ) : (
          <button className={classes.logoutBtn} onClick={logoutHandler}>
            Logout
          </button>
        )}{" "}
        {token && (
          <Link className={classes.searchArtistBtn} href="/artists">
            Search Artists
          </Link>
        )}
      </main>
      <Footer />
    </>
  );
}
