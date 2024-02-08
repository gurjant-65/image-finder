import axios from "axios";

export const getImages = async (text, count) => {
  try {
    const data = await axios.get(
      `https://pixabay.com/api/?key=39585619-aa4b6e4892b9b84c497548f0d&q=${text}&image_type=photo&per_page=${count}&safe_search=true`
    );

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
