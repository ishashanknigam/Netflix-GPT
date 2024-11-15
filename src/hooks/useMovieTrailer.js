import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  // console.log(movieId);

  //fetch trailer
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );

    const json = await data.json();

    const filterTrailer = json.results?.filter(
      (video) => video.type === "Trailer"
    );
    // console.log(json.results[0]);

    const trailer = filterTrailer?.length ? filterTrailer[1] : json?.results[0];
    dispatch(addTrailerVideo(trailer));
    // console.log(trailer.key);
  };

  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
