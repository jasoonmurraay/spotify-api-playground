import ArtistPage from "@/components/ArtistPage";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Artist = () => {
  const router = useRouter();
  const { ArtistId } = router.query;
  const [token, setToken] = useState("");
  const [loggedIn, setIsLoggedIn] = useState(true)
 
  return <>
  <Navbar isLoggedIn={loggedIn}></Navbar>
  <ArtistPage id={ArtistId}></ArtistPage>
  </>;
};

export default Artist;
