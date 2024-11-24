"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Context from "../../../../context/Context";

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
  const { showConsent, setShowConsent, setShowEditProfile } =
    useContext(Context);

  return (
    <div>
      <Modal
        isOpen={showConsent}
        onRequestClose={() => {
          setShowConsent(false);
        }}
        style={customStyles}
      >
        <div className="h-full w-[90vw] md:w-[35vw] bg-white mx-auto text-center font-bold text-gray">
          <h2 className="text-2xl sm:text-3xl">Privacy & Confidentiality</h2>
          <div className="text-gray text-md font-normal sm:w-4/5 mx-auto py-2">
            <p className="py-2">
              At MindMates, we understand the importance of privacy and
              confidentiality when it comes to mental health support.
            </p>
            <p className="py-2">
              Your trust in us is paramount, and we assure you that any
              information you share with us is treated with the utmost
              confidentiality.
            </p>
            <p className="py-2">
              Your trust matters: We recognize that seeking support for mental
              health concerns can be a vulnerable experience. Rest assured, your
              privacy is respected and protected throughout your journey with
              us. Feel free to share your thoughts, feelings, and experiences,
              knowing that they will be kept confidential.
            </p>
            <p className="py-2">
              If you have any questions regarding how we handle your
              information, please don&apos;t hesitate to reach out to us.
            </p>
            <p className="py-2">
              Thank you for choosing MindMates for your mental health needs!
            </p>
          </div>
          <button
            className={
              "bg-gradient-to-r text-white from-[#4ED6DA] font-semibold to-[#04789D] text-center h-fit py-2 my-1 px-8 rounded-3xl"
            }
            onClick={(e) => {
              localStorage.setItem("mindmate", true);
              setShowConsent(false);
            }}
          >
            Ok
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EditDashboard;
