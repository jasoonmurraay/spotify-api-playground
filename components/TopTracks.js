import Link from 'next/link';
import classes from './TopTracks.module.css'

const TopTracks = (props) => {
    const tracks = props.tracks
    const renderTracks = () => {
        return tracks.map((track) => {
            return (
                <li key={track.id} className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}>
                    <div className={`${classes.cardBody}`}>
                        <img className={`${classes.img} card-img`} src={track.album.images[0].url} alt="" />
                        <h2 className="card-title">{track.name}</h2>
                        <div className={`${classes.artistDiv}`}>
                            {track.artists.length === 1 ? "Artist: " : "Artists: "}{" "}
                            <ul className={`${classes.artistUl}`}>
                                {track.artists.map((artist) => {
                                    return (
                                        <a className={`${classes.artists}`} key={artist.id} href={artist.external_urls.spotify}>
                                            <li className={`${classes.artistName}`}>{artist.name}</li>
                                        </a>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </li>
            );
        });
    };
    return (<>
        <div className={`${classes.content} d-flex align-items-center justify-content-center`}>
            <h1 className='d-flex align-items-center justify-content-center'>Top Tracks</h1>
            <ul className={`${classes.list}`}>{renderTracks()}</ul>
            <Link href={'/profile'}>
                <button className={`${classes.profileButton}`}>Back to profile</button>
            </Link>
        </div>
    </>
    )
}

export default TopTracks