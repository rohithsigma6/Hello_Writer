import React from "react";
import HomeLayout from "../../../layout/HomeLayout";
import GetStarted from "../../../components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";

const PitchMaker = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 min-h-screen garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/pitchmaker/hero.png"}
          width={1400}
          height={500}
          alt={"Pich Maker"}
          loading={"eager"}
          objectFit={"object-contain w-full"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6 text-center">
          <p className="text-gray-500 text-lg">
            In the competitive world of screenwriting, a compelling story is
            only half the battle. To capture the attention of producers,
            investors, and audiences, your screenplay needs a powerful pitch.
            Screenplay.ink’s Pitch Deck Creator is designed to help you build
            captivating presentations, combining narrative elements with
            engaging visuals, multimedia, and clear storytelling insights. This
            all-in-one tool makes it easy to craft a pitch that showcases the
            essence of your story and leaves a lasting impression.
          </p>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              Transform Your Script into a Dynamic Presentation
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Highlight Key Story Elements in a Visually Engaging Way
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink’s Pitch Deck Creator allows you to pull essential
              details from your script—like genre, logline, characters, themes,
              and plot synopsis—and present them in an organized, visually
              appealing format. With customizable templates and design options,
              you can tailor each section of your pitch to highlight the unique
              strengths of your story. This way, your pitch deck captures the
              core elements of your screenplay while enhancing them with visual
              storytelling.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/pitchmaker/presentation.png"}
              width={650}
              height={650}
              alt={"Dynamic Presentation"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/pitchmaker/multimedia.png"}
              width={650}
              height={650}
              alt={"Integrate Multimedia"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Integrate Multimedia for an Immersive Experience
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Enrich Your Pitch with Music, Images, and More
            </p>
            <p className="mt-6 text-gray-700">
              A well-crafted pitch is more than just text on a page. With
              Screenplay.ink, you can integrate multimedia elements—like
              evocative visuals, music tracks, and sample scenes—to create an
              immersive pitch experience. Whether it's a character sketch,
              location reference, or mood-setting music, multimedia elements
              help bring your story world to life, making it easier for
              decision-makers to envision your script as a finished production.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]">
              Utilize Advanced Reader Tracking for Valuable Insights
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Understand Audience Engagement with Real-Time Analytics
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink’s Pitch Deck Creator includes advanced tracking
              features that let you monitor how your pitch deck is being viewed.
              With insights into audience engagement, you can see which sections
              of your deck are capturing attention and where readers may lose
              interest. This data provides valuable feedback, helping you refine
              your pitch for maximum impact and make informed adjustments based
              on audience interaction.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/pitchmaker/reader.png"}
              width={650}
              height={650}
              alt={"Reader Tracking"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/pitchmaker/storyoutline.png"}
              width={650}
              height={650}
              alt={"Story Outline"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Craft a Comprehensive and Persuasive Story Outline
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              From Logline to Soundtrack—Cover Every Aspect of Your Project
            </p>
            <p className="mt-6 text-gray-700">
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
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              Offline and Online Accessibility
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Write Freely, We’ll Handle the Formatting
            </p>
            <p className="mt-6 text-gray-700">
              Write with confidence, whether you’re offline or online.
              Screenplay.ink’s offline capabilities ensure that you can capture
              ideas anytime, even in places without internet. Once you’re back
              online, everything syncs automatically, keeping your script
              updated and accessible from anywhere in the world.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/pitchmaker/offline.png"}
              width={650}
              height={650}
              alt={"Offline and Online"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/pitchmaker/freedom.png"}
              width={650}
              height={650}
              alt={"Freedom with Screenplay.ink"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Embrace Creative Freedom with Screenplay.ink
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              finds its place in a unified canvas
            </p>
            <p className="mt-6 text-gray-700">
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
        <img src={"l1"} />
      </div>

      <GetStarted />
    </HomeLayout>
  );
};

export default PitchMaker;
