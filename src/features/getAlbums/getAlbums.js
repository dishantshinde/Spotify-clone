import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbumsData } from "./getAlbumsApi";
import { fetchTrackData } from "./getAlbumsApi";

const initialState = {
  albumsData: [],
  trackData: [], // State to hold albums data
};

const albumsDataSlice = createSlice({
  name: "albumsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsData.fulfilled, (state, action) => {
        state.albumsData = action.payload; // Update state with fetched data
      })
      .addCase(fetchTrackData.fulfilled, (state, action) => {
        state.trackData = action.payload; // Update state with fetched data
      });
  },
});

export default albumsDataSlice.reducer;
