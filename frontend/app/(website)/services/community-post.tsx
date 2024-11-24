"use client";
import React, { useContext } from "react";
import Post from "../components/community-posts/post";
import Context from "../../../context/Context";

export default function CommunnityPost() {
  const { posts, width } = useContext(Context);

  return (
    <section className="bg-background mx-auto py-8 px-[9vw]">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
        style={width < 600 ? { lineHeight: "8.5vw" } : { lineHeight: "3.9vw" }}
      >
        Community
        <span className="text-gradient-01">
          <span> Anonymous </span>
          <br />
          Posts
        </span>
      </h2>
      <div className="pt-6">
        {posts?.map((e, i) => {
          return <Post data={e} key={i} />;
        })}
      </div>
    </section>
  );
}
