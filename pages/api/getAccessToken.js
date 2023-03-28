import { SpotifyContext, SpotifyProvider } from '@/context/spotifyContext';
import dotenv from 'dotenv';
// dotenv.config()

const getAccessToken = async () => {
  const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;
  // console.log("Refresh token: ", refresh_token)
  // console.log("client: ", process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID)
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    }).then(response => (
      response.json().then(data => ({
        data: data,
        status: response.status
      })
      )));
    console.log("Access token response: ", response)




    // console.log("Response: ", response)

    return response;
  } catch (e) {
    console.log("Access token Error: ", e)
    return e
  }

};

export default getAccessToken