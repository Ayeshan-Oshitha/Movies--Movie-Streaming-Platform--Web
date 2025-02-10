export interface moviesModel {
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
