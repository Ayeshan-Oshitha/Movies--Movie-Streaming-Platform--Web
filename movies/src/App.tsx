import { Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import DiscoverMoviesPage from "./pages/DiscoverMoviesPage";
import DiscoverTvShowPage from "./pages/DiscoverTvShowPage";
import TvShowDetailsPage from "./pages/TvShowDetailsPage";
import PopularPeoplePage from "./pages/PopularPeoplePage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
            <Route path="/tvShow/:id" element={<TvShowDetailsPage />} />
            <Route path="/discoverMovies" element={<DiscoverMoviesPage />} />
            <Route path="/discoverTvShows" element={<DiscoverTvShowPage />} />
            <Route path="/people" element={<PopularPeoplePage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
