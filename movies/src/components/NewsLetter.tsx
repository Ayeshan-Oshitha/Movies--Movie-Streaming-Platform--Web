const NewsLetter = () => {
  return (
    <div className="w-full  bg-sky-100 flex flex-col justify-center items-center py-12">
      <h3 className="text-center text-slate-900 text-3xl font-semibold ">Stay Updated</h3>
      <p className="text-center text-gray-900 mt-6">
        Subscribe to our newsletter for the latest updates on new release and exclusive content
      </p>
      <div className="flex flex-row justify-center items-center mt-6 h-12 gap-x-4">
        <input
          type="text"
          placeholder="Enter your email address"
          className="w-96 h-full py-2 px-2 text-gray-700 bg-white font-medium hover:border-2 hover:border-sky-400 focus:border-4 focus:border-sky-400 rounded-md"
        />
        <button className="bg-sky-400 text-center px-10 h-full font-semibold text-white hover:bg-sky-500 rounded-md">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
