import { useState, useContext, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { SpotifyContext } from "@/context/spotifyContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import getArtists from "../api/getArtists";
import classes from "../../styles/ArtistSearch.module.css";
import Card from "@/components/Card";

const Artists = () => {
  const { spotifyTokenState, updateSpotifyToken } = useContext(SpotifyContext);
  const [searchKey, setSearchKey] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const router = useRouter();
  const mainUrl = "https://api.spotify.com/v1/search";

  useEffect(() => {
    if (router.query.searchKey) {
      const getInitArtists = async () => {
        const fetchData = await getArtists(
          mainUrl,
          router.query.searchKey,
          spotifyTokenState.token,
          spotifyTokenState.expirationTime,
          router.query.offset
        );
        setData(fetchData.data.artists);
        setSearchKey(router.query.searchKey);
      };
      getInitArtists();
    }
  }, [router.query]);

  const searchArtists = async (event) => {
    event.preventDefault();
    let value = event.target.name;
    let url, searchText;
    if (value === "search") {
      searchText = searchKey;
      url = mainUrl;
    } else {
      value === "next" ? (url = data.next) : (url = data.previous);
      searchText = "";
    }
    const fetchData = await getArtists(
      url,
      searchText,
      spotifyTokenState.token,
      spotifyTokenState.expirationTime,
      null
    );
    console.log("Return: ", fetchData);
    if (fetchData.error) {
      setError(fetchData.error);
      return;
    } else {
      console.log("fetchData: ", fetchData);
      setData(fetchData.data.artists);
      router.query.searchKey = searchKey;
      router.query.offset = fetchData.data.artists.offset;
      router.push(router);
      if (fetchData.token !== spotifyTokenState.token) {
        updateSpotifyToken(fetchData.token, 3600);
      }
    }
  };
  const renderArtists = () => {
    if (data) {
      return data.items.map((artist) => {
        return (
          <li key={artist.id} className={classes.artistCard}>
            <Card
              link={`/artists/${artist.id}`}
              img={artist.images.length ? artist.images[0].url : ""}
              header={artist.name}
            />
          </li>
        );
      });
    }
  };

  const scrollBtn = (name) => {
    if (data) {
      return (
        (name === "next" ? data.next : data.previous) && (
          <button
            name={name}
            className={name === "next" ? classes.nextBtn : classes.prevBtn}
            onClick={searchArtists}
          >
            {name === "next" ? "Next" : "Previous"}
          </button>
        )
      );
    }
  };
  return (
    <div className={classes.wholePage}>
      <Navbar />
      <main className={classes.body}>
        <h1>Search for Artists on Spotify</h1>
        <form name="search" onSubmit={searchArtists}>
          <input
            className={classes.searchBar}
            name="search"
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search for artists..."
          />
          <button name="search" type="submit" className={classes.searchBtn}>
            Search
          </button>
        </form>
        <div className={classes.btnDiv}>
          {scrollBtn("prev")}
          {scrollBtn("next")}
        </div>
        <ul className={classes.artistList}>{renderArtists()}</ul>
        <div className={classes.btnDiv}>
          {scrollBtn("prev")}
          {scrollBtn("next")}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Artists;
