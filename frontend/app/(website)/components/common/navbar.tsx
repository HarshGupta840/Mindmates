"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import Context from "../../../../context/Context";
import Login from "../common/Login";
import { useRouter } from "next/navigation";
import { URL } from "../../../url";

export default function Navbar() {
  const history = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const { setShowLogin, user } = useContext(Context);
  const router = useRouter();
  const navLinks = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Service", url: "/#services" },
    { id: 4, title: "About Us", url: "/#about-us" },
    { id: 3, title: "Contact", url: "/#footer" },
  ];

  return (
    <>
      <nav className="flex px-[7vw] z-30 justify-between bg-background py-3 fixed w-full top-0 left-0">
        <div className="absolute">
          <Login />
        </div>
        <div className="logo my-auto max-w-fit">
          <Image
            src="/logo.png"
            alt="card"
            height={1000}
            width={1000}
            className="h-auto w-[38vw] md:w-[15vw] cursor-pointer"
            onClick={(e) => {
              history.push("/");
            }}
          />
        </div>
        <div className="hidden sm:flex gap-5 items-center text-grey ">
          {navLinks?.map((item) => {
            return (
              <div key={item?.id} className="p transition-all hover:scale-105">
                <Link href={item?.url} className="mr-5 font-semibold">
                  {item?.title}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 relative">
          {!user?._id ? (
            <button
              className={
                "bg-gradient-to-r text-white from-[#4ED6DA] font-semibold to-[#04789D] text-center h-fit py-2 my-1 px-8 rounded-3xl"
              }
              onClick={(e) => {
                setShowLogin(true);
              }}
            >
              Explore
            </button>
          ) : (
            <div className="relative">
              <Image
                src={user?.profile}
                alt="Profile image"
                width={1000}
                height={1000}
                onClick={(e) => {
                  setShowLogout(!showLogout);
                }}
                className="md:w-[3.5vw] border border-lightGreen w-[8vw] h-[8vw] md:h-[3.5vw] rounded-full cursor-pointer"
              />
              {showLogout && (
                <div className="absolute right-0 md:right-2 top-[9vw] md:text-base text-xs md:top-[4vw] bg-white px-2 rounded-md border border-lightGreen">
                  <p
                    className="px-7 shadow-sm shadow-[#999] my-2 py-1 cursor-pointer rounded-md"
                    onClick={(e) => {
                      history.push("/dashboard");
                      setShowLogout(false);
                    }}
                  >
                    Account
                  </p>
                  <p
                    className="px-7 shadow-sm shadow-[#999] my-2 py-1 cursor-pointer rounded-md"
                    onClick={(e) => {
                      history.push("/");
                      window.open(`${URL}logout`, "_self");
                      setShowLogout(false);
                    }}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <div className="py-[4vw] bg-background md:py-[2.5vw]"></div>
    </>
  );
}
