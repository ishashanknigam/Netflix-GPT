import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constant";

const useTopRated = () => {
  //Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  const getTopRatedPlaying = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    getTopRatedPlaying();
  }, []);
};

export default useTopRated;
