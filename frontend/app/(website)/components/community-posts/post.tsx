"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import CommentCard from "../common/comment-card";
import axios from "axios";
import BASE_URL from "../../../url";
import Context from "../../../../context/Context";
import toast from "react-hot-toast";

export default function Post({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const { user, getPosts } = useContext(Context);

  return (
    <div
      className={`w-full mb-6 cursor-pointer shadow-sm shadow-gray py-2 transition-all mx-auto rounded-2xl border border-[#B5AFAF] px-5 md:px-14 ${
        isOpen
          ? "border hover:border-darkGreen "
          : "hover:bg-gradient-to-r hover:text-white"
      } text-gray  from-lightGreen to-darkGreen`}
    >
      <div
        className="flex pt-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-11/12 flex items-start gap-4">
          <div className="rounded-full w-3/12 md:w-1/12">
            <Image
              src={data?.user?.profile}
              alt="card"
              height={100}
              width={100}
              className="mx-auto w-full h-full rounded-full"
            />
          </div>
          <div
            className={`md:ml-4 w-9/12 md:w-10/12 text-black  ${
              isOpen ? "text-darkGreen" : "hover:text-white"
            } transition-all`}
          >
            <h3 className={"text-lg md:text-xl font-semibold "}>
              {data?.user?.anonymous}
            </h3>
            <p
              className={`text-sm mt-1 w-10/12 ${isOpen ? "" : "line-clamp-2"}`}
            >
              {data?.text}
            </p>
          </div>
        </div>
        <div
          className={`flex flex-col cursor-pointer items-end justify-between pr-4 h-full w-1/12 gap-6`}
        >
          <div className="flex text-sm md:text-base font-semibold gap-2 sm:gap-5">
            <div>{!isOpen ? "View" : "Hide"}</div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="comment py-1 px-2 md:px-4 mx-auto md:mt-0 mt-2">
          <h3 className="font-semibold text-darkGreen">Comments</h3>
          <div className="px-1 md:px-3 md:max-h-[42vh] overflow-y-auto">
            {data?.comments?.map((e, i) => {
              return <CommentCard key={i} data={e} />;
            })}
            <div className="flex items-center mt-3">
              <input
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                placeholder="Type here.."
                className="w-11/12 outline-none bg-background mr-4 rounded-xl px-5 py-1 border border-[#bdbdbd]"
              />{" "}
              <button
                className={
                  "bg-gradient-to-r w-fit cursor-pointer text-white from-[#4ED6DA] font-semibold to-[#04789D] text-center h-fit py-1 px-6 rounded-xl"
                }
                onClick={(e) => {
                  if (user?._id) {
                    if (text?.trim().length > 0) {
                      axios
                        .post(`${BASE_URL}/posts/comment`, {
                          id: user?._id,
                          post_id: data?._id,
                          text,
                        })
                        .then((res) => {
                          setText("");
                          getPosts();
                          toast.success("Posted successfully");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  } else {
                    toast.error("Please login first");
                  }
                }}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
