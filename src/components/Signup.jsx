import React, { useState } from "react";
import { assets } from "../assets/assets.js"; // Importing assets
import { FcGoogle } from "react-icons/fc"; // Google icon
import { Link, useNavigate } from "react-router-dom"; // Navigation and linking
import { useUserAuth } from "../context/UserAuthContext"; // Custom authentication context

function SignUp() {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate(); // To navigate between routes
  const { signUp, googleSignIn } = useUserAuth(); // Custom hook to handle authentication

  // Handle form submission for email/password sign up
  async function handleSumbit(e) {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password); // Call sign-up function
      navigate("/login"); // Navigate to login page on success
    } catch (error) {
      setError(error.message); // Set error message
      alert(error);
    }
  }

  // Handle Google sign-in
  async function handleGoogleSignIn(e) {
    e.preventDefault();

    try {
      await googleSignIn(); // Google sign-in function
      navigate("/dashboard"); // Navigate to dashboard on success
    } catch (error) {
      setError(error.message); // Set error message on failure
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212]">
      {" "}
      {/* Main container */}
      <div className=" mb-8 rounded-lg ">
        <img
          className="w-18  ml-28 justify-center items-center px-4 py-4 "
          src={assets.spotify1_icon}
        />{" "}
        {/* Spotify icon */}
        <h2 className="text-[45px] font-bold text-center text-white ">
          Sign Up to
        </h2>{" "}
        {/* Heading */}
        <h2 className="text-[45px] font-bold text-center text-white mb-6 ">
          start listening
        </h2>{" "}
        {/* Subheading */}
        <form onSubmit={handleSumbit}>
          {" "}
          {/* Form for email/password sign-up */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold mb-2">
              Email address
            </label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 px-3 py-2 border border-white bg-[#121212] rounded-md focus:ring-2 text-white focus:ring-white"
              placeholder="name@domain.com"
            />{" "}
            {/* Email input */}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white font-bold mb-2"
            >
              Password
            </label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-80 px-3 py-2 border border-white bg-[#121212] rounded-md text-white focus:ring-2 focus:ring-white"
              type="password"
              placeholder="password"
            />{" "}
            {/* Password input */}
          </div>
          <button className="w-80 bg-green-500 text-black py-3 px-4 rounded-full font-bold hover:bg-green-400">
            {" "}
            Sign Up
          </button>{" "}
          {/* Sign-up button */}
        </form>
        <p className="mt-6 text-white text-center">or</p> {/* OR section */}
        <div
          onClick={handleGoogleSignIn}
          className=" mt-6 flex gap-12 w-80 bg-green-[#121212] border py-3 px-4 rounded-full cursor-pointer  hover:ring-2 hover:ring-white"
        >
          <FcGoogle className="w-6 h-6" /> {/* Google sign-in button */}
          <button className="font-bold text-white"> Sign up with google</button>
        </div>
        <hr className="mt-10 bg-gray-400" /> {/* Divider */}
        <div className="ml-6 flex gap-2 mt-8">
          <p className="text-gray-400">Already have an account?</p>{" "}
          {/* Redirect to login if account exists */}
          <Link to="/login">
            <a href="#" className="underline text-white">
              Login here
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
