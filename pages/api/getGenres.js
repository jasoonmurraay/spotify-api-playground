import getAccessToken from "./getAccessToken";
import axios from "axios";

const getGenres = async () => {
  let token = await getAccessToken();
  token = token.data.access_token;
  let genres = {};
  let genreArr = [];
  let genreDataArr = [];
  let url = `https://api.spotify.com/v1/me/top/tracks`;
  let next = true;
  console.log("Url: ", url);
  try {
    while (next) {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          time_range: "long_term",
          limit: 50,
        },
      });
      console.log("Genre data: ", data);
      for (let i = 0; i < data.items.length; i++) {
        genreDataArr = genreDataArr.concat(data.items[i].artists)
      }
      let artistsIDs = ''
      for (let i = 0; i < genreDataArr.length; i++) {
        if (artistsIDs.includes(genreDataArr[i].id)) {
          continue
        } else {
          artistsIDs = artistsIDs + (i === 0 ? '' : ',') + genreDataArr[i].id
        }
      }
      console.log("artist ids: ", artistsIDs)
      const { severalArtists } = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/artists',
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          ids: artistsIDs
        }
      }).then(data => {
        console.log("Artists: ", data)
        let artistsArr = data.data.artists
        for (let i = 0; i < artistsArr.length; i++) {
          for (let j = 0; j < artistsArr[i].genres.length; j++) {
            if (artistsArr[i].genres[j] in genres) {
              genres[artistsArr[i].genres[j]] = genres[artistsArr[i].genres[j]] + 1
            } else {
              genres[artistsArr[i].genres[j]] = 1
            }
          }
        }
        console.log("Genres: ", genres)
        return genres
      })
      if (!data.next) {
        next = false;
      } else {
        url = data.next;
      }
    }
    for (genre in genres) {
      genreArr.push([Object.keys(genre), Object.values(genre)])
    }
    console.log("GenreArr: ", genre)
  } catch (e) {
    return e;
  }
};

export default getGenres;
