import TopTracks from "@/components/TopTracks";
import { useState, useEffect, useContext } from "react";
import getProfileDataType from "../api/getProfileDataType";
import { SpotifyContext } from "@/context/spotifyContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

const toptracks = () => {
  const { spotifyTokenState, updateSpotifyToken, updateId } =
    useContext(SpotifyContext);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getTracks() {
      return await getProfileDataType(
        "tracks",
        spotifyTokenState.token,
        spotifyTokenState.isTokenValid
      );
    }
    getTracks().then((data) => {
      console.log("Track data: ", data);
      setTracks(data.data.items);
      if (data.token !== spotifyTokenState.token) {
        updateSpotifyToken(data.token, 3600);
      }
    });
    setLoading(false);
  }, []);
  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && <TopTracks tracks={tracks} />}

      <Footer />
    </>
  );
};
export default toptracks;
