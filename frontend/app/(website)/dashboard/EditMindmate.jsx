"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { getCookie } from "cookies-next";
import { AiOutlineClose } from "react-icons/ai";
import Context from "../../../context/Context";
import BASE_URL from "../../url";

const customStyles = {
  overlay: {
    zIndex: 1001, // Adjust the value as needed
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1.5rem",
  },
};

const EditDashboard = () => {
  const { mindmate } = useContext(Context);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({
    name: "",
    email: "",
    anonymous: "",
  });
  const context = useContext(Context);
  const { getUser, setShowEditProfile, showEditProfile } = useContext(Context);

  useEffect(() => {
    setUser({
      name: context?.user?.name,
      email: context?.user?.email,
      anonymous: context?.user?.anonymous,
      profile: context?.user?.profile,
    });
  }, [context?.user]);

  const onSubmit = () => {
    axios
      .post(`${BASE_URL}/login/update`, {
        ...user,
        id: context?.user?._id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          toast.success("Updated successfully");
          setShowEditProfile(false);
          getUser();
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onFileSubmit = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "upload_photo");
    formData.append("cloud_name", "dfpnkqrjw");

    fetch("https://api.Cloudinary.com/v1_1/dfpnkqrjw/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setUser({ ...user, profile: res.url });
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Toaster />
      <Modal
        isOpen={showEditProfile}
        onRequestClose={() => {
          setShowEditProfile(false);
        }}
        style={customStyles}
      >
        <div className={`w-[80vw] md:w-[35vw] flex flex-col items-center`}>
          <h1 className="text-2xl text-newBlue w-full md:text-center text-start font-bold">
            Complete your Profile
          </h1>
          <div className="w-full mt-3">
            <h1 className="text-xl font-semibold">Personal Info </h1>
            <p>You are completely anonymous , nobody can see your details</p>
            <div className="px-3">
              {[
                {
                  title: "Anonymous Name",
                  value: user?.anonymous,
                  onchange: (e) => {
                    setUser({ ...user, anonymous: e.target.value });
                  },
                },
              ]?.map((e) => {
                return (
                  <div key={e?.title} className="mb-3 w-full mx-auto">
                    <p className={`font-semibold`}>{e?.title} :</p>
                    <input
                      type="text"
                      placeholder={e?.title}
                      disabled={e?.title === "Name" || e?.title == "Email"}
                      value={e?.value}
                      onChange={e?.onchange}
                      className={`${
                        e?.title === "Name" || e?.title == "Email"
                          ? "text-gray-500"
                          : ""
                      }  border-2 px-3 py-1 w-11/12 md:w-full rounded-lg outline-none mt-1 border-newBlue`}
                    />
                  </div>
                );
              })}
              <div className="mt-5 mb-3">
                <p className={`font-semibold`}>Profile Photo :</p>
                <input
                  type={"file"}
                  onChange={(e) => onFileSubmit(e)}
                  className={`border-2 px-3 py-1 rounded-lg w-11/12 md:w-full outline-none mt-1 border-newBlue`}
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                onClick={onSubmit}
                className="bg-gradient-to-r from-lightGreen to-darkGreen px-7 py-1.5 mx-auto w-fit shadow-md shadow-gray text-white mt-2 rounded-lg font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditDashboard;
