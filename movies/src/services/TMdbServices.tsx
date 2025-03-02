import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

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

export const fetchMovieDetailsById = async (movieId: number, abortController?: AbortController) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      signal: abortController?.signal,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH}`,
      },
    });
    console.log(res.data);
    return res.data;
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

export const fetchMovieReviewsById = async (movieId: number, abortController?: AbortController) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
      signal: abortController?.signal,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH}`,
      },
    });
    console.log("Review api", res.data.results);
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
