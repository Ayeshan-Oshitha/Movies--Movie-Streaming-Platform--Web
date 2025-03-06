import React from "react";

interface Props {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
  original_language: string;
}

const TrendingTvShowCard = ({ id, name, poster_path, vote_average, first_air_date, original_language }: Props) => {
  return (
    <>
      <div className=" bg-white border border-gray-200 rounded-2xl shadow-xl h-[540px] w-[400px] flex flex-col flex-shrink-0 scale-[0.8] mx-[-20px] mb-[-40px]">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={name}
          className="w-full h-[400px] object-fill rounded-tr-2xl"
        />
        <h2 className="text-2xl font-semibold text-blue-900 truncate mt-4 mx-5">{name}</h2>
        <div className="flex flex-row  justify-between mt-4 mx-5">
          <p className="text-base text-white bg-sky-400 w-32 text-center px-1 py-1 rounded-lg ">{first_air_date}</p>
          <p className="text-base text-white bg-sky-400 w-16 text-center px-1 py-1 rounded-lg">{original_language}</p>
          <p className="text-base text-white bg-yellow-400 w-16 text-center px-1 py-1 rounded-lg">{vote_average}</p>
        </div>
      </div>
    </>
  );
};

export default TrendingTvShowCard;
