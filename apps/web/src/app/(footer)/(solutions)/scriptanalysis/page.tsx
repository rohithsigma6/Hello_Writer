import React from "react";
import HomeLayout from "../../../layout/HomeLayout";
import GetStarted from "../../../components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";

const ScriptAnalysis = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 min-h-screen garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/scriptanalysis/hero.png"}
          width={1400}
          height={500}
          alt={"Control Over Monitization and Licensing"}
          loading={"eager"}
          objectFit={"object-contain w-full"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6 text-center">
          <p className="text-gray-500 text-lg">
            Screenplay.ink empowers writers with sophisticated AI-driven
            analysis tools designed to enhance the quality and impact of every
            screenplay. From identifying plot inconsistencies to highlighting
            character development gaps, our analysis features provide actionable
            insights that can transform a good story into a great one. Let
            Screenplay.ink’s AI help you polish your screenplay, ensuring it’s
            ready to captivate audiences and meet industry standards.
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              In-Depth Plot Analysis
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Detect Inconsistencies and Strengthen Story Flow
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink’s AI examines your plot for structural coherence
              and narrative flow, identifying potential inconsistencies that may
              disrupt the reader’s experience. By providing clear feedback on
              pacing, tension, and story progression, the AI helps you fine-tune
              your plot, ensuring each scene builds toward a compelling
              narrative arc.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptanalysis/plotanalysis.png"}
              width={650}
              height={650}
              alt={"Plot Analysis"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptanalysis/character.png"}
              width={650}
              height={650}
              alt={"Character Development"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Character Development Diagnostics
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Ensure Your Characters are Rich, Real, and Relatable
            </p>
            <p className="mt-6 text-gray-700">
              Great stories rely on well-developed characters. The AI analysis
              delves into your character arcs, examining motivations, growth,
              and consistency throughout the script. Receive constructive
              insights on character depth and interactions, helping you create
              multi-dimensional characters that resonate with audiences and
              drive your story forward.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]">
              Narrative and Setting Evaluation
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Enhance the World Around Your Story
            </p>
            <p className="mt-6 text-gray-700">
              Setting and atmosphere play a vital role in immersing readers.
              Screenplay.ink’s AI evaluates the vividness and consistency of
              your settings, making suggestions to enhance the sensory and
              emotional impact of each location. The analysis ensures your story
              world feels authentic, supporting the narrative and deepening
              audience engagement.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptanalysis/narrative.png"}
              width={650}
              height={650}
              alt={"Narative and Setting"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptanalysis/narrativegaps.png"}
              width={650}
              height={650}
              alt={"Narrative Gaps"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Identify and Address Narrative Gaps
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Seamless Storytelling Without Loose Ends
            </p>
            <p className="mt-6 text-gray-700">
              Gaps in the narrative can disrupt immersion and reduce the story’s
              emotional impact. Screenplay.ink’s AI helps you identify and
              resolve these gaps, ensuring that all plot points, character
              actions, and story events are logically connected. This level of
              precision makes for a more cohesive and satisfying story, leaving
              no loose ends.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              Receive a Comprehensive Summary and Ratings
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Objective Feedback to Gauge Story Readiness
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink provides an overall rating for key elements like
              plot, structure, setting, and characters, giving you an objective
              snapshot of your screenplay’s strengths and areas for improvement.
              Each rating comes with a detailed summary, highlighting aspects
              that shine and those that may need revision. This feedback offers
              valuable guidance for making your script as impactful as possible.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptanalysis/summaryAndRating.png"}
              width={650}
              height={650}
              alt={"Summary and Ratings"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/scriptanalysis/freedom.png"}
              width={650}
              height={650}
              alt={"Freedom"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
              className="pointer-events-none select-none"
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
      </div>
      <GetStarted />
    </HomeLayout>
  );
};

export default ScriptAnalysis;
