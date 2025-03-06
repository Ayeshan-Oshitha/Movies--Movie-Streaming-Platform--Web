import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import TemperoryHomePage from "./pages/TemperoryHomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import DiscoverMoviesPage from "./pages/DiscoverMoviesPage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/temp" element={<TemperoryHomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/discoverMovies" element={<DiscoverMoviesPage />} />
      </Routes>
    </>
  );
}

export default App;
