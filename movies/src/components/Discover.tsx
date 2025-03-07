import React, { useEffect, useRef, useState } from "react";
import { DiscoverMovieModel } from "../models/movies";
import { fetchDiscoverMovies } from "../services/TMdbServices";
import DiscoverMovieCard from "./ui/DiscoverMovieCard";
import Pagination from "./ui/Pagination";

const Discover = () => {
  const [movies, setMovies] = useState<DiscoverMovieModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [page, setPage] = useState<number>(1);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchMovies = async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    setLoading(true);
    setMovies([]);
    setError(null);
    try {
      const movies = await fetchDiscoverMovies(abortControllerRef.current, page);
      setMovies(movies);
    } catch (error: any) {
      setError(error.message);
      console.log("Error - " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchMovies();
  }, [page]);

  return (
    <>
      <div className="w-full flex justify-center items-center mt-20 mb-14">
        <h1 className="text-7xl text-red-600 font-bold">Discover Movies</h1>
      </div>
      <div className="flex justify-center h-auto mb-10 px-6 py-6 ">
        {loading && <div className="text-4xl text-red-600">Loading...</div>}
        {error && <div>Error:{error}</div>}
        <div className="flex flex-row flex-wrap justify-evenly gap-10 w-[1600px] ">
          {!loading &&
            !error &&
            (movies?.length > 0 ? (
              movies?.map((movie, index) => (
                <DiscoverMovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                  original_language={movie.original_language}
                />
              ))
            ) : (
              <p>No Movies available.</p>
            ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-auto mb-32">
        <Pagination page={page} loading={loading} setPage={setPage} prevLimit={1} nextLimit={50} />
      </div>
    </>
  );
};

export default Discover;
