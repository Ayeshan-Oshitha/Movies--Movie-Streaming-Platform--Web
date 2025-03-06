import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navigation = () => {
  return (
    <div className="grid grid-cols-12 h-20 border-b-2">
      <div className="col-span-3 lg:col-span-2 flex justify-center items-center bg-white">
        <img src={logo} alt="logo" className="w-48" />
      </div>

      <div className="col-span-7 lg:col-span-8 flex justify-center items-center gap-8 lg:gap-16 text-sky-600 text-2xl font-semibold text-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/discoverMovies">Movies</NavLink>
        <NavLink to="">TV Shows</NavLink>
        <NavLink to="/temp">Temp</NavLink>
      </div>

      <div className="col-span-2 lg:col-span-2 flex justify-center items-center">
        <button className="bg-sky-600 text-white px-4 py-2 rounded-lg">Get Help</button>
      </div>
    </div>
  );
};

export default Navigation;
