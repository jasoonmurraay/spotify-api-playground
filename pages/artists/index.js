import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Navbar from "@/components/Navbar";
import ArtistSearch from "@/components/ArtistSearch";
import getAccessToken from "../api/getAccessToken";
import Footer from "@/components/Footer";

const artists = () => {
  const [token, setToken] = useState("");
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function retrieveToken() {
      return await getAccessToken();
    }
    retrieveToken().then((response) => {
      console.log("Access token: ", response);
      setToken(response.data.access_token);
    });
    console.log("Token: ", token);
    console.log("Logged In: ", loggedIn);
  }, []);

  return (
    <>
      <Navbar />
      {token ? (
        <ArtistSearch token={token}></ArtistSearch>
      ) : (
        <h2>Please Login</h2>
      )}
      <Footer />
    </>
  );
};

export default artists;
