import { createSlice } from "@reduxjs/toolkit";
import {
  fetchfeaturedPlaylists,
  fetchPlaylistTrackData,
  fetchPlaylist,
} from "./getplaylistApi"; // Import the fetchPlaylists function

const initialState = {
  playlistsData: [],
  playlistTracks: [],
  playlist: [], // State to hold playlists data
};

const playlistsDataSlice = createSlice({
  name: "playlistsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchfeaturedPlaylists.fulfilled, (state, action) => {
        state.playlistsData = action.payload; // Update state with fetched data
      })
      .addCase(fetchPlaylistTrackData.fulfilled, (state, action) => {
        state.playlistTracks = action.payload; // Update state with fetched playlist track data
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.playlist = action.payload;
      });
  },
});

export default playlistsDataSlice.reducer;
