"use client";
import React from "react";
import HomeLayout from "../../../layout/HomeLayout";
import GetStarted from "../../../components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";

// Font and image size not working

const CaptureCreativity = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 min-h-screen garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/capturecreativity/hero.png"}
          width={1400}
          height={100}
          alt={"Capture Creativity"}
          loading={"eager"}
          objectFit={"object-contain w-full"}
          className="select-none cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6">
          <p className="text-gray-500 text-center text-lg">
            Screenplay.ink understands that inspiration doesn't follow a set
            schedule. Whether it's an idea scribbled on a napkin, a voice note
            recorded in the middle of the night, or a scene typed out at your
            desk, we’ve designed a platform that embraces the diverse ways
            creativity can come to life. Here's how Screenplay.ink empowers you
            to capture your ideas, wherever and however they emerge.
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi text-[#43479B] leading-tight">
              Blend Paper Notes, Voice Ideas, and Typed Text
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Bring All Forms of Creativity into One Canvas
            </p>
            <p className="mt-6 text-[#6A6A75]">
              Capture ideas in the way that feels natural to you, and let
              <span className="font-semibold"> Screenplay.ink</span> do the
              rest. Handwritten notes, voice recordings, or typed text can all
              live harmoniously on our platform, combining into one seamless
              digital canvas. Forget transferring notes
              manually—Screenplay.ink’s intuitive design and AI-driven features
              make merging various forms of content a breeze.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/capturecreativity/All-In-One.png"}
              width={650}
              height={650}
              alt={"All in one"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="select-none pointer-events-none"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/capturecreativity/Sync.png"}
              width={650}
              height={650}
              alt={"Canvas"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="select-none pointer-events-none"
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-semibold leading-tight text-[#43479B]  ">
              Real-Time Sync Across Devices
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Write on the Go, Sync Anywhere
            </p>
            <p className="mt-6 font-garnet text-[#6A6A75]">
              Creativity doesn’t wait, and neither should you. With real-time
              syncing, Screenplay.ink ensures that your ideas are always
              up-to-date across your devices. Start writing on your phone,
              continue on your tablet, and polish on your laptop without losing
              a single word. The freedom to move between devices means your
              creativity flows uninterrupted, just as it should.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-semibold leading-tight text-[#43479B]">
              Instant Industry-Standard Formatting
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Bring All Forms of Creativity into One Canvas
            </p>
            <p className="mt-6 font-garnet text-[#6A6A75]">
              Focus on the story, not the structure. As you capture your ideas,
              Screenplay.ink formats them instantly to meet industry standards.
              Whether it’s dialogue, scene descriptions, or action lines, every
              entry conforms to professional standards automatically, allowing
              you to keep your flow uninterrupted and your script ready for
              pitching at any moment.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/capturecreativity/Canvas.png"}
              width={650}
              height={650}
              alt={"Canvas"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="select-none pointer-events-none"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/capturecreativity/Voice.png"}
              width={650}
              height={650}
              alt={"Voice"}
              loading={"eager"}
              objectFit={"object-fill"}
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-semibold leading-tight text-[#43479B]  ">
              Freedom to Capture Your Very Own Voice
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Dictate Directly into Your Script
            </p>
            <p className="mt-6 font-garnet text-[#6A6A75]">
              Sometimes, speaking your thoughts feels more natural than typing.
              Screenplay.ink’s dictation feature lets you record ideas or even
              full scenes directly into your script. The platform transcribes
              and formats your spoken words instantly, preserving the
              authenticity of your voice and allowing you to focus on expressing
              your vision rather than typing it out.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-semibold text-[#43479B] leading-tight">
              Offline and Online Accessibility
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Write Freely, We’ll Handle the Formatting
            </p>
            <p className="mt-6 font-garnet text-[#6A6A75]">
              Write with confidence, whether you’re offline or online.
              Screenplay.ink’s offline capabilities ensure that you can capture
              ideas anytime, even in places without internet. Once you’re back
              online, everything syncs automatically, keeping your script
              updated and accessible from anywhere in the world.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/capturecreativity/Offline.png"}
              width={650}
              height={650}
              alt={"Offline and Online Accessibility"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="select-none pointer-events-none"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/capturecreativity/Freedom.png"}
              width={650}
              height={650}
              alt={"Freedom"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="select-none pointer-events-none"
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-semibold leading-tight text-[#43479B]  ">
              Embrace Creative Freedom with Screenplay.ink
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              finds its place in a unified canvas
            </p>
            <p className="mt-6 font-garnet text-[#6A6A75]">
              With Screenplay.ink, capturing creativity is no longer confined to
              traditional typing. Whether you prefer voice notes, handwritten
              drafts, or typed text, the platform is built to support every
              facet of your writing process. Now, every idea you have—big or
              small, written or spoken—finds its place in a unified canvas that
              grows and evolves with you. Start capturing your creativity with
              the freedom it deserves.
            </p>
          </div>
        </div>

        <GetStarted />
      </div>
    </HomeLayout>
  );
};

export default CaptureCreativity;
