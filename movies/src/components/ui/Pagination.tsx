import React from "react";

interface Props {
  page: number;
  loading: boolean;
  setPage: (update: (currentPage: number) => number) => void;
  prevLimit: number;
  nextLimit: number;
}

const Pagination = ({ page, loading, setPage, prevLimit, nextLimit }: Props) => {
  return (
    <div className="flex flex-row h-auto justify-center items-center gap-5">
      <button
        onClick={() => {
          setPage((currentPage) => currentPage - 1);
        }}
        disabled={loading || page === prevLimit}
        className={`bg-sky-500 text-white text-xl mx-5 w-32  h-12  px-5 font-medium rounded-lg ${
          loading || page === prevLimit ? "opacity-40" : "hover:bg-sky-600"
        }`}
      >
        prev
      </button>
      <div className="text-2xl font-semibold text-sky-600 h-12 w-40  flex items-center justify-center  border-2 border-sky-300">
        {page}
      </div>
      <button
        onClick={() => {
          setPage((currentPage) => currentPage + 1);
        }}
        disabled={loading || page === nextLimit}
        className={`bg-sky-500 text-white text-xl mx-5 w-32  h-12  px-5 font-medium rounded-lg ${
          loading || page === nextLimit ? "opacity-40" : "hover:bg-sky-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
