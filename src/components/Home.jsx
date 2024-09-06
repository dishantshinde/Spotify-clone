import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Home = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchClick = () => {
    setIsSearchBarVisible(true);
  };

  // Function to handle search input
  const handleSearch = (query) => {
    // For now, we'll just log the query. In a real app, you'd search the database or API.
    console.log("Search query:", query);
    // You can set the search results here or handle them according to your logic
    setSearchResults([]); // Placeholder: update with actual search results
  };

  return (
    <div className="bg-black h-screen">
      <div className="h-[98%] w-[100vw] flex">
        <Sidebar onSearchClick={handleSearchClick} />
        {/* Pass the onSearch function to Navbar */}

        <div className="flex flex-col w-[100%] h-[90vh] sm:w-[75%]">
          <Navbar
            isSearchBarVisible={isSearchBarVisible}
            onSearch={handleSearch}
          />
          <div className="h-[95vh] flex flex-col justify-center items-center mb-6 px-4">
            <h1 className="text-[40px] sm:text-[65px] font-bold text-green-400 text-center">
              Welcome to Spotify
            </h1>
            <h3 className="text-[20px] sm:text-[30px] text-center text-white mt-2 sm:mt-4">
              Login to Browse, music albums...
            </h3>
            <p className="text-[14px] sm:text-[17px] text-white text-center w-full sm:w-[60%] mt-3 sm:mt-5">
              This Spotify-themed app is designed to showcase the integration of
              the Rapid API. It allows users to browse music albums, artists,
              and playlists, while offering a seamless user experience with
              login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
