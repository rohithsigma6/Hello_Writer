"use client";

import React, { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import ImageWrapper from "../ImageWrapper";

const PoweredByAi = () => {
  type PoweredByAIOpenStateKeys =
    | "isOpen"
    | "isOpen1"
    | "isOpen2"
    | "isOpen3"
    | "isOpen4"
    | "isOpen5"
    | "isOpen6";

  const [PoweredByAIOpenStates, setPoweredByAIOpenStates] = useState<
    Record<PoweredByAIOpenStateKeys, boolean>
  >({
    isOpen: true,
    isOpen1: false,
    isOpen2: false,
    isOpen3: false,
    isOpen4: false,
    isOpen5: false,
    isOpen6: false,
  });

  const handlePoweredByAIClick = (key: PoweredByAIOpenStateKeys) => {
    setPoweredByAIOpenStates((prev) => {
      const updatedStates = Object.keys(prev).reduce((acc, stateKey) => {
        acc[stateKey as PoweredByAIOpenStateKeys] =
          stateKey === key ? !prev[key] : false;
        return acc;
      }, {} as Record<PoweredByAIOpenStateKeys, boolean>);
      return updatedStates;
    });
  };

  return (
    <div className="sm:mt-0 mt-10 text-black">
      <div className="sm:px-12 lg:px-20 xl:px-40 px-5">
        <h1 className="text-center sm:text-xl text-base font-bold text-landing-btn-text font-garnetMed">
          POWERED BY AI
        </h1>
        <h1 className="text-center font-bold text-landing-text text-2xl xs:text-3xl lg:text-5xl mt-5 font-garnetSemi">
          A New Age Writing Experience
        </h1>
        <h1 className="garnet-regular text-center sm:text-base text-sm mt-5 text-light-grey">
          No matter where you are in your writing journey, Screenplay.ink is
          powered to support you every step of the way.
        </h1>
      </div>

      <div className="mx-5 xs:mx-14 md:mx-20 lg:mx-28 2xl:mx-40 mt-10 flex flex-col xl:flex-row xl:gap-10 xl:min-h-[540px] xl:items-center">
        <div className="flex-1">
          <div>
            <div
              className={`flex py-4 items-center gap-2 cursor-pointer ${!PoweredByAIOpenStates.isOpen ? " border-b border-gray-300" : ""
                }`}
              onClick={() => handlePoweredByAIClick("isOpen")}
            >
              <ImageWrapper
                src={"/assets/landingsite/AiWritingIcon.png"}
                alt="pencil"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />
              <h1 className="font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                Adaptive Writing Framework
              </h1>
              {!PoweredByAIOpenStates.isOpen ? (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronDown />
                </div>
              ) : (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronUp />
                </div>
              )}
            </div>

            {PoweredByAIOpenStates.isOpen && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                Uniquely designed for both 'tree' writers, who thrive on
                intricate details, and 'forest' writers, who capture the grand
                narrative. Effortlessly adapting to every screenplay writer's
                style, the platform seamlessly integrates intricate planning
                with broad-strokes creativity
              </h1>
            )}
            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:hidden xl:border-b-0 border-b border-gray-300">
              {PoweredByAIOpenStates.isOpen && (
                <ImageWrapper
                  src={"/assets/landingsite/AiWritingImg.png"}
                  alt="Writing"
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
                `${!PoweredByAIOpenStates.isOpen1
                  ? "border-b border-gray-300"
                  : ""
                }`
              }
              onClick={() => handlePoweredByAIClick("isOpen1")}
            >
              <ImageWrapper
                src={"/assets/landingsite/AiCreativityIcon.png"}
                alt="pencil"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />

              <h1 className="font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                Capture Creativity —Anytime, Anywhere, in Any Form
              </h1>
              {!PoweredByAIOpenStates.isOpen1 ? (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronDown />
                </div>
              ) : (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronUp />
                </div>
              )}
            </div>
            {PoweredByAIOpenStates.isOpen1 && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                It transforms the writing experience into something magical,
                letting screenwriters blend paper notes, voice ideas, and typed
                text effortlessly into one digital canvas. Each mode syncs
                seamlessly, instantly formatted to industry standards, giving
                writers the freedom to capture creativity as it strikes, in any
                form.
              </h1>
            )}
            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:hidden xl:border-b-0 border-b border-gray-300">
              {PoweredByAIOpenStates.isOpen1 && (
                <ImageWrapper
                  src={"/assets/landingsite/AiCreativityImg.png"}
                  alt="Creativity"
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
                `${!PoweredByAIOpenStates.isOpen2
                  ? "border-b border-gray-300"
                  : ""
                }`
              }
              onClick={() => handlePoweredByAIClick("isOpen2")}
            >
              <ImageWrapper
                src={"/assets/landingsite/AiExcellenceIcon.png"}
                alt="Excellence"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />
              <h1 className=" font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                AI-Powered Scriptwriting Excellence
              </h1>
              {!PoweredByAIOpenStates.isOpen2 ? (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronDown />
                </div>
              ) : (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronUp />
                </div>
              )}{" "}
            </div>
            {PoweredByAIOpenStates.isOpen2 && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                Enhance your creative process with our intuitive AI script
                writing assistant, streamlining technicalities for focused
                creativity — Reduce draft time by 50% without compromising
                quality. Explore a variety of dynamic templates for compelling
                loglines, plots, outlines, character arcs, and scenes, enhancing
                your craft.
              </h1>
            )}
            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:hidden xl:border-b-0 border-b border-gray-300">
              {PoweredByAIOpenStates.isOpen2 && (
                <ImageWrapper
                  src={"/assets/landingsite/AiExcellenceImg.png"}
                  alt="Excellence"
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
                `${!PoweredByAIOpenStates.isOpen3
                  ? "border-b border-gray-300"
                  : ""
                }`
              }
              onClick={() => handlePoweredByAIClick("isOpen3")}
            >
              <ImageWrapper
                src={"/assets/landingsite/AiReviewIcon.png"}
                alt="Review"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />
              <h1 className="  font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                Real-Time Script Review
              </h1>
              {!PoweredByAIOpenStates.isOpen3 ? (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronDown />
                </div>
              ) : (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronUp />
                </div>
              )}{" "}
            </div>
            {PoweredByAIOpenStates.isOpen3 && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                Review and refine your script through instant checks for
                grammar, plot coherence, and dialogue. Ensure your script is
                polished and industry-ready.
              </h1>
            )}
            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:hidden xl:border-b-0 border-b border-gray-300">
              {PoweredByAIOpenStates.isOpen3 && (
                <ImageWrapper
                  src={"/assets/landingsite/AiReviewImg.png"}
                  alt="Review"
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
                `${!PoweredByAIOpenStates.isOpen4
                  ? "border-b border-gray-300"
                  : ""
                }`
              }
              onClick={() => handlePoweredByAIClick("isOpen4")}
            >
              <ImageWrapper
                src={"/assets/landingsite/AiManageIcon.png"}
                alt="Manage"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />
              <h1 className="  font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                Seamless Script Management
              </h1>
              {!PoweredByAIOpenStates.isOpen4 ? (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronDown />
                </div>
              ) : (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronUp />
                </div>
              )}{" "}
            </div>
            {PoweredByAIOpenStates.isOpen4 && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                Versatile script import and export features ensure error-free
                transitions between formats. With advanced version control, your
                drafts stay up-to-date, allowing you to track changes and
                revisions effortlessly. The script-locking functionality
                protects your creative work, preventing unauthorised changes to
                your screenplay.
              </h1>
            )}
            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:hidden xl:border-b-0 border-b border-gray-300">
              {PoweredByAIOpenStates.isOpen4 && (
                <ImageWrapper
                  src={"/assets/landingsite/AiManageImg.png"}
                  alt="Management"
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
                `${!PoweredByAIOpenStates.isOpen5
                  ? "border-b border-gray-300"
                  : ""
                }`
              }
              onClick={() => handlePoweredByAIClick("isOpen5")}
            >
              <ImageWrapper
                src={"/assets/landingsite/AiConnectIcon.png"}
                alt="Connect"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />
              <h1 className="font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                Connect, Collaborate, and Create
              </h1>
              {!PoweredByAIOpenStates.isOpen5 ? (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronDown />
                </div>
              ) : (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronUp />
                </div>
              )}{" "}
            </div>
            {PoweredByAIOpenStates.isOpen5 && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                Join a global community of writers. Share perspectives, receive
                feedback, and learn from diverse experiences. Collaborate in
                real-time, bringing diverse narratives to life.
              </h1>
            )}
            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:hidden xl:border-b-0 border-b border-gray-300">
              {PoweredByAIOpenStates.isOpen5 && (
                <ImageWrapper
                  src={"/assets/landingsite/AiConnectImg.png"}
                  alt="Connect"
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
                `${!PoweredByAIOpenStates.isOpen6
                  ? "border-b border-gray-300"
                  : ""
                }`
              }
              onClick={() => handlePoweredByAIClick("isOpen6")}
            >
              <ImageWrapper
                src={"/assets/landingsite/AiCrowdIcon.png"}
                alt="pencil"
                width={30}
                height={30}
                loading={"lazy"}
                className="cursor-default pointer-events-none md:w-8 md:h-8 w-6 h-6 my-auto mr-2"
              />
              <h1 className="  font-bold flex-1 font-garnetSemi text-landing-text md:text-base text-sm">
                Experience the Power of Crowd-Writing
              </h1>
              {!PoweredByAIOpenStates.isOpen6 ? (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronDown />
                </div>
              ) : (
                <div className="text-xl self-start">
                  {/* @ts-ignore */}
                  <GoChevronUp />
                </div>
              )}{" "}
            </div>
            {PoweredByAIOpenStates.isOpen6 && (
              <h1 className="garnet-regular text-sm lg:mt-4 mt-0 pb-4 text-light-grey xl:border-b border-gray-300">
                Witness the fusion of individual screenwriting prowess with the
                collective creativity of a vibrant writing community. Every
                contribution, from the inception of ideas to the refinement of
                the final script, is not only encouraged but also equitably
                rewarded. Every plot twist, line of dialogue, character
                development, and additional element adds to the potential
                revenue, allowing contributors to earn a share. Engage in a
                reimagined creative journey and embrace shared success in the
                art of storytelling.
              </h1>
            )}
            <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative xl:mt-0 xl:hidden">
              {PoweredByAIOpenStates.isOpen6 && (
                <ImageWrapper
                  src={"/assets/landingsite/AiCrowdImg.png"}
                  alt="Crowd"
                  width={200}
                  height={200}
                  loading={"lazy"}
                  className="w-full h-full pointer-events-none select-none"
                />
              )}
            </div>
          </div>
        </div>

        <div className="xl:w-1/2 aspect-w-16 aspect-h-9 relative hidden xl:block xl:min-h-[540px]">
          {PoweredByAIOpenStates.isOpen && (
            <ImageWrapper
              src={"/assets/landingsite/AiWritingImg.png"}
              alt="pencil"
              width={30}
              height={30}
              loading={"eager"}
              className="cursor-default pointer-events-none w-full"
            />
          )}
          {PoweredByAIOpenStates.isOpen1 && (
            <ImageWrapper
              src={"/assets/landingsite/AiCreativityImg.png"}
              alt="Creativity"
              width={200}
              height={200}
              loading={"lazy"}
              className="cursor-default pointer-events-none w-full"
            />
          )}
          {PoweredByAIOpenStates.isOpen2 && (
            <ImageWrapper
              src={"/assets/landingsite/AiWritingImg.png"}
              alt="AI Writing"
              width={200}
              height={200}
              loading={"lazy"}
              className="cursor-default pointer-events-none w-full"
            />
          )}
          {PoweredByAIOpenStates.isOpen3 && (
            <ImageWrapper
              src={"/assets/landingsite/AiExcellenceImg.png"}
              alt="Excellence"
              width={200}
              height={200}
              loading={"lazy"}
              className="cursor-default pointer-events-none w-full"
            />
          )}
          {PoweredByAIOpenStates.isOpen4 && (
            <ImageWrapper
              src={"/assets/landingsite/AiManageImg.png"}
              alt="Management"
              width={200}
              height={200}
              loading={"lazy"}
              className="cursor-default pointer-events-none w-full"
            />
          )}
          {PoweredByAIOpenStates.isOpen5 && (
            <ImageWrapper
              src={"/assets/landingsite/AiConnectImg.png"}
              alt="Connect"
              width={200}
              height={200}
              loading={"lazy"}
              className="cursor-default pointer-events-none w-full"
            />
          )}
          {PoweredByAIOpenStates.isOpen6 && (
            <ImageWrapper
              src={"/assets/landingsite/AiCrowdImg.png"}
              alt="Crowd Writing"
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

export default PoweredByAi;
