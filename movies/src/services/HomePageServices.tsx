import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchDiscoverMovies = async (abortController?: AbortController, page?: number) => {
  try {
    const res = await axios(`${BASE_URL}/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${page}`, {
      signal: abortController?.signal,
    });
    return res.data.results;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log("Request aborted");
      return;
    }
    if (error.response) {
      throw new Error(error.response.data?.status_message || "Something went wrong!");
    } else if (error.request) {
      throw new Error("No response from the server. Please check your connection.");
    } else {
      throw new Error(error.message);
    }
  }
};
