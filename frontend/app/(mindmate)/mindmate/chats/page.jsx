"use client";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Image from "next/image";

import bg from "../../../Assets/bg.jpg";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import Context from "../../../../context/Context";
import BASE_URL from "../../../url";

const Trubuddy = () => {
  const { mindmate, setMindmate } = useContext(Context);
  const history = useRouter();
  const pathname = usePathname();

  let getData = () => {
    axios
      .post(`${BASE_URL}/mindmate/get`, { token: getCookie("token") })
      .then((res) => {
        setMindmate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="absolute top-0 left-0 z-0">
        <Image
          src={bg}
          alt="Bg"
          className="h-[20vh] md:h-[50vh] w-[100vw] object-cover object-center"
        />
      </div>
      <div className="absolute z-10 bg-white w-[85vw] md:w-[70vw] h-[85vh] md:h-[55vh] flex flex-col items-center rounded-lg bottom-0 left-1/2 -translate-x-1/2 shadow-xl shadow-gray-500">
        <div className="p-2 w-full flex items-center">
          <p
            className="bg-black text-white text-sm md:text-base px-5 mt-0.5 py-0.5 ml-3 cursor-pointer w-fit rounded-lg"
            onClick={(e) => {
              history.push("/mindmate");
            }}
          >
            @uid{mindmate?._id?.slice(mindmate?._id?.length - 4)}
          </p>
          <p
            onClick={(e) => {
              history.push("/mindmate/chats");
            }}
            className={`text-black font-semibold ml-2 md:ml-5 ${
              pathname.includes("/chats") ? "text-darkGreen" : "text-black"
            } cursor-pointer hover:scale-105 transition-all`}
          >
            Chats
          </p>
          <p
            onClick={(e) => {
              history.push("/mindmate/schedule");
            }}
            className={`text-black font-semibold ml-2 md:ml-5 ${
              pathname.includes("/schedule") ? "text-darkGreen" : "text-black"
            } cursor-pointer hover:scale-105 transition-all`}
          >
            Scheduled Meetings
          </p>
        </div>
        {!mindmate?.mates ? (
          <div className="w-full flex items-center justify-center text-gray">
            <p className="text-xl">Sorry, You don&apos;t have any mate</p>
          </div>
        ) : (
          <div className="w-full grid overflow-y-auto pb-5 grid-cols-3 gap-3 md:gap-5 px-3 md:px-5 pt-2 md:pt-3">
            {[...new Set(mindmate?.mates)]?.map((e) => {
              return <BuddyBlock id={e} key={e} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const BuddyBlock = ({ id }) => {
  const history = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .post(`${BASE_URL}/login/get-one/${id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div
      className="bg-gray-200 flex p-1 md:p-2 rounded-md relative shadow-md shadow-gray-400 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        history.push(`/mindmate/chats/${id}`);
      }}
    >
      <Image
        src={user?.profile}
        width={10000}
        height={10000}
        alt="Profile"
        className="w-[12vw] h-[12vw] object-cover object-center md:w-[3vw] md:h-[3vw] rounded-full border-2 border-lightGreen"
      />
      <div className="ml-1 md:ml-3">
        <h1 className="md:text-lg text-darkGreen text-sm font-semibold">
          {user?.anonymous ? user?.anonymous : user?.name}
        </h1>
      </div>
      {user?.unseen > 0 ? (
        <div className="absolute right-[64%] md:text-base text-xs md:right-5 -bottom-0 md:bottom-1/2 md:translate-y-1/2 bg-newBlue px-1 md:px-2 text-white rounded-full">
          {user?.unseen}
        </div>
      ) : null}
    </div>
  );
};

export default Trubuddy;
