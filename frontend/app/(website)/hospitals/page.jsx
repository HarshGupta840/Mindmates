"use client";
import React, { useContext } from "react";
import Context from "../../../context/Context";
import Image from "next/image";

const Hospitals = () => {
  const { allMindmates } = useContext(Context);

  return (
    <div className="px-[9vw] py-7">
      <h1 className="text-3xl my-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-lightGreen to-darkGreen w-fit">
        Hospitals
      </h1>
      <div className="w-full">
        {allMindmates
          ?.filter((e) => {
            return e?.address?.length > 1;
          })
          ?.map((e, i) => {
            return (
              <div
                key={i}
                className="flex items-center cursor-pointer shadow-md px-4 py-1 rounded-lg shadow-[#c1c1c1] my-2 justify-between"
              >
                <div className="flex items-center">
                  <Image
                    src={e?.profile}
                    width={1000}
                    height={1000}
                    className="w-[6vw] rounded-full"
                    alt="profile image"
                  />
                  <h1 className="text-darkGreen text-xl font-semibold">
                    {e?.anonymous}
                  </h1>
                </div>
                <p className="text-lg ">{e?.address}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Hospitals;
