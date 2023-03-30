import classes from './UserArtists.module.css'
import Link from 'next/link';

const UserArtists = (props) => {
    const artists = props.artists
    const renderArtists = () => {
        return artists.map((artist) => {
            return (
                <li key={artist.id}>
                    <div
                        className={`${classes.card} card col-xl-3 col-md-4 col-12 d-flex align-items-center justify-content-center`}
                    >
                        {artist.images.length ? (
                            <img
                                className={`${classes.img} card-img`}
                                src={artist.images[0].url}
                                alt=""
                            />
                        ) : (
                            <></>
                        )}
                        <a href={artist.external_urls.spotify}>
                            <h2 className="card-title">{artist.name}</h2>
                        </a>
                    </div>
                </li>

            );
        });
    };
    return (
        <>
            <div className={`${classes.content}`}>
                <h1>Top Artists</h1>
                <Link href={'/profile'}>
                    <button className={`${classes.profileButton}`}>Back to profile</button>
                </Link>
                <ul className={`${classes.list}`}>{renderArtists()}</ul>
                <Link href={'/profile'}>
                    <button className={`${classes.profileButton}`}>Back to profile</button>
                </Link>
            </div>
        </>
    )
}

export default UserArtists