import Discover from "../components/Discover";
import Hero from "../components/Hero";
import NewsLetter from "../components/NewsLetter";
import TrendingMovies from "../components/TrendingMovies";
import TrendingTVShows from "../components/TrendingTVShows";

const HomePage = () => {
  return (
    <>
      <Hero />
      <TrendingMovies />
      <TrendingTVShows />
      <NewsLetter />
    </>
  );
};

export default HomePage;
