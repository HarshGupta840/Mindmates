"use client";
import React, { useContext } from "react";
import Modal from "react-modal";
import { Toaster } from "react-hot-toast";
import Context from "../../../../context/Context";
import Image from "next/image";
import BASE_URL, { URL } from "../../../url/index";
import login from "../../../Assets/login.png";

const Login = () => {
  const { showLogin, setShowLogin, width } = useContext(Context);

  const customStyles = {
    overlay: {
      zIndex: 1001, // Adjust the value as needed
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "1.5rem",
      backgroundColor: "#fff",
      width: width < 600 ? "90vw" : "30vw",
    },
  };

  return (
    <div className={"bg-background"}>
      <Toaster />
      <Modal
        isOpen={showLogin}
        onRequestClose={() => {
          setShowLogin(false);
        }}
        style={customStyles}
      >
        <div className="w-full h-full text-black px-5 md:px-10 py-5 md:py-10 flex flex-col items-center">
          <h1 className="text-3xl md:mb-0 mb-2 md:text-2xl font-bold">
            WELCOME!
          </h1>
          <p className="text-lg tracking-wide text-gray">
            Already have a account,{" "}
            <span className="font-bold text-darkGreen">Log in</span>
          </p>
          <Image
            src={login}
            alt="Google login"
            width={1000}
            height={1000}
            className="w-full h-full rounded-md"
          />
          <div
            onClick={(e) => {
              console.log(`${URL}auth/google/callback`);
              window.open(`${URL}auth/google/callback`, "_self");
            }}
            className="cursor-pointer rounded-md w-[50vw] md:w-[13vw]"
          >
            {" "}
            <Image
              src={"/images/sign-in-with-google.png"}
              alt="Google login"
              width={1000}
              height={1000}
              className="w-auto h-auto rounded-md"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
