// Importing necessary functions and libraries from Redux Toolkit and Axios
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching the API key from environment variables
const apiKey = process.env.REACT_APP_API_KEY;

// Defining the headers object to be used in the API requests
const headersObj = {
  headers: {
    "X-RapidAPI-Key": `${apiKey}`, // RapidAPI Key for authentication
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com", // RapidAPI host endpoint for Spotify API
  },
};

// Thunk to fetch a list of artists from the Spotify API
export const fetchArtists = createAsyncThunk(
  "artist/fetchArtists", // Action type for fetching artists
  async () => {
    try {
      // Making a GET request to the Spotify API to fetch popular Hindi artists
      const response = await axios.get(
        "https://spotify23.p.rapidapi.com/search/?q=popular%20hindi&type=artists&offset=0&limit=10&numberOfTopResults=10",
        headersObj
      );

      // Extracting and transforming the response data to a more usable format
      const dataObj = response.data?.artists?.items.map((ele) => {
        return {
          artistid: ele.data?.uri?.split(":")[2], // Extracting artist ID from the URI
          name: ele.data?.profile?.name, // Extracting artist's name
          image: ele.data?.visuals?.avatarImage?.sources[1]?.url, // Extracting artist's image
        };
      });
      console.log("updated data", dataObj); // Logging the transformed data for debugging
      return dataObj; // Return the transformed data to be stored in the Redux state
    } catch (error) {
      // Catching and logging any errors that occur during the API call
      console.error("Error fetching albums:", error);
      throw error; // Re-throw the error to be caught by Redux for proper error handling
    }
  }
);

// Thunk to fetch detailed artist information (overview, albums, popular songs, etc.) from the Spotify API
export const fetchArtistOverview = createAsyncThunk(
  "artist/fetchArtistAlbums", // Action type for fetching an artist's overview and albums
  async (id) => {
    try {
      // Making a GET request to the Spotify API to fetch artist overview by ID
      const response = await axios.get(
        `https://spotify23.p.rapidapi.com/artist_overview/?id=${id}`,
        headersObj
      );

      // Extracting the artist data from the response
      const dataObj = response.data.data?.artist;
      return {
        name: dataObj.profile?.name, // Artist's name
        Desc: dataObj.profile?.biography?.text?.split("." || "|")[0], // Short biography of the artist
        image: dataObj.visuals?.avatarImage?.sources[0]?.url, // Artist's image
        followers: dataObj.stats?.followers, // Number of followers
        type: "artist", // Type of data (artist)
        monthlyListeners: dataObj.stats?.monthlyListeners, // Monthly listeners count
        rank: dataObj.stats?.worldRank, // Artist's global ranking
        popularSongs: dataObj.discography?.popularReleases?.items?.map(
          (ele) => {
            return {
              songname: ele.releases?.items[0]?.name, // Song name
              albumId: ele.releases?.items[0]?.id, // Album ID
              type: ele.releases?.items[0]?.type, // Type (album, single, etc.)
              date: ele.releases?.items[0]?.date, // Release date
              image: ele.releases?.items[0]?.coverArt?.sources[0]?.url, // Song/Album cover image
            };
          }
        ),
        artistAlbums: dataObj.discography?.albums?.items?.map((ele) => {
          return {
            id: ele.releases?.items[0]?.id, // Album ID
            date: ele.releases?.items[0]?.date, // Album release date
            image: ele.releases?.items[0]?.coverArt?.sources[0]?.url, // Album cover image
            name: ele.releases?.items[0]?.name, // Album name
            type: ele.releases?.items[0]?.type, // Album type
          };
        }),
        toptracks: dataObj.discography?.topTracks?.items?.map((ele) => {
          return {
            trackid: ele.track.id, // Track ID
            name: ele.track.name, // Track name
            duration: ele.track.duration?.totalMilliseconds, // Track duration in milliseconds
            image: ele.track.album?.coverArt?.sources[0]?.url, // Track album cover image
            playcount: ele.track.playcount, // Number of times the track has been played
          };
        }),
      };
    } catch (error) {
      // Catching and logging any errors that occur during the API call
      console.error("Error fetching artist albums:", error);
    }
  }
);
