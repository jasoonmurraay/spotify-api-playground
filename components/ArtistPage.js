import classes from './ArtistPage.module.css'

const ArtistPage = (props) => {
  const renderGenres = () => {
    return props.genres.map((genre, index) => {
      return <li className={`${classes.genre}`} key={index}>{genre}</li>;
    });
  };
  return (
    <div className={`${classes.content}`}>
      <h1>{props.artistName}</h1>
      {props.images.length ? <img className={`${classes.img}`} src={props.images[0].url} alt={`A picture of ${props.artistName}`} /> : <></>}
      <p>{`${props.followers} followers`}</p>
      <ul className={`${classes.list}`}>{renderGenres()}</ul>

    </div>
  );
};

export default ArtistPage;
