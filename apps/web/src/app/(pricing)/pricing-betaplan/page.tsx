import ImageWrapper from "@/app/components/ImageWrapper";
import Link from "next/link";
import React from "react";
import {
  betaFeatures,
  featuresAvailableNow,
  limitedTimeFeatures,
  upcomingFeatures,
} from "./../../../../lib/constant";
import HomeLayout from "@/app/layout/HomeLayout";

const PricingBetaplan = () => {
  return (
    <HomeLayout>
      <div className="sm:mt-10 mt-5 sm:px-12 lg:px-20 xl:px-40 px-5">
        <h1 className="text-center text-[#43479B] garnet-regular font-medium text-[40px] lg:text-[52px]">
        Experience Screenwriting 2.0
        </h1>
        <h2 className="mt-3 mb-6 text-[#F28C99] text-center garnet-regular font-medium text-[24px] lg:text-[28px]">
          The World’s Most Advanced Real-Time Collaborative Screenplay Editor
        </h2>
        <p className="text-[#6A6A75] font-garnet text-center lg:text-[22px] text-[18px] font-normal mb-10 ">
          Designed to supercharge your writing process.
        </p>
      </div>

      <div className="flex flex-col items-center mt-10 px-2 sm:px-2 md:px-4 xl:px-52 font-poppins">
        <Link href="https://dashboard.screenplay.ink/auth/register">
          <ImageWrapper
            src="/assets/pricing/beta-web-img.svg"
            alt="logo"
            width={1264}
            loading={"eager"}
            height={560}
          />
        </Link>
      </div>

      <div className="font-poppins grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5  mx-auto max-w-[1384px] mt-10 px-2 sm:px-5">
        <div className="border-[2px] border-[#3F3566] bg-[#43479b0a] rounded-[20px] lg:p-8 p-4">
          <h4 className="text-[#F28C99] font-garnetSemi font-normal lg:text-[24px] text-[20px] mb-5">
            Features Available Now
          </h4>
          <ul className="list-none p-0 m-0 font-poppins">
            {featuresAvailableNow.map((feature, index) => (
              <li
                key={index}
                className="text-[#212131] lg:text-[17px] text-[16px] font-normal my-2 flex items-start gap-2"
              >
                <ImageWrapper
                  src="assets/pricing/check-purple.png"
                  alt="logo"
                  width={20}
                  loading={"lazy"}
                  height={20}
                  className="w-[20px] h-[20px] mt-1"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#3F3566] rounded-[20px] lg:p-8 p-4">
          <h4 className="text-white font-garnetSemi font-normal lg:text-[24px] text-[20px] mb-5">
            Upcoming Features (Included in Your Plan)
          </h4>
          <ul className="list-none p-0 m-0 font-poppins">
            {upcomingFeatures.map((feature, index) => (
              <li
                key={index}
                className="text-white lg:text-[17px] text-[16px] font-[400] my-2 flex items-start gap-2 font-poppins"
              >
                <ImageWrapper
                  src="assets/pricing/check-pink.png"
                  alt="logo"
                  width={22}
                  loading={"lazy"}
                  height={22}
                  className="w-[20px] h-[20px] mt-1"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#3F3566] rounded-[20px] lg:p-8 p-4">
          <h4 className="text-white font-garnetSemi font-normal lg:text-[24px] text-[20px] mb-5">
            Beta
          </h4>
          <ul className="list-none p-0 m-0">
            {betaFeatures.map((feature, index) => (
              <li
                key={index}
                className="text-white lg:text-[17px] text-[16px] font-[400] my-2 flex items-start gap-2 font-poppins"
              >
                <ImageWrapper
                  src="assets/pricing/check-pink.png"
                  alt="logo"
                  width={22}
                  loading={"lazy"}
                  height={22}
                  className="w-[20px] h-[20px] mt-1"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-[2px] border-[#3F3566] bg-[#43479b0a] rounded-[20px] lg:p-8 p-4">
          <h4 className="text-[#F28C99] font-garnetSemi font-normal lg:text-[24px] text-[20px] mb-5">
            Limited-Time Offer
          </h4>
          <ul className="list-none p-0 m-0 font-poppins">
            {limitedTimeFeatures.map((feature, index) => (
              <li
                key={index}
                className="text-[#212131] lg:text-[17px] text-[16px] font-normal my-2 flex items-start gap-2"
              >
                <ImageWrapper
                  src="assets/pricing/check-purple.png"
                  alt="logo"
                  width={22}
                  loading={"lazy"}
                  height={22}
                  className="w-[20px] h-[20px] mt-1"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="price-bottom-section">
        <div className="price-bottom-section-left text-center">
            <h2 className="text-center text-[#43479B] garnet-regular font-[500] lg:text-[64px] text-[40px]">
            We'll help you get started
            </h2>
            <button className="bg-[#F28C99] text-white font-garnetSemi font-normal lg:text-[24px] text-[20px] rounded-[100px] px-[68px] py-[25px] mx-auto mt-10 hover:bg-[#ff6e7a] transition-colors">
             Lets Create
            </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default PricingBetaplan;
