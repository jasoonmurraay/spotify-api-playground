import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

const playlists = () => {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    console.log("hash: ", hash);
    let token = window.localStorage.getItem("token");
    console.log("Token (playlists); ", token);
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
  });
  const searchPlaylists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "playlist",
      },
    });
    setPlaylists(data.playlists.items);
    console.log(data);
  };
  const renderplaylists = () => {
    return playlists.map((playlist) => {
      return (
        <div key={playlist.id} className='d-flex flex-column align-items-center justify-content-center' >
          <div className="card w-5">
            {playlist.images.length ? (
              <img
                className="w-5 card-img-top"
                src={playlist.images[0].url}
              ></img>
            ) : (
              <div>No Image Available</div>
            )}
            <h3 className="card-title">
              <a href={`https://open.spotify.com/playlist/${playlist.id}`}>
                {playlist.name}
              </a>
            </h3>
            <p className="card-body">
              Playlist by <span> </span>
              <a href={`https://open.spotify.com/user/${playlist.owner.id}`}>{playlist.owner.display_name}</a>
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {token ? (
        <>
          <h1>Search for Playlists on Spotify</h1>
          <form onSubmit={searchPlaylists}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type="submit" className="btn btn-success">
              Search
            </button>
          </form>
        </>
      ) : (
        <h2>Please login</h2>
      )}
      {renderplaylists()}
    </div>
  );
};

export default playlists;
