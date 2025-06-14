"use client";
import CharacterCues from "@/app/components/FormattingGuide/CharacterCues";
import Description_FG from "@/app/components/FormattingGuide/Description";
import Dialogue from "@/app/components/FormattingGuide/Dialogue";
import Flashbacks from "@/app/components/FormattingGuide/Flashbacks";
import GeneralFormattingGuidelines from "@/app/components/FormattingGuide/GeneralFormattingGuidelines";
import MarginSettings from "@/app/components/FormattingGuide/MarginSettings";
import Montages from "@/app/components/FormattingGuide/Montages";
import PersonalDirection from "@/app/components/FormattingGuide/PersonalDirection";
import Registration from "@/app/components/FormattingGuide/Registration";
import SceneHeadings from "@/app/components/FormattingGuide/SceneHeadings";
import SlugLines from "@/app/components/FormattingGuide/SlugLines";
import Software from "@/app/components/FormattingGuide/Software";
import TelephoneCalls from "@/app/components/FormattingGuide/TelephoneCalls";
import Tense from "@/app/components/FormattingGuide/Tense";
import Transitions from "@/app/components/FormattingGuide/Transitions";
import GetStarted from "@/app/components/GetStarted";
import ImageWrapper from "@/app/components/ImageWrapper";
import HomeLayout from "@/app/layout/HomeLayout";
import React, { useState } from "react";

const FormattingGuide = () => {
  const formattingGuidelinesTopics = [
    {
      title: "General Formatting Guidelines",
      content: <GeneralFormattingGuidelines />,
    },
    { title: "Tense", content: <Tense /> },
    { title: "Margin Settings", content: <MarginSettings /> },
    { title: "Scene Headings", content: <SceneHeadings /> },
    { title: "Slug Lines", content: <SlugLines /> },
    { title: "Description", content: <Description_FG /> },
    { title: "Character Cues", content: <CharacterCues /> },
    { title: "Dialogue", content: <Dialogue /> },
    { title: "Personal Direction", content: <PersonalDirection /> },
    { title: "Transitions", content: <Transitions /> },
    { title: "Flashbacks", content: <Flashbacks /> },
    { title: "Montages", content: <Montages /> },
    { title: "Telephone Calls", content: <TelephoneCalls /> },
    { title: "Registration", content: <Registration /> },
    { title: "Software", content: <Software /> },
  ];

  const [content, setContent] = useState(<GeneralFormattingGuidelines />);
  const [activeIndex, setActiveIndex] = useState(0);

  const ShowContent = (topic: any, index: any) => {
    setContent(topic.content);
    setActiveIndex(index);
  };

  return (
    <HomeLayout>
      <div style={{ backgroundColor: "rgba(231, 235, 255)" }}>
        <ImageWrapper
          src={"/assets/formattingguide/hero.png"}
          width={1200}
          height={100}
          alt={"AI Screenplay Editor"}
          loading={"eager"}
          objectFit={"object-fill"}
          className="cursor-default pointer-events-none w-full"
        />

        <div className="max-w-8xl mx-auto flex justify-center items-start py-8">
          <div className="w-[20vw] ">
            {formattingGuidelinesTopics.map((topic, index) => (
              <div
                key={index}
                className={`py-3 px-4 my-1 cursor-pointer rounded-lg transition-all font-lg font-garnetSemi text-[#43479B] ${
                  activeIndex === index
                    ? "bg-[#43479B] text-white"
                    : "text-[#43479B]  hover:bg-white"
                }`}
                onClick={() => ShowContent(topic, index)}
              >
                {topic.title}
              </div>
            ))}
          </div>

          <div className="w-[60vw] h-50vh pl-16 overflow-y-auto">
            <div style={{ backgroundColor: "rgba(231, 235, 255)" }}>
              {content}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default FormattingGuide;
