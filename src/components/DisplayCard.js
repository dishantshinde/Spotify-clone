import React, { useContext, useEffect } from "react";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistOverview } from "./../features/getArtists/getArtistsApi";
import {
  fetchPlaylist,
  fetchPlaylistTrackData,
} from "./../features/getPlaylist/getplaylistApi";
import { PlayerContext } from "./../context/Playercontext";
import { fetchAlbumsData } from "./../features/getAlbums/getAlbumsApi";
import ColorThief from "colorthief"; // Import Colorthief
import TrackItem from "./Trackitem";

export default function DisplayCard({ displayRef }) {
  const { handlePlayWithId, setSongsList } = useContext(PlayerContext);
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const isArtist = type === "artist";

  // Fetch data from the Redux store based on the `type`
  const actionMap = [
    { type: "album", action: fetchAlbumsData },
    { type: "artist", action: fetchArtistOverview },
    { type: "playlist", action: [fetchPlaylist, fetchPlaylistTrackData] },
  ];

  const selectDataByType = (state, type) => {
    switch (type) {
      case "album":
        return state.albumsData.albumData;
      case "artist":
        return state.artistData.artistOverview;
      case "playlist":
        return state.playlistData.playlistTracks;
      case "radio":
        return state.radioData.radios;
      default:
        return null;
    }
  };

  const data = useSelector((state) => selectDataByType(state, type));
  const playlist = useSelector((state) => state.playlistData.playlist);
  console.log("data image is", data);
  useEffect(() => {
    setSongsList(data);
  }, [data, setSongsList]);

  useEffect(() => {
    const actionEntry = actionMap.find((entry) => entry.type === type);
    if (actionEntry && actionEntry.action) {
      if (Array.isArray(actionEntry.action)) {
        actionEntry.action.forEach((action) => {
          dispatch(action(id));
        });
      } else {
        dispatch(actionEntry.action(id));
      }
    } else {
      console.warn(`No action found for type: ${type}`);
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if ((data && data.image) || playlist.image) {
      console.log("inside color thief");
      const colorThief = new ColorThief();
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Ensure the image is fetched with CORS
      img.src = data.image || playlist.image;

      img.onload = () => {
        try {
          // Extract the dominant color
          const [r, g, b] = colorThief.getColor(img);
          const dominantColor = `rgb(${r}, ${g}, ${b})`; // Convert RGB array to CSS string
          console.log("Dominant Color:", dominantColor); // Log dominant color

          // Set background with the dominant color
          if (displayRef.current) {
            displayRef.current.style.background = `linear-gradient(to bottom, ${dominantColor} 0%, #121212 20%)`;
          }
        } catch (error) {
          console.error("Error extracting color:", error);
        }
      };
    }
  }, [data]); // Dependency array includes data and displayRef
  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        {data ? (
          <>
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: `${type === "artist" ? "50%" : "5px"}`,
                overflow: "hidden",
              }}
            >
              <img
                className="object-cover w-full h-full"
                src={playlist.image || data.image}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
              <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                {playlist.name || data.name}
              </h2>
              <h4>{data.desc}</h4>
              <p className="mt-1">
                <img
                  className="inline-block w-5"
                  src={assets.spotify_logo}
                  alt=""
                />
                <b> Spotify </b>
                &#8226; {` ${
                  playlist.followers || data.followers
                } followers `}{" "}
                &#8226;
                {` ${playlist.totalTracks || data.monthlyListeners} ${
                  playlist ? "tracks" : "listeners"
                }`}
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
        <p>{type === "artist" ? "Play count" : "Album"}</p>
        {type !== "artist" && <p className="hidden sm:block">Date Added</p>}

        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {data &&
        (data.toptracks || data).map((item, indx) => (
          <div
            onClick={() => handlePlayWithId(item.trackid)}
            className={`grid grid-cols-3 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] ${
              type === "artist" ? "grid-cols-3" : ""
            } gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer`}
            key={indx}
          >
            <p className="text-white text-[13px]">
              <b className="mr-4 text-[#a7a7a7]">{indx + 1}</b>
              <img
                className="inline w-10 mr-5"
                src={item.image || item.albumImage}
                alt=""
              />
              {item.name || item.trackName}
            </p>
            <p className="text-[12px]">
              {type === "artist"
                ? Number(item.playcount).toLocaleString()
                : item.albumName || playlist.name}
            </p>
            {type !== "artist" && (
              <p className="text-[12px] hidden sm:block">{item.date}</p>
            )}
            <p className="text-[12px] text-center">
              {`${(item.duration / 60000).toFixed(1)} min`}
            </p>
          </div>
        ))}
    </>
  );
}
