import React, { useContext, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumsData } from "../features/getAlbums/getAlbumsApi";
import { PlayerContext } from "./../context/Playercontext";
import ColorThief from "colorthief";
import { FaPlay } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";

export default function DisplayAlbum() {
  const { handlePlayWithId, setSongsList, track } = useContext(PlayerContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { displayRef } = useOutletContext();

  // Fetch the album data from the Redux store
  const albumData = useSelector((state) => state.albumsData.albumsData);
  console.log("albums object", albumData);

  useEffect(() => {
    // Fetch the album data when the component mounts or when the `id` changes
    dispatch(fetchAlbumsData(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (albumData) {
      setSongsList(albumData.tracks || []); // Ensure tracks is an array
    }
  }, [albumData, setSongsList]);

  useEffect(() => {
    if (albumData?.image) {
      const colorThief = new ColorThief();
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = albumData.image;

      img.onload = () => {
        try {
          const [r, g, b] = colorThief.getColor(img);
          const dominantColor = `rgb(${r}, ${g}, ${b})`;

          if (displayRef.current) {
            displayRef.current.style.background = `linear-gradient(to bottom, ${dominantColor} 0%, #121212 60%)`;
          }
        } catch (error) {
          console.error("Error extracting color:", error);
        }
      };
    }
  }, [albumData, displayRef]);

  // Render loading state if data is not yet available
  if (!albumData) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <img
            className="object-cover w-full h-full"
            src={albumData.image}
            alt={albumData.name}
          />
        </div>
        <div className="flex flex-col">
          <p>Album</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.label}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt="Spotify logo"
            />
            <b> Spotify </b>
            &#8226;
            {` ${albumData.totalTracks} tracks`}
          </p>
        </div>
      </div>
      <div
        className="grid grid-cols-4 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] mt-10 mb-4 pl-2 text-[#a7a7a7]"
        style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
      >
        <p>
          <b className="mr-4">#</b>
          Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock icon" />
      </div>
      <hr />
      {albumData.tracks && albumData.tracks.length ? (
        albumData.tracks.map((item, indx) => (
          <div
            onClick={() => handlePlayWithId(item.id)}
            className={`grid grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer ${
              item.id === track.id ? "bg-[#ffffff2b]" : ""
            }`}
            key={item.id}
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }} // Use item.id as key instead of indx
          >
            <p
              className={`text-white text-[13px] ${
                item.id === track.id ? "flex items-center" : ""
              }`}
            >
              {item.id === track.id ? (
                <FaPlay size={13} color="#1DB954" className="mr-4" />
              ) : (
                <b className="mr-4 text-[#a7a7a7]">{indx + 1}</b>
              )}
              <img
                className="inline w-10 mr-5"
                src={albumData.image}
                alt={item.name}
              />
              {item.name}
            </p>
            <p className="text-[12px]">{albumData.name}</p>
            <p className="text-[12px] hidden sm:block">
              {albumData.releaseDate}
            </p>
            <p className="text-[12px] text-center">
              {`${(item.duration_ms / 60000).toFixed(1)} min`}
            </p>
          </div>
        ))
      ) : (
        <p>No tracks available</p>
      )}
    </>
  );
}
