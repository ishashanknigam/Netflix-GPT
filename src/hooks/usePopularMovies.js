import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constant";

const usePopularMovies = () => {
  //Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  const getPopularPlaying = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    getPopularPlaying();
  }, []);
};

export default usePopularMovies;