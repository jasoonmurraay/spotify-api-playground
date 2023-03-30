import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { SpotifyContext } from "@/context/spotifyContext";

const Navbar = (props) => {
  const { spotifyTokenState, updateSpotifyToken, updateId } = useContext(SpotifyContext)
  const [loggedIn, isLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn(spotifyTokenState.token ? true : false)
  }, [])
  console.log("loggedIn: ", loggedIn)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Spotify App</a>
        {loggedIn && (
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/profile">Profile</Link>
            </li>
          </ul>
        )}
        {!loggedIn && (
          <ul>
            <li>
              <a>
                Login to Spotify
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
