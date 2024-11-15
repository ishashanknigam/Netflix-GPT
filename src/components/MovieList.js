import React from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieList = ({ title, movies }) => {
  // console.log(movies[1]);
  return (
    <div className="px-12">
      <h1 className=" text-2xl font-semibold py-1 text-white">{title}</h1>
      <div className="flex no-scrollbar overflow-y-auto mt-2 ">
        <div className="flex gap-5 h-[380px]">
          {movies?.map((movie) => (
            <Link key={movie.id} to={"/watch/" + movie.id}>
              <MovieCard
                title={title}
                posterPath={movie.poster_path}
                name={movie.original_title}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
