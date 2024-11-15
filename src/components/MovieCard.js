import React from "react";

const MovieCard = ({ posterPath, title, name }) => {
  return (
    <div className="h-full hover:scale-95 transition-all duration-100">
      <div className="w-44 h-3/4">
        <img
          className="rounded-md  hover:cursor-pointer "
          alt="Movie Card"
          src={"https://image.tmdb.org/t/p/w500/" + posterPath}
        />
      </div>
      <p className=" text-sm text-center text-gray-200 font-semibold">{name}</p>
    </div>
  );
};

export default MovieCard;
