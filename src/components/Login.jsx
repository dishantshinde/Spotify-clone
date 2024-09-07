import React, { useState } from "react";
import { assets } from "../assets/assets.js"; // Import assets for images
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import { Link, useNavigate } from "react-router-dom"; // Import navigation functions
import { useUserAuth } from "../context/UserAuthContext"; // Import authentication context

const Login = () => {
  const [email, setEmail] = useState(""); // State to store email input
  const [password, setPassword] = useState(""); // State to store password input
  const [error, setError] = useState(""); // State to store any error messages
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { logIn, googleSignIn } = useUserAuth(); // Destructure login functions from auth context

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password); // Attempt to log in
      navigate("/dashboard"); // Redirect on success
    } catch (error) {
      setError(error.message); // Set error message on failure
      alert(error); // Display error message
    }
  }

  // Handle Google Sign-In
  async function handleGoogleSignIn(e) {
    e.preventDefault();
    try {
      await googleSignIn(); // Attempt Google sign-in
      navigate("/dashboard"); // Redirect on success
    } catch (error) {
      setError(error.message); // Set error message on failure
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#242424] px-4 ">
      <div className="w-full sm:w-[75%] md:w-[50%] lg:w-[40%] bg-[#121212] px-8 py-8 sm:py-12 sm:px-12 rounded-lg mt-8 mb-8">
        <div className="flex justify-center mb-6">
          <img
            className="w-12 h-16"
            src={assets.spotify1_icon}
            alt="Spotify Icon"
          />{" "}
          {/* Spotify logo */}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-6">
          Log in to Spotify
        </h2>
        <form onSubmit={handleSubmit}>
          <div
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-4 bg-[#121212] border border-gray-500 py-3 px-4 rounded-full cursor-pointer hover:ring-2 hover:ring-white"
          >
            <FcGoogle className="w-6 h-6" /> {/* Google sign-in icon */}
            <button className="text-white font-bold">
              Continue with Google
            </button>
          </div>
          <hr className="mt-8 mb-6 border-gray-600" />
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold mb-2">
              Email or Username
            </label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] rounded-md focus:ring-2 text-white focus:ring-white"
              placeholder="name@domain.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-[#1e1e1e] rounded-md text-white focus:ring-2 focus:ring-white"
              placeholder="Password"
            />
          </div>
          <button className="w-full bg-green-500 text-black py-3 px-4 rounded-full font-bold hover:bg-green-400 transition-colors duration-300">
            Log In
          </button>
        </form>
        <a
          href="#"
          className="block text-center mt-4 text-white font-semibold underline"
        >
          Forgot your password?
        </a>
        <div className="flex justify-center mt-6 text-gray-400">
          <p>Don't have an account?</p>
          <Link
            to="/signup"
            className="ml-2 text-white underline font-semibold"
          >
            Sign up for Spotify
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
