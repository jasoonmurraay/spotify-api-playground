import axios from "axios";

const getArtists = async (url, searchKey, token) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export default getArtists;
