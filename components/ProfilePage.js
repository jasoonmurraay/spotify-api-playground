import getProfile from "@/pages/api/getProfile";
import { useState, useEffect } from "react";
import ButtonComponent from "./ButtonComponent";
import getProfileDataType from "@/pages/api/getProfileDataType";
import getGenres from "@/pages/api/getGenres";

const ProfilePage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState(null);
  const [images, setImages] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [link, setLink] = useState("");
  const [country, setCountry] = useState("");
  const [fetchType, setFetchType] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([])
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      return await getProfile();
    }
    fetchData().then((data) => {
      console.log("Profile Items: ", data);
      setDisplayName(data.display_name);
      setImages(data.images);
      setFollowers(data.followers.total);
      setLink(data.href);
      setCountry(data.country);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (fetchType === "genres") {
      async function fetchGenres() {
        return await getGenres();
      }
      fetchGenres().then(data => {
        console.log("Fetched data type: ", data)
        setGenres(data.slice(0,10))
        setIsLoading(false)
      })
    } else {
      async function getType() {
        return await getProfileDataType(fetchType);
      }
      getType().then((data) => {
        console.log("fetched data type: ", data);
        if (fetchType === "tracks") {
          setTracks(data.items);
          setIsLoading(false);
        } else {
          setArtists(data.items);
          setIsLoading(false);
        }
      });
    }
  }, [fetchType]);
  const fetchHandler = (value) => {
    if (value.includes("Tracks")) {
      setFetchType("tracks");
      setIsLoading(true);
    } else if (value.includes("Artists")) {
      setFetchType("artists");
      setIsLoading(true);
    } else if (value.includes("Genres")) {
      setFetchType("genres");
      setIsLoading(true);
    }
  };

  const renderTracks = () => {
    return tracks.map((track) => {
      return (
        <li key={track.id}>
          <img src={track.album.images[0].url} alt="" />
          <h2>{track.name}</h2>
          <div>
            {track.artists.length === 1 ? "Artist: " : "Artists: "}{" "}
            <ul>
              {track.artists.map((artist) => {
                return (
                  <a key={artist.id} href={artist.external_urls.spotify}>
                    <li>{artist.name}</li>
                  </a>
                );
              })}
            </ul>
          </div>
        </li>
      );
    });
  };
  const renderArtists = () => {
    return artists.map((artist) => {
      return (
        <li key={artist.id}>
          {/* <img src={artist.images[0].url} alt="" /> */}
          <a href={artist.external_urls.spotify}>
            <h2>{artist.name}</h2>
          </a>
        </li>
      );
    });
  };
  const renderGenres = () => {
    return genres.map((genre) => {
      return (
        <li key={genre[0]}>{genre[0]}</li>
      )
    })
  }
  return (
    <>
      {!fetchType && !isLoading && (
        <>
          <div>
            <a href={link}>
              <h1>{displayName}</h1>
            </a>
            <img src={images[0].url} alt="" />
            <p>
              {followers} {followers === 1 ? "follower" : "followers"}
            </p>
            <p>{country}</p>
          </div>
          <ButtonComponent onClick={fetchHandler} text="Get top Tracks" />
          <ButtonComponent onClick={fetchHandler} text="Get top Artists" />
          <ButtonComponent onClick={fetchHandler} text="Get top Genres" />
        </>
      )}
      {fetchType === "tracks" && !isLoading && (
        <>
          <h1>Top Tracks</h1>
          <ol>{renderTracks()}</ol>
        </>
      )}
      {fetchType === "artists" && !isLoading && (
        <>
          <h1>Top Artists</h1>
          <ol>{renderArtists()}</ol>
        </>
      )}
      {fetchType === 'genres' && !isLoading && (
        <>
        <h1>Top Genres</h1>
        <ol>{renderGenres()}</ol>
        </>
      )}
    </>
  );
};

export default ProfilePage;


