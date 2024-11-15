import React from "react";
import { Link } from "react-router-dom";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute scroll -mt-12 md:pt-64 px-12 bg-gradient-to-r from-black bg-opacity-20 w-[100%] aspect-video">
      <h1 className="text-3xl md:text-5xl mt-12  md:mt-0 text-white font-bold">
        {title}
      </h1>
      <p className="hidden md:block mt-8 w-[35%] text-md text-white leading-[24px]">
        {overview}
      </p>
      <div className="flex gap-5 mt-8 md:mt-10">
        <button className="bg-white px-3 md:px-6 py-1 md:py-2 rounded-md text-black font-semibold text-md hover:bg-opacity-80 transition ease-in-out duration-100">
          ▶ Play
        </button>
        <button className="bg-slate-400 px-3 md:px-6 py-1 md:py-2 rounded-md text-white bg-opacity-40 font-semibold text-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
