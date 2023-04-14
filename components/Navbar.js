import Link from "next/link";
import { useEffect, useState, useContext, useCallback, useRef } from "react";
import { SpotifyContext } from "@/context/spotifyContext";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const { spotifyTokenState, updateSpotifyToken, updateId } =
    useContext(SpotifyContext);
  const [loggedIn, isLoggedIn] = useState();
  const [showLinks, setShowLinks] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  useEffect(() => {
    isLoggedIn(spotifyTokenState.token ? true : false);
  }, [spotifyTokenState]);
  useEffect(() => {
    if (windowSize.width > 1000 && showBurger) {
      setShowBurger(false);
    } else if (windowSize.width <= 1000 && !showBurger) {
      setShowBurger(true);
    }
  }, [windowSize]);

  const handleResize = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <nav
      className={`${classes.navBody} navbar navbar-expand-lg navbar-light bg-light`}
    >
      <div className={`${classes.container} container-fluid`}>
        <a className={`${classes.brand} navbar-brand`} href="/">
          Spotify App
        </a>
        {loggedIn && (
          <div className={`${classes.linkMenu}`}>
            {showBurger && (
              <button
                className={`${classes.hamburger}`}
                onClick={() => setShowLinks(!showLinks)}
              >
                <img
                  className={`${classes.burgerIcon}`}
                  src={showLinks ? "/Hamburger-rotated.png" : "/Hamburger.png"}
                />
              </button>
            )}
            {(showLinks || !showBurger) && (
              <>
                <ul
                  className={`${classes.linkUl} navbar-nav me-auto mb-2 mb-lg-0`}
                >
                  <li className={`${classes.linkLi} nav-item`}>
                    <Link
                      className={`${classes.link} nav-link`}
                      href="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className={`${classes.linkLi}`}>
                    <Link
                      className={`${classes.link} nav-link`}
                      href="/artists"
                    >
                      Search Artists
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        )}
        {!loggedIn && (
          <ul>
            <li>
              <a>Login to Spotify</a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
