import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDiscoverTvShows } from "../services/TMdbServices";
import { DiscoverTvShowModel } from "../models/movies";
import Pagination from "./ui/Pagination";
import DiscoverTvShowCard from "./ui/DiscoverTvShowCard";

const DiscoverTvShow = () => {
  const [page, setPage] = useState<number>(1);

  const {
    data: tvShows = [],
    isLoading,
    error,
  } = useQuery<DiscoverTvShowModel[], Error>({
    queryKey: ["DiscoverTvShows", page],
    queryFn: async () => await fetchDiscoverTvShows(page),
  });

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <div className="w-full flex justify-center items-center mt-20 mb-14">
        <h1 className="text-7xl text-red-600 font-bold">Discover TV Shows</h1>
      </div>
      <div className="flex justify-center h-auto mb-10 px-6 py-6 ">
        {isLoading && <div className="text-4xl text-red-600">Loading...</div>}
        {error && <div>Error:{error.message}</div>}
        <div className="flex flex-row flex-wrap justify-evenly gap-10 w-[1600px] ">
          {!isLoading &&
            !error &&
            (tvShows?.length > 0 ? (
              tvShows?.map((tvShow, index) => (
                <DiscoverTvShowCard
                  key={tvShow.id}
                  id={tvShow.id}
                  title={tvShow.original_name}
                  original_language={tvShow.original_language}
                  first_air_date={tvShow.first_air_date}
                  vote_average={tvShow.vote_average}
                  poster_path={tvShow.poster_path}
                />
              ))
            ) : (
              <p>No Movies available.</p>
            ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-auto mb-32">
        <Pagination page={page} loading={isLoading} setPage={setPage} prevLimit={1} nextLimit={50} />
      </div>
    </>
  );
};

export default DiscoverTvShow;
