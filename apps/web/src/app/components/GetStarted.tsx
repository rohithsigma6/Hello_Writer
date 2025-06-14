import Link from "next/link";
import React from "react";

const GetStarted = () => {
  return (
    <div className="lg:pt-32 sm:pt-20 pt-12">
      <h1 className="sm:px-0 px-5 text-center font-bold text-landing-text text-3xl lg:text-5xl font-garnetSemi">
        We'll help you get started
      </h1>
      <div className="text-center sm:mt-12 mt-5">
        <Link href={"https://dashboard.screenplay.ink/auth/register"}>
          <button className="sm:px-12 px-10 sm:py-4 py-3 sm:text-xl text-lg bg-landing-btn font-roboto rounded-full cursor-pointer">
            <span className="text-white font-garnetSemi font-semibold">
              Lets Create
            </span>
          </button>
        </Link>
      </div>

      <img
        src={"/assets/get-started/Gradient.svg"}
        className="w-full sm:block hidden sm:mt-0 mt-10 pointer-events-none select-none"
      />
      <img
        src={"/assets/get-started/GradientResponsive.svg"}
        className="w-full sm:hidden block sm:mt-0 mt-10 pointer-events-none select-none"
      />
    </div>
  );
};

export default GetStarted;
