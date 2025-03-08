import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchTvShowDetailsById } from "../services/TMdbServices";
import { TvShowModel } from "../models/movies";

interface Props {
  tvShowId: number;
}

const TvShowDetails = ({ tvShowId }: Props) => {
  const {
    data: tvShow,
    isLoading,
    error,
  } = useQuery<TvShowModel>({
    queryKey: ["tvShowDetails", tvShowId],
    queryFn: () => fetchTvShowDetailsById(tvShowId),
  });
  return (
    <>
      {isLoading && <div className="text-4xl text-red-600">Loading...</div>}
      {error && <div>Error:{error.message}</div>}
      <div className="grid grid-cols-12  gap-12 w-full h-auto px-10 mb-10">
        {!isLoading &&
          !error &&
          (tvShow ? (
            <>
              <div className="col-span-12 flex justify-center">
                <p className="text-5xl font-semibold mb-8 text-sky-800">{tvShow?.original_name}</p>
              </div>
              <div className="col-span-12 lg:col-span-5  flex justify-center items-start">
                <img
                  src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
                  className=" min-w-60 sm:w-[400px] lg:w-[700px] object-contain rounded-lg"
                />
              </div>

              <div className="col-span-12 lg:col-span-7 flex flex-col gap-y-8  ">
                <p className=" text-gray-700 font-medium text-xl leading-1">{tvShow.overview}</p>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider ">Type</p>
                  <p className=" text-gray-800 text-lg"> {tvShow.type}</p>
                </div>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider ">First Air Date</p>
                  <p className=" text-gray-800 text-lg"> {tvShow.first_air_date}</p>
                </div>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider ">Last Air Date</p>
                  <p className=" text-gray-800 text-lg"> {tvShow.last_air_date}</p>
                </div>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider ">Rating</p>
                  <p className=" text-gray-800 text-lg">
                    {tvShow.vote_average} / 10 ({tvShow.vote_count} votes)
                  </p>
                </div>

                <div className="flex flex-col gap-y-0">
                  <p className="font-light text-gray-500 text-xl uppercase tracking-wider mb-1 ">Genres</p>
                  <div className=" flex flex-row flex-wrap gap-x-4 ">
                    {tvShow.genres?.map((genre, index) => (
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
                    {tvShow.production_companies?.map((company, index) => (
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

export default TvShowDetails;
