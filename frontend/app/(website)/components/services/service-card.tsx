"use client";
import Image from "next/image";
import React from "react";
import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";
import obj from "./anonymous-identity.json";

export default function ServiceCard({
  cardData,
  setActiveCard,
  activeCard,
  bigCard = false,
  slick = false,
}) {
  const router = useRouter();
  return (
    <div
      className={`rounded-2xl py-8 px-4 shadow-md shadow-[#c5c5c5] bg-background md:mb-0 mb-4 sm:w-1/3 flex flex-col items-center cursor-pointer transition-all ${
        activeCard === cardData?.id
          ? "bg-gradient-to-br from-lightGreen to-darkGreen text-white"
          : "w-fit"
      }`}
      onClick={() => {
        setActiveCard(cardData?.id);
        cardData?.redirectUrl !== undefined &&
          router.push(`${cardData?.redirectUrl}`);
      }}
    >
      <div className="w-auto h-auto mt-8">
        {cardData?.id === 2 ? (
          <div className="w-full mx-auto block">
            <Lottie
              loop
              animationData={obj}
              play
              className="mx-auto"
              style={{ width: "50%", height: "auto" }}
            />
          </div>
        ) : (
          <Image
            src={cardData?.avatarUrl}
            alt="card"
            height={100}
            width={100}
            className="h-auto w-auto object-cover object-center rounded-[100%]"
          />
        )}
      </div>
      <h2 className="text-2xl text-bold text-center pt-4 pb-2 font-semibold">
        {cardData?.title}
      </h2>
      <p
        className={`text-center text-base ${
          activeCard !== cardData?.id ? "text-[#172048]" : ""
        }`}
      >
        {cardData?.desc}
      </p>
    </div>
  );
}
