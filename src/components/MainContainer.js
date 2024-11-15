import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);

  if (movies[0] === undefined) return;

  const mainMovie = movies[0];

  return (
    <div className="pt-[50%] md:pt-0 bg-black">
      <VideoTitle
        title={mainMovie?.original_title}
        overview={mainMovie?.overview}
        movieId={mainMovie?.id}
      />
      <VideoBackground movieId={mainMovie?.id} />
    </div>
  );
};

export default MainContainer;
