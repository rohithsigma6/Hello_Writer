import Link from "next/link";
import ImageWrapper from "@/app/components/ImageWrapper";
import HomeLayout from "./layout/HomeLayout";
import PoweredByAi from "./components/LandingPage/PoweredByAi";
import SecureAnalyzieShare from "./components/LandingPage/SecureAnalyzieShare";
import GetStarted from "./components/GetStarted";
import Language from "./components/LandingPage/Language";
import Analysis from "./components/LandingPage/Analysis";
import Security from "./components/LandingPage/Security";
import Certified from "./components/LandingPage/Certified";

export default function Home() {
  return (
    <HomeLayout>
      <main className="min-h-screen  bg-landing-bg">
        {/* <LandingSiteNav /> */}
        <hr className="ml-5 mr-5" />
        <div className="sm:mt-10 mt-5 sm:px-12 lg:px-20 xl:px-40 px-5">
          <h1 className="text-center text-landing-text font-bold text-3xl lg:text-5xl font-garnetSemi">
            Revolutionize Your Filmmaking Journey
          </h1>

          <h1 className="garnet-regular sm:block hidden text-center text-light-grey sm:text-base text-sm mt-4">
            Experience the game-changing Screenwriting 2.0: AI-driven
            innovation, global collaboration, and blockchain security with a
            magical, seamless writing flow. Capture ideas on paper, by voice, or
            typing—effortlessly synced and industry-formatted for unmatched
            production efficiency and creativity.
          </h1>
          <h1 className="garnet-regular sm:hidden block lg:text-left text-center sm:text-base text-sm mt-5 text-light-grey">
            Experience the game-changing Screenwriting 2.0 revolution, merging
            AI-driven innovation, global collaboration, and blockchain security
            for unparalleled production efficiency and limitless creativity.
          </h1>

          <div className="flex flex-row justify-center mt-8 lg:mb-0 mb-10">
            <Link href="https://dashboard.screenplay.ink/auth/register" passHref>
              <button className="flex font-poppins sm:px-16 sm:py-4 px-4 py-2 sm:text-base text-sm bg-landing-btn sm:rounded-3xl rounded-full cursor-pointer">
                <span className="flex text-white font-medium flex-row gap-5 items-center">
                  Start Writing Your Screenplay
                  <ImageWrapper
                    src="/assets/landingsite/RightArrow.svg"
                    alt="-->"
                    width={36}
                    height={36}
                    loading={"eager"}
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

        <PoweredByAi />

        <Language />

        <SecureAnalyzieShare />

        <Analysis />

        <Security />

        <Certified />

        <GetStarted />
      </main>
    </HomeLayout>
  );
}
