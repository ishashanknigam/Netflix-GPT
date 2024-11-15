import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constant";

const Watch = () => {
  const { id } = useParams();
  const [trailer, seTrailer] = useState(null);

  const watch = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
      API_OPTIONS
    );

    const json = await data.json();
    // console.log(json);

    const filterTrailer = json.results?.filter(
      (video) => video.type === "Trailer"
    );
    seTrailer(filterTrailer?.length ? filterTrailer[1] : json?.results[0]);
  };

  // console.log(trailer);

  useEffect(() => {
    watch();
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <div className="">
        <Link to="/browse">
          <button className="absolute text-white bg-red-500 hover:bg-red-600 px-4 py-1 mx-2 my-2 rounded-md">
            Back
          </button>
        </Link>
      </div>
      <div>
        <iframe
          className="w-screen h-screen aspect-video"
          src={
            "https://www.youtube.com/embed/" +
            trailer?.key +
            "?autoplay=1&mute=0&controls=1&showinfo=0&loop=1"
          }
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
};

export default Watch;
