import { createSlice } from "@reduxjs/toolkit";
import { fetchArtists } from "./getArtistsApi";
import { fetchArtistOverview } from "./getArtistsApi";
const initialState = {
  artists: [],
  artistOverview: [],
};
const albumsSlice = createSlice({
  name: "artistData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
      })
      .addCase(fetchArtistOverview.fulfilled, (state, action) => {
        state.artistOverview = action.payload;
      });
  },
});
export default albumsSlice.reducer;
