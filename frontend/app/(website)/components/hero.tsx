"use client";
import { useContext } from "react";
import Lottie from "react-lottie-player";
import Context from "../../../context/Context";
import heroIllu from "../../../public/images/hero-illus.json";
export default function Hero() {
  const { setShowLogin, width } = useContext(Context);
  const options = {
    animationData: heroIllu,
    loop: true,
  };

  return (
    <div className="bg-background">
      <div className="flex flex-col-reverse md:flex-row gap-5 py-[5.5vw] mx-4 sm:mx-6 md:mx-auto md:w-4/5 max-w-[100rem]">
        <div className="w-full md::w-2/3 md:px-0 px-7 h-auto my-auto">
          <h1
            className="sm:text-start text-3xl sm:text-3xl lg:text-5xl font-bold"
            style={
              width < 600 ? { lineHeight: "9vw" } : { lineHeight: "3.8vw" }
            }
          >
            <span>
              Healthy Minds, Happy
              <br /> Lives
            </span>
            <span className="text-gradient-01"> Mental Health </span>
            <br />
            <span>Consultancy</span>
          </h1>
          <p className="text-[#999AA1] text-start text-lg py-3 md:py-5">
            Welcome to MindMates, your haven for mental
            <br /> wellness!
            <br /> Explore resources, find support, and connect with a<br />{" "}
            community dedicated to nurturing mental health and
            <br /> well-being.
          </p>
          <button
            className={
              "bg-gradient-to-r text-white from-[#4ED6DA] font-bold md:font-semibold to-[#04789D] text-lg text-center h-fit py-2 my-1 px-8 rounded-3xl"
            }
            onClick={(e) => {
              setShowLogin(true);
            }}
          >
            Get Started
          </button>
        </div>
        <div className="h-auto w-11/12 md:w-9/12 rounded-tl-[4rem] mx-auto">
          <div className="w-auto block">
            <Lottie
              loop
              animationData={heroIllu}
              play
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
