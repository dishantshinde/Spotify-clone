import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router";

export default function Display() {
  const displayRef = useRef();
  const location = useLocation();


  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Outlet context={{ displayRef }} />
    </div>
  );
}
