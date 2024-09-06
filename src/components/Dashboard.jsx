import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import Display from "./Display/Display";
import Player from "./player/player";
import { PlayerContext } from "../context/Playercontext";
import { fetchSearched } from "../features/getSearched/getSearchedApi";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const { track, refOfAudio } = useContext(PlayerContext);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsSearchBarVisible(true);
  };
  // Function to handle search input
  const handleSearch = (query) => {
    navigate(`/dashboard/card/searched/${query}`); // Placeholder: update with actual search results
  };

  return (
    <div className="bg-black h-screen">
      <div className="h-[98%] flex">
        <Sidebar onSearchClick={handleSearchClick} />
        {/* Pass the onSearch function to Navbar */}
        <Display
          isSearchBarVisible={isSearchBarVisible}
          onSearch={handleSearch}
        />
      </div>
      {track && track.url && <Player />}
      <audio ref={refOfAudio}></audio>
    </div>
  );
};

export default Home;
