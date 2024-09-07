import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { PlayerContext } from "./../context/Playercontext";
import ColorThief from "colorthief";
import Navbar from "../components/Navbar";
import { useOutletContext } from "react-router-dom";

export default function DisplaySingle() {
  const { handlePlayWithId, setSongsList, singleData } =
    useContext(PlayerContext);
  const { id } = useParams(); // Fetching single album by ID
  // Fetch the single album data from the Redux store
  const { displayRef } = useOutletContext();

  console.log("single album data", singleData);
  const singleObj = singleData?.find((single) => single.id === id);

  useEffect(() => {
    if (singleData && singleData.tracks) {
      setSongsList([]); // Ensure tracks is an array
    }
  }, [singleData, setSongsList]);

  useEffect(() => {
    if (singleObj && singleObj.albumOfTrack?.url) {
      const colorThief = new ColorThief();
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = singleObj.albumOfTrack.url;

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
  }, [singleData, displayRef]);

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        {singleObj ? (
          <>
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              {/* Ensure the image URL exists before rendering the img element */}
              {singleObj.albumOfTrack?.url ? (
                <img
                  className="object-cover w-full h-full"
                  src={singleObj.albumOfTrack.url}
                  alt={singleObj.name}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="flex flex-col">
              <p>Single</p>
              <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                {singleObj.name}
              </h2>
              <h4>
                {singleObj.artists?.map((artist) => artist.name).join(", ")}
              </h4>
              <p className="mt-1">
                <img
                  className="inline-block w-5"
                  src={assets.spotify_logo}
                  alt="Spotify"
                />
                <b> Spotify </b>
              </p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
          Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Rating</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock icon" />
      </div>
      <hr />
      {singleObj ? (
        <div
          onClick={() => handlePlayWithId(singleObj.id)}
          className="grid grid-cols-3 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white text-[13px]">
            <b className="mr-4 text-[#a7a7a7]">{1}</b>
            <img
              className="inline w-10 mr-5"
              src={singleObj.albumOfTrack?.url || assets.default_image} // Fallback image if url is not available
              alt={singleObj.name}
            />
            {singleObj.name}
          </p>
          <p className="text-[12px]">
            {singleObj.albumOfTrack?.name || "Unknown Album"}
          </p>
          <p className="text-[12px] hidden sm:block">
            {singleObj.contentRating.label}
          </p>
          <p className="text-[12px] text-center">
            {`${(singleObj.duration_ms / 60000).toFixed(1)} min`}
          </p>
        </div>
      ) : (
        <p>No tracks available</p>
      )}
    </>
  );
}
