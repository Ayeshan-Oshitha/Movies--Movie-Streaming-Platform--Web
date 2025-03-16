import React, { useEffect, useState } from "react";
import PopularPeopleCard from "./ui/PopularPeopleCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularPeople } from "../services/TMdbServices";
import { PopularPeopleModel } from "../models/movies";

const PopularPeople = () => {
  const [page, setPage] = useState<number>(1);
  const [people, setPeople] = useState<PopularPeopleModel[]>([]);

  const { data, error, isLoading } = useQuery<PopularPeopleModel[]>({
    queryKey: ["PopularPeople", page],
    queryFn: async () => {
      const response = await fetchPopularPeople(page);
      return response.slice(0, 8);
    },
  });

  useEffect(() => {
    if (data) {
      setPeople((prevPeople) => [...prevPeople, ...data]);
    }
  }, [data]);

  const handleClick = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center mt-20 mb-14">
        <h1 className="text-7xl text-red-600 font-bold">Discover Movies</h1>
      </div>
      <div className="flex justify-center h-auto mb-10 px-6 py-6 ">
        {error && <div>Error:{error.message}</div>}
        <div className="flex flex-row flex-wrap justify-evenly gap-10 w-[1600px] ">
          {!error &&
            (people.length > 0 ? (
              people?.map((person, index) => (
                <PopularPeopleCard
                  key={index}
                  id={person.id}
                  name={person.name}
                  known_for_department={person.known_for_department}
                  popularity={person.popularity}
                  profile_path={person.profile_path}
                  known_for={person.known_for}
                />
              ))
            ) : (
              <p>No data Available </p>
            ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-auto mb-32">
        <button
          onClick={handleClick}
          disabled={page === 5 || isLoading}
          className="px-5 py-2 bg-sky-400 text-xl text-white rounded-xl disabled:opacity-70"
        >
          {page === 5 ? <p>No more Data</p> : isLoading ? <p>Loading</p> : <p>View More</p>}
        </button>
      </div>
    </>
  );
};

export default PopularPeople;
