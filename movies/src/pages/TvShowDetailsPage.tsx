import React from "react";
import { useParams } from "react-router-dom";
import TvShowDetails from "../components/TvShowDetails";

const TvShowDetailsPage = () => {
  const { id } = useParams();
  const tvShowId = id ? parseInt(id, 10) : undefined;

  if (tvShowId === undefined) {
    return <div>Invalid movie ID</div>;
  }

  return (
    <>
      <div className="w-full flex flex-col justify-center items-start mt-16">
        <TvShowDetails tvShowId={tvShowId} />
      </div>
    </>
  );
};

export default TvShowDetailsPage;
