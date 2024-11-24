"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../../../Components/Navbar";
import Image from "next/image";
import { format } from "timeago.js";
import bg from "../../../../Assets/bg.jpg";
import { io } from "socket.io-client";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import Context from "../../../../../context/Context";
import BASE_URL, { SOCKET_URL } from "../../../../url/index";

const TrubuddyChat = ({ params }) => {
  const id = params.id;
  const { mindmate, setMindmate } = useContext(Context);
  const context = useContext(Context);
  const socket = io(SOCKET_URL);
  const history = useRouter();
  const chatContainerRef = useRef();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [user, setUser] = useState();

  const router = useRouter();

  // if (!router.isFallback && id) {
  //   router.push("/");
  // }

  useEffect(() => {
    axios
      .post(`${BASE_URL}/login/get-one/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Scrolling on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [context?.messages, messages]);

  // Connecting it with socket server
  useEffect(() => {
    if (mindmate?._id) {
      socket.emit("connection");
      socket.emit("join", { userId: mindmate?._id });
    }
  }, [mindmate]);

  useEffect(() => {
    // axios
    //   .post(`${SOCKET_URL}api/seen/${id}`, {
    //     token: getCookie("token"),
    //   })
    //   .then((res) => {})
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [context?.messages, messages]);

  // On one to one chat message submission
  const handleMessageSubmit = (e) => {
    if (messageInput.trim() === "") {
      return;
    }
    //send message to the server
    if (mindmate?._id && messageInput && id) {
      setMessageInput("");
      socket.emit("message", {
        from: mindmate?._id,
        message: messageInput,
        to: id,
      });
    } else {
      alert("Internal server error");
    }
  };

  // Getting all old one to one chat messages
  useEffect(() => {
    if (id) {
      context.getMessages(id, false);
    }
  }, [id, mindmate]);

  // On message
  useEffect(() => {
    socket.on("message", (saveMessage) => {
      setMessages((prevMessage) => [...prevMessage, saveMessage]);
    });
    return () => {
      socket.off("message");
    };
  }, [messages]);

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

  return router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Navbar />
      <div className="absolute top-0 left-0 z-0">
        <Image
          src={bg}
          alt="Bg"
          className="h-[20vh] md:h-[50vh] w-[100vw] object-cover object-center"
        />
      </div>
      <div className="absolute z-10 bg-white w-[85vw] md:overflow-auto overflow-hidden md:w-[70vw] h-[85vh] md:h-[55vh] flex flex-col items-center rounded-lg bottom-0 left-1/2 -translate-x-1/2 shadow-xl shadow-gray-500">
        <div className="w-full h-full rounded-3xl bg-white">
          <div className="mx-2 md:mx-6 h-[14%] overflow-hidden flex items-center py-2">
            <AiOutlineLeft
              size={26}
              className="mr-2 cursor-pointer"
              onClick={(e) => {
                history.push("/mindmate/chats");
              }}
            />
            <Image
              src={user?.profile}
              width={10000}
              height={10000}
              alt="Profile image"
              className="w-[12vw] md:w-[3vw] md:h-[3vw] h-[12vw] object-cover object-center rounded-full border"
            />
            <div className="ml-3 text-darkGreen">
              <h1 className="font-semibold text-lg md:text-lg">
                {user?.anonymous ? user?.anonymous : user?.name}
              </h1>
            </div>
          </div>
          <div className="bg-gradient-to-r mx-auto w-[95%] from-lightGreen to-darkGreen h-[2px]"></div>
          <div className="h-[90%] md:h-[84%]">
            <div
              ref={chatContainerRef}
              className="px-3 md:px-10 h-[90%] md:h-[85%] pt-3 overflow-y-auto"
            >
              {context?.messages
                ?.filter((e) => {
                  return (
                    (e.sender === context?.mindmate?._id &&
                      e.receiver === id) ||
                    (e.receiver === context?.mindmate?._id && e.sender === id)
                  );
                })
                ?.map((e, i) => {
                  return (
                    <ChatBlock
                      key={i}
                      data={e}
                      me={mindmate?._id == e?.sender}
                    />
                  );
                })}
              {messages
                ?.filter((e) => {
                  return (
                    (e.sender === mindmate?._id && e.receiver === id) ||
                    (e.receiver === mindmate?._id && e.sender === id)
                  );
                })
                .map((e, i) => {
                  return (
                    <ChatBlock
                      key={i}
                      data={e}
                      me={mindmate?._id == e?.sender}
                    />
                  );
                })}
            </div>
            <div className="h-[7%] md:h-[15%] flex items-center justify-center">
              <div className="flex items-center w-full h-[98%] md:h-[80%] px-3 md:px-2">
                <input
                  type="text"
                  value={messageInput}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      handleMessageSubmit();
                      setMessageInput("");
                    }
                  }}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                  }}
                  placeholder="Type Your Message Here"
                  className="border-[3px] w-[85%] md:w-[95%] h-full px-4 rounded-s-lg md:rounded-s-2xl border-darkGreen text-darkGreen md:text-base text-sm outline-none"
                />
                <div
                  onClick={(e) => {
                    handleMessageSubmit();
                    setMessageInput("");
                  }}
                  className="bg-darkGreen w-[15%] md:w-[5%] cursor-pointer h-full rounded-e-lg md:rounded-e-2xl flex items-center justify-center"
                >
                  <IoMdSend className="text-white" size={33} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatBlock = ({ me, data }) => {
  const { dcrpyt } = useContext(Context);

  return (
    <div className="mb-2 md:mb-4 text-gray">
      <div
        className={`${
          me ? "float-right items-end" : "float-left items-start"
        } flex flex-col`}
      >
        <div
          className={`${
            me
              ? "text-newBlue bg-transparent border-newBlue"
              : "text-white bg-darkGreen border-white"
          } w-fit px-3 md:px-5 py-0.5 md:py-1 rounded-lg border-2`}
        >
          {dcrpyt(data?.message)}
        </div>
        <p
          className={`text-gray-400 text-xs md:text-sm ${
            me ? "text-end mr-1" : "text-start ml-1"
          }`}
        >
          {format(data?.time)}
        </p>
      </div>
      <div className="clear-both"></div>
    </div>
  );
};

export default TrubuddyChat;
