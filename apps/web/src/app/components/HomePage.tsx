import React from "react";
import ImageWrapper from "./ImageWrapper";
import Link from "next/link";
import HomeLayout from "../layout/HomeLayout";

const HomePage = () => {
  return (
    <HomeLayout>
      <main className="min-h-screen  bg-landing-bg">
        {/* <LandingSiteNav /> */}
        <hr className="ml-5 mr-5" />
        <div className="mt-10">
          <h1 className="text-center text-landing-text font-bold text-3xl lg:text-5xl font-garnetSemi">
            Revolutionize Your Filmmaking Journey
          </h1>

          <h1 className="text-center text-light-grey sm:text-lg text-base lg:mt-8 mt-4 mx-0 md:mx-16 xl:mx-52">
            Experience the game-changing Screenwriting 2.0: AI-driven
            innovation, global collaboration, and blockchain security with a
            magical, seamless writing flow. Capture ideas on paper, by voice, or
            typing—effortlessly synced and industry-formatted for unmatched
            production efficiency and creativity.
          </h1>

          <div className="flex flex-row justify-center mt-8 lg:mb-0 mb-10">
            <Link href="https://dashboard.screenplay.ink/auth/register" passHref>
              <button
                className="flex sm:px-16 sm:py-4 px-10 py-2 sm:text-xl text-base bg-landing-btn font-roboto sm:rounded-3xl rounded-full cursor-pointer"
                // onMouseEnter={() => setHovered(true)}
                // onMouseLeave={() => setHovered(false)}
              >
                <span className="text-white font-medium flex flex-row gap-5 items-center">
                  Start Writing Your Screenplay{" "}
                  <ImageWrapper
                    src="/assets/landingsite/RightArrow.svg"
                    alt="-->"
                    width={36}
                    height={36}
                    loading={"eager"} // className={`${hovered ? "transition-transform translate-x-4" : ""}`}
                  />
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div className="xl:p-24 xl:py-0 sm:px-10 px-0 py-0 pointer-events-none select-none">
          <ImageWrapper
            src={"/assets/landingsite/hero.png"}
            alt="Hero Image"
            width={600}
            height={400}
            loading={"eager"}
            className="cursor-default pointer-events-none w-full"
          />
        </div>
        {/* Add additional sections or content for the landing page here */}
      </main>
    </HomeLayout>
  );
};

export default HomePage;
