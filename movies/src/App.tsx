import { Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import TemperoryHomePage from "./pages/TemperoryHomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import DiscoverMoviesPage from "./pages/DiscoverMoviesPage";
import DiscoverTvShowPage from "./pages/DiscoverTvShowPage";
import TvShowDetailsPage from "./pages/TvShowDetailsPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navigation />
        <Routes>
          <Route path="/temp" element={<TemperoryHomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="/tvShow/:id" element={<TvShowDetailsPage />} />
          <Route path="/discoverMovies" element={<DiscoverMoviesPage />} />
          <Route path="/discoverTvShows" element={<DiscoverTvShowPage />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
