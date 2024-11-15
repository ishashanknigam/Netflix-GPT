import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error hap pened.
        navigate("/error");
      });
  };

  //we use useEffect bcz we want to run this only once.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is sign in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/Browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe when component is unmounts
    return () => unsubscribe();
  }, []);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  // console.log(showGptSearch);

  const handleGptSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  return (
    <div className="absolute top-0 w-full h-20  px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && (
        <div className="flex gap-4 items-center ">
          <div className="flex items-center gap-2 ">
            <img
              className="w-7 rounded-full cursor-pointer "
              src={user.photoURL}
            />
            <p className="text-white hidden md:block ">{user.email}</p>
          </div>
          <button
            className="text-white border-2 hover:border-red-600 hover:bg-red-600 rounded-md px-2 py-1 transition ease-in-out duration-200 "
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <button
            onClick={handleSignOut}
            className="text-white border-2 hover:border-red-600 hover:bg-red-600 rounded-md px-2 py-1 transition ease-in-out duration-200"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
