import React from "react";
import CardItem from "../CardItem";
import { fetchArtists } from "../../features/getArtists/getArtistsApi";
import { fetchSingles } from "../../features/getSingle/getSingleApi";
import { fetchfeaturedPlaylists } from "../../features/getPlaylist/getplaylistApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "../Navbar";
import { useLocation, useOutletContext } from "react-router";

export default function Displayhome() {
  // Use default values to avoid null errors
  const artistData = useSelector((state) => state.artistData.artists || []);
  const { displayRef, isSearchBarVisible, onSearch } = useOutletContext();
  const location = useLocation();
  const PlaylistData = useSelector(
    (state) => state.playlistData.playlistsData || []
  );
  const Singles = useSelector((state) => state.SinglesData.singles || []);
  console.log("singles...", Singles);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArtists());
    dispatch(fetchfeaturedPlaylists());
    dispatch(fetchSingles());
  }, [dispatch]);
  useEffect(() => {
    if (displayRef.current) {
      if (location.pathname === "/dashboard") {
        displayRef.current.style.background = "#121212"; // Default background color
      }
      // Add more conditions if you need to handle other routes
    }
  }, [location.pathname]);
  return (
    <>
      <Navbar isSearchBarVisible={isSearchBarVisible} onSearch={onSearch} />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {PlaylistData.length > 0 ? (
            PlaylistData.map((item, indx) => (
              <CardItem
                key={indx}
                name={item.name}
                desc={item.desc}
                id={item.playlistid}
                indx={indx}
                image={item.image}
                type="playlist"
              />
            ))
          ) : (
            <p>No playlists available</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Popular Artists</h1>
        <div className="flex overflow-x-auto">
          {artistData.length > 0 ? (
            artistData.map((item, indx) => (
              <CardItem
                key={indx}
                name={item.name}
                desc="Artist"
                id={item.artistid}
                image={item.image}
                type="artist"
              />
            ))
          ) : (
            <p>No artists available</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Popular Singles</h1>
        <div className="flex overflow-auto">
          {/* Check if Singles and Singles.tracks are defined before mapping */}
          {Singles && Singles.tracks && Singles.tracks.items ? (
            Singles.tracks.items.map((item, indx) => (
              <CardItem
                key={indx}
                name={item.name}
                desc="Single"
                id={item.id} // Assuming this should be changed to item.id if single ID is available
                image={item.albumOfTrack.url}
                type="single" // Assuming you have a 'single' type
                singlesData={Singles.tracks.items}
              />
            ))
          ) : (
            <p>No singles available</p>
          )}
        </div>
      </div>
    </>
  );
}
