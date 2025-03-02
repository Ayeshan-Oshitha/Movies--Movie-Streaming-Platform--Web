import React, { useEffect, useRef, useState } from "react";
import { fetchMovieReviewsById } from "../services/TMdbServices";
import { MovieReviewsModel } from "../models/movies";

interface Props {
  movieId: number;
}

const MovieReviews = ({ movieId }: Props) => {
  const [reviews, setReviews] = useState<MovieReviewsModel[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<any>();
  const [cardNo, setCardNo] = useState<number>(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchReviewsById = async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setReviews([]);

    try {
      const reviews = await fetchMovieReviewsById(movieId, abortControllerRef.current);
      setReviews(reviews);
      console.log("Revirews are", reviews);
    } catch (error: any) {
      setError(error.message);
      console.log("Review error is", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsById();
  }, [movieId]);

  const handleIncrement = () => {
    let ReviewIndex = cardNo === reviews.length - 1 ? 0 : cardNo + 1;
    setCardNo(ReviewIndex);
  };

  const handleDecrement = () => {
    let ReviewIndex = cardNo === 0 ? reviews.length - 1 : cardNo - 1;
    setCardNo(ReviewIndex);
  };

  return (
    <>
      <div className=" w-full  h-auto mt-16 mb-20 px-16 ">
        <p className="text-4xl border-b-4 border-gray-600 mb-16">Reviews</p>
        {loading && <div className="text-4xl text-red-600">Loading Reviews...</div>}
        {error && <div>Error:{error}</div>}
        <div className="  flex flex-row justify-end  gap-x-6 mb-4 ">
          <button className="bg-sky-400 text-white text-lg px-5 py-1  hover:bg-sky-600" onClick={handleDecrement}>
            Prev
          </button>
          <button className="bg-sky-400 text-white text-lg px-5 py-1  hover:bg-sky-600" onClick={handleIncrement}>
            Next
          </button>
        </div>

        {!loading &&
          !error &&
          (reviews?.length > 0 ? (
            <>
              <div className="bg-sky-50 w-full flex flex-col gap-y-6 px-4 py-3">
                <div>
                  <p> {reviews[cardNo].content} </p>
                </div>
                <div className=" flex flex-col items-end gap-y-1 font-medium">
                  <p>{reviews[cardNo].author}</p>
                  <p>{reviews[cardNo].created_at} </p>
                  {reviews[cardNo]?.author_details?.rating && <p>{reviews[cardNo].author_details.rating} ratings</p>}
                </div>
              </div>
            </>
          ) : (
            <p>No Reviews for this Movie</p>
          ))}
      </div>
    </>
  );
};

export default MovieReviews;
