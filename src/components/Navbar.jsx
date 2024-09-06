import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { PlayerContext } from "./../context/Playercontext";
import ErrorMessage from "./error";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";
import { current } from "@reduxjs/toolkit";
const auth = getAuth(app);
const Navbar = ({ isSearchBarVisible, onSearch }) => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { error } = useContext(PlayerContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, (current) => {
      if (current) {
        setUser(current);
      } else {
        setUser(null);
      }
    });
  });

  const handleInputChange = () => {
    onSearch(query);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="w-full bg-transparent mt-2 mb-2 px-4">
        <div className="flex justify-between items-center">
          {/* Navigation Arrows */}
          <div className="flex gap-2 items-center">
            <img
              onClick={() => navigate("/dashboard")}
              className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
              src={assets.arrow_left}
              alt="Back"
            />
            <img
              onClick={() => navigate(1)}
              className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
              src={assets.arrow_right}
              alt="Forward"
            />
          </div>

          {/* Conditional Rendering of the Search Bar */}
          {isSearchBarVisible && (
            <div className="w-full max-w-md mt-2 mx-auto lg:mx-0 hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  className="w-full bg-[#242424] pl-14 pr-4 py-2.5 border-[#242424] text-white rounded-full focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="What do you want to play?"
                  autoFocus
                />
                <div
                  onClick={handleInputChange}
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                >
                  <img
                    className="h-6 w-6 text-gray-600 cursor-pointer"
                    src={assets.search_icon}
                    alt="Search"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sign Up and Log In Buttons */}
          <div className="flex items-center gap-4 lg:gap-6 pr-4 lg:pr-16">
            {user && location.pathname !== "/" ? (
              <>
                {/* Display when user is authenticated (true) */}
                <Link
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default navigation behavior of Link
                    window.open(
                      "https://www.spotify.com/de-en/download/windows/",
                      "_blank"
                    ); // Open the URL in a new tab
                  }}
                  className="hidden sm:block"
                >
                  <p className="bg-black text-white font-bold hover:bg-green-400 hover:text-black py-1 px-3 rounded-full text-sm sm:text-base">
                    Install App
                  </p>
                </Link>
                <Link
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default navigation behavior of Link
                    window.open(
                      "https://www.spotify.com/in-en/premium/",
                      "_blank"
                    ); // Open the URL in a new tab
                  }}
                  className="hidden sm:block"
                >
                  <p className="bg-white text-black font-bold hover:bg-green-400 text-sm sm:text-base px-4 sm:px-6 py-2 rounded-2xl">
                    Explore Premium
                  </p>
                </Link>
              </>
            ) : (
              <>
                {/* Display when user is not authenticated (false) */}
                <Link to="/signup" className="hidden sm:block">
                  <p className="bg-black text-white font-bold hover:bg-green-400 hover:text-black py-1 px-3 rounded-full text-sm sm:text-base">
                    Sign up
                  </p>
                </Link>
                <Link to="/login" className="hidden sm:block">
                  <p className="bg-white text-black font-bold hover:bg-green-400 text-sm sm:text-base px-4 sm:px-6 py-2 rounded-2xl">
                    Log in
                  </p>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <div>
              <div className="block sm:hidden relative flex">
                <div className="flex items-center gap-2 pl-8 mr-14">
                  <img
                    className="w-8"
                    src={assets.spotify1_icon}
                    alt="Spotify"
                  />
                  <p className="font-bold text-[20px] text-white">Spotify</p>
                </div>
                <button
                  className="text-white focus:outline-none"
                  onClick={toggleMenu}
                >
                  <i className="fa fa-solid fa-bars"></i>
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute z-50 top-6 right-2 mt-2 w-48 bg-[#242424] rounded-lg shadow-lg">
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-white hover:bg-[#121212] rounded-t-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-white hover:bg-[#121212]"
                      onClick={() => setMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/help"
                      className="block px-4 py-2 text-white hover:bg-[#121212] rounded-b-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      Help
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-2 mx-auto lg:mx-0 sm:hidden">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="w-full bg-[#242424] pl-14 pr-4 py-2 border-[#242424] text-white rounded-full focus:ring-2 focus:ring-white focus:border-transparent"
              placeholder="Search"
            />
            <div
              onClick={handleInputChange}
              className="absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <img
                className="h-6 w-6 text-gray-600 cursor-pointer"
                src={assets.search_icon}
                alt="Search"
              />
            </div>
          </div>
        </div>
        {error && <ErrorMessage message={error} />}
      </div>
    </>
  );
};

export default Navbar;
