import getAccessToken from "./getAccessToken";
import axios from "axios";

const getGenres = async () => {
  let token = await getAccessToken();
  token = token.data.access_token;
  let genres = {};
  let genreArr = [];
  let url = `https://api.spotify.com/v1/me/top/tracks`;
  let next = true;
  console.log("Url: ", url);
  try {
    while (next) {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        q: {
          time_range: "short_term",
          limit: 50,
        },
      });
      console.log("Profile data: ", data);
      for (let i = 0; i < data.items.length; i++) {
        const { songData } = await axios.get(`https://api.spotify.com/v1/tracks/${data.items.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        for (let k = 0; k < songData.album.genres.length; k++) {
          if (songData.album.genres[k] in genres) {
            genres[songData.album.genres[k]] += 1;
          } else {
            genres[songData.album.genres[k]] = 1;
          }
        }
      }
      if (!data.next) {
        next = false;
      } else {
        url = data.next;
      }
    }
    for (let genreType in genres) {
      genreArr.push([genreType, genres[genreType]]);
    }
    genreArr = genreArr.sort((a, b) => {
      return b[1] - a[1];
    });
    console.log("GenreArr: ", genreArr);
    return genreArr;
  } catch (e) {
    return e;
  }
};

export default getGenres;
