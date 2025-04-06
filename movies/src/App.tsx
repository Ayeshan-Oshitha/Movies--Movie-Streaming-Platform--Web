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
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./layout/PrivateRoute";

function App() {
  const queryClient = new QueryClient();
  const { user } = useAuth();

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/movies/:id"
                element={
                  <PrivateRoute>
                    <MovieDetailsPage />
                  </PrivateRoute>
                }
              />
              <Route path="/tvShow/:id" element={<TvShowDetailsPage />} />
              <Route
                path="/discoverMovies"
                element={
                  <PrivateRoute>
                    <DiscoverMoviesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/discoverTvShows"
                element={
                  <PrivateRoute>
                    <DiscoverTvShowPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/people"
                element={
                  <PrivateRoute>
                    <PopularPeoplePage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
