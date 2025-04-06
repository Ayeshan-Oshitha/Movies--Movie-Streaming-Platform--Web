import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../lib/firebase";

interface user {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  other?: string;
}

const Login = () => {
  const [user, setUser] = useState<user>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Errors = {};
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

  const SignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Inside Sign In function");
    try {
      await signIn(user.email, user.password);
      navigate("/");
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
          <p className="text-4xl font-medium text-red-600 mt-8">Sign In</p>
          <p className="mt-8 ">Welcome back, You have been missed!</p>
          <div className="w-[700px] mt-10">
            <form className="flex flex-col gap-y-8 mb-8">
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
                <label htmlFor="email" className="font-semibold ml-2">
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
                onClick={SignInSubmit}
                className="w-full mt-3 bg-red-700 text-white py-3 font-semibold tracking-wider rounded-lg hover:opacity-80 "
              >
                Login
              </button>
              {errors?.other ? <p className="text-red-700 text-sm">{errors.other}</p> : ""}
            </form>
            <div className="w-full flex flex-row gap-x-2 justify-end mb-4">
              <p>Don't have an account?</p>
              <Link to="/register" className="text-blue-500 underline hover:text-blue-600">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
