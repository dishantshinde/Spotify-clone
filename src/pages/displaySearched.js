import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../components/CardItem";
import { fetchSearched } from "../features/getSearched/getSearchedApi";
import { useOutletContext, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function DisplaySearched() {
  const dispatch = useDispatch();

  // Fetch searched data when the component mounts or searchQuery changes
  const { query } = useParams();
  useEffect(() => {
    if (query) {
      dispatch(fetchSearched(query));
    }
  }, [dispatch, query]);

  const { displayRef } = useOutletContext();

  // Use default values to avoid null errors
  const searchedData =
    useSelector((state) => state.searched.searchedData) || {};
  console.log("searcheddata from useselector", searchedData);
  const {
    albumData = [],
    artistsData = [],
    tracksData = [],
    playlistData = [],
  } = searchedData;

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Searched Albums</h1>
        <div className="flex overflow-auto">
          {albumData.length > 0 ? (
            albumData.map((item, indx) => (
              <CardItem
                key={indx}
                name={item.name}
                desc="Album"
                id={item.id}
                image={item.image}
                type="album"
              />
            ))
          ) : (
            <p>No albums available</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Searched Artists</h1>
        <div className="flex overflow-auto">
          {artistsData.length > 0 ? (
            artistsData.map((item, indx) => (
              <CardItem
                key={indx}
                name={item.name}
                desc="Artist"
                id={item.id}
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
        <h1 className="my-5 font-bold text-2xl">Searched Playlists</h1>
        <div className="flex overflow-auto">
          {playlistData.length > 0 ? (
            playlistData.map((item, indx) => (
              <CardItem
                key={indx}
                name={item.name}
                desc="Playlist"
                id={item.id}
                image={item.images} // Assuming `images` holds the playlist image
                type="playlist"
              />
            ))
          ) : (
            <p>No playlists available</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Searched Tracks</h1>
        <div className="flex overflow-auto">
          {tracksData.length > 0 ? (
            tracksData.map((item, indx) => (
              <CardItem
                key={indx}
                name={item.name}
                desc="Single"
                id={item.id}
                image={item.albumOfTrack.url} // Assuming this property exists in tracks
                type="single"
                singlesData={tracksData}
              />
            ))
          ) : (
            <p>No tracks available</p>
          )}
        </div>
      </div>
    </>
  );
}
