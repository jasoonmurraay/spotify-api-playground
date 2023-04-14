import Link from "next/link";
import classes from "./TopTracks.module.css";
import Navbar from "./Navbar";
import { useEffect, useRef, useState, useMemo } from "react";
import Loading from "./Loading";

const TopTracks = (props) => {
  const tracks = props.tracks;
  const listRefs = useRef([]);
  const [isVisible, setIsVisible] = useState([]);
  useEffect(() => {
    setIsVisible(Array(tracks.length).fill(false));
  }, [tracks]);
  useEffect(() => {
    const observers = listRefs.current.map((ref, index) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prevState) => {
                const newState = [...prevState];
                newState[index] = true;
                return newState;
              });
            }
          });
        },
        { threshold: 0.5 }
      );
    });
    observers.forEach((observer, index) => {
      observer.observe(listRefs.current[index]);
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isVisible]);

  const renderTracks = () => {
    return tracks.map((track, index) => {
      return (
        <li
          ref={(item) => (listRefs.current[index] = item)}
          key={track.id}
          className={`${isVisible[index] ? classes.card : classes.invisible}`}
        >
          <div className={`${classes.cardBody}`}>
            <img
              className={`${classes.img} card-img`}
              src={track.album.images[0].url}
              alt=""
            />
            <div className={`${classes.cardText}`}>
              <h2 className={`${classes.trackName} card-title`}>
                {track.name}
              </h2>
              <div className={`${classes.artistDiv}`}>
                {track.artists.length === 1 ? "Artist: " : "Artists: "}{" "}
                <ul className={`${classes.artistUl}`}>
                  {track.artists.map((artist) => {
                    return (
                      <Link
                        className={`${classes.artists}`}
                        key={artist.id}
                        href={`/artists/${artist.id}`}
                      >
                        <li className={`${classes.artistName}`}>
                          {artist.name}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };
  return (
    <>
      <div
        className={`${classes.content} d-flex align-items-center justify-content-center`}
      >
        <h1
          className={`${classes.header} d-flex align-items-center justify-content-center`}
        >
          Top Tracks
        </h1>
        <ul className={`${classes.list}`}>{renderTracks()}</ul>
        <Link href={"/profile"}>
          <button className={`${classes.profileButton}`}>
            Back to profile
          </button>
        </Link>
      </div>
    </>
  );
};

export default TopTracks;
