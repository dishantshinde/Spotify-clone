import React from "react";
import { assets } from "../assets/assets"; // Import assets for icons
import { Link } from "react-router-dom"; // Import Link for navigation

const Sidebar = ({ onSearchClick }) => {
  return (
    <div className="w-full lg:w-[25%] p-2 h-full text-white flex-col gap-2 hidden lg:flex">
      {/* Sidebar container with responsive width and padding */}
      <div className="h-[28%] bg-[#121212] flex flex-col justify-around rounded">
        {/* Upper section of the sidebar */}
        <div className="flex items-center gap-5 pl-8">
          {/* Spotify logo and title */}
          <img className="w-8" src={assets.spotify1_icon} alt="Spotify" />
          <p className="font-bold text-[20px]">Spotify</p>
        </div>
        <Link to="/">
          {/* Link to the home page */}
          <div className="flex items-center gap-5 pl-8 cursor-pointer">
            <img className="w-6" src={assets.home_icon} alt="Home" />
            <p className="font-bold">Home</p>
          </div>
        </Link>
        <div
          className="flex items-center cursor-pointer gap-5 pl-8"
          onClick={onSearchClick}
        >
          {/* Search section with icon and click event */}
          <img className="w-6" src={assets.search_icon} alt="Search" />
          <p className="font-bold">Search</p>
        </div>
      </div>
      <div className="h-[72%] bg-[#121212] rounded">
        {/* Lower section of the sidebar */}
        <div className="flex items-center p-4 justify-between">
          {/* Your Library section with an icon */}
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="Your Library" />
            <p className="font-semibold">Your library</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Add playlist icon */}
            <img
              className="w-5 cursor-pointer"
              src={assets.plus_icon}
              alt="Add"
            />
          </div>
        </div>
        {/* Create Playlist section */}
        <div className="bg-[#242424] p-4 m-2 rounded font-semibold flex flex-col items-start justify-start">
          <h1>Create your first playlist</h1>
          <p className="font-light">It's easy we'll help you</p>
          <button className="bg-white text-[15px] text-black border rounded-full mt-4 px-1.5 py-1">
            Create Playlist
          </button>
        </div>
        {/* Browse Podcasts section */}
        <div className="bg-[#242424] p-4 m-2 rounded font-semibold flex flex-col items-start justify-start">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We'll keep you updated to new episodes</p>
          <button className="bg-white text-[15px] text-black border rounded-full mt-4 px-2 py-1">
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
