import React from "react";
import ImageWrapper from "../ImageWrapper";

const Language = () => {
  return (
    <div className="lg:my-24 my-16">
      <div className="sm:px-12 lg:px-20 xl:px-40 px-5 flex lg:flex-row flex-col items-center w-100 xl:gap-20 lg:gap-10 gap-0">
        <div className="lg:w-[50%] w-full">
          <ImageWrapper
            src={"/assets/landingsite/langHero.png"}
            alt="Hero Image"
            width={200}
            height={200}
            loading={"lazy"}
            className="cursor-default select-none pointer-events-none w-full object-contain lg:block hidden"
          />
        </div>

        <div className="lg:w-[50%] w-full flex flex-col lg:gap-5 gap-0">
          <div>
            <h1 className="text-2xl xs:text-3xl lg:text-left text-center text-landing-text font-garnetSemi font-bold">
              Write in Any Language, Tell Your Story to the World
            </h1>
            <p className="garnet-regular sm:text-center lg:text-left text-center sm:text-base text-sm mt-5 text-light-grey">
              Screenwriting isn’t bound by language, and neither is
              Screenplay.INK. With support for international and Indian
              languages, and tools for screenplay translation and
              transliteration, you can make your story resonate with any
              audience, anywhere.
            </p>
          </div>

          <div className="w-full pointer-events-none select-none">
            <ImageWrapper
              src={"/assets/landingsite/langHero.png"}
              alt="Hero Image"
              width={50}
              height={50}
              loading={"lazy"}
              className="lg:hidden block cursor-default pointer-events-none w-full lg:h-full h-96 sm:mb-0 mb-4 object-contain"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex sm:flex-col flex-row sm:gap-0 gap-2">
              <ImageWrapper
                src={"/assets/landingsite/langFolder.png"}
                alt="Folder"
                width={50}
                height={50}
                loading={"lazy"}
                className="cursor-default object-contain mb-2 lg:w-10 lg:h-10 sm:w-12 sm:h-12 w-9 h-9 select-none pointer-events-none"
              />

              <div>
                <h1 className="text-landing-text lg:text-lg sm:text-xl text-base font-semibold font-garnetSemi">
                  Language Support
                </h1>
                <p className="text-light-grey font-light lg:text-xs sm:text-sm text-xs font-poppins">
                  Multi-language Capabilities
                </p>
              </div>
            </div>

            <p className="garnet-regular sm:text-base text-sm garnet-regular text-light-black">
              Write in any language with full support for Indian regional
              languages, including seamless transliteration and font
              customization.
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:mt-0 sm:mt-10 mt-5">
            <div className="flex sm:flex-col flex-row sm:gap-0 gap-2">
              <ImageWrapper
                src={"/assets/landingsite/langFolder.png"}
                alt="Folder"
                width={50}
                height={50}
                loading={"lazy"}
                className="cursor-default object-contain mb-2 lg:w-10 lg:h-10 sm:w-12 sm:h-12 w-9 h-9 select-none pointer-events-none"
              />

              <div>
                <h1 className="text-landing-text lg:text-lg sm:text-xl text-base font-semibold font-garnetSemi">
                  Screenplay Translation
                </h1>
                <p className="text-light-grey font-light lg:text-xs sm:text-sm text-xs font-poppins">
                  Breaking Language Barriers
                </p>
              </div>
            </div>

            <p className="garnet-regular sm:text-base text-sm garnet-regular text-light-black">
              Translate your script for global audiences or localize it for
              specific regions without losing your story’s essence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;
