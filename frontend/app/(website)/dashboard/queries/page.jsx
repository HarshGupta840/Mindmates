"use client";
import { useContext, useEffect } from "react";
import UserMenu from "../../components/common/user-menu";
import Context from "../../../../context/Context";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Queries() {
  const { user, queries, getQueries } = useContext(Context);
  const history = useRouter();

  useEffect(() => {
    getQueries();
  }, []);

  return (
    <div className="flex md:flex-row flex-col bg-white px-[9vw]">
      <UserMenu></UserMenu>
      <main className="md:w-[75vw]">
        <div className="my-12 w-auto md:px-8">
          <h3 className="text-2xl font-semibold">
            Hello {user?.anonymous ? user?.anonymous : user?.name},
          </h3>
          <div className="bg-gradient-to-br h-[40vh] w-auto from-lightGreen to-darkGreen p-[1px] rounded-xl mt-4">
            <div className="p-4 flex flex-col h-full w-full gap-4 bg-white rounded-xl">
              <h2 className="text-gray font-medium text-xl">Queries</h2>
              <div className="px-2 flex flex-col overflow-y-auto">
                {queries?.map((e, i) => {
                  return <Block data={e} key={i} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const Block = ({ data }) => {
  return (
    <div className="bg-gradient-to-b from-lightGreen to-darkGreen w-full rounded-lg mb-5 shadow-sm shadow-[#999] p-[1px]">
      <div className="bg-white rounded-lg px-4 py-2 w-full flex items-center justify-between">
        <div className="flex items-start">
          <Image
            src={data?.mindmate?.profile}
            alt="Mindmate profile"
            width={1000}
            height={1000}
            className="w-[5vw] rounded-full border border-lightGreen h-[5vw]"
          />
          <div className="ml-3">
            <h1 className="text-xl font-semibold">
              {data?.mindmate?.anonymous}
            </h1>
            <p className="text-gray">{data?.topic}</p>
            {data?.status === "Pending" ? (
              <div className="flex items-center text-black mt-1 text-sm">
                <div className="bg-red-600 w-[8px] h-[8px] mr-2 rounded-full"></div>
                {data?.status}
              </div>
            ) : data?.status === "Ongoing" ? (
              <div className="flex items-center text-black mt-1 text-sm">
                <div className="bg-yellow-400 w-[8px] h-[8px] mr-2 rounded-full"></div>
                {data?.status}
              </div>
            ) : (
              <div className="flex items-center text-black mt-1 text-sm">
                <div className="bg-green-600 w-[8px] h-[8px] mr-2 rounded-full"></div>
                {data?.status}
              </div>
            )}
          </div>
        </div>
        {data?.status !== "Completed" && (
          <Image
            src="/logos/duo.svg"
            onClick={(e) => {
              window.open(data?.mindmate?.meeting_url);
            }}
            height={100}
            width={100}
            alt="user-profile"
            className="w-[3vw] h-[3vw] rounded-[100%] bg-darkGreen p-2 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
