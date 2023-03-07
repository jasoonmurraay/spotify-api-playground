import { useState } from "react";
import axios from "axios";
import ErrorMsg from "./ErrorMsg";
import getArtists from "@/pages/api/getArtists";
import scrollArtists from "@/pages/api/scrollArtists";
import classes from './ArtistSearch.module.css'
import Link from "next/link";

const ArtistSearch = (props) => {
  const token = props.token;
  const [artists, setArtists] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [offset, setOffset] = useState();
  const [error, setError] = useState(false);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  let searchUrl = "https://api.spotify.com/v1/search";

  const searchArtists = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const data = await getArtists(searchUrl, searchKey, token);
    console.log("Return: ", data);
    if (data.message) {
      setError(data);
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
        <div key={artist.id} className="col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center">
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
              <Link  href={`/artists/${artist.id}`}  >
                {artist.name}
              </Link>
            </h3>
          </div>
        </div>
      );
    });
  };

  const nextHandler = async (e) => {
    e.preventDefault();
    const data = await scrollArtists({
      url: next,
      token: token,
    });
    if (data.message) {
      setError(data);
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

  const prevHandler = async (e) => {
    e.preventDefault();
    const data = await scrollArtists({
      url: prev,
      token: token,
    });
    if (data.message) {
      setError(data);
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

  return (
    <>
      {error && <ErrorMsg error={error}></ErrorMsg>}
      {!error && (
        <>
          <h1>Search for Artists on Spotify</h1>
          <form onSubmit={searchArtists}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type="submit" className="btn btn-success">
              Search
            </button>
          </form>
          {offset > 0 && (
            <button className="btn btn-warning" onClick={prevHandler}>
              Previous
            </button>
          )}
          {artists.length && (
            <button className="btn btn-success" onClick={nextHandler}>
              Next
            </button>
          )}
          <div className="d-flex flex-wrap">{renderArtists()}</div>
          {offset > 0 && (
            <button className="btn btn-warning" onClick={prevHandler}>
              Previous
            </button>
          )}
          {artists.length && (
            <button className="btn btn-success" onClick={nextHandler}>
              Next
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ArtistSearch;
