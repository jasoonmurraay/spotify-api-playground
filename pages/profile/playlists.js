import UserPlaylists from "@/components/UserPlaylists";
import { useEffect, useState} from "react";
import getUserPlaylists from "../api/getUserPlaylists";

const playlists = (props) => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    async function getPlaylists() {
      return await getUserPlaylists();
    }
    getPlaylists().then((data) => {
      setPlaylists(data);
      setIsLoading(false)
      console.log("Playlist data: ", data);
    });
  }, []);
  return <>{!isLoading && <UserPlaylists playlists={playlists} />}</>;
};

export default playlists;
