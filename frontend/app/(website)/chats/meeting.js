"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../../url";
import Context from "../../../context/Context";

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
    backgroundColor: "#fff",
    width: "30vw",
  },
};

const Meeting = ({ show, setShow }) => {
  const { user, clickedUser } = useContext(Context);
  const [data, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
  });

  useEffect(() => {
    setdata({ ...data, name: user?.anonymous, email: user?.email });
  }, [user]);

  return (
    <div className={"bg-background"}>
      <Toaster />
      <Modal
        isOpen={show}
        onRequestClose={() => {
          setShow(false);
        }}
        style={customStyles}
      >
        <div className="w-full h-full text-black px-5 py-5 flex flex-col items-center">
          <h1 className="text-2xl text-gray font-bold mb-2">
            Form for Online Meet
          </h1>
          <p className="text-sm text-gray">
            Fill out the necessary details that are mentioned below, so that
            your MindMate understands you perfectly, and the flow of your
            session will be smooth.
          </p>
          <Input
            type="text"
            placeholder="Enter your name"
            title="Name"
            value={data?.name}
            onchange={(e) => {
              setdata({ ...data, name: e.target.value });
            }}
          />
          <Input
            type="text"
            placeholder="Enter your email"
            title="Email"
            value={data?.email}
            onchange={(e) => {
              setdata({ ...data, email: e.target.value });
            }}
          />
          <Input
            type="number"
            placeholder="Enter your phone no"
            title="Phone"
            value={data?.phone}
            onchange={(e) => {
              setdata({ ...data, phone: e.target.value });
            }}
          />
          <Input
            type="text"
            placeholder="Mention the topic which you wanna discuss"
            title="Topic"
            value={data?.topic}
            onchange={(e) => {
              setdata({ ...data, topic: e.target.value });
            }}
          />

          <button
            onClick={(e) => {
              if (!data?.name || !data?.email || !data?.phone || !data?.topic) {
                toast.error("Please fill all the details");
              } else {
                axios
                  .post(`${BASE_URL}/meeting/create`, {
                    ...data,
                    user: user?._id,
                    mindmate: clickedUser?._id,
                  })
                  .then((res) => {
                    if (res.status == 200) {
                      setShow(!show);
                      toast.success("Video meeting requested successfully");
                      setdata({
                        name: "",
                        email: "",
                        phone: "",
                        topic: "",
                      });
                    }
                  });
              }
            }}
            className={
              "bg-gradient-to-r text-white from-[#4ED6DA] font-semibold mt-4 to-[#04789D] text-center text-lg h-fit py-1.5 px-8 rounded-3xl"
            }
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

const Input = ({ type, value, title, onchange, placeholder }) => {
  return (
    <div className="w-full my-2 text-gray">
      <p className="mb-1">{title} *</p>
      <div className="bg-gradient-to-b from-lightGreen w-full rounded-md to-darkGreen p-[1px]">
        <input
          type={type}
          placeholder={placeholder}
          className="outline-none px-4 rounded-md py-1 w-full"
          value={value}
          onChange={onchange}
        />
      </div>
    </div>
  );
};

export default Meeting;
