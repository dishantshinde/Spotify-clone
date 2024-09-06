import { createSlice } from "@reduxjs/toolkit";
import { fetchSingles } from "./getSingleApi"; // Update the path as needed

const singleAlbumSlice = createSlice({
  name: "singleAlbum",
  initialState: {
    singles: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingles.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.singles = action.payload;
    });
  },
});

export default singleAlbumSlice.reducer;
