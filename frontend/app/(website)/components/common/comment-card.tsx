import Image from "next/image";
import React from "react";

export default function CommentCard({ data }) {
  return (
    <div className="flex py-2 mx-2 border-0 border-b border-darkGreen sm:gap-8 gap-4">
      <div className="rounded-full">
        <Image
          src={data?.user?.profile}
          alt="card"
          height={100}
          width={100}
          className="mx-auto w-12 h-full rounded-full bg-cover"
        />
      </div>
      <div className="font-semibold">
        <h4 className="text-lg">{data?.user?.anonymous}</h4>
        <p className="text-darkGreen text-xs">{data?.text}</p>
      </div>
    </div>
  );
}
