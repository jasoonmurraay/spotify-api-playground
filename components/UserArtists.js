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
                        <Link className={`${classes.link}`} href={`/artists/${artist.id}`}>
                            {artist.images.length ? (
                                <img
                                    className={`${classes.img} card-img`}
                                    src={artist.images[0].url}
                                    alt={`Image of ${artist.name}`}
                                />
                            ) : (
                                <></>
                            )}

                            <h2 className={`${classes.artistName} card-title`}>{artist.name}</h2>
                        </Link>
                    </div>
                </li>

            );
        });
    };
    return (
        <>
            <div className={`${classes.content}`}>
                <Link href={'/profile'}>
                    <button className={`${classes.profileButton}`}>Back to profile</button>
                </Link>
                <h1>Top Artists</h1>
                <ul className={`${classes.list}`}>{renderArtists()}</ul>
                <Link href={'/profile'}>
                    <button className={`${classes.profileButton}`}>Back to profile</button>
                </Link>
            </div>
        </>
    )
}

export default UserArtists