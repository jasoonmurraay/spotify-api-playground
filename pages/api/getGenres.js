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
        q: {
          time_range: "short_term",
          limit: 50,
        },
      });
      console.log("Genre data: ", data);
      for (let i = 0; i < data.items.length; i++) {
        genreDataArr.push(data.items[i]);
      }

      if (!data.next) {
        next = false;
      } else {
        url = data.next;
      }
    }
    console.log("GenreDataArr: ", genreDataArr);
    let i = 0;
    while (i < genreDataArr.length) {
      console.log("url: ", genreDataArr[i].id);
      await axios
        .get(`https://api.spotify.com/v1/tracks/${genreDataArr[i].id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (song) => {
          await axios.get(`https://api.spotify.com/v1/albums/${song.data.album.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((album) => {
            console.log("Album genre: ", album)
            i++
          })
        });

      // if (!song.data.album.genres) {
      //   continue;
      // }
      // for (let k = 0; k < songData[i].data.album.genres.length; k++) {
      //   if (songData[i].data.album.genres[k] in genres) {
      //     genres[songData[i].data.album.genres[k]] += 1;
      //   } else {
      //     genres[songData[i].data.album.genres[k]] = 1;
      //   }
      // }
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
