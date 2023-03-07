import axios from "axios";

const scrollArtists = async (enteredData) => {
  try {
    const { data } = await axios.get(enteredData.url, {
      headers: {
        Authorization: `Bearer ${enteredData.token}`,
      },
    });
    return data;
  } catch (error) {
    //   console.log("Error data: ", error.message);
    //   return error;
    return error;
  }
};

export default scrollArtists;
