"use client";
import React, { useContext, useState } from "react";
import ServiceCard from "./service-card";
import Image from "next/image";
import bg from "../../../Assets/elements/Group 7.png";
import bg1 from "../../../Assets/elements/Group 6.png";
import Context from "../../../../context/Context";

export default function ServicesIndex() {
  const { width } = useContext(Context);
  const ServiceCardData = [
    {
      id: 1,
      avatarUrl: "/images/doctor-avatar.svg",
      title: "Chat with Experts",
      desc: "You can connect directly, quickly and easily, and there is no need to doubt the quality of the consultation and treatment offered.",
      redirectUrl: "/mindmates",
    },
    {
      id: 2,
      avatarUrl: "/images/tablet-avatar.svg",
      title: "Anonymous Identity",
      desc: "Talk about the health complaints you are experiencing and don't hesitate to ask about the proper treatment",
      redirectUrl: "/services/#mentors-list",
    },
    {
      id: 3,
      avatarUrl: "/images/hospital-avatar.svg",
      title: "Visit Hospitals",
      desc: "Get priority services in hospitals with Haidoc. Which allows you to go to the hospital more practically and save time.",
      redirectUrl: "/hospitals",
    },
  ];
  const [activeCard, setActiveCard] = useState(2);

  // const slickSetting = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  return (
    <section id="services" className="py-16 mx-4 sm:mx-6 md:mx-auto md:w-4/5">
      <Image
        src={bg}
        alt="bg"
        className="absolute w-[23vw] md:block hidden top-[110vh] left-0 z-0"
      />
      <Image
        src={bg1}
        alt="bg"
        className="absolute w-[22vw] md:block hidden top-[130vh] right-0 z-0"
      />
      <h1
        className="text-3xl sm:text-3xl lg:text-4xl pb-0 md:pb-5 font-bold md:w-4/5 mx-auto text-center my-6"
        style={width < 600 ? { lineHeight: "8vw" } : { lineHeight: "3.1vw" }}
      >
        Why our <span className="text-gradient-01"> Mental Health </span>
        Consultants are <br />
        the Best Choice
      </h1>

      <div className="cards sm:flex gap-y-8 md:gap-y-3 md:px-0 px-5 gap-x-10">
        {ServiceCardData?.map((cardData) => {
          return (
            <ServiceCard
              key={cardData?.id}
              cardData={cardData}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
          );
        })}
      </div>

      <div className="flex justify-center gap-3 mt-5">
        {ServiceCardData?.map((cardData) => {
          return (
            <div
              onClick={() => setActiveCard(cardData?.id)}
              key={cardData?.id}
              className={`h-3 w-3 rounded-[100%] bg-background border-solid cursor-pointer ${
                activeCard === cardData?.id
                  ? "bg-gradient-to-r from-lightGreen to-darkGreen"
                  : activeCard !== cardData?.id
                  ? "border-solid border-gray-600 border"
                  : ""
              }`}
            ></div>
          );
        })}
      </div>
    </section>
  );
}
