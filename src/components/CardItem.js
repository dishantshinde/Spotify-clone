import React from "react";
import { useNavigate } from "react-router-dom";
export default function CardItem({ image, name, desc, id, type }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        const navigateTo = `card/${type}/${id}`;
        console.log("Navigating to:", navigateTo); // Log the navigation path
        navigate(navigateTo, { replace: true });
      }}
      className="min-w-[180px] max-h-[260px] overflow-hidden p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <div
        style={{
          width: "150px",
          height: "150px",
          borderRadius: type === "artist" ? "50%" : "5px",
          overflow: "hidden",
        }}
      >
        <img className="object-cover w-full h-full" src={image} alt="" />
      </div>

      <p className="font-bold mt-2 mb-1 text-base">{name}</p>
      <p className="text-slate-400 text-sm line-clamp-2">{desc}</p>
    </div>
  );
}
