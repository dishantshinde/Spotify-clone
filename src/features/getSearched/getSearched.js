import { createSlice } from "@reduxjs/toolkit";
import { fetchSearched } from "./getSearchedApi"; // Adjust the import path

const initialState = {
  searchedData: null,
};

const searchedSlice = createSlice({
  name: "searched",
  initialState,
  reducers: {
    // Add any synchronous reducers if needed here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearched.fulfilled, (state, action) => {
      state.searchedData = action.payload; // Save the data to the state
    });
  },
});

// Export the async thunk and the slice reducer
export default searchedSlice.reducer;
