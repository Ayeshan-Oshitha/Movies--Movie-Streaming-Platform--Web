import Hero from "../components/Hero";
import NewsLetter from "../components/NewsLetter";
import TrendingMovies from "../components/TrendingMovies";
import TrendingTVShows from "../components/TrendingTVShows";
import UpcomingMovies from "../components/UpcomingMovies";

const HomePage = () => {
  return (
    <>
      <Hero />
      <TrendingMovies />
      <TrendingTVShows />
      <UpcomingMovies />
      <NewsLetter />
    </>
  );
};

export default HomePage;
