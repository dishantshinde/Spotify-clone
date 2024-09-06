import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import Display from "./Display/Display";
import Player from "./player/player";
import { PlayerContext } from "../context/Playercontext";

const Home = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { track, refOfAudio } = useContext(PlayerContext);

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
      <div className="h-[98%] flex">
        <Sidebar onSearchClick={handleSearchClick} />
        {/* Pass the onSearch function to Navbar */}
        <Display />
      </div>
      {track && track.url && <Player />}
      <audio ref={refOfAudio}></audio>
    </div>
  );
};

export default Home;
