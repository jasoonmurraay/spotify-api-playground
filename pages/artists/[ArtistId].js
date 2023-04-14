import ArtistPage from "@/components/ArtistPage";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useContext } from "react";
import { SpotifyContext } from "@/context/spotifyContext";
import { useRouter } from "next/router";
import getOneArtist from "../api/getOneArtist";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";

const Artist = () => {
  const router = useRouter();
  const { ArtistId } = router.query;
  console.log("Artist ID: ", ArtistId);
  const { spotifyTokenState, updateSpotifyTokenState } =
    useContext(SpotifyContext);
  const [isPending, setIsPending] = useState(true);
  const [artistName, setArtistName] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [genres, setGenres] = useState([]);
  const [images, setImages] = useState([]);
  const [popularity, setPopularity] = useState(null);
  const [error, setError] = useState(null);
  const url = `https://api.spotify.com/v1/artists/${ArtistId}`;

  function setCommas(number) {
    console.log("Followers: ", number);
    let numStr = number.toString().split("");
    for (let i = numStr.length - 3; i > 0; i -= 3) {
      numStr.splice(i, 0, ",");
    }
    return numStr.join("");
  }
  useEffect(() => {
    if (!ArtistId) {
      return;
    }
    renderArtist();
  }, [ArtistId]);

  async function renderArtist() {
    async function fetchData() {
      console.log("URL: ", url);
      return await getOneArtist(
        url,
        spotifyTokenState.token,
        spotifyTokenState.isTokenValid
      );
    }
    return fetchData().then((data) => {
      console.log("Data: ", data);
      setArtistName(data.name);
      setFollowers(setCommas(data.followers.total));
      setGenres(data.genres);
      setImages(data.images);
      setPopularity(data.popularity);
      setIsPending(false);
    });
  }

  return (
    <>
      <Navbar />
      {isPending && <Loading></Loading>}
      {!isPending && (
        <ArtistPage
          artistName={artistName}
          followers={followers}
          genres={genres}
          images={images}
          popularity={popularity}
        ></ArtistPage>
      )}
      <Footer />
    </>
  );
};

export default Artist;
