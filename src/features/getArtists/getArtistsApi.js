import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiKey = process.env.API_KEY;
const headersObj = {
  headers: {
    "X-RapidAPI-Key": "0411790049mshb4bce9526db2fd5p188648jsn49bdc186ba62",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

export const fetchArtists = createAsyncThunk(
  "artist/fetchArtists",
  async () => {
    try {
      const response = await axios.get(
        "https://spotify23.p.rapidapi.com/search/?q=popular%20hindi&type=artists&offset=0&limit=10&numberOfTopResults=10",
        headersObj
      );
      const dataObj = response.data?.artists?.items.map((ele) => {
        return {
          artistid: ele.data?.uri?.split(":")[2],
          name: ele.data?.profile?.name,
          image: ele.data?.visuals?.avatarImage?.sources[1]?.url,
        };
      });
      console.log("updated data", dataObj);
      return dataObj; // Return the data to be stored in the Redux state
    } catch (error) {
      // Handle errors appropriately
      console.error("Error fetching albums:", error);
      throw error; // Re-throw the error to be caught by Redux
    }
  }
);
export const fetchArtistOverview = createAsyncThunk(
  "artist/fetchArtistAlbums",
  async (id) => {
    try {
      const response = await axios.get(
        `https://spotify23.p.rapidapi.com/artist_overview/?id=${id}`,
        headersObj
      );
      const dataObj = response.data.data?.artist;
      return {
        name: dataObj.profile?.name,
        Desc: dataObj.profile?.biography?.text?.split("." || "|")[0],
        image: dataObj.visuals?.avatarImage?.sources[0]?.url,
        followers: dataObj.stats?.followers,
        type: "artist",
        monthlyListeners: dataObj.stats?.monthlyListeners,
        rank: dataObj.stats?.worldRank,
        popularSongs: dataObj.discography?.popularReleases?.items?.map(
          (ele) => {
            return {
              songname: ele.releases?.items[0]?.name,
              albumId: ele.releases?.items[0]?.id,
              type: ele.releases?.items[0]?.type,
              date: ele.releases?.items[0]?.date,
              image: ele.releases?.items[0]?.coverArt?.sources[0]?.url,
            };
          }
        ),
        artistAlbums: dataObj.discography?.albums?.items?.map((ele) => {
          return {
            id: ele.releases?.items[0]?.id,
            date: ele.releases?.items[0]?.date,
            image: ele.releases?.items[0]?.coverArt?.sources[0]?.url,
            name: ele.releases?.items[0]?.name,
            type: ele.releases?.items[0]?.type,
          };
        }),
        toptracks: dataObj.discography?.topTracks?.items?.map((ele) => {
          return {
            trackid: ele.track.id,
            name: ele.track.name,
            duration: ele.track.duration?.totalMilliseconds,
            image: ele.track.album?.coverArt?.sources[0]?.url,
            playcount: ele.track.playcount,
          };
        }),
      };
    } catch (error) {
      console.error("Error fetching artist albums:", error);
    }
  }
);
