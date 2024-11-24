import Image from "next/image";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
export default function Footer() {
  return (
    <footer id="footer" className="py-5 md:py-12 px-[11vw] md:px-[9vw] bg-background">
      <div className="flex flex-wrap lg:flex-nowrap mx-auto justify-evenly gap-2 md:gap-8 text-center max-w-[100rem]">
        <div className="sm:w-1/4">
          <Image
            src="/logo.png"
            alt="logo"
            height={1000}
            width={1000}
            className="w-[40vw] md:w-[16vw] mx-auto md:mx-0 md:-ml-3 h-auto"
          />
          <p className="text-lightGray text-center md:text-start ml-1 py-2 md:py-4">
            You&apos;ve reached the end, but it&apos;s not the end!
            <br /> Remember, you&apos;re not alone. Reach out, seek support, and
            prioritize your mental well-being.
          </p>
        </div>
        <div className="mt-3 md:ml-[4vw] flex md:flex-row flex-col items-center md:items-start justify-between w-full">
          <div className="sm:w-1/4">
            <ul className="font-semibold flex flex-col items-center md:items-start w-fit mx-auto text-2xl space-y-2 footer">
              Services
              <li className="text-base cursor-pointer pt-2">Psychotherapy</li>
              <li className="text-base cursor-pointer">Mental Counseling</li>
              <li className="text-base cursor-pointer">Support Groups</li>
              <li className="text-base cursor-pointer">Case Management</li>
            </ul>
          </div>
          <div className="sm:w-1/4">
            <ul className="font-semibold text-2xl flex flex-col items-center md:mt-0 mt-4 md:items-start mx-auto space-y-3 footer">
              Contact
              <li className="text-base cursor-pointer items-center flex gap-4 pt-2 justify-center">
                <FaPhoneAlt /> +14 5464 8272
              </li>
              <li className="text-base cursor-pointer items-center flex gap-4 justify-center">
                <MdEmail /> Mental Counseling
              </li>
              <li className="text-base cursor-pointer items-center flex gap-4 justify-center">
                <IoLocationSharp />
                Support Groups
              </li>
              {/* <li className="text-xs">Case Management</li> */}
            </ul>
          </div>
          <div className="md:w-1/4">
            <ul className="font-semibold text-2xl flex flex-col md:mt-0 mt-4 items-center md:items-start mx-auto space-y-2 footer">
              Links
              <li className="text-base cursor-pointer mt-2">Privacy Policy</li>
              <li className="text-base cursor-pointer">Terms of use</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-[2px] max-w-[100rem] bg-gradient-to-r from-lightGreen via-darkGreen to-lightGreen mt-4 mb-5 mx-auto"></div>
      <div className="text-center">
        Copyright 2024 @mindmates all Right Reserved
      </div>
      <div className="pt-4">
        <Image
          src="/images/footer-logos.svg"
          alt="card"
          height={100}
          width={100}
          className="h-auto w-auto mx-auto cursor-pointer"
        />
      </div>
    </footer>
  );
}
