import React from "react";
import CommunnityPost from "./community-post";

export default function Page() {
  return (
    <main>
      <section className="bg-gradient-to-b from-[#d5e9f5] to-[#d4f5f5] py-12">
        <div className="w-4/5 mx-auto border-0 border-l-4 border-greenish p-4 px-6">
          <h2 className="text-3xl sm:text-4xl font-semibold text-darkGreen">
            Services Details
          </h2>
          <p className="text-sm py-2 text-[#02607E]">
            Our website offers a range of services to support your well-being,
            including online therapy sessions with licensed professionals,
            community forums for peer support, and personalized mental health
            assessments.
          </p>
        </div>
      </section>
      <CommunnityPost />
    </main>
  );
}
