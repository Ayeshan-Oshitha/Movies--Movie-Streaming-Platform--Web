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

export const fetchTrendingMovies = async (abortController?: AbortController) => {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/day?language=en-US`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH}`,
      },
      signal: abortController?.signal,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`HTTP Status: ${res.status}` + " " + errorData.status_message || "something wen't wrong");
    }
    const data = await res.json();
    console.log("data result is", data.results);
    return data.results;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("Aborted");
      return;
    }
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("No response from the server. Please check your internet connection");
    }
    throw new Error(error.message || "Something went wrong");
  }
};

export const fetchTrendingTvShows = async (abortController?: AbortController) => {
  try {
    const res = await fetch(`${BASE_URL}/trending/tv/day?language=en-US`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH}`,
      },
      signal: abortController?.signal,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`HTTP Status: ${res.status}` + " " + errorData.status_message || "something wen't wrong");
    }
    const data = await res.json();
    console.log("Tv show result is", data.results);
    return data.results;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("Aborted");
      return;
    }
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("No response from the server. Please check your internet connection");
    }
    throw new Error(error.message || "Something went wrong");
  }
};

// react query - fetch array of data
export const fetchDiscoverTvShows = async (page: number) => {
  try {
    const response = await axios(`${BASE_URL}/discover/tv?page=${page}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH}`,
      },
    });
    return response.data.results;
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

// react query - fetch one object
export const fetchTvShowDetailsById = async (tvShowId: number) => {
  try {
    const response = await axios(`${BASE_URL}/tv/${tvShowId}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log("aborted");
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

// normal data fetching - Infinite way (View More Button)
export const fetchUpcomingMovies = async (page: number, abortController?: AbortController) => {
  try {
    const response = await axios(`${BASE_URL}/movie/upcoming?language=en-US&page=${page}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH}`,
      },
      signal: abortController?.signal,
    });
    console.log("upcoming", response.data.results);
    return response.data.results;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log("aborted");
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

// reactQ uery - Infinite way (View More Button)
export const fetchPopularPeople = async (page: number) => {
  try {
    const res = await fetch(`${BASE_URL}/person/popular?language=en-US&page=${page}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`HTTP Status: ${res.status}` + " " + errorData.status_message || "something wen't wrong");
    }
    const data = await res.json();
    console.log("Peoples are", data.results);
    return data.results;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("Aborted");
      return;
    }
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("No response from the server. Please check your internet connection");
    }
    throw new Error(error.message || "Something went wrong");
  }
};
