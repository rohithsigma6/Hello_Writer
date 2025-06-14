import React from "react";
import HomeLayout from "../../../layout/HomeLayout";
import GetStarted from "../../../components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";

const page = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 min-h-screen garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/marketplace/hero.png"}
          width={1400}
          height={650}
          alt={"Market Place"}
          loading={"eager"}
          objectFit={"object-contain w-full"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6 text-center">
          <p className="text-gray-500 text-lg">
            Screenplay.ink’s Marketplace is a dynamic hub where producers,
            directors, and investors can explore a vast collection of
            production-ready scripts, each crafted to captivate audiences and
            bring unique stories to life. With an intuitive search and filtering
            system, the Marketplace makes it easy to find the perfect script
            that aligns with your vision, whether you’re looking for a specific
            genre, theme, or story setting. The Screenplay Marketplace
            streamlines the entire process, enabling seamless purchases,
            options, and collaborations that turn great scripts into compelling
            productions.
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full text-center md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              Comprehensive Filters for Precise Searches
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Tailor Your Search to Find the Ideal Script
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink’s Marketplace offers a range of filters—such as
              genre, format, writer status, and thematic tags—so you can narrow
              down your search and quickly locate scripts that meet your
              criteria. Whether you're looking for a gritty crime drama, a
              historical epic, or a character-driven indie, the Marketplace’s
              advanced filtering ensures you spend less time searching and more
              time discovering.
            </p>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/marketplace/filters.png"}
              width={650}
              height={650}
              alt={"Filters for Searches"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/marketplace/options.png"}
              width={650}
              height={650}
              alt={"Options for Purchase"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
          <div className="md:w-full text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Options for Purchase, Optioning, and Commissioning
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Write on the Go, Sync Anywhere
            </p>
            <p className="mt-6 text-gray-700">
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
          <div className="md:w-full text-center md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]">
              Streamlined Communication and Collaboration
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Connect Directly with Writers and Collaborators
            </p>
            <p className="mt-6 text-gray-700">
              The Marketplace isn’t just a listing platform; it’s a place to
              connect with writers and other industry professionals. With
              in-platform messaging and collaboration features, you can reach
              out to writers, discuss story ideas, and negotiate terms directly
              through Screenplay.ink. This seamless interaction fosters
              meaningful connections, allowing you to engage with creatives and
              build partnerships that bring stories to life.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/marketplace/commAndColl.png"}
              width={650}
              height={650}
              alt={"Communication and Collaboration"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/marketplace/commAndColl.png"}
              width={650}
              height={650}
              alt={"Communication and Collaboration"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
          <div className="md:w-full text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Reader Metrics and Audience Insights
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Gain Valuable Data to Guide Your Choices
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink provides real-time reader metrics and audience
              feedback for each script, showing you the level of engagement and
              interest a screenplay has generated among readers. This valuable
              insight helps you gauge a script’s potential appeal and make
              informed decisions based on how other professionals and audiences
              are responding. Use these analytics to choose scripts with proven
              resonance and increase your project’s chance of success.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full text-center md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              Explore a Curated Selection of Premium Scripts
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Highlighting Quality with Rockstar Status
            </p>
            <p className="mt-6 text-gray-700">
              The Marketplace features a “Rockstar” status for top-rated
              scripts, indicating those that have been particularly
              well-received by industry professionals. Curated with quality in
              mind, these premium listings showcase the best of what
              Screenplay.ink has to offer, allowing you to discover standout
              scripts that are ready for production. By spotlighting exceptional
              works, the Marketplace helps you identify scripts that have the
              potential to make an impact.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/marketplace/insights.png"}
              width={650}
              height={650}
              alt={"Reader Metrics and Auidence Insights"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/marketplace/selection.png"}
              width={650}
              height={650}
              alt={"Selection of Preminum Scripts"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
          <div className="md:w-full text-center md:text-left flex-1">
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
      </div>

      <GetStarted />
    </HomeLayout>
  );
};

export default page;
