import { configureStore } from "@reduxjs/toolkit";
import getArtists from "../features/getArtists/getArtists";
import getAlbums from "../features/getAlbums/getAlbums";
import getplaylist from "../features/getPlaylist/getplaylist";
import getSingle from "../features/getSingle/getSingle";
import getSearched from "../features/getSearched/getSearched";
export const store = configureStore({
  reducer: {
    artistData: getArtists,
    albumsData: getAlbums,
    playlistData: getplaylist,
    SinglesData: getSingle,
    searched: getSearched,
  },
});
