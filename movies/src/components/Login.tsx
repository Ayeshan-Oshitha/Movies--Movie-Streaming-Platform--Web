import React, { useState } from "react";
import logo from "../assets/logo.png";

interface user {
  name: string;
  password: string;
}

const Login = () => {
  const [user, setUser] = useState<user | undefined>();
  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      <div className=" justify-self-center  min-w-[800px] h-fit p-6 shadow-lg bg-white">
        <div className="flex flex-col items-center ">
          <div className="w-full flex justify-end">
            <img src={logo} className="w-24 flex " />
          </div>
          <p className="text-4xl font-medium text-red-600 mt-8">Sign In</p>
          <p className="mt-8 ">Welcome back, You have been missed!</p>
          <div className="w-[700px] mt-10">
            <form className="flex flex-col gap-y-8 mb-12">
              <div className="flex flex-col gap-y-1">
                <label htmlFor="email" className="font-semibold ml-2">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full border-2 rounded-lg px-2 py-2 "
                  placeholder="Enter your email here"
                  id="email"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="email" className="font-semibold ml-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border-2 rounded-lg px-2 py-2 "
                  placeholder="Enter your password here"
                  id="email"
                />
              </div>
              <button className="w-full mt-3 bg-red-700 text-white py-3 font-semibold tracking-wider rounded-lg hover:opacity-80 ">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
