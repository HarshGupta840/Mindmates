"use client";
import Context from "../../../../../context/Context";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Problem = () => {
  return (
    <div className="w-full md:h-[80vh] h-[60vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-center md:text-3xl md:font-bold text-darkGreen mb-8">
          What are the significant concerns you are facing?
        </h1>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-x-10 md:mx-0 mx-5">
          {[
            "I am having difficulty sleeping",
            "I have been feeling anxious and overwhelmed",
            "I have been feeling constant sadness",
            "I feel no motivation to complete my tasks",
            "I feel lost in my goals and career",
            "I have been facing relationship issues",
          ].map((e) => {
            return <Block key={e} data={e} />;
          })}
        </div>
        <div className="w-[90%]">
          <Block data={"I am not sure what I am going through"} />
        </div>
      </div>
    </div>
  );
};

const Block = ({ data }) => {
  const history = useRouter();
  const { setQuestionnaire, questionnaire } = useContext(Context);

  return (
    <div
      onClick={(e) => {
        setQuestionnaire({ ...questionnaire, problem: data });
        history.push("/questionnaire/questions/what-to-do");
      }}
      className="rounded-xl mb-4 md:mb-5 mx-auto w-full md:w-[35vw] min-[1560px]:h-fit min-[950px]:h-[9vh] min-[758px]:h-[10.4vh] bg-gradient-to-b from-lightGreen  transition-all to-darkGreen p-[2px] hover:p-[2px] cursor-pointer transitionAnimate hover:scale-105"
    >
      <div className="h-full w-full flex items-center justify-center rounded-xl text-lg text-center bg-white px-2 md:px-10 py-1.5 cursor-pointer">
        {data}
      </div>
    </div>
  );
};

export default Problem;
