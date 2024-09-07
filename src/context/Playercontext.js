import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrackData } from "../features/getAlbums/getAlbumsApi";

// Creating a context for managing the music player state
export const PlayerContext = createContext();

export default function PlayerContextProvider(props) {
  const dispatch = useDispatch();

  // Using refs to manage audio element, seek bar, and volume bar references
  const refOfAudio = useRef();
  const seekBackground = useRef();
  const seekBar = useRef();
  const volumeBar = useRef();

  // State variables for track, play status, song list, error handling, and time tracking
  const [track, setTrack] = useState(songsData[0]); // Default track set to the first song
  const [playStat, setPlayStat] = useState(false); // Playing status (true/false)
  const [songsList, setSongsList] = useState([]); // List of songs to be played
  const [error, setError] = useState(""); // Error messages for audio issues
  const [singleData, setSingleData] = useState(); // Data for a specific song
  const trackData = useSelector((state) => state.albumsData.trackData); // Track data from Redux store

  // State for tracking current and total time of audio
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  // Effect to handle changes in trackData and update the audio player
  useEffect(() => {
    if (trackData) {
      console.log("track data ", trackData);
      setTrack(trackData); // Set the track to the newly fetched track data
      const audioElement = refOfAudio.current;

      if (audioElement) {
        if (!trackData.url) {
          console.log("audio url undefined");
          handleErrorMessage(undefined, true);
          setPlayStat(false);
          return;
        }

        // Pause current audio, update the source, and load the new track
        audioElement.pause();
        audioElement.src = trackData.url;
        audioElement.load();

        // Event listener for when audio metadata is loaded
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

        // Event listener for tracking audio time updates
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

        // Adding event listeners for metadata, time updates, and error handling
        audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
        audioElement.addEventListener("timeupdate", handleTimeUpdate);
        audioElement.addEventListener("error", handleErrorMessage);

        audioElement.play().catch(() => {
          handleErrorMessage(track, audioElement);
        });

        setPlayStat(true);

        // Cleanup function to remove event listeners and stop the audio
        return () => {
          audioElement.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
          audioElement.removeEventListener("error", handleErrorMessage);
          audioElement.removeEventListener("timeupdate", handleTimeUpdate);
          audioElement.pause();
          audioElement.src = "";
        };
      }
    }
  }, [trackData]);

  // Play and pause functions
  const handlePlay = () => {
    refOfAudio.current.play();
    setPlayStat(true);
  };
  const handlePause = () => {
    refOfAudio.current.pause();
    setPlayStat(false);
  };

  // Function to play a track based on its ID
  const handlePlayWithId = (id) => {
    console.log("inside handlePlayWithId with trackid", id);
    dispatch(fetchTrackData(id));
  };

  // Function to play the previous song
  const handlePreviousSong = () => {
    if (songsList.length <= 0) return;
    const currentIndex = songsList?.findIndex(
      (item) => item.trackid || item.id === track.id
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      const nextTrack = songsList[currentIndex - 1];
      handlePlayWithId(nextTrack.trackid || nextTrack.id);
    }
  };

  // Function to play the next song
  const handleNextSong = () => {
    if (songsList.length <= 0) return;
    const currentIndex = songsList?.findIndex(
      (item) => item.trackid || item.id === track.id
    );
    if (currentIndex !== -1 && currentIndex < songsList.length - 1) {
      const nextTrack = songsList[currentIndex + 1];
      handlePlayWithId(nextTrack.trackid || nextTrack.id);
    }
  };

  // Function to seek audio position based on user input
  const handleSeekSong = (e) => {
    refOfAudio.current.currentTime =
      (e.nativeEvent.offsetX / seekBackground.current.offsetWidth) *
      refOfAudio.current.duration;
  };

  // Function to handle volume control
  const handleVolume = (e) => {
    const rect = volumeBar.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, offsetX / 80));
    refOfAudio.current.volume = newVolume;
    volumeBar.current.style.width = `${newVolume * 100}%`;
  };

  // Error handling for audio loading issues
  const handleErrorMessage = (audioElement = null, trackstatus = false) => {
    if (trackstatus) {
      console.log("inside handleerror");
      setError("Audio URL is not available");
      setTimeout(() => setError(""), 5000);
    }

    if (audioElement && audioElement.error) {
      const errorCode = audioElement.error.code;
      let errorMessage = "";

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
      setTimeout(() => setError(""), 5000);
    }
  };

  // Context value to be provided to children components
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
    setSingleData,
  };

  // Returning the context provider with the defined context values
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
}
