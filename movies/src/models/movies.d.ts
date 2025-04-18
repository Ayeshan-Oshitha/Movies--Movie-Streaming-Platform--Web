export interface DiscoverMovieModel {
  id: number;
  original_title: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  [key: string]: unknown;
}

export interface MovieModel {
  id: number;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  budget: number;
  revenue: number;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
  genres: {
    id: number;
    name: string;
  }[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
}

export interface MovieReviewsModel {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: string | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface TrendingMovieModel {
  id: number;
  original_title: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

export interface TrendingTVshowModel {
  id: number;
  original_name: string;
  original_language: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

export interface DiscoverTvShowModel {
  id: number;
  original_name: string;
  original_language: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

export interface TvShowModel {
  id: number;
  first_air_date: string;
  last_air_date: string;
  original_name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  type: string;
  genres: {
    id: number;
    name: string;
  }[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
}

export interface UpcomingMovieModel {
  id: number;
  original_title: string;
  original_language: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

export interface PopularPeopleModel {
  id: string;
  name: string;
  known_for_department: string;
  popularity: string;
  profile_path: string;
  known_for: {
    id: string;
    title: string;
    release_date: string;
  }[];
}
