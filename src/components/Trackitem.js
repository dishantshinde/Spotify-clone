import React from "react";

const TrackItem = ({ item, indx, handlePlayWithId, type }) => {
  return (
    <div
      onClick={() => handlePlayWithId(item.trackid)}
      className={`grid grid-cols-3 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] ${
        type === "artist" ? "grid-cols-3" : ""
      } gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer`}
      key={indx}
    >
      <p className="text-white">
        <b className="mr-4 text-[#a7a7a7]">{indx + 1}</b>
        <img className="inline w-10 mr-5" src={item.image} alt="" />
        {item.name}
      </p>
      <p className="text-[15px]">
        {type === "artist"
          ? Number(item.playcount).toLocaleString()
          : item.name}
      </p>
      {type !== "artist" && (
        <p className="text-[15px] hidden sm:block">5 days ago</p>
      )}
      <p className="text-[15px] text-center">
        {`${(item.duration / 60000).toFixed(1)} min`}
      </p>
    </div>
  );
};

export default TrackItem;
