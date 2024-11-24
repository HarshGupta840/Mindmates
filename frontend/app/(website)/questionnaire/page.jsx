"use client";
import React, { useEffect, useContext } from "react";
import img1 from "../../Assets/questionnaire/ic1.png";
import img2 from "../../Assets/questionnaire/ic2.png";
import img3 from "../../Assets/questionnaire/ic3.png";
import img4 from "../../Assets/questionnaire/ic4.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import BASE_URL from "../../url";
import { usePDF } from "react-to-pdf";
import Context from "../../../context/Context";

const Questionnaire = () => {
  let history = useRouter();
  const { setShowLogin, user, getUser, getRecommanded } = useContext(Context);
  const { toPDF, targetRef, } = usePDF({
    filename: "Questionnaire.pdf",
  });

  useEffect(() => {
    if (user?.questionnaire?.answers?.length == 0) {
      history.push("/questionnaire/questions/ask-age");
    }
    getRecommanded();
  }, [user]);

  useEffect(() => {
    if (!user?._id) {
      history.push("/");
      setShowLogin(true);
    }
  }, [user]);

  return (
    <div className="overflow-x-hidden">
      <div
        ref={targetRef}
        className="z-50 top-[-200vh] flex flex-col items-center bg-white absolute"
      >
        <p className="cursor-pointer text-websiteBlue text-2xl md:text-3xl mt-10 mx-auto w-fit text-center">
          Thank you for choosing MindMates
        </p>
        <h1 className="cursor-pointer text-websiteBlue mb-8 md:mb-16 text-2xl md:text-3xl mt-2 mx-auto w-fit text-center">
          Questionnaire Analysis Report
        </h1>
        {user?.questionnaire?.backendAnswers?.map((e, i) => {
          return <Block data={e} key={i} index={i} />;
        })}
        <p className="font-light text-center w-[85%] md:w-[90%] mx-auto my-8">
          <span className="font-semibold">Disclaimer:</span> This questionnaire
          is intended to provide a general assessment of mental health and
          should not be considered a substitute for professional evaluation or
          advice.
          <br /> The results of this questionnaire are based solely on the
          provided responses and should be interpreted with caution.
          <br /> It is important to consult with a qualified mental health
          professional for assessment and personalized guidance.
        </p>
      </div>
      <div>
        <h1 className="cursor-pointer text-darkGreen mb-8 md:mb-6 text-2xl md:text-3xl mx-auto font-semibold w-fit mt-[8vw] md:mt-[4vw] text-center gradientHover">
          Initial Analysis
        </h1>
        {user?.questionnaire?.backendAnswers?.map((e, i) => {
          return <Block data={e} key={i} index={i} />;
        })}
      </div>
      <div className="flex md:flex-row flex-col items-center justify-center">
        <button
          onClick={(e) => {
            axios
              .post(`${BASE_URL}/login/delete-questionnaire`, {
                id: user?._id,
              })
              .then((res) => {
                getUser();
                history.push("/questionnaire/questions/ask-age");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          className="px-16 md:w-fit w-[60vw] py-2 rounded-md font-medium bg-[#F2685D] text-white"
        >
          Reset
        </button>
        <button
          onClick={(e) => {
            history.push("/mindmates");
          }}
          className="md:ml-4 md:mt-0 mt-3 md:w-fit w-[60vw] bg-darkGreen px-10 text-white rounded-md font-medium py-2"
        >
          Chat with Experts
        </button>
        <button
          onClick={(e) => {
            toPDF();
          }}
          className="md:ml-4 md:mt-0 mt-3 md:w-fit w-[60vw] bg-lightGreen px-10 text-white rounded-md font-medium py-2"
        >
          Download Pdf
        </button>
      </div>
      <p className="font-light text-center w-[85%] md:w-[90%] mx-auto my-8 pb-10">
        <span className="font-semibold">Disclaimer:</span> This questionnaire is
        intended to provide a general assessment of mental health and should not
        be considered a substitute for professional evaluation or advice.
        <br /> The results of this questionnaire are based solely on the
        provided responses and should be interpreted with caution.
        <br /> It is important to consult with a qualified mental health
        professional for assessment and personalized guidance.
      </p>
    </div>
  );
};

const Block = ({ data, index }) => {
  let questionnaire = [
    {
      image: img1,
      title: "Environmental Mastery",
      desc: "You have a good sense of mastery & competence in managing the environment;and you control complex external activities; and you make effective use of your surrounding opportunities very well.",
      value: "71",
    },
    {
      image: img2,
      title: "Purpose In Life",
      desc: "You depict good sense of directedness;and you feel there is meaning to your present and past life;and you hold your beliefs that give life purpose; and you have aims and objectives for living.",
      value: "71",
    },
    {
      image: img3,
      title: "Self Acceptance",
      desc: "You possess a positive attitude toward yourself; and you acknowledge the facts and accept aspects of yourself including both good and bad qualities; and feel positive about your past life.",
      value: "71",
    },
    {
      image: img4,
      title: "Relations with Others",
      desc: "You have few close, trusting relationships with others; find it difficult to be warm, open, and you are concerned about others; and you are isolated and frustrated in interpersonal relationships.",
      value: "71",
    },
  ];

  return (
    <div className="rounded-full w-[97%] md:w-[85%] mb-4 md:mb-10 mx-auto h-fit bg-gradient-to-r from-lightGreen via-darkGreen to-lightGreen p-[1px]">
      <div className="h-full w-full rounded-full flex items-center justify-between bg-white px-2 md:px-6">
        <Image
          src={questionnaire[index]?.image}
          alt="Image"
          className="w-[15%] md:w-[9%] py-4"
        />
        <div className="border-2 border-gray text-3xl md:text-6xl md:ml-[5vw] w-[17vw] min-[900px]:w-[15vw] min-[1040px]:w-[9.1vw] rounded-full flex justify-center items-center text-gray h-[17vw] min-[900px]:h-[15vw] min-[1040px]:h-[9.1vw]">
          {data?.value}
          <span className="text-lg md:text-2xl md:ml-0.5">%</span>
        </div>
        <div className="w-8/12 md:w-7/12 py-4 md:pr-4">
          <h1 className="text-center text-sm md:text-2xl font-medium cursor-pointer text-websiteBlue transition-all mb-1">
            {questionnaire[index]?.title}
          </h1>
          <p className="text-center md:text-base text-[9px] font-light">
            {data?.text}
          </p>
        </div>
      </div>
    </div>
  );
};

const ReturnBlock = ({ data, index }) => {
  let questionnaire = [
    {
      image: img1,
      title: "Environmental Mastery",
      desc: "You have a good sense of mastery & competence in managing the environment;and you control complex external activities; and you make effective use of your surrounding opportunities very well.",
      value: "71",
    },
    {
      image: img2,
      title: "Purpose In Life",
      desc: "You depict good sense of directedness;and you feel there is meaning to your present and past life;and you hold your beliefs that give life purpose; and you have aims and objectives for living.",
      value: "71",
    },
    {
      image: img3,
      title: "Self Acceptance",
      desc: "You possess a positive attitude toward yourself; and you acknowledge the facts and accept aspects of yourself including both good and bad qualities; and feel positive about your past life.",
      value: "71",
    },
    {
      image: img4,
      title: "Relations with Others",
      desc: "You have few close, trusting relationships with others; find it difficult to be warm, open, and you are concerned about others; and you are isolated and frustrated in interpersonal relationships.",
      value: "71",
    },
  ];

  return (
    <div className="rounded-full w-[97%] md:w-[85%] mb-4 md:mb-10 mx-auto h-fit bg-gradient-to-r from-websiteBlue via-pinkishRed to-oceanGreen p-[1px]">
      <div className="h-full w-full rounded-full flex items-center justify-between bg-white px-2 md:px-6">
        <Image
          src={questionnaire[index]?.image}
          alt="Image"
          className="w-[15%] md:w-[9%] py-4"
        />
        <p className="relative w-[8vw] h-full border-2 border-websiteBlue text-3xl md:text-5xl md:ml-[5vw] rounded-full  text-websiteBlue px-5 py-14 flex justify-center items-center">
          <p className="absolute top-3 -translate-x-1/2 left-1/2">
            {data?.value}%
          </p>
        </p>
        <div className="w-8/12 md:w-7/12 py-4 md:pr-4">
          <h1 className="text-center text-sm md:text-2xl font-medium cursor-pointer text-websiteBlue transition-all mb-1">
            {questionnaire[index]?.title}
          </h1>
          <p className="text-center md:text-base text-[9px] font-light">
            {data?.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
