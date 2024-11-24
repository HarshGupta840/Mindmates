import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../url";
import Context from "../../../../context/Context";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";

export default function MentorCard({
  activeCard = 0,
  setActiveCard,
  cardData,
  bigCard = false,
  data,
  recommanded = false,
}) {
  const { user, setClickedUser, getUser } = useContext(Context);
  const [available, setAvailable] = useState(false);
  const history = useRouter();

  useEffect(() => {
    var today = new Date();
    if (
      today.getHours() <=
        parseInt(data?.availability.split("-")[1].slice(0, 2)) &&
      today?.getHours() >=
        parseInt(data?.availability.split("-")[0].slice(0, 2))
    ) {
      setAvailable(true);
    }
  }, [data]);

  return (
    <div
      className={`rounded-2xl my-4 py-4 px-4 h-auto mx-auto relative cursor-pointer bg-background ${
        !bigCard ? "sm:w-1/3" : "w-[92%] mx-auto"
      } flex flex-col items-center border border-lightGreen ${
        available ? "grayscale-0" : "grayscale"
      }
        ${activeCard === cardData?.id ? "sm:my-4" : ""}
      `}
      onClick={() => setActiveCard(cardData?.id)}
    >
      {!available && !recommanded && (
        <p className="absolute right-3 top-3 border px-3 rounded-lg border-gray text-gray text-sm">
          {data?.availability}
        </p>
      )}
      {recommanded && available ? (
        <div className="flex items-center text-sm text-darkGreen border border-darkGreen px-3 absolute right-3 top-3 rounded-lg">
          <AiFillStar className="mr-2" /> Recommended
        </div>
      ) : null}
      {recommanded && !available ? (
        <>
          <div className="flex items-center text-sm text-darkGreen border border-darkGreen px-3 absolute right-3 top-3 rounded-lg">
            <AiFillStar className="mr-2" /> Recommended
          </div>
          <p className="absolute right-3 top-[3vw] border px-3 rounded-lg border-gray text-gray text-sm">
            {data?.availability}
          </p>
        </>
      ) : null}
      <div className="sm:w-[8vw] w-[35vw] h-[35vw]  sm:h-[8vw] mt-8 rounded-[100%] bg-gradient-to-r from-lightGreen to-darkGreen p-1">
        <Image
          src={data?.profile}
          alt="card"
          height={1000}
          width={1000}
          className="h-full w-full object-cover object-center rounded-full"
        />
      </div>
      <h2 className="text-2xl font-semibold text-center mt-2">
        {cardData?.anonymous}
      </h2>
      <div className="flex sm:flex-wrap lg:flex-nowrap justify-center gap-2 mt-2 mb-2">
        {cardData?.expertise?.map((e, i) => {
          return (
            <div
              key={i}
              className="text-sm sm:text-xs lg:text-sm px-5 py-0.5 rounded-3xl border-[#1720488a] border"
            >
              {e}
            </div>
          );
        })}
      </div>
      <p
        className={`"text-center line-clamp-3 mb-3 ${
          activeCard !== cardData?.id ? "text-[#172048]" : ""
        })`}
      >
        {cardData?.bio}
      </p>
      <button
        disabled={!available}
        onClick={(e) => {
          if (data?._id && user?._id) {
            if (user?.mindmates?.includes(data?._id)) {
              setClickedUser(data);
              history.push("/chats");
            } else {
              axios
                .post(`${BASE_URL}/mindmate/mates/${data?._id}/${user?._id}`)
                .then((res) => {
                  setClickedUser(data);
                  getUser();
                  history.push("/chats");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else {
            toast.error("Please login first");
          }
        }}
        className={
          "bg-gradient-to-r text-white from-[#4ED6DA] w-full font-semibold to-[#04789D] text-center text-lg h-fit py-1.5 my-1 px-8 rounded-3xl"
        }
      >
        Start Chat
      </button>
    </div>
  );
}
