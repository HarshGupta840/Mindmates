"use client";
import { useRouter } from "next/navigation";
import Context from "../../../../../context/Context";
import React, { useContext, useEffect } from "react";

const AskAge = () => {
  const history = useRouter();
  const { login } = useContext(Context);

  useEffect(() => {
    if (login?.questionnaire?.answers?.length > 0) {
      history.push("/questionnaire");
    }
  }, [login]);

  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center border">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-darkGreen mb-8">Age Range</h1>
        <div>
          {["12 - 18 Years", "19 - 24 Years", "25 or Above"].map((e) => {
            return <Block key={e} data={e} />;
          })}
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
        setQuestionnaire({ ...questionnaire, age: data });
        history.push("/questionnaire/questions/problem");
      }}
      className="rounded-xl mb-4 md:mb-5 mx-auto h-fit bg-gradient-to-b from-lightGreen to-darkGreen transition-all p-[2px] hover:p-[2px] cursor-pointer transitionAnimate hover:scale-105"
    >
      <div className="h-full w-full rounded-xl text-lg text-center bg-white px-2 md:px-10 py-1.5 cursor-pointer">
        {data}
      </div>
    </div>
  );
};

export default AskAge;
