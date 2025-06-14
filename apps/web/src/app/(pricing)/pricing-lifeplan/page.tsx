import ImageWrapper from "@/app/components/ImageWrapper";
import Link from "next/link";
import React from "react";
import {
  howItWorks,
  whatsIncluded,
  whoisItfor,
  whyTochoose,
} from "../../../../lib/constant";
import HomeLayout from "@/app/layout/HomeLayout";

const PricingLifeplan = () => {
  return (
    <HomeLayout>
      <div className="text-center">
        <div className="sm:px-12 lg:px-20 xl:px-40 px-5 sm:mt-10 mt-5">
          <h1 className="lg:mb-4 mb-4 text-center text-landing-text text-2xl sm:text-3xl md:text-4xl mx-5 garnet-regular font-semibold text-underline-position-[from-font] text-decoration-skip-ink-none">
            Transform Your Writing Journey With Our Lifetime Plan
          </h1>
          <h2 className="sm:text-base md:text-xl text-sm lg:mb-4 mb-4 mx-5 text-[#F28C99] garnet-medium">
            The World’s Most Advanced Real-Time Collaborative Screenplay Editor
          </h2>
          <p className="garnet-regular text-center text-light-grey sm:text-base text-sm mt-4">
            Experience the ultimate freedom to write, collaborate, and create
            without limits. Our Lifetime Plan offers you the complete power
            of Screenplay.ink for a one-time payment. Whether you’re a beginner
            or a seasoned professional, secure your access to the world’s most
            advanced screenwriting and production management platform—forever.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center mt-10 px-5 sm:px-20 md:px-36 xl:px-52 rounded-[10px] font-poppins">
        <Link href="https://dashboard.screenplay.ink/auth/register">
          <ImageWrapper
            src="/assets/pricing/pricing-img2.png"
            alt="logo"
            width={1264}
            loading={"eager"}
            height={560}
          />
        </Link>
      </div>

      <div className="font-poppins grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4 lg:gap-6 mx-auto w-full px-5 md:px-10 xl:px-32 p-5 mt-5 sm:mt-10">
        <div className="feature-card features-available border-2 border-[#43479B] bg-[#DFE4FC] rounded-xl sm:rounded-[20px] p-3 sm:p-4 lg:p-6 shadow-md">
          <h4 className="text-[#F28C99] text-base sm:text-lg lg:text-2xl font-garnetSemi font-semibold mb-2 lg:mb-4">
            Why Choose the Lifetime Plan?
          </h4>
          <ul className="list-none p-0 m-0">
            {whyTochoose.map((feature, index) => (
              <li
                key={index}
                className="text-black text-xs sm:text-sm lg:text-base mb-1 lg:mb-2 flex items-start gap-2"
              >
                <ImageWrapper
                  src="assets/pricing/check-purple.png"
                  alt="logo"
                  width={20}
                  loading={"lazy"}
                  height={20}
                  className="w-3 sm:w-4 h-3 sm:h-4 mt-1"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="feature-card upcoming-features bg-[#43479B] text-white rounded-xl sm:rounded-[20px] p-3 sm:p-4 lg:p-6 shadow-md">
          <h4 className="text-white text-base sm:text-lg lg:text-2xl font-garnetSemi font-semibold mb-2 lg:mb-4">
            What’s Included?
          </h4>
          <ul className="list-none p-0 m-0">
            {whatsIncluded.map((feature, index) => (
              <li
                key={index}
                className="text-white text-xs sm:text-sm lg:text-base mb-1 lg:mb-2 flex items-start gap-2"
              >
                <ImageWrapper
                  src="assets/pricing/check-pink.png"
                  alt="logo"
                  width={22}
                  loading={"lazy"}
                  height={22}
                  className="w-3 sm:w-4 h-3 sm:h-4 mt-1"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="feature-card upcoming-features bg-[#43479B] text-white rounded-xl sm:rounded-[20px] p-3 sm:p-4 lg:p-6 shadow-md">
          <h4 className="text-white text-base sm:text-lg lg:text-2xl font-garnetSemi font-semibold mb-2 lg:mb-4">
            How it works?
          </h4>
          <ul className="list-none p-0 m-0">
            {howItWorks.map((feature, index) => (
              <li
                key={index}
                className="text-white text-xs sm:text-sm lg:text-base mb-1 lg:mb-2 flex items-start gap-2"
              >
                <ImageWrapper
                  src="assets/pricing/check-pink.png"
                  alt="logo"
                  width={22}
                  loading={"lazy"}
                  height={22}
                  className="w-3 sm:w-4 h-3 sm:h-4 mt-1"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="feature-card features-available border-2 border-[#43479B] bg-[#DFE4FC] rounded-xl sm:rounded-[20px] p-3 sm:p-4 lg:p-6 shadow-md">
          <h4 className="text-[#F28C99] text-base sm:text-lg lg:text-2xl font-garnetSemi font-semibold mb-2 lg:mb-4">
            Who it is for?
          </h4>
          <ul className="list-none p-0 m-0">
            {whoisItfor.map((feature, index) => (
              <li
                key={index}
                className="text-black text-xs sm:text-sm lg:text-base mb-1 lg:mb-2 flex items-start gap-2"
              >
                <ImageWrapper
                  src="assets/pricing/check-purple.png"
                  alt="logo"
                  width={22}
                  loading={"lazy"}
                  height={22}
                  className="w-3 sm:w-4 h-3 sm:h-4 mt-1"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HomeLayout>
  );
};

export default PricingLifeplan;
