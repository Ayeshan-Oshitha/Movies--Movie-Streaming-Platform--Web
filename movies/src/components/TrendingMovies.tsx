import React, { useEffect, useRef, useState } from "react";
import { TrendingMovieModel } from "../models/movies";
import { fetchTrendingMovies } from "../services/TMdbServices";
import TrendingMovieCard from "./ui/TrendingMovieCard";

const ITEM_WIDTH = 800;

const TrendingMovies = () => {
  const [movies, setMovies] = useState<TrendingMovieModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const [scrollPosition, setScrollPosition] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchMovies = async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setMovies([]);
    setError(null);

    try {
      const movieData = await fetchTrendingMovies(abortControllerRef.current);
      setMovies(movieData);
      console.log(movies);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleScroll = (scrollAmount: number) => {
    if (!containerRef.current) return;
    // calculate the new scroll position
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };

  return (
    <>
      <div className="  max-w-[1500px] w-[90%] flex  justify-self-center flex-col mt-28 mb-8">
        <p className="text-4xl text-red-600 font-medium border-red-600 border-b-4 ">Trending Movies</p>
        {loading && <div className="text-4xl text-red-600">Loading...</div>}
        {error && <div>Error:{error}</div>}
        <div className="w-full overflow-auto scroll-smooth scroll-container" ref={containerRef}>
          <div className=" flex flex-row   ">
            {!loading &&
              !error &&
              (movies?.length > 0 ? (
                movies?.map((movie, index) => (
                  <TrendingMovieCard
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
                <p>No Movies available</p>
              ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-4 gap-x-6">
          <button
            className="text-lg bg-sky-400 text-white px-2 py-1 rounded-lg hover:bg-sky-600"
            onClick={() => {
              handleScroll(-ITEM_WIDTH);
            }}
          >
            Scroll Left
          </button>
          <button
            className="text-lg bg-sky-400 text-white px-2 py-1 rounded-lg hover:bg-sky-600"
            onClick={() => {
              handleScroll(ITEM_WIDTH);
            }}
          >
            Scroll Right
          </button>
        </div>
      </div>
    </>
  );
};

export default TrendingMovies;
