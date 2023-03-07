import { useEffect } from "react";
import getOneArtist from "@/pages/api/getOneArtist";

const ArtistPage = (props) => {
    console.log("Artist page props: ", props)
  const url = `https://api.spotify.com/v1/artists/${props.id}`;
  const fetchData = async () => {
    const data = await getOneArtist(url, props.token)
    console.log("Data: ", data)
  }
  fetchData()
    
  
  return (
    <>
      <div>{props.id}</div>
    </>
  );
};

export default ArtistPage;
