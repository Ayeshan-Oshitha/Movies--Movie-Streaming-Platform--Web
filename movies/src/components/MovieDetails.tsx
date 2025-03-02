import React, { useEffect, useRef, useState } from "react";
import { MovieModel } from "../models/movies";
import { fetchMovieDetailsById } from "../services/TMdbServices";
import { convertMinutesToHours } from "../helpers/utilities";

interface Props {
  movieId: number;
}

const MovieDetails = ({ movieId }: Props) => {
  const [movie, setMovie] = useState<MovieModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchMovieById = async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setMovie(undefined);

    try {
      const movie = await fetchMovieDetailsById(movieId, abortControllerRef.current);
      setMovie(movie);
      console.log("Movies are", movie);
    } catch (error: any) {
      setError(error.message);
      console.log("Error" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieById();
  }, [movieId]);

  return (
    <>
      {loading && <div className="text-4xl text-red-600">Loading...</div>}
      {error && <div>Error:{error}</div>}
      <div className="grid grid-cols-12  gap-12 w-full h-auto px-10 mb-10">
        {!loading &&
          !error &&
          (movie ? (
            <>
              <div className="col-span-12 flex justify-center">
                <p className="text-5xl font-semibold mb-8 text-sky-800">{movie?.original_title}</p>
              </div>
              <div className="col-span-12 lg:col-span-5  flex justify-center items-start">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  className=" min-w-60 sm:w-[400px] lg:w-[700px] object-contain rounded-lg"
                />
              </div>

              <div className="col-span-12 lg:col-span-7 flex flex-col gap-y-8  ">
                <p className=" text-gray-700 font-medium text-xl leading-1">{movie.overview}</p>
                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider ">Release Date</p>
                  <p className=" text-gray-800 text-lg"> {movie.release_date}</p>
                </div>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider ">Runtime</p>
                  <p className=" text-gray-800 text-lg"> {convertMinutesToHours(movie.runtime)} </p>
                </div>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider ">Budget</p>
                  <p className=" text-gray-800 text-lg"> {movie.budget.toLocaleString()}</p>
                </div>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider ">Revenue</p>
                  <p className=" text-gray-800 text-lg"> {movie.revenue.toLocaleString()}</p>
                </div>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider ">Rating</p>
                  <p className=" text-gray-800 text-lg">
                    {movie.vote_average} / 10 ({movie.vote_count} votes)
                  </p>
                </div>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider mb-1 ">Genres</p>
                  <div className=" flex flex-row flex-wrap gap-x-4 ">
                    {movie.genres?.map((genre, index) => (
                      <p key={genre?.id} className="text-lg text-gray-600 bg-slate-200 px-3 py-1 rounded-lg">
                        {genre?.name}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider mb-1 ">
                    Production Companies
                  </p>
                  <div className=" flex flex-row flex-wrap gap-x-4 gap-y-5 ">
                    {movie.production_companies?.map((company, index) => (
                      <div
                        key={company.id}
                        className="flex flex-row text-gray-600 bg-slate-200 px-4 py-4 rounded-lg gap-x-4 "
                      >
                        <div className="flex justify-center items-center">
                          <img
                            src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                            className="w-20 object-contain"
                          />
                        </div>
                        <div className="flex flex-col justify-center ">
                          <p className="text-lg ">{company?.name}</p>
                          <p className="text-lg ">({company?.origin_country})</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>No Data available</p>
          ))}
      </div>
    </>
  );
};

export default MovieDetails;
