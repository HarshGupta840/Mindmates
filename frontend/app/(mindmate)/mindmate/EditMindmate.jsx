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

const EditMindmate = ({ showEdit, setShowEdit, getData }) => {
  const { mindmate } = useContext(Context);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    expertise: [],
    address: "",
    anonymous: "",
    meeting_url: "",
    availability: "",
  });
  const [experty, setExperty] = useState("");
  const [stime, setStime] = useState("");
  const [etime, setEtime] = useState("");

  useEffect(() => {
    setUser({
      name: mindmate?.name,
      email: mindmate?.email,
      bio: mindmate?.bio,
      anonymous: mindmate?.anonymous,
      profile: mindmate?.profile,
      expertise: mindmate?.expertise,
      meeting_url: mindmate?.meeting_url,
      address: mindmate?.address,
      availability: mindmate?.availability,
    });

    setStime(mindmate?.availability?.split("-")[0]);
    setEtime(mindmate?.availability?.split("-")[1]);
  }, [mindmate]);

  const onSubmit = () => {
    console.log(stime + "-" + etime);
    console.log(user);
    console.log(user?.availability);
    axios
      .post(`${BASE_URL}/mindmate/update`, {
        ...user,
        availability: stime + "-" + etime,
        token: getCookie("token"),
      })
      .then((res) => {
        if (res.status == 200) {
          getData();
          toast.success("Updated successfully");
          setShowEdit(false);
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
        isOpen={showEdit}
        onRequestClose={() => {
          setShowEdit(false);
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
            {page === 1 ? (
              <div className="grid grid-cols-2 mt-5">
                {[
                  {
                    title: "Name",
                    value: user?.name,
                    onchange: (e) => {
                      setUser({ ...user, name: e.target.value });
                    },
                  },
                  {
                    title: "Anonymous Name",
                    value: user?.anonymous,
                    onchange: (e) => {
                      setUser({ ...user, anonymous: e.target.value });
                    },
                  },
                  {
                    title: "Email",
                    value: user?.email,
                    onchange: (e) => {
                      setUser({ ...user, email: e.target.value });
                    },
                  },
                  {
                    title: "Address",
                    value: user?.address,
                    onchange: (e) => {
                      setUser({ ...user, address: e.target.value });
                    },
                  },
                  {
                    title: "Meeting Url",
                    value: user?.meeting_url,
                    onchange: (e) => {
                      setUser({ ...user, meeting_url: e.target.value });
                    },
                  },
                ]?.map((e) => {
                  return (
                    <div key={e?.title} className="mb-3 mx-auto">
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
                <div className="mb-3 mx-auto">
                  <p className={`font-semibold`}>Availability :</p>
                  <div className="grid grid-cols-2 mt-1.5 gap-x-2 px-2">
                    <input
                      type="time"
                      value={stime}
                      className="border-2 rounded-lg px-1 py-0.5 text-sm"
                      onChange={(e) => {
                        setStime(e.target.value);
                        setUser({
                          ...user,
                          availability: stime + "-" + etime,
                        });
                      }}
                    />
                    <input
                      type="time"
                      className="border-2 rounded-lg px-1 py-0.5 text-sm"
                      value={etime}
                      onChange={(e) => {
                        setEtime(e.target.value);
                        setUser({
                          ...user,
                          availability: stime + "-" + etime,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : page == 2 ? (
              <div className="mt-5">
                <div className="mb-3 mx-auto">
                  <p className={`font-semibold`}>Profile Photo :</p>
                  <input
                    type={"file"}
                    onChange={(e) => onFileSubmit(e)}
                    className={`border-2 px-3 py-1 rounded-lg w-11/12 md:w-full outline-none mt-1 border-newBlue`}
                  />
                </div>
              </div>
            ) : page == 3 ? (
              <div className="mb-3 mt-5 mx-auto overflow-hidden">
                <p className={`font-semibold`}>Other Expertise :</p>
                <div className="mt-2 px-3 max-h-[45vh] md:max-h-[60vh] overflow-y-auto">
                  {user?.expertise?.map((e, i) => {
                    return (
                      <div className="flex items-center w-full mb-4" key={i}>
                        <input
                          type="text"
                          value={e}
                          onChange={(val) => {
                            let arr = user.expertise;
                            let index = arr.indexOf(e);
                            arr[index] = val.target.value;
                            setUser({
                              ...user,
                              expertise: arr,
                            });
                          }}
                          className="border outline-none text-gray-600 w-full rounded-md px-4 py-1"
                        />
                        <div className="pl-4">
                          <AiOutlineClose
                            className="bg-lightRed p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                            size={35}
                            onClick={(event) => {
                              let arr = user?.expertise;
                              let pos = arr.indexOf(e);
                              arr.splice(pos, 1);
                              setUser({
                                ...user,
                                expertise: arr,
                              });
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex items-center w-full mb-4">
                    <input
                      type="text"
                      value={experty}
                      placeholder="Expertise"
                      onChange={(e) => {
                        setExperty(e.target.value);
                      }}
                      className="border-2 border-newBlue outline-none text-gray-600 w-full rounded-md px-4 py-1"
                    />
                    <div
                      onClick={(event) => {
                        setUser({
                          ...user,
                          expertise: [...user.expertise, experty],
                        });
                        setExperty("");
                      }}
                      className="ml-2 md:ml-4 w-[46vw] md:w-[9vw] flex justify-center items-center py-1 bg-green-500 text-white rounded-lg cursor-pointer "
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-2 md:mt-5">
                <div className="mb-3 mx-auto">
                  <p className={`font-semibold`}>Bio :</p>
                  <textarea
                    name=""
                    id=""
                    cols="20"
                    rows="5"
                    value={user?.bio}
                    onChange={(e) => {
                      setUser({ ...user, bio: e.target.value });
                    }}
                    className="border bg-transparent w-full outline-none rounded-md px-3 py-1 mt-1 md:mt-2"
                  ></textarea>
                </div>
              </div>
            )}
            {page != 4 ? (
              <div className="flex items-center justify-evenly">
                <button
                  disabled={page == 1}
                  onClick={(e) => {
                    setPage(page - 1);
                  }}
                  className={`px-7 py-1.5 shadow-md shadow-gray-400 text-white mt-2 rounded-lg font-semibold ${
                    page == 1
                      ? "bg-lightGreen"
                      : "bg-gradient-to-r from-lightGreen to-darkGreen"
                  }`}
                >
                  Prev
                </button>
                <button
                  onClick={(e) => {
                    setPage(page + 1);
                  }}
                  className="bg-gradient-to-r from-lightGreen to-darkGreen px-7 py-1.5 mr-3 shadow-md shadow-gray-400 text-white mt-2 rounded-lg font-semibold"
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-evenly">
                <button
                  disabled={page == 1}
                  onClick={(e) => {
                    setPage(page - 1);
                  }}
                  className={`px-7 py-1.5 shadow-md shadow-gray text-white mt-2 rounded-lg font-semibold ${
                    page == 1
                      ? "bg-blue-200"
                      : "bg-gradient-to-r from-lightGreen to-darkGreen"
                  }`}
                >
                  Prev
                </button>
                <button
                  onClick={onSubmit}
                  className="bg-gradient-to-r from-lightGreen to-darkGreen px-7 py-1.5 shadow-md shadow-gray text-white mt-2 rounded-lg font-semibold"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditMindmate;
