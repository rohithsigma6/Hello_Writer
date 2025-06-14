"use client";

import React, { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import ImageWrapper from "../ImageWrapper";

const SecureAnalyzieShare = () => {
  type SecureAnalyzeShareOpenStateKeys =
    | "isOpen"
    | "isOpen7"
    | "isOpen8"
    | "isOpen9"
    | "isOpen10";

  const [SecureAnalyzeShareOpenStates, setSecureAnalyzeShareOpenStates] =
    useState<Record<SecureAnalyzeShareOpenStateKeys, boolean>>({
      isOpen: true,
      isOpen7: true,
      isOpen8: false,
      isOpen9: false,
      isOpen10: false,
    });

  const handleSecureAnalyzeShareClick = (
    key: SecureAnalyzeShareOpenStateKeys
  ) => {
    setSecureAnalyzeShareOpenStates((prev) => {
      const updatedStates = Object.keys(prev).reduce((acc, stateKey) => {
        acc[stateKey as SecureAnalyzeShareOpenStateKeys] =
          stateKey === key ? !prev[key] : false;
        return acc;
      }, {} as Record<SecureAnalyzeShareOpenStateKeys, boolean>);
      return updatedStates;
    });
  };

  return (
    <div className="lg:my-24 my-16 text-black">
      <div className="sm:px-12 lg:px-20 xl:px-40 px-5">
        <h1 className="text-center sm:text-xl text-base font-bold text-landing-btn-text font-garnetMed">
          SECURE, ANALYZE, AND SHARE
        </h1>
        <h1 className="text-center font-bold text-landing-text text-2xl xs:text-3xl lg:text-5xl mt-5 font-garnetSemi">
          Securing Dreams, Analyzing Brilliance, Elevating Impact
        </h1>
        <h1 className="garnet-regular text-center sm:text-xl text-sm mt-5 text-light-grey">
          Screenplay.Ink integrates script protection, detailed analysis, and
          pitch optimization, simplifying complex film production for creators
          and producers.
        </h1>
      </div>

      <div className="mx-5 xs:mx-14 md:mx-20 lg:mx-28 2xl:mx-40 mt-10 flex flex-col xl:flex-row xl:gap-10 xl:min-h-[540px] xl:items-center">
        <div className="flex-1">
          <div>
            <div
              onClick={() => handleSecureAnalyzeShareClick("isOpen7")}
              className={
                "flex py-4 items-center gap-2 cursor-pointer justify-between " +
                `${!SecureAnalyzeShareOpenStates.isOpen7
                  ? "border-b border-gray-300"
                  : ""
                }`
              }
            >
              <ImageWrapper
                src={"/assets/landingsite/secureBlockchainIcon.png"}
                alt="Block chain"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />
              <h1 className="font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                Secure Your Script through Blockchain
              </h1>

              <div>
                {!SecureAnalyzeShareOpenStates.isOpen7 ? (
                  <span className="text-xl self-start" >
                    {/* @ts-ignore */}
                    <GoChevronDown />
                  </span>
                ) : (
                  <span className="text-xl self-start" >
                    {/* @ts-ignore */}
                    <GoChevronUp />
                  </span>
                )}{" "}
              </div>
            </div>

            {SecureAnalyzeShareOpenStates.isOpen7 && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                Safeguard your screenplay through a permanent blockchain record,
                guaranteeing the immutability of your intellectual property and
                allowing you the freedom to monetize it at your discretion.
              </h1>
            )}

            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:hidden xl:border-b-0 border-b border-gray-300">
              {SecureAnalyzeShareOpenStates.isOpen7 && (
                <ImageWrapper
                  src={"/assets/landingsite/secureBlockchainImg.png"}
                  alt="Block Chain"
                  width={200}
                  height={200}
                  loading={"lazy"}
                  className="w-full h-full pointer-events-none select-none"
                />
              )}
            </div>
          </div>

          <div>
            <div
              className={
                "flex py-4 items-center gap-2 cursor-pointer justify-between " +
                `${!SecureAnalyzeShareOpenStates.isOpen8
                  ? "border-b border-gray-300"
                  : ""
                }`
              }
              onClick={() => handleSecureAnalyzeShareClick("isOpen8")}
            >
              <ImageWrapper
                src={"/assets/landingsite/secureAnalyseIcon.png"}
                alt="Analyse"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />
              <h1 className="font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                Analyze Your Script Using AI
              </h1>

              <div>
                {!SecureAnalyzeShareOpenStates.isOpen8 ? (
                  <span className="text-xl self-start" >
                    {/* @ts-ignore */}
                    <GoChevronDown />
                  </span>
                ) : (
                  <span className="text-xl self-start" >
                    {/* @ts-ignore */}
                    <GoChevronUp />
                  </span>
                )}
              </div>
            </div>

            {SecureAnalyzeShareOpenStates.isOpen8 && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                Analyse your screenplay using sophisticated AI tools,
                identifying plot inconsistencies, character development issues,
                and narrative gaps. Receive constructive feedback and actionable
                insights to ensure your story is coherent, compelling, and ready
                for the competitive world of cinema.
              </h1>
            )}

            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:hidden xl:border-b-0 border-b border-gray-300">
              {SecureAnalyzeShareOpenStates.isOpen8 && (
                <ImageWrapper
                  src={"/assets/landingsite/secureAnalyseImg.png"}
                  alt="Analyse"
                  width={200}
                  height={200}
                  loading={"lazy"}
                  className="w-full h-full pointer-events-none select-none"
                />
              )}
            </div>
          </div>

          <div>
            <div
              className={
                "flex py-4 items-center gap-2 cursor-pointer justify-between " +
                `${!SecureAnalyzeShareOpenStates.isOpen9
                  ? "border-b border-gray-300"
                  : ""
                }`
              }
              onClick={() => handleSecureAnalyzeShareClick("isOpen9")}
            >
              <ImageWrapper
                src={"/assets/landingsite/secureAudioIcon.png"}
                alt="Audio"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />
              <h1 className=" font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                Turn Your Screenplay into an Audio Experience
              </h1>

              <div>
                {!SecureAnalyzeShareOpenStates.isOpen9 ? (
                  <span className="text-xl self-start" >
                    {/* @ts-ignore */}
                    <GoChevronDown />
                  </span>
                ) : (
                  <span className="text-xl self-start" >
                    {/* @ts-ignore */}
                    <GoChevronUp />
                  </span>
                )}
              </div>
            </div>

            {SecureAnalyzeShareOpenStates.isOpen9 && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                Elevate your narration and audience's experience with a fully
                voiced screenplay audio book. Choose a manual table read with
                actors or let AI narrate, customizing unique voices for each
                character. Perfect for delivering immersive presentations,
                in-depth reviews, or sharing your screenplay audibly in a
                captivating new format.
              </h1>
            )}

            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:hidden xl:border-b-0 border-b border-gray-300">
              {SecureAnalyzeShareOpenStates.isOpen9 && (
                <ImageWrapper
                  src={"/assets/landingsite/secureAudioImg.png"}
                  alt="Audio"
                  width={200}
                  height={200}
                  loading={"lazy"}
                  className="w-full h-full pointer-events-none select-none"
                />
              )}
              <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative"></div>
            </div>
          </div>

          <div>
            <div
              className={
                "flex py-4 items-center gap-2 cursor-pointer justify-between " +
                `${!SecureAnalyzeShareOpenStates.isOpen10
                  ? "border-b border-gray-300"
                  : ""
                }`
              }
              onClick={() => handleSecureAnalyzeShareClick("isOpen10")}
            >
              <ImageWrapper
                src={"/assets/landingsite/securePitchingIcon.png"}
                alt="Pitching"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />
              <h1 className=" font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                Elevate Your Pitching Game
              </h1>

              <div>
                {!SecureAnalyzeShareOpenStates.isOpen10 ? (
                  <span className="text-xl self-start" >
                    {/* @ts-ignore */}
                    <GoChevronDown />
                  </span>
                ) : (
                  <span className="text-xl self-start" >
                    {/* @ts-ignore */}
                    <GoChevronUp />
                  </span>
                )}
              </div>
            </div>

            {SecureAnalyzeShareOpenStates.isOpen10 && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                Transform your screenplay into a captivating presentation with
                live script updates and immersive multimedia. Elevate your
                narrative using stunning visuals and evocative music, enriching
                the storytelling experience. Leverage the advanced reader
                tracking to gain valuable insights into audience engagement,
                providing a competitive edge and ensuring your screenplay stands
                out in the competition.
              </h1>
            )}

            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:hidden xl:border-b-0 border-b border-gray-300">
              {SecureAnalyzeShareOpenStates.isOpen10 && (
                <ImageWrapper
                  src={"/assets/landingsite/securePitchingImg.png"}
                  alt="Pitching"
                  width={200}
                  height={200}
                  loading={"lazy"}
                  className="w-full h-full pointer-events-none select-none"
                />
              )}
              <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative"></div>
            </div>
          </div>
        </div>

        <div className="xl:w-1/2 xl:min-h-[540px] aspect-w-16 aspect-h-9 relative hidden xl:block">
          {SecureAnalyzeShareOpenStates.isOpen7 && (
            <ImageWrapper
              src={"/assets/landingsite/secureBlockchainImg.png"}
              alt="Blockchain"
              width={200}
              height={200}
              loading={"lazy"}
              className="cursor-default pointer-events-none w-full"
            />
          )}
          {SecureAnalyzeShareOpenStates.isOpen8 && (
            <ImageWrapper
              src={"/assets/landingsite/secureAnalyseImg.png"}
              alt="Analyse script"
              width={200}
              height={200}
              loading={"lazy"}
              className="cursor-default pointer-events-none w-full"
            />
          )}
          {SecureAnalyzeShareOpenStates.isOpen9 && (
            <ImageWrapper
              src={"/assets/landingsite/secureAudioImg.png"}
              alt="Audio"
              width={200}
              height={200}
              loading={"lazy"}
              className="cursor-default pointer-events-none w-full"
            />
          )}
          {SecureAnalyzeShareOpenStates.isOpen10 && (
            <ImageWrapper
              src={"/assets/landingsite/securePitchingImg.png"}
              alt="Pitching"
              width={200}
              height={200}
              loading={"lazy"}
              className="cursor-default pointer-events-none w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SecureAnalyzieShare;
