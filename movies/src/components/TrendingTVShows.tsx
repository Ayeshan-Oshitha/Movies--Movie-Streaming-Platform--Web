import React, { useEffect, useRef, useState } from "react";
import { TrendingTVshowModel } from "../models/movies";
import { fetchTrendingTvShows } from "../services/TMdbServices";
import TrendingTvShowCard from "./ui/TrendingTvShowCard";

const ITEM_WIDTH = 800;

const TrendingTVShows = () => {
  const [TvShows, setTvShows] = useState<TrendingTVshowModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const [scrollPosition, setScrollPosition] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchTvShows = async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setTvShows([]);
    setError(null);

    try {
      const tvShowData = await fetchTrendingTvShows(abortControllerRef.current);
      setTvShows(tvShowData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTvShows();
  }, []);

  const handleScroll = (scrollAmount: number) => {
    if (!containerRef.current) return;
    // calculate the new scroll position
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };

  return (
    <>
      <div className="  max-w-[1500px] w-[90%] flex  justify-self-center flex-col mt-28 mb-8">
        <p className="text-4xl text-red-600 font-medium border-red-600 border-b-4 ">Trending TV Shows</p>
        {loading && <div className="text-4xl text-red-600">Loading...</div>}
        {error && <div>Error:{error}</div>}
        <div className="w-full overflow-auto scroll-smooth scroll-container" ref={containerRef}>
          <div className=" flex flex-row   ">
            {!loading &&
              !error &&
              (TvShows?.length > 0 ? (
                TvShows?.map((TvShow, index) => (
                  <TrendingTvShowCard
                    key={TvShow.id}
                    id={TvShow.id}
                    name={TvShow.original_name}
                    poster_path={TvShow.poster_path}
                    vote_average={TvShow.vote_average}
                    first_air_date={TvShow.first_air_date}
                    original_language={TvShow.original_language}
                  />
                ))
              ) : (
                <p>No TV Shows available</p>
              ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-4 gap-x-6">
          <button
            className="text-lg bg-sky-400 text-white px-2 py-1 rounded-lg hover:bg-sky-600"
            onClick={() => {
              handleScroll(-ITEM_WIDTH);
            }}
          >
            Scroll Left
          </button>
          <button
            className="text-lg bg-sky-400 text-white px-2 py-1 rounded-lg hover:bg-sky-600"
            onClick={() => {
              handleScroll(ITEM_WIDTH);
            }}
          >
            Scroll Right
          </button>
        </div>
      </div>
    </>
  );
};

export default TrendingTVShows;
