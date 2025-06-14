import ImageWrapper from "@/app/components/ImageWrapper";
import React from "react";
import { packs } from "../../../../lib/constant";
import HomeLayout from "@/app/layout/HomeLayout";

const inkPage = () => {
  return (
    <HomeLayout>
      <div className="text-black bg-landing-bg">
        {/* Header Section */}
        <div className="text-center sm:mt-10 mt-5 ">
          <h1 className="text-3xl md:text-4xl garnet-regular font-semibold text-landing-text">
            Top-Up Your INK Credits — Empower Your<br></br> Screenwriting
            Journey
          </h1>
          <p className="text-gray-600 mt-4 mx-auto text-lg">
            Need more INK credits for advanced features and tools? Choose the
            perfect pack to fuel your creativity!
          </p>
        </div>

        {/* Center Image Placeholder */}
        <div className="flex justify-center my-8">
          <ImageWrapper
            src="assets/landingsite/pen.png"
            alt="logo"
            width={400}
            loading={"eager"}
            height={400}
          />
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto bg-[#acaff1] border border-[#5f65ce] rounded-xl shadow-md p-6 text-[#1f237e]   mb-8">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Roll-Over Flexibility:</span> INK
              credits roll over for six months, so you can use them whenever you
              need.
            </li>
            <li>
              <span className="font-semibold">Exclusive Bonuses:</span> Get
              bonus credits on larger packs.
            </li>
            <li>
              <span className="font-semibold">
                No Expiry for Yearly Subscriptions:
              </span>{" "}
              Credits purchased with yearly plans don’t expire within your
              subscription period.
            </li>
          </ul>
        </div>

        {/* Packs Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 px-10">
          {packs.map((pack) => (
            <div
              key={pack.title}
              className="flex flex-col items-center  rounded-2xl p-6 text-center border border-black"
            >
              <h3 className="text-lg font-bold text-[#F28C99]">{pack.title}</h3>
              <div className="mt-2 text-gray-600 text-sm flex items-center justify-center py-2 px-2 bg-[#edbcc3] border rounded-xl">
                <span className="mr-2 text-black">
                  <ImageWrapper
                    src="assets/landingsite/ink-bottle-svgrepo-com 1.svg"
                    alt="logo"
                    width={22}
                    loading={"eager"}
                    height={22}
                  />
                </span>{" "}
                {/* Wallet icon */}
                {pack.credits.toLocaleString()} ink credits
              </div>
              <p className="text-sm text-gray-500 mt-4">{pack.description}</p>
              <div className="text-2xl font-bold mt-6">₹{pack.price}</div>
              <p className="text-xs text-gray-400 mt-1">/ Per Pack</p>
              <button className="mt-6 bg-blue-800 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-700">
                Top Up Now
              </button>
              <div className="text-sm text-[#F28C99] mt-4 flex items-center justify-center">
                <span className="mr-2">
                  <ImageWrapper
                    src="assets/landingsite/redink.svg"
                    alt="logo"
                    width={22}
                    loading={"eager"}
                    height={22}
                  />
                </span>{" "}
                {pack.bonusCredits.toLocaleString()} ink credits Bonus
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default inkPage;
