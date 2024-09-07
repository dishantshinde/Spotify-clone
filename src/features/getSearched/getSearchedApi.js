import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const apiKey = process.env.REACT_APP_API_KEY;
const headersObj = {
  headers: {
    "X-RapidAPI-Key": `${apiKey}`,
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

export const fetchSearched = createAsyncThunk(
  "album/fetchSearchedData",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=10`,
        headersObj
      );

      // Directly returning the response data without modification
      const { albums, artists, playlists, tracks } = response.data;
      const objData = {
        albumData:
          albums?.items?.map((ele) => {
            return {
              id: ele.data.uri.split(":")[2],
              name: ele.data.name,
              image:
                ele.data.coverArt?.sources?.[0]?.url || "default_image_url", // Fallback if coverArt or sources doesn't exist
            };
          }) || [],

        artistsData:
          artists?.items?.map((ele) => {
            return {
              id: ele.data.uri.split(":")[2],
              name: ele.data.profile?.name || "Unknown Artist", // Fallback if name is missing
              image:
                ele.data.visuals?.avatarImage?.sources?.[0]?.url ||
                "default_image_url", // Fallback if visuals or avatarImage is missing
            };
          }) || [],

        playlistData:
          playlists?.items?.map((ele) => {
            return {
              id: ele.data.uri.split(":")[2],
              name: ele.data.name || "Unknown Playlist", // Fallback if name is missing
              images:
                ele.data.images.items[0]?.sources[0]?.url ||
                "default_image_url", // Fallback if image or sources are missing
            };
          }) || [],

        tracksData:
          tracks?.items?.map((track) => {
            return {
              id: track.data.id,
              name: track.data.name || "Unknown Track", // Fallback if name is missing
              albumOfTrack: {
                id: track.data.albumOfTrack?.uri?.split(":")[2] || "unknown", // Fallback if albumOfTrack is missing
                name: track.data.albumOfTrack?.name || "Unknown Album", // Fallback if name is missing
                url:
                  track.data.albumOfTrack?.coverArt?.sources?.[0]?.url ||
                  "default_image_url", // Fallback if coverArt or sources are missing
              },
              artists:
                track.data.artists?.items?.map((artist) => ({
                  name: artist.profile?.name || "Unknown Artist", // Fallback if artist name is missing
                })) || [],
              contentRating: track.data.contentRating || "Not Rated", // Fallback if contentRating is missing
              duration_ms: track.data.duration?.totalMilliseconds || 0, // Fallback if duration is missing
            };
          }) || [],
      };
      console.log("searched response", objData);
      return objData;
    } catch (error) {
      console.error("Error fetching searched data:", error); // Log error for debugging
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching searched data"
      );
    }
  }
);
