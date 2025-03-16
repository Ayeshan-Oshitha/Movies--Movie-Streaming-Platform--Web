import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  original_title: string;
  original_language: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

const UpcomingMovieCard = ({
  id,
  original_title,
  original_language,
  release_date,
  vote_average,
  poster_path,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = (tvShowId: number) => {
    navigate(`/movies/${tvShowId}`);
  };
  return (
    <>
      <div className=" bg-white border border-gray-200 rounded-2xl shadow-xl h-[600px] w-[400px] flex flex-col shrink-0 scale-[0.8] mx-[-20px] mb-[-40px] mt-[-40px]">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={original_title}
          className="w-full h-[400px] object-fill rounded-tr-2xl"
        />
        <h2 className="text-2xl font-semibold text-blue-900 truncate mt-4 mx-5">{original_title}</h2>
        <div className="flex flex-row  justify-between mt-4 mx-5">
          <p className="text-base text-white bg-sky-400 w-32 text-center px-1 py-1 rounded-lg ">{release_date}</p>
          <p className="text-base text-white bg-sky-400 w-16 text-center px-1 py-1 rounded-lg">{original_language}</p>
          <p className="text-base text-white bg-yellow-400 w-16 text-center px-1 py-1 rounded-lg">{vote_average}</p>
        </div>
        <button
          className="bg-gray-700 text-white text-xl mx-5  h-12 mt-7 px-5 font-medium rounded-lg hover:bg-sky-800"
          onClick={() => handleClick(id)}
        >
          View Details
        </button>
      </div>
    </>
  );
};

export default UpcomingMovieCard;
