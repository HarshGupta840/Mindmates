"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { FaCalendarAlt, FaPaperclip } from "react-icons/fa";
import { FaFistRaised } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Context from "../../../../context/Context";

export default function UserMenu() {
  const router = useRouter();
  const userMenuList = [
    {
      title: "Dashboard",
      id: 1,
      icon: <FaHome size={25} className="mr-2" />,
      redirectUrl: "/dashboard",
    },
    {
      title: "Questionnaire",
      id: 2,
      icon: <FaFistRaised size={25} className="mr-2" />,
      redirectUrl: "/dashboard/questionnaire",
    },
    {
      title: "Query Status",
      id: 3,
      icon: <FaCalendarAlt size={25} className="mr-2" />,
      redirectUrl: "/dashboard/queries",
    },
    {
      title: "Community Posts",
      id: 3,
      icon: <FaPaperclip size={25} className="mr-2" />,
      redirectUrl: "/dashboard/community",
    },
  ];
  const { user } = useContext(Context);
  const pathname = usePathname();

  return (
    <div className="md:w-[20vw] text-center font-semibold flex flex-col md:mb-12 mt-12 mb-0 md:mt-12 px-4 md:border-r border-lightGray ">
      <div className="mx-auto w-8/12 h-fit flex items-center flex-col">
        <Image
          src={user?.profile}
          width={1000}
          height={1000}
          alt="bg"
          className="rounded-[100%]"
        />
        <h2 className="text-2xl mt-2 text-center">
          {user?.anonymous ? user?.anonymous : user?.name}
        </h2>
      </div>
      <div className="pt-4 flex flex-col items-start mx-auto w-fit">
        {userMenuList?.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                router.push(`${item?.redirectUrl}`);
              }}
              className={`flex justify-center py-2 text-lg font-normal cursor-pointer items-center ${
                pathname === item?.redirectUrl ? "text-darkGreen" : "text-gray"
              }`}
            >
              {item?.icon} <h2>{item?.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
