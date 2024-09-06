import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrackData } from "../features/getAlbums/getAlbumsApi";

export const PlayerContext = createContext();

export default function PlayerContextProvider(props) {
  const dispatch = useDispatch();
  const refOfAudio = useRef();
  const seekBackground = useRef();
  const seekBar = useRef();
  const volumeBar = useRef();
  const [track, setTrack] = useState(songsData[0]);
  const [playStat, setPlayStat] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [error, setError] = useState("");
  const [singleData, setSingleData] = useState();
  const trackData = useSelector((state) => state.albumsData.trackData);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  useEffect(() => {
    if (trackData) {
      // Update track and audio source
      console.log("track data ", trackData);
      setTrack(trackData);
      const audioElement = refOfAudio.current;

      if (audioElement) {
        // Ensure to stop previous playback before starting new one
        if (!trackData.url) {
          console.log("audio url undefined");
          handleErrorMessage(undefined, true);
          setPlayStat(false); // Stop playback if URL is not available
          return; // Exit early to avoid further processing
        }

        audioElement.pause();
        audioElement.src = trackData.url;
        audioElement.load(); // Reload the audio source

        // Event listeners for when metadata is loaded and time updates
        const handleLoadedMetadata = () => {
          if (audioElement.duration) {
            setTime({
              currentTime: {
                second: Math.floor(audioElement.currentTime % 60),
                minute: Math.floor(audioElement.currentTime / 60),
              },
              totalTime: {
                second: Math.floor(audioElement.duration % 60),
                minute: Math.floor(audioElement.duration / 60),
              },
            });
          }
        };

        const handleTimeUpdate = () => {
          if (audioElement.duration) {
            seekBar.current.style.width =
              Math.floor(
                (audioElement.currentTime / audioElement.duration) * 100
              ) + "%";
            setTime({
              currentTime: {
                second: Math.floor(audioElement.currentTime % 60),
                minute: Math.floor(audioElement.currentTime / 60),
              },
              totalTime: {
                second: Math.floor(audioElement.duration % 60),
                minute: Math.floor(audioElement.duration / 60),
              },
            });
          }
        };

        // Add event listeners
        audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
        audioElement.addEventListener("timeupdate", handleTimeUpdate);
        audioElement.addEventListener("error", handleErrorMessage);

        // Start playback
        audioElement.play().catch(() => {
          handleErrorMessage(track, audioElement);
        });

        setPlayStat(true);

        // Cleanup function to remove event listeners and stop playback
        return () => {
          audioElement.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          audioElement.removeEventListener("error", handleErrorMessage);
          audioElement.removeEventListener("timeupdate", handleTimeUpdate);
          audioElement.pause();
          audioElement.src = ""; // Clear the source to avoid potential issues
        };
      }
    }
  }, [trackData]); // Effect runs when trackData changes

  const handlePlay = () => {
    refOfAudio.current.play();
    setPlayStat(true);
  };
  const handlePause = () => {
    refOfAudio.current.pause();
    setPlayStat(false);
  };
  const handlePlayWithId = (id) => {
    console.log("inside handlePlayWithId with trackid", id);
    // Dispatch action to fetch track data
    dispatch(fetchTrackData(id));
  };

  const handlePreviousSong = () => {
    if (songsList.length <= 0) {
      return;
    }
    const currentIndex =
      songsList.toptracks ||
      songsList?.findIndex((item) => item.trackid || item.id === track.id);
    if (currentIndex !== -1 && currentIndex > 0) {
      const nextTrack =
        songsList.toptracks?.[currentIndex - 1] || songsList[currentIndex - 1];
      handlePlayWithId(nextTrack.trackid || nextTrack.id); // Play the next track
    }
  };
  const handleNextSong = () => {
    if (songsList.length <= 0) {
      return;
    }
    const currentIndex =
      songsList.toptracks ||
      songsList?.findIndex((item) => item.trackid || item.id === track.id);
    console.log("current index", currentIndex, songsList);
    // Check if there is a next track
    if (
      (currentIndex !== -1 && currentIndex < songsList.toptracks?.length - 1) ||
      songsList.length - 1
    ) {
      const nextTrack =
        songsList.toptracks?.[currentIndex + 1] || songsList[currentIndex + 1];
      handlePlayWithId(nextTrack.trackid || nextTrack.id); // Play the next track
    }
  };
  const handleSeekSong = async (e) => {
    refOfAudio.current.currentTime =
      (e.nativeEvent.offsetX / seekBackground.current.offsetWidth) *
      refOfAudio.current.duration;
  };
  const handleVolume = (e) => {
    console.log("inside handleVolume");
    const rect = volumeBar.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, offsetX / 80));
    console.log("Calculated Volume:", newVolume);
    refOfAudio.current.volume = newVolume;
    // Update the width of the volume bar
    volumeBar.current.style.width = `${newVolume * 100}%`;
  };
  const handleErrorMessage = (audioElement = null, trackstatus = false) => {
    if (trackstatus) {
      console.log("inside handleerror");
      setError("Audio URL is not available");
      setTimeout(() => setError(""), 5000); // Clear error message after 5 seconds
    }

    if (audioElement && audioElement.error) {
      const errorCode = audioElement.error.code;
      let errorMessage = "";
      console.log("inside error handler");

      switch (errorCode) {
        case 1:
          errorMessage = "Audio loading was aborted.";
          break;
        case 2:
          errorMessage = "Network error occurred while loading the audio.";
          break;
        case 3:
          errorMessage = "Error decoding the audio.";
          break;
        case 4:
          errorMessage = "Audio format not supported.";
          break;
        default:
          errorMessage = "An unknown error occurred.";
      }

      setError(errorMessage);
      setTimeout(() => setError(""), 5000); // Clear error message after 5 seconds
    }
  };

  const contextValue = {
    refOfAudio,
    seekBackground,
    seekBar,
    track,
    setTrack,
    playStat,
    setPlayStat,
    time,
    setTime,
    handlePause,
    handlePlay,
    handlePlayWithId,
    handleNextSong,
    handlePreviousSong,
    handleSeekSong,
    setSongsList,
    volumeBar,
    handleVolume,
    error,
    singleData,
    setSingleData
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
}
