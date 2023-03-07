import axios from "axios";

const getOneArtist = async (url, token) => {
    try {
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            type: 'artist'
          }
        });
        return data;
      } catch (error) {
        return error;
      }
}

export default getOneArtist