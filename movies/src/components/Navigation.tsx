import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { logout } from "../lib/firebase";

const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logOutUser = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="grid grid-cols-12 h-20 border-b-2">
      <div className="col-span-3 lg:col-span-2 flex justify-center items-center bg-white">
        <img src={logo} alt="logo" className="w-48" />
      </div>

      <div className="col-span-7 lg:col-span-8 flex justify-center items-center gap-8 lg:gap-16 text-sky-600 text-2xl font-semibold text-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/discoverMovies">Movies</NavLink>
        <NavLink to="/discoverTvShows">TV Shows</NavLink>
        <NavLink to="/people">People</NavLink>
      </div>

      <div className="col-span-2 lg:col-span-2 flex flex-row justify-center items-center gap-x-4">
        {user ? (
          <p className="bg-red-400 px-3 py-2 rounded-lg text-white"> {user.displayName} </p>
        ) : (
          <p className="bg-red-400 px-3 py-2 rounded-lg text-white">Welcome</p>
        )}
        <button onClick={logOutUser} className="bg-sky-600 text-white px-4 py-2 rounded-lg">
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
