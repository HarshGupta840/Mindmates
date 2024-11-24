"use client";
import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export default function FAQ({ data }) {
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <div
      className="bg-gradient-to-l from-lightGreen to-darkGreen p-[2px] rounded-xl"
      onClick={() => setFaqOpen(!faqOpen)}
    >
      <div className="bg-[#D5EAF5] text-darkGreen p-3 rounded-xl text-base">
        <div className="flex sm:gap-6 font-semibold justify-between items-center cursor-pointer line-clamp-2">
          <h2>{data?.q}</h2>
          {faqOpen ? <FaCaretUp size={23} /> : <FaCaretDown size={23} />}
        </div>
        {faqOpen && (
          <p className="text-sm mt-2 pt-1 border-t border-darkGreen">
            {data?.ans}
          </p>
        )}
      </div>
    </div>
  );
}
