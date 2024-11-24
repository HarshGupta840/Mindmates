"use client";
import { useContext, useEffect, useState } from "react";
import UserMenu from "../components/common/user-menu";
import Context from "../../../context/Context";
import EditDashboard from "./EditMindmate";
import AgreeModal from "../components/common/AgreeModal";

export default function UserDashboard() {
  const { user, setShowConsent, setShowEditProfile } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("mindmate") != "true") {
      setShowConsent(true);
    }
  }, []);

  return (
    <div className="flex md:flex-row flex-col bg-white px-[9vw]">
      <UserMenu></UserMenu>
      <AgreeModal />
      <EditDashboard />
      <main className="w-full md:w-[75vw]">
        <div className="my-12 w-auto md:px-8">
          <h3 className="text-2xl font-semibold">
            Hello {user?.anonymous ? user?.anonymous : user?.name},
          </h3>
          <div className="bg-gradient-to-br md:h-[40vh] w-auto from-lightGreen to-darkGreen p-[1px] rounded-xl mt-4">
            <div className="p-4 flex flex-col h-full w-full gap-4 bg-white rounded-xl">
              <h2 className="text-gray font-medium text-xl">
                Personal Information
              </h2>
              <div className="px-2 flex flex-col">
                <div className="flex mb-2">
                  <h3 className="text-lg font-semibold">Name: </h3>
                  <h4 className="text-lg ml-1">{user?.name}</h4>
                </div>
                <div className="flex mb-2">
                  <h3 className="text-lg font-semibold">Anonymous Name: </h3>
                  <h4 className="text-lg ml-1">{user?.anonymous}</h4>
                </div>
                <div className="flex mb-2">
                  <h3 className="text-lg font-semibold">Email: </h3>
                  <h4 className="text-lg ml-1">{user?.email}</h4>
                </div>
                <button
                  className={
                    "bg-gradient-to-r w-fit text-white from-[#4ED6DA] font-semibold to-[#04789D] text-center h-fit py-2 my-1 px-8 rounded-xl"
                  }
                  onClick={(e) => {
                    setShowEditProfile(true);
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
