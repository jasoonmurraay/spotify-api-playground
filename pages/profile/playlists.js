import UserPlaylists from "@/components/UserPlaylists";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { SpotifyContext } from "@/context/spotifyContext";
import getUserPlaylists from "../api/getUserPlaylists";
import modifyPlaylist from "../api/modifyPlaylist";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playlists = (props) => {
  const { spotifyTokenState, updateSpotifyToken, updateId } =
    useContext(SpotifyContext);
  const router = useRouter();
  const id = spotifyTokenState.id;
  console.log("playlist id: ", id);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (id) {
      async function retrievePlaylists() {
        return await getUserPlaylists(
          id,
          spotifyTokenState.token,
          spotifyTokenState.isTokenValid
        );
      }
      retrievePlaylists().then((data) => {
        console.log("Playlist response: ", data);
        setPlaylists(data);
        setIsLoading(false);
      });
    }
  }, [id]);

  const modifyPlaylistHandler = (playlistId) => {
    const modify = async (id) => {
      return await modifyPlaylist(id);
    };
    modify(playlistId).then((data) => {
      console.log("Playlist modified: ", data);
    });
    // router.reload()
  };

  return (
    <>
      {!isLoading && (
        <>
          <Navbar />
          <UserPlaylists modify={modifyPlaylistHandler} playlists={playlists} />
          <Footer />
        </>
      )}
    </>
  );
};

export default playlists;
