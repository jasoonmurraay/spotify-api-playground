import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import login from "./api/login";
import dotenv from "dotenv";
import getAccessToken from "./api/getAccessToken";
import AppContext from "@/context/loggedIn";

dotenv.config();

export default function Home() {
  const context = useContext(AppContext)
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  // const loginHandler = () => {
  //     login()
  // }

  useEffect(() => {
    async function getToken() {
      return await getAccessToken()
    }
    getToken().then(response => {
      setToken(response.data.access_token)
      console.log("token: ", response.data.access_token)
      setLoggedIn(true)
    })
      ;
  }, []);
  const logoutHandler = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("token");
  };

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = "http://localhost:3000";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  return (
    <>
      <Head>
        <title>Spotify React </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLoggedIn={loggedIn}></Navbar>
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
        <button className="btn btn-warning" onClick={logoutHandler}>
          Logout
        </button>
      )}{" "}
      {token && (
        <button className="btn btn-success">
          <Link href="/artists">Search Artists</Link>
        </button>
      )}
    </>
  );
}
