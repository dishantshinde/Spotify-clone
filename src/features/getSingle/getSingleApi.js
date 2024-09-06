import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const headersObj = {
  headers: {
    "X-RapidAPI-Key": "0411790049mshb4bce9526db2fd5p188648jsn49bdc186ba62",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

export const fetchSingles = createAsyncThunk(
  "album/fetchSinglesData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://spotify23.p.rapidapi.com/search/?q=popular%20bollywood&type=tracks&offset=0&limit=10&numberOfTopResults=10",
        headersObj
      );

      const trackData = response.data;

      const trackDetails = {
        tracks: {
          totalCount: trackData.tracks.totalCount,
          items: trackData.tracks.items.map((track) => ({
            id: track.data.id,
            name: track.data.name,
            albumOfTrack: {
              id: track.data.albumOfTrack.uri.split(":")[2], // Extracting album ID from URI
              name: track.data.albumOfTrack.name,
              url: track.data.albumOfTrack.coverArt.sources[0]?.url,
            },
            artists: track.data.artists.items.map((artist) => ({
              name: artist.profile.name,
            })),
            contentRating: track.data.contentRating,
            duration_ms: track.data.duration.totalMilliseconds,
          })),
        },
      };

      console.log("Single tracks found", trackDetails);
      return trackDetails;
    } catch (error) {
      console.error("Error fetching singles data:", error); // Log error for debugging
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching single data"
      );
    }
  }
);
