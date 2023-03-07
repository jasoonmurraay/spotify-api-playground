import ArtistPage from "@/components/ArtistPage";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Artist = () => {
  const router = useRouter();
  const { ArtistId } = router.query;
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
  return <ArtistPage token={token} id={ArtistId}></ArtistPage>;
};

export default Artist;
