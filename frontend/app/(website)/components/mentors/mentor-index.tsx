"use client";
import { useContext, useState } from "react";
import MenotrCard from "./mentor-card";
import Context from "../../../../context/Context";
import { useRouter } from "next/navigation";
import MentorCard from "./mentor-card";

export default function MentorIndex() {
  const { allMindmates, recommanded } = useContext(Context);
  const [activeCard, setActiveCard] = useState(2);
  const history = useRouter();

  return (
    <section className="py-8 z-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-4 mb-6">
        Our <span className="text-gradient-01"> MindMates </span>
      </h2>
      <div className="w-full bg-gradient-to-tr flex items-center flex-col from-[#d5e9f5] to-[#d4f5f5]">
        <div className="w-4/5 sm:flex sm:gap-y-3 pt-4 gap-x-8 justify-center mx-auto">
          {allMindmates?.slice(0, 3)?.map((cardData, i) => {
            return (
              <MenotrCard
                key={i}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                cardData={cardData}
                data={cardData}
              />
            );
          })}
        </div>
        <button
          onClick={(e) => {
            history.push("/mindmates");
          }}
          className={
            "mb-5 font-semibold text-darkGreen hover:scale-105 border-b transition-all border-b-transparent hover:border-b-darkGreen text-center text-lg h-fit pt-1.5 my-1 px-2"
          }
        >
          View All
        </button>
      </div>
    </section>
  );
}
