"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Context from "../../../context/Context";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [setshowLogout, setSetshowLogout] = useState(false);
  const { mindmate } = useContext(Context);
  const history = useRouter();

  return (
    <div className="flex items-center justify-end fixed top-0 left-0 w-full z-50 relative">
      <Image
        src={mindmate?.profile}
        width={10000}
        onClick={(e) => {
          setSetshowLogout(!setshowLogout);
        }}
        height={10000}
        alt="Profile"
        className="w-[34vw] md:w-[3vw] cursor-pointer h-[34vw] m-3 border border-lightGreen md:h-[3vw] object-cover object-center rounded-full"
      />
      {setshowLogout && (
        <div
          onClick={(e) => {
            deleteCookie("token");
            history.push("/mindmate/login");
          }}
          className="bg-white absolute top-[4.5vw] rounded-xl cursor-pointer right-[1vw]"
        >
          <p className="px-5 py-1 font-semibold rounded-xl">Logout</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
