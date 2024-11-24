"use client";
import React, { useContext } from "react";
import Post from "./post";
import Context from "../../../../context/Context";
import { useRouter } from "next/navigation";

export default function CommunityIndex() {
  const history = useRouter();
  const { width, posts } = useContext(Context);

  return (
    <section className="bg-background py-5 md:py-12 px-[9vw] md:px-8">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl my-5 font-bold text-center"
        style={width < 600 ? { lineHeight: "8vw" } : { lineHeight: "3.9vw" }}
      >
        <span> Community </span>
        <span className="text-gradient-01">
          Anonymous <br />
          Posts
        </span>
      </h2>
      <div className="px-[1vw] md:px-[9vw]">
        {posts?.slice(0, 3)?.map((e, i) => {
          return <Post data={e} key={i} />;
        })}
        <div className="mx-auto w-fit md:pt-2">
          <button
            onClick={(e) => {
              history.push("/services/#mentors-list");
            }}
            className={
              "bg-gradient-to-r text-white shadow-md shadow-[#bababa] from-[#4ED6DA] font-semibold to-[#04789D] text-center text-lg h-fit py-1.5 my-1 px-8 rounded-3xl"
            }
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
}
