"use client";
import Image from "next/image";
import React, { useState } from "react";
import FAQ from "./faq";

export default function FaqsIndex() {
  const questions = [
    {
      q: "What is the minimum age for using MindMates?",
      ans: "Minimum age for using MindMates is 12 years.",
    },
    {
      q: "Is my data and information safe with MindMates?",
      ans: "Yes, your data is completely safe with us, and none of the information provided is used in any way.",
    },
    {
      q: "What happens if i get a message that makes me uncomfortable or seems is taking my privacy?",
      ans: "All our MindMates are trusted and ensured. And then too if anything like this happens, the MindMate will be permanently banned.",
    },
    {
      q: "Can I become a MindMate?",
      ans: "Yes, you can join us as a MindMate. And for that, kindly contact us directly.",
    },
    {
      q: "Is calling safe here with MindMates?",
      ans: "All your chats and calls are done anonymously, and none of the information is sent to the MindMate.",
    },
    {
      q: "Is it free to use?",
      ans: "Yes, our services are completely free to use as of now.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#44b4b43c] to-[#106d8c36] py-6 md:py-16 px-[9vw] flex flex-col justify-between items-center sm:flex-row">
      <div className="w-full md:w-6/12">
        <h2 className="text-3xl sm:text-4xl font-bold text-darkGreen text-center">
          FAQ&apos;s
        </h2>
        <div className="md:w-10/12 h-[50vh] md:h-[52vh] pr-2 overflow-y-auto mx-auto my-8 space-y-2">
          {questions?.map((e, i) => {
            return <FAQ data={e} key={i} />;
          })}
        </div>
      </div>
      <div className="w-4/12 md:block hidden h-auto">
        <Image
          src="/images/faq.svg"
          alt="card"
          height={100}
          width={100}
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
