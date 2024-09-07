import React from "react";

// TrackItem component displays individual track information with an image, name, play count, and duration
const TrackItem = ({ item, indx, handlePlayWithId, type }) => {
  return (
    // Container for each track item, clickable to play the track based on its ID
    <div
      onClick={() => handlePlayWithId(item.trackid)}
      className={`grid grid-cols-3 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] ${
        type === "artist" ? "grid-cols-3" : ""
      } gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer`}
      key={indx}
    >
      {/* Track index and image */}
      <p className="text-white">
        <b className="mr-4 text-[#a7a7a7]">{indx + 1}</b>
        <img className="inline w-10 mr-5" src={item.image} alt="" />
        {item.name}
      </p>

      {/* If it's an artist type, show play count, otherwise show track name */}
      <p className="text-[15px]">
        {type === "artist"
          ? Number(item.playcount).toLocaleString() // Display formatted play count
          : item.name}{" "}
        // Display track name
      </p>

      {/* Show "5 days ago" for non-artist type on larger screens */}
      {type !== "artist" && (
        <p className="text-[15px] hidden sm:block">5 days ago</p>
      )}

      {/* Display track duration in minutes, calculated from milliseconds */}
      <p className="text-[15px] text-center">
        {`${(item.duration / 60000).toFixed(1)} min`}{" "}
        {/* Convert duration from milliseconds to minutes */}
      </p>
    </div>
  );
};

export default TrackItem;
