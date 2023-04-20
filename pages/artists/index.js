import { useState, useContext } from "react";
import { SpotifyContext } from "@/context/spotifyContext";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import getArtists from "../api/getArtists";
import scrollArtists from "../api/scrollArtists";
import classes from "../../styles/ArtistSearch.module.css";
import Link from "next/link";

const artists = () => {
  const { spotifyTokenState } = useContext(SpotifyContext);
  const [artists, setArtists] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [offset, setOffset] = useState();
  const [error, setError] = useState(false);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  const searchArtists = async (event) => {
    event.preventDefault();
    let value = event.target.name;
    console.log("Value: ", value)
    let url, searchText;
    if (value === "search") {
      url = "https://api.spotify.com/v1/search";
      searchText = searchKey
    } else {
      value === "next" ? (url = next) : (url = prev);
      searchText = ''
    }
    console.log("URL: ", url)
    const data = await getArtists(
      url,
      searchText,
      spotifyTokenState.token,
      spotifyTokenState.expirationTime
    );
    console.log("Return: ", data);
    if (data.error) {
      setError(data.error);
      console.log("Return: ", data);
      return;
    } else {
      setArtists(data.artists.items);
      setOffset(data.artists.offset);
      setNext(data.artists.next);
      setPrev(data.artists.previous);
      console.log(data);
    }
  };
  const renderArtists = () => {
    return artists.map((artist) => {
      return (
        <div
          key={artist.id}
          className="col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center"
        >
          <div className={`${classes.card} card w-5 h-20 align-items-center `}>
            {artist.images.length ? (
              <img
                className={`${classes.img} card-img top`}
                src={artist.images[0].url}
              ></img>
            ) : (
              <div>No Image Available</div>
            )}
            <h3 className="card-title">
              <Link href={`/artists/${artist.id}`}>{artist.name}</Link>
            </h3>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Navbar />
      <h1>Search for Artists on Spotify</h1>
      <form name="search" onSubmit={searchArtists}>
        <input name='search' type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button name="search" type="submit" className="btn btn-success">
          Search
        </button>
      </form>
      {offset > 0 && (
        <button
          name="prev"
          className="btn btn-warning"
          onClick={searchArtists}
        >
          Previous
        </button>
      )}
      {artists.length && (
        <button
          name="next"
          className="btn btn-success"
          onClick={searchArtists}
        >
          Next
        </button>
      )}
      <div className="d-flex flex-wrap">{renderArtists()}</div>
      {offset > 0 && (
        <button
          name="prev"
          className="btn btn-warning"
          onClick={searchArtists}
        >
          Previous
        </button>
      )}
      {artists.length && (
        <button
          name="next"
          className="btn btn-success"
          onClick={searchArtists}
        >
          Next
        </button>
      )}
      <Footer />
    </>
  );
};

export default artists;
