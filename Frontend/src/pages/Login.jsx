import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { axios, setToken } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = state === "login" ? "/api/user/login" : "/api/user/register";

    try {
      const { data } = await axios.post(url, { name, email, password });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 m-auto items-start p-8 py-10 w-80 sm:w-[360px] rounded-2xl shadow-2xl 
                   border border-gray-700 bg-gray-900/80 backdrop-blur-xl text-gray-200"
      >
        {/* Title */}
        <p className="text-3xl font-semibold text-center w-full">
          <span className="text-indigo-500">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {/* Name (Only for Register) */}
        {state === "register" && (
          <div className="w-full">
            <p className="text-sm text-gray-400">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className="border border-gray-700 rounded-lg w-full p-2 mt-1 bg-gray-800/70 text-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              type="text"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full">
          <p className="text-sm text-gray-400">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="border border-gray-700 rounded-lg w-full p-2 mt-1 bg-gray-800/70 text-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            type="email"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p className="text-sm text-gray-400">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="border border-gray-700 rounded-lg w-full p-2 mt-1 bg-gray-800/70 text-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            type="password"
            required
          />
        </div>

        {/* Switch between Login / Register */}
        {state === "register" ? (
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-400">
            Don’t have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition"
            >
              Sign up
            </span>
          </p>
        )}

        {/* Submit Button */}
        <button
          className="bg-indigo-600 hover:bg-indigo-500 transition-all text-white w-full py-2 rounded-lg 
                     font-medium shadow-md hover:shadow-lg"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
