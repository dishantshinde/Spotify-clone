import React, { useContext } from "react";
import { assets, songsData } from "../../assets/assets";
import { PlayerContext } from "../../context/Playercontext";

export default function Player() {
  // Destructure context values from PlayerContext
  const {
    track,
    seekBar,
    seekBackground,
    playStat,
    handlePlay,
    handlePause,
    time,
    setTime,
    handlePreviousSong,
    handleNextSong,
    handleSeekSong,
    volumeBar,
    handleVolume,
  } = useContext(PlayerContext);

  return (
    <div className="bg-black h-[10%] flex justify-between items-center text-white px-4">
      {/* Track information for larger screens */}
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="" /> {/* Track image */}
        <div>
          <p>{track.name}</p> {/* Track name */}
          <p className="text-sm">Album: {track.albumname}</p> {/* Album name */}
        </div>
      </div>

      {/* Playback controls and time display */}
      <div className="flex flex-col items-center m-auto gap-1">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt="" // Shuffle icon
          />
          <img
            onClick={handlePreviousSong}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="" // Previous song icon
          />
          {playStat ? (
            <img
              onClick={handlePause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="" // Pause icon
            />
          ) : (
            <img
              onClick={handlePlay}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="" // Play icon
            />
          )}
          <img
            onClick={handleNextSong}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="" // Next song icon
          />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />{" "}
          {/* Loop icon */}
        </div>

        {/* Time and seek bar */}
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}{" "}
            {/* Current time */}
          </p>
          <div
            onClick={handleSeekSong}
            ref={seekBackground}
            className="w-[60vw] max-w-[500px] bg-gray-300 cursor-pointer rounded-full"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second} {/* Total time */}
          </p>
        </div>
      </div>

      {/* Additional controls and volume settings for larger screens */}
      <div className="hidden lg:flex items-center opacity-70 gap-2">
        <img className="w-4" src={assets.play_icon} alt="" /> {/* Play icon */}
        <img className="w-4" src={assets.mic_icon} alt="" />{" "}
        {/* Microphone icon */}
        <img className="w-4" src={assets.queue_icon} alt="" />{" "}
        {/* Queue icon */}
        <img className="w-4" src={assets.speaker_icon} alt="" />{" "}
        {/* Speaker icon */}
        <img className="w-4" src={assets.volume_icon} alt="" />{" "}
        {/* Volume icon */}
        <div
          onClick={handleVolume}
          className="w-20 bg-slate-600 h-1 rounded relative cursor-pointer"
        >
          <div
            ref={volumeBar}
            className="bg-slate-50 h-1 rounded absolute top-0 left-0"
            style={{ width: "100%" }}
          />
        </div>
        <img className="w-4" src={assets.mini_player_icon} alt="" />{" "}
        {/* Mini player icon */}
        <img className="w-4" src={assets.zoom_icon} alt="" /> {/* Zoom icon */}
      </div>
    </div>
  );
}
