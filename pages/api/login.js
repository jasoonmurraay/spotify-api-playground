import Router from "next/router";
import dotenv from "dotenv";

dotenv.config();
const clientId = 'acd3854010f7468690e7ff12c6b5a2b3';

function makeState(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const login = async () => {
  let responseType = 'code'
  let scope =
    "ugc-image-upload user-read-playback-state user-modify-playback-state playlist-read-private user-follow-modify playlist-read-collaborative user-follow-read user-read-currently-playing user-read-playback-position user-library-modify playlist-modify-public playlist-modify-private user-read-email user-top-read streaming user-read-recently-played user-read-private user-library-read";
  let state = makeState(16);
  await Router.push(
    "https://accounts.spotify.com/authorize?" + `client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=http://localhost:3000&state=${state}`
  );

};

export default login;
