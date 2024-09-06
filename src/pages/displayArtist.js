import React, { useContext, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistOverview } from "../features/getArtists/getArtistsApi";
import { PlayerContext } from "./../context/Playercontext";
import ColorThief from "colorthief";
import { FaPlay } from "react-icons/fa";
import CardItem from "../components/CardItem";
import Navbar from "../components/Navbar";

export default function DisplayArtist() {
  const { handlePlayWithId, setSongsList, track } = useContext(PlayerContext);
  const { id } = useParams(); // Using only 'id' since we are fetching artist data
  const dispatch = useDispatch();

  // Fetch artist data from the Redux store
  const artistData = useSelector((state) => state.artistData.artistOverview);
  const topTracks = artistData?.toptracks || [];
  const artistAlbums = artistData?.artistAlbums || [];
  console.log("artist albums", artistAlbums);
  const { displayRef } = useOutletContext();

  useEffect(() => {
    if (artistData && artistData.toptracks) {
      setSongsList(artistData.toptracks);
    }
  }, [artistData, setSongsList]);

  useEffect(() => {
    dispatch(fetchArtistOverview(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (artistData && artistData.image) {
      const colorThief = new ColorThief();
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = artistData.image;

      img.onload = () => {
        try {
          const [r, g, b] = colorThief.getColor(img);
          const dominantColor = `rgb(${r}, ${g}, ${b})`;

          if (displayRef.current) {
            displayRef.current.style.background = `linear-gradient(to bottom, ${dominantColor} 0%, #121212 20%)`;
          }
        } catch (error) {
          console.error("Error extracting color:", error);
        }
      };
    }
  }, [artistData]);

  if (!artistData) {
    return (
      <>
        <p className="text-white">Loading artist data...</p>
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
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            className="object-cover w-full h-full"
            src={artistData.image}
            alt={artistData.name}
          />
        </div>
        <div className="flex flex-col">
          <p>Artist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {artistData.name}
          </h2>
          <h4>{artistData.Desc || "No description available"}.</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt="Spotify logo"
            />
            <b> Spotify </b>
            &#8226; {` ${artistData.followers} followers `} &#8226;
            {` ${artistData.monthlyListeners} listeners`}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
          Title
        </p>
        <p>Play count</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock icon" />
      </div>
      <hr />
      {topTracks.length ? (
        topTracks.map((item, indx) => (
          <div
            onClick={() => handlePlayWithId(item.trackid)}
            className={`grid grid-cols-3 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer ${
              item.trackid === track.id && "bg-[#ffffff2b]"
            }`}
            key={indx}
          >
            <p
              className={`text-white text-[13px] ${
                item.trackid === track.id && "flex items-center"
              }`}
            >
              {item.trackid === track.id ? (
                <FaPlay size={13} color="#1DB954" className="mr-4" />
              ) : (
                <b className="mr-4 text-[#a7a7a7]">{indx + 1}</b>
              )}
              <img className="inline w-10 mr-5" src={item.image} alt={""} />
              {item.name}
            </p>
            <p className="text-[12px]">
              {Number(item.playcount).toLocaleString()}
            </p>
            <p className="text-[12px] text-center">
              {`${(item.duration / 60000).toFixed(1)} min`}
            </p>
          </div>
        ))
      ) : (
        <p>No tracks available</p>
      )}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Artist albums</h1>
        <div className="flex overflow-auto">
          {artistAlbums.length ? (
            artistAlbums.map((item, indx) => (
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
    </>
  );
}
