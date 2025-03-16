import React from "react";

import { PopularPeopleModel } from "../../models/movies";

const PopularPeopleCard = ({
  id,
  name,
  known_for_department,
  popularity,
  profile_path,
  known_for,
}: PopularPeopleModel) => {
  return (
    <div className="w-[500px] flex justify-center gap-x-4 border border-gray-400  p-4 rounded-xl shadow">
      <div className="w-[240px]  flex justify-center items-start">
        <img src={`https://image.tmdb.org/t/p/original/${profile_path}`} className="object-scale-down rounded-lg" />
      </div>

      <div className=" flex flex-1 flex-col gap-y-6 pl-4">
        <div className="flex flex-col gap-y-0">
          <p className="font-light text-gray-500 text-lg uppercase tracking-wider ">Name</p>
          <p className="text-gray-800 text-base">{name}</p>
        </div>

        <div className="flex flex-col gap-y-0">
          <p className="font-light text-gray-500 text-lg uppercase tracking-wider ">Popularity</p>
          <p className="text-gray-800 text-base">{popularity}</p>
        </div>

        <div className="flex flex-col gap-y-0">
          <p className="font-light text-gray-500 text-lg uppercase tracking-wider ">Known For</p>
          <p className="text-gray-800 text-base">{known_for_department}</p>
        </div>

        <div className="flex flex-col gap-y-0">
          <p className="font-light text-gray-500 text-lg uppercase tracking-wider ">Majow works</p>
          {known_for?.length > 0 &&
            known_for.map((sector, index) => (
              <div key={sector.id}>
                <p className="text-gray-800 text-base">{sector.title} </p>
                <p className="text-gray-600 text-sm mb-2"> {sector.release_date}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPeopleCard;
