import Link from "next/link";
import { useState } from "react";

const Navbar = (props) => {
    const clientId = "acd3854010f7468690e7ff12c6b5a2b3";
  const redirectUri = "http://localhost:3000";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  const [loggedIn, isLoggedIn] = useState(props.isLoggedIn);
  console.log("loggedIn: ", loggedIn)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a href="/">Spotify App</a>
      {loggedIn && (
        <ul>
          <li>
            <Link href="/playlists">Playlists</Link>
          </li>
          <li>
            <Link href="/artists">Artists</Link>
          </li>
        </ul>
      )}
      {!loggedIn && (
        <ul>
          <li>
            <a
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`}
            >
              Login to Spotify
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
