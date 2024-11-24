"use client";
import React, { useContext, useState } from "react";
import MentorCard from "../components/mentors/mentor-card";
import Context from "../../../context/Context";
import { FaSort } from "react-icons/fa";

export default function MentorsList() {
  const { allMindmates, recommanded } = useContext(Context);
  const [search, setSearch] = useState("");
  const [activeCard, setActiveCard] = useState(2);
  const [showSorting, setShowSorting] = useState(false);
  const [sortValue, setSortValue] = useState("");

  return (
    <section
      id="mentors-list"
      className="md:w-4/5 md:mx-auto mx-[5vw] py-6 pt-10"
    >
      <div className="flex items-center justify-between">
        <h2
          className="text-3xl sm:text-4xl md:mb-0 mb-3 md:text-4xl font-bold text-center"
          style={{ lineHeight: "3.9vw" }}
        >
          Our
          <span className="text-gradient-01">
            <span> MindMates </span>
          </span>
        </h2>
        <div className="flex items-center">
          <input
            type="search"
            className="border-none shadow-sm text-darkGreen shadow-[#787878] outline-none px-4 rounded-md py-1"
            placeholder="Search Here..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              setShowSorting(!showSorting);
            }}
            className="flex relative items-center cursor-pointer py-0.5 ml-3 shadow-sm shadow-[#787878] rounded-md px-3"
          >
            Sort
            <FaSort className="text-xl ml-3" />
            {showSorting && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute bg-white shadow-sm shadow-[#787878] top-[2.4vw] z-20 right-0 rounded-md"
              >
                {["Ascending", "Descending"].map((e) => {
                  return (
                    <p
                      key={e}
                      onClick={(ev) => {
                        setSortValue(e);
                        setShowSorting(false);
                      }}
                      className={`px-4 py-1 rounded-md hover:bg-[#d3d3d3] ${
                        sortValue == e ? "bg-[#d3d3d3]" : ""
                      } transition-all`}
                    >
                      {e}
                    </p>
                  );
                })}
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {recommanded?._id && (
          <MentorCard
            cardData={recommanded}
            data={recommanded}
            bigCard={true}
            key={recommanded?.id}
            setActiveCard={setActiveCard}
            recommanded={true}
          />
        )}
        {allMindmates
          ?.filter((e) => {
            return e?.anonymous?.toLowerCase().includes(search.toLowerCase());
          })
          ?.sort((a, b) => {
            if (sortValue === "Ascending") {
              if (a?.anonymous < b?.anonymous) {
                return -1;
              }
            } else if (sortValue === "Descending") {
              if (a?.anonymous > b?.anonymous) {
                return -1;
              }
            }
          })
          ?.map((item) => {
            return (
              <MentorCard
                cardData={item}
                data={item}
                bigCard={true}
                key={item?.id}
                setActiveCard={setActiveCard}
              />
            );
          })}
      </div>
    </section>
  );
}
