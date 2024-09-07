import React, { useContext, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { PlayerContext } from "./../context/Playercontext";
import ColorThief from "colorthief"; // Import ColorThief
import { FaPlay } from "react-icons/fa";
import Navbar from "../components/Navbar";
import {
  fetchPlaylistTrackData,
  fetchPlaylist,
} from "../features/getPlaylist/getplaylistApi";

export default function DisplayPlaylist() {
  const { handlePlayWithId, setSongsList, track } = useContext(PlayerContext);
  const { id } = useParams(); // Using only 'id' since we are fetching playlist data
  const dispatch = useDispatch();

  // Fetch playlist data from the Redux store
  const playlist = useSelector((state) => state.playlistData.playlist);
  const playlistTracks = useSelector(
    (state) => state.playlistData.playlistTracks
  );
  const { displayRef } = useOutletContext();

  useEffect(() => {
    if (playlistTracks) {
      setSongsList(playlistTracks);
    }
  }, [playlistTracks, setSongsList]);

  useEffect(() => {
    // Dispatch action to fetch playlist data
    dispatch(fetchPlaylist(id));
    dispatch(fetchPlaylistTrackData(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (playlist && playlist.image) {
      const colorThief = new ColorThief();
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = playlist.image;

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
  }, [playlist]);

  if (!playlist || !playlistTracks) {
    return (
      <>
        <p className="text-white">Loading playlist data...</p>
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
            src={playlist.image}
            alt={playlist.name}
          />
        </div>
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {playlist.name}
          </h2>
          <h4>{playlist.desc || "No description available"}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt="Spotify logo"
            />
            <b> Spotify </b>
            &#8226; {` ${playlist.followers} followers `} &#8226;
            {` ${playlist.totalTracks} tracks`}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
          Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock icon" />
      </div>
      <hr />
      {playlistTracks &&
        playlistTracks.map((item, indx) => (
          <div
            onClick={() => handlePlayWithId(item.trackid)}
            className={`grid grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer ${
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
              <img
                className="inline w-10 mr-5"
                src={item.image || item.albumImage}
                alt={item.trackName}
              />
              {item.name || item.trackName}
            </p>
            <p className="text-[12px]">{item.albumName}</p>
            <p className="text-[12px] hidden sm:block">{item.date}</p>
            <p className="text-[12px] text-center">
              {`${(item.duration / 60000).toFixed(1)} min`}
            </p>
          </div>
        ))}
    </>
  );
}
