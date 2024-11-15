import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);

  const handleButtonClick = (e) => {
    //validate form data
    const message = checkValidData(
      name?.current?.value,
      email?.current?.value,
      password?.current?.value
    );
    setErrorMessage(message);

    if (message) return;

    //sign up/sign in
    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/IN-en-20241104-TRIFECTA-perspective_55263ea2-af7f-40ed-9cf0-7029a9b9baf4_large.jpg"
          alt="bg"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute p-12 bg-black/85 rounded-md w-3/12 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      >
        <h1 className=" font-bold text-white text-3xl pb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="text-white p-3 my-2 w-full bg-transparent border-2 border-gray-400 outline-2 autofill: outline-gray-400 rounded-md"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="text-white p-3 my-2 w-full bg-transparent border-2 border-gray-400 outline-2 autofill: outline-gray-400 rounded-md"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="text-white p-3 my-2 w-full bg-transparent border-2 border-gray-400 outline-gray-400 rounded-md"
        />
        <p className="text-red-500">{errorMessage} </p>
        <button
          className="w-full mt-4 py-3 font-semibold bg-red-600 text-white rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-white mt-4 text-md font-semibold">
          {isSignInForm ? (
            <div>
              <span className="text-gray-400">New to Netflix? </span>
              <span
                onClick={toggleSignInForm}
                className="hover:underline cursor-pointer"
              >
                Sign up now.
              </span>
            </div>
          ) : (
            <div>
              <span className="text-gray-400">Already registered? </span>
              <span
                onClick={toggleSignInForm}
                className="hover:underline cursor-pointer"
              >
                Sign in now.
              </span>
            </div>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
