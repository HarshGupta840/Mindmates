"use client";
import { useContext } from "react";
import UserMenu from "../../components/common/user-menu";
import Context from "../../../../context/Context";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const { user } = useContext(Context);
  const history = useRouter();

  return (
    <div className="flex md:flex-row flex-col bg-white px-[9vw]">
      <UserMenu></UserMenu>
      <main className="w-full md:w-[75vw]">
        <div className="my-12 w-auto md:px-8">
          <h3 className="text-2xl font-semibold">
            Hello {user?.anonymous ? user?.anonymous : user?.name},
          </h3>
          <div className="bg-gradient-to-br md:h-[40vh] w-auto from-lightGreen to-darkGreen p-[1px] rounded-xl mt-4">
            <div className="p-4 flex flex-col h-full w-full gap-4 bg-white rounded-xl">
              <h2 className="text-gray font-medium text-xl">Questionnare</h2>
              <div className="px-2 flex flex-col">
                <p>
                  To get more personalized recommendations, take up this Health
                  Assessment.
                  <br />
                  It will help us understand your current mental well-being and
                  provide guidance on potential areas of concern.
                  <br /> Your privacy is of utmost importance, so all your
                  responses will be kept confidential.
                  <br /> Try me!
                </p>
                <button
                  className={
                    "bg-gradient-to-r w-fit text-white from-[#4ED6DA] font-semibold to-[#04789D] text-center h-fit py-2 mt-3 px-8 rounded-xl"
                  }
                  onClick={(e) => {
                    history.push("/questionnaire");
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
