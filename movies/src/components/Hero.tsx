import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" h-[600px] xl:h-[600px] 2xl:h-[650px] 3xl:h-[800px] w-full relative shadow-gray-500 shadow-xl ">
      <div className="bg-[url(src/assets/hero-image.png)] bg-cover bg-center h-full w-full "></div>
      <div className="absolute inset-1  flex flex-col gap-y-8 justify-center items-center   text-center ">
        <p className="text-7xl text-white font-bold">Discover New Worlds</p>
        <p className="text-3xl text-white ">Explore top picks and hidden gems in cinema</p>
        <Link to="/discoverMovies">
          <button className="bg-sky-500 px-5 py-3 text-2xl text-white font-medium tracking-wide rounded-lg">
            Search Movies
          </button>
        </Link>
        <Link to="">
          <button className="bg-sky-500 px-5 py-3 text-2xl text-white font-medium tracking-wide rounded-lg">
            Search TV Shows
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
