import React from "react";
import { Link, useNavigate } from "react-router-dom";

const TemperoryHomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/movies");
  };
  return (
    <>
      <div className="w-full flex justify-center items-center mt-40 mb-14 flex-col ">
        <h1 className=" text-center text-4xl font-semibold">Temperory Home Page</h1>
        <div className="mt-12">
          <Link to="/movies" className="text-2xl text-blue-600 underline mt-5">
            Go to Movies
          </Link>
        </div>
        <div className="mt-12">
          <Link to="/movies">
            <button className="bg-green-500 text-white text-2xl px-4 py-2 rounded-lg">Go to Movies</button>
          </Link>
        </div>
        <div className="mt-12">
          <button className="bg-orange-400 text-white text-2xl px-4 py-2 rounded-lg" onClick={handleClick}>
            Go to Movies
          </button>
        </div>
      </div>
    </>
  );
};

export default TemperoryHomePage;
