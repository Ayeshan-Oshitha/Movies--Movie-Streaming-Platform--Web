import React, { useEffect, useRef, useState } from "react";
import { UpcomingMovieModel } from "../models/movies";
import { fetchUpcomingMovies } from "../services/TMdbServices";
import UpcomingMovieCard from "./ui/UpcomingMovieCard";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState<UpcomingMovieModel[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<any>();
  const [page, setPage] = useState<number>(1);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchMovies = async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await fetchUpcomingMovies(page, abortControllerRef.current);
      const firstEightMovies = response.slice(0, 8);
      setMovies((prevMovies) => [...prevMovies, ...firstEightMovies]);
      console.log("Movies are", response);
    } catch (error: any) {
      setError(error.message);
      console.log("Error" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleClick = () => {
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <>
      <div className="  max-w-[1500px] w-[90%] flex  justify-self-center flex-col mt-28 ">
        <p className="text-4xl text-red-600 font-medium border-red-600 border-b-4 ">Upcoming Movies</p>
        <div className="flex justify-center h-auto mb-2 px-6 py-6 ">
          {error && <div>Error:{error.message}</div>}
          <div className="flex flex-row flex-wrap  ">
            {!error &&
              (movies?.length > 0 ? (
                movies?.map((movie, index) => (
                  <UpcomingMovieCard
                    key={movie.id}
                    id={movie.id}
                    original_title={movie.original_title}
                    original_language={movie.original_language}
                    release_date={movie.release_date}
                    vote_average={movie.vote_average}
                    poster_path={movie.poster_path}
                  />
                ))
              ) : (
                <p>No Movies available.</p>
              ))}
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-auto mb-32">
          <button
            onClick={handleClick}
            disabled={page === 5 || loading}
            className="px-5 py-2 bg-sky-400 text-xl text-white rounded-xl disabled:opacity-70"
          >
            {page === 5 ? <p>No more Data</p> : loading ? <p>Loading</p> : <p>View More</p>}
          </button>
        </div>
      </div>
    </>
  );
};

export default UpcomingMovies;
