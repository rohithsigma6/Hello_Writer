import React from "react";
import HomeLayout from "../../../layout/HomeLayout";
import GetStarted from "../../../components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";

const AIScreenplayEditor = () => {
  return (
    <HomeLayout>
      <div
        className="bg-gray-50 min-h-screen garnet-regular sm:text-base text-sm"
        style={{ backgroundColor: "rgba(231, 235, 255)" }}
      >
        <ImageWrapper
          src={"/assets/aiscreenplayeditor/hero.png"}
          width={1400}
          height={500}
          alt={"AI Screenplay Editor"}
          loading={"eager"}
          objectFit={"object-contain w-full"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-6xl mt-10 mx-auto py-10 px-6 text-center">
          <p className="text-gray-500 text-lg">
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
            <h1 className="font-garnetSemi text-3xl md:text-4xl font-bold text-[#43479B] leading-tight">
              Intelligent Scriptwriting Assistant
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Real-Time Suggestions Tailored to Your Story
            </p>
            <p className="mt-6 text-gray-700">
              Writing becomes smoother and faster with our AI scriptwriting
              assistant, which understands your story’s context and tone. From
              suggesting character names to auto-completing dialogue, the AI
              tailors suggestions that fit your unique narrative style, keeping
              you in the zone while eliminating distractions. Let the AI handle
              repetitive tasks, so you stay focused on storytelling.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/aiscreenplayeditor/assistent.png"}
              width={650}
              height={650}
              alt={"AI Screenplay Assistant"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/aiscreenplayeditor/templates.png"}
              width={650}
              height={650}
              alt={"Dynmaic Templates"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="font-garnetSemi text-3xl md:text-4xl font-bold  leading-tight text-[#43479B]  ">
              Dynamic Templates for Story Elements
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Enhance Your Plot, Characters, and More
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink offers an extensive library of templates designed
              to streamline each phase of your scriptwriting process. Whether
              crafting a compelling logline, building complex character arcs, or
              refining your scene structure, the platform provides structured
              templates to guide you. Each template is infused with AI insights,
              helping you enrich plot points, outline subplots, and flesh out
              scenes effectively.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="font-garnetSemi text-3xl md:text-4xl font-bold  leading-tight text-[#43479B]">
              Effortless Formatting and Consistency
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Always Industry-Standard, Always Consistent
            </p>
            <p className="mt-6 text-gray-700">
              Our AI ensures your script is always formatted to industry
              standards, automatically applying correct scene headers, action
              lines, dialogue formatting, and more. Avoid formatting
              inconsistencies with instant corrections, ensuring a professional
              polish without effort. Focus on the story itself, knowing that
              your script remains camera-ready from the first draft to the final
              revision.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/aiscreenplayeditor/formatting.png"}
              width={650}
              height={650}
              alt={"Formatting and Consistency"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/aiscreenplayeditor/draft.png"}
              width={650}
              height={650}
              alt={"Accelerate Draft"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
          <div className="md:w-full md:text-left flex-1">
            <h1 className="font-garnetSemi text-3xl md:text-4xl font-bold  leading-tight text-[#43479B]  ">
              Accelerate Your Drafting Process by 50%
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Speed Up Without Sacrificing Quality
            </p>
            <p className="mt-6 text-gray-700">
              Screenplay.ink’s AI tools allow you to cut down drafting time
              significantly. Through automation of scene setup, auto-completion
              for common lines, and quick suggestions for scene transitions, you
              can reduce the time spent on technical details by up to 50%
              without compromising on the quality of your story. Spend less time
              structuring and more time refining your ideas.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="md:w-full md:text-left md:ml-14 md:pl:10 flex-1">
            <h1 className="font-garnetSemi text-3xl md:text-4xl font-bold text-[#43479B] leading-tight">
              Built-in Storytelling Enhancements
            </h1>
            <p className="text-xl font-light text-gray-600 mt-4">
              Write Freely, We’ll Handle the Formatting
            </p>
            <p className="mt-6 text-gray-700">
              Our AI isn’t just technical—it’s also creative. Screenplay.ink’s
              storytelling tools, powered by AI, help you explore the emotional
              depth of your scenes, map out character arcs, and diagnose plot
              inconsistencies. The platform’s tools like Emotion Maps and Plot
              Diagnostics enable you to analyze and enhance the storytelling
              elements, ensuring your script resonates with authenticity and
              impact.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/aiscreenplayeditor/storytelling.png"}
              width={650}
              height={650}
              alt={"Story Telling Enhancements"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0">
            <ImageWrapper
              src={"/assets/aiscreenplayeditor/freedom.png"}
              width={650}
              height={650}
              alt={"Freedom with Screenplay.ink"}
              loading={"eager"}
              objectFit={"object-contain w-full"}
            />
          </div>

          <div className="md:w-full md:text-left flex-1">
            <h1 className="font-garnetSemi text-3xl md:text-4xl font-bold  leading-tight text-[#43479B]  ">
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

export default AIScreenplayEditor;
