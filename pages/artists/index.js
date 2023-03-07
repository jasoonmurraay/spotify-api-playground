import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Navbar from "@/components/Navbar";
import ArtistSearch from "@/components/ArtistSearch";

const artists = () => {
  const [token, setToken] = useState("");
  const [loggedIn, setIsLoggedIn] = useState(true)
  useEffect(() => {
    const hash = window.location.hash;
    console.log("hash: ", hash);
    let token = window.localStorage.getItem("token");
    console.log("Token; ", token);
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
    
  }, []);

 
  return (
    <>
      <Navbar isLoggedIn={loggedIn}></Navbar>
      {token ? (
        <ArtistSearch token={token}></ArtistSearch>
      ) : <h2>Please Login</h2>}
      
    </>
  );
};

export default artists;
