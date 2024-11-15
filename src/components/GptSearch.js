import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";

const GptSearch = () => {
  return (
    <div className="">
      <div className="absolute -z-10">
        <img
          className="bg-black h-screen w-screen object-cover aspect-video"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/IN-en-20241104-TRIFECTA-perspective_55263ea2-af7f-40ed-9cf0-7029a9b9baf4_large.jpg"
          alt="bg"
        />
      </div>
      <GptSearchBar />
      {/* <GptMovieSuggestion /> */}
    </div>
  );
};

export default GptSearch;
