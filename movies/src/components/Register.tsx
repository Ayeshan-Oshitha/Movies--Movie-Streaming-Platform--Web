import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../lib/firebase";

interface user {
  username: string;
  email: string;
  password: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  other?: string;
}

const Register = () => {
  const [user, setUser] = useState<user>({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState<Errors>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!user.username) {
      newErrors.username = "Username is required.";
    }
    if (!user.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!user.password) {
      newErrors.password = "Password is required.";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const SignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Inside Sign up function");
    try {
      await createAccount(user.username, user.email, user.password);
      navigate("/login");
    } catch (error: any) {
      setErrors({ other: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      <div className=" justify-self-center  min-w-[800px] h-fit p-6 shadow-lg bg-white">
        <div className="flex flex-col items-center ">
          <div className="w-full flex justify-end">
            <img src={logo} className="w-24 flex " />
          </div>
          <p className="text-4xl font-medium text-red-600 mt-8">Create an Account</p>
          <p className="mt-8 ">Join us and explore amazing content!</p>
          <div className="w-[700px] mt-10">
            <form className="flex flex-col gap-y-8 mb-8">
              <div className="flex flex-col gap-y-1">
                <label htmlFor="username" className="font-semibold ml-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full border-2 rounded-lg px-2 py-2 "
                  placeholder="Enter your username here"
                  id="username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                {errors?.username ? <p className="text-red-700 text-sm">{errors.username}</p> : ""}
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="email" className="font-semibold ml-2">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full border-2 rounded-lg px-2 py-2 "
                  placeholder="Enter your email here"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                {errors?.email ? <p className="text-red-700 text-sm">{errors.email}</p> : ""}
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="password" className="font-semibold ml-2">
                  Password
                </label>
                <div className="w-full flex flex-row h-full gap-x-2 items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border-2 rounded-lg px-2 py-2 "
                    placeholder="Enter your password here"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                  <p
                    className="bg-blue-400 px-3 py-2 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "hide" : "show"}
                  </p>
                </div>
                {errors?.password ? <p className="text-red-700 text-sm">{errors.password}</p> : ""}
              </div>
              <button
                onClick={SignUpSubmit}
                className="w-full mt-3 bg-red-700 text-white py-3 font-semibold tracking-wider rounded-lg hover:opacity-80 "
              >
                Register
              </button>
              {errors?.other ? <p className="text-red-700 text-sm">{errors.other}</p> : ""}
            </form>
            <div className="w-full flex flex-row gap-x-2 justify-end mb-4">
              <p>Don't have an account?</p>
              <Link to="/login" className="text-blue-500 underline hover:text-blue-600">
                SignIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
