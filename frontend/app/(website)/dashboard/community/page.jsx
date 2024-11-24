"use client";
import { useContext, useState } from "react";
import UserMenu from "../../components/common/user-menu";
import Context from "../../../../context/Context";
import { useRouter } from "next/navigation";
import Post from "../../components/community-posts/post";
import axios from "axios";
import BASE_URL from "../../../url";
import toast, { Toaster } from "react-hot-toast";

export default function Queries() {
  const [text, setText] = useState("");
  const { user, getPosts, posts } = useContext(Context);

  return (
    <div className="flex md:flex-row flex-col bg-white px-[9vw]">
      <Toaster />
      <UserMenu></UserMenu>
      <main className="md:w-[75vw]">
        <div className="my-12 w-auto md:px-8">
          <h3 className="text-2xl font-semibold">
            Hello {user?.anonymous ? user?.anonymous : user?.name},
          </h3>
          <div className="bg-gradient-to-br h-[50vh] w-auto from-lightGreen to-darkGreen p-[1px] rounded-xl mt-4">
            <div className="p-3 flex flex-col h-full w-full gap-4 bg-white rounded-xl">
              <div className="flex items-center">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  placeholder="What do you want to talk about?"
                  className="w-11/12 outline-none bg-background mr-2 md:mr-4 rounded-xl px-5 py-2 border border-[#bdbdbd]"
                />{" "}
                <button
                  className={
                    "bg-gradient-to-r w-fit text-white from-[#4ED6DA] font-semibold to-[#04789D] text-center h-fit py-2 px-4 md:px-8 rounded-xl"
                  }
                  onClick={(e) => {
                    axios
                      .post(`${BASE_URL}/posts/create`, {
                        user: user?._id,
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
                  }}
                >
                  Proceed
                </button>
              </div>
              <div className="px-1">
                <h1 className="text-xl font-semibold text-gray">
                  Posts you&apos;ve shared
                </h1>
                <div className="h-[35vh] pt-4 overflow-y-auto">
                  {posts
                    ?.filter((e) => {
                      if (e?.user?._id == user?._id) {
                        return e;
                      }
                    })
                    ?.map((e, i) => {
                      return <Post data={e} key={i} />;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
