import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";
import MovieReviews from "../components/MovieReviews";

// const MovieDetails = React.lazy(() => import("../components/MovieDetails"));

const MovieDetailsPage = () => {
  const { id } = useParams();
  const movieId = id ? parseInt(id, 10) : undefined;

  if (movieId === undefined) {
    return <div>Invalid movie ID</div>;
  }

  return (
    <>
      <div className="w-full flex flex-col justify-center items-start mt-16 ">
        <MovieDetails movieId={movieId} />
        <MovieReviews movieId={movieId} />
      </div>
    </>
  );
};

export default MovieDetailsPage;
