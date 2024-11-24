"use client";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import BASE_URL from "../../../url/index";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import Context from "../../../../context/Context";
import Image from "next/image";
import bg from "../../../Assets/positive-login.png";

const Mindmate = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const history = useRouter();
  const { setMindmate } = useContext(Context);

  useEffect(() => {
    if (getCookie("token")) {
      history.push("/mindmate");
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full text-gray h-[100vh]">
      <Toaster />
      <div className="bg-background md:flex hidden w-[50vw] h-full items-center justify-center">
        <Image src={bg} alt="Rafiki" className="w-8/12" />
      </div>
      <div className="md:w-[50vw] px-10 text-gray flex flex-col md:items-start items-center">
        <h1 className="text-3xl font-bold">WELCOME BACK!</h1>
        <p className="my-2 tracking-wider">Already have an Account, Log in</p>
        <div className="md:w-9/12">
          <input
            type="text"
            value={user?.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="Enter email"
            className="border outline-none px-5 py-1.5 mb-4 mt-2 rounded-full text-lg w-full"
          />
          <div className="w-full flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={user?.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              className="border outline-none px-5 py-1.5 rounded-full text-lg w-full"
            />
            <div
              className="text-2xl absolute right-3 cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
          </div>
          <button
            onClick={(e) => {
              if (!user?.email || !user?.password) {
                toast.error("Please fill all the details");
              } else {
                axios
                  .post(`${BASE_URL}/mindmate/login`, { ...user })
                  .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                      history.push("/mindmate");
                      setMindmate(response.data.user);
                      setCookie("token", response.data.jwtToken);
                    } else {
                      toast.error(response.data);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }}
            className="border py-1.5 px-5 mt-4 rounded-full text-lg w-full font-medium bg-gradient-to-r from-lightGreen to-darkGreen text-white"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mindmate;
