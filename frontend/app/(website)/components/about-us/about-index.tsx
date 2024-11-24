"use client";
import Image from "next/image";
import React, { useContext } from "react";
import bg from "../../../Assets/elements/Group 9.png";
import { useRouter } from "next/navigation";
import Context from "../../../../context/Context";

export default function AboutUsIndex() {
  const history = useRouter();
  const { width } = useContext(Context);

  return (
    <section id="about-us" className="py-8 relative">
      <Image
        src={bg}
        alt="bg"
        className="absolute md:block hidden -top-[2vw] left-0"
      />
      <h3 className="text-center text-3xl font-semibold mb-10">About Us</h3>
      <div className="flex flex-col sm:flex-row my-6 w-4/5 mx-auto items-center gap-5">
        <div className="md:w-2/5">
          <Image
            src="/images/about-us.svg"
            alt="card"
            height={100}
            width={100}
            className="h-auto w-full"
          />
        </div>
        <div className="w-full md:w-3/5 md:pl-9">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={
              width < 600 ? { lineHeight: "8vw" } : { lineHeight: "3.5vw" }
            }
          >
            Discover the Faces Behind
            <br /> Our <span className="text-gradient-01"> Mental Health </span>
            <br />
            Consultancy
          </h2>
          <p className="text-lightGray pt-2 pb-2 md:pb-4">
            Meet our compassionate Mates at MindMates. With expertise in various
            fields, they&apos;re here to support you on your journey to mental
            wellness.
          </p>
          <button
            onClick={(e) => {
              history.push("/mindmates");
            }}
            className={
              "bg-gradient-to-r text-white from-[#4ED6DA] font-semibold to-[#04789D] text-center text-lg h-fit py-1.5 my-1 px-8 rounded-3xl"
            }
          >
            Explore Experts
          </button>
        </div>
      </div>
    </section>
  );
}
