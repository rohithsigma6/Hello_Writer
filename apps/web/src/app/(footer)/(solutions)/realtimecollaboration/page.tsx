import React from "react";
import HomeLayout from "../../../layout/HomeLayout";
import GetStarted from "../../../components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";

const RealTimeCollaboration = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 min-h-screen garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/realtimecollaboration/hero.png"}
          width={1400}
          height={500}
          alt={"Real Time Collaboration"}
          loading={"eager"}
          objectFit={"object-contain w-full"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6">
          <p className="text-gray-500 text-center">
            Screenplay.ink understands that inspiration doesn’t follow a set
            schedule. Whether it’s an idea scribbled on a napkin, a voice note
            recorded in the middle of the night, or a scene typed out at your
            desk, we’ve designed a platform that embraces the diverse ways
            creativity can come to life. Here’s how Screenplay.ink empowers you
            to capture your ideas, wherever and however they emerge.
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              The Collaborative LoglineCreation
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Align on the Core Concept, Together
            </p>
            <p className="mt-6 text-gray-700">
              The foundation of any story is its core idea, captured in a
              compelling logline. With Screenplay.ink, writers, producers, and
              collaborators can brainstorm, refine, and finalize the logline in
              real time. Everyone’s input is captured instantly, enabling teams
              to align on the vision and direction from the outset.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/realtimecollaboration/logline.png"}
              width={650}
              height={650}
              alt={"Logline Creation"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/realtimecollaboration/theme.png"}
              width={650}
              height={650}
              alt={"Cohesive Theme Building"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Building a Cohesive Theme Together
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Unified Vision Through Shared Values
            </p>
            <p className="mt-6 text-gray-700">
              Defining the theme is crucial to giving the story emotional depth
              and coherence. Screenplay.ink’s real-time collaboration allows
              your team to articulate, discuss, and shape the theme
              collectively, ensuring that everyone contributes to and
              understands the underlying message. This shared understanding of
              the theme serves as a guiding light throughout the entire project.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]">
              Crafting the Story World Collectively
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Build Immersive Worlds with Shared Imagination
            </p>
            <p className="mt-6 text-gray-700">
              Designing a unique story world requires diverse perspectives. With
              Screenplay.ink, collaborators can add and refine world-building
              details—locations, cultures, rules, and aesthetics—in real time.
              This collaborative world-building enriches the narrative and
              creates a believable setting that reflects the collective
              creativity of the entire team.
            </p>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/realtimecollaboration/collective.png"}
              width={650}
              height={650}
              alt={"Story World Collectively"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/realtimecollaboration/characters.png"}
              width={650}
              height={650}
              alt={"Develop Characters"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>

          <div className="md:w-full md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold  leading-tight text-[#43479B]  ">
              Developing Characters in Real Time
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Create Compelling Characters Through Collaborative Input
            </p>
            <p className="mt-6 text-gray-700">
              Great characters are at the heart of any story. Screenplay.ink
              allows teams to flesh out character traits, backgrounds,
              motivations, and arcs collaboratively, enabling each character to
              benefit from diverse perspectives. By building characters
              together, you ensure they are multi-dimensional and relatable,
              resonating with audiences from all walks of life.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="text-3xl md:text-4xl font-garnetSemi font-bold text-[#43479B] leading-tight">
              Plot Structuring and Scene Cards with Team Input
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              From Story Beats to Scene Cards—All in Real Time
            </p>
            <p className="mt-6 text-gray-700">
              Plotting becomes a collaborative exercise as teams work together
              to outline key story beats and develop scene cards.
              Screenplay.ink’s shared platform lets collaborators add ideas,
              provide feedback, and sequence scenes in real time, making it easy
              to construct a cohesive plot that flows naturally. By working on
              scene cards collaboratively, everyone stays in sync on the story’s
              progression, ensuring a clear roadmap from start to finish.
            </p>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/realtimecollaboration/plot.png"}
              width={650}
              height={650}
              alt={"Plot Structuring and Scene Cards"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/realtimecollaboration/freedom.png"}
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
      </div>

      <GetStarted />
    </HomeLayout>
  );
};

export default RealTimeCollaboration;
