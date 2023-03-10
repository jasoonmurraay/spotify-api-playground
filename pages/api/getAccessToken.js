import dotenv from 'dotenv';
// dotenv.config()

const getAccessToken = async () => {
    const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;
    console.log("Refresh token: ", refresh_token)
  
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

    console.log("Response: ", response)
  
    return response;
  };

  export default getAccessToken