import { useRef } from "react";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query :" +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the exmaple result given ahead. Example Result: Iron Man, Don, Hulk, Venom";

    //make api call to OPENAI and get movies results
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    console.log(gptResults?.choices);
  };

  return (
    <div className="pt-48 ">
      <form
        className=" w-full md:w-1/2 mx-auto bg- grid grid-cols-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="px-4 py-[8px] m-2 rounded-md  outline-red-500 col-span-8 "
          placeholder="What would you like to search?"
        ></input>
        <button
          className="text-white m-[8px] bg-red-500 rounded-md hover:bg-red-600 col-span-2"
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
