import { useEffect, useState } from "react";
import getOneArtist from "@/pages/api/getOneArtist";

const ArtistPage = (props) => {
  const [isPending, setIsPending] = useState(true);
  const [artistName, setArtistName] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [genres, setGenres] = useState([]);
  const [images, setImages] = useState([]);
  const [popularity, setPopularity] = useState(null);
  const [error, setError] = useState(null);
  const url = `https://api.spotify.com/v1/artists/${props.id}`;
  useEffect(() => {
    async function fetchData() {
        return await getOneArtist(url, props.token);
    }
    fetchData().then((data) => {
      console.log("Data: ", data);
      setArtistName(data.name);
      setFollowers(data.followers.total);
      setGenres(data.genres);
      setImages(data.images);
      setPopularity(data.popularity)
      setIsPending(false);
    });
  }, []);

  const renderGenres = () => {
    return genres.map((genre, index) => {
      return <li key={index}>{genre}</li>;
    });
  };

  return (
    <>
      {!isPending && (
        <>
          <h1>{artistName}</h1>
          <img src={images[0].url} alt="" />
          <ul>{renderGenres()}</ul>
          <p>{`${followers} followers`}</p>
          <p>Popularity rating: {popularity}</p>
        </>
      )}
      {isPending && <h1>Loading</h1>}
    </>
  );
};

export default ArtistPage;
