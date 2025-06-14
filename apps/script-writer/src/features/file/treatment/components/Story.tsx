import React, { useEffect, useState } from "react";
import { useStory } from "./StoryContext";
import { useParams } from "react-router";
import { getTreatmentByFile } from "../api/treatment-api";
export const storyBeatsData = [
  { id: 1, title: "Opening Image", description: "A stfirst scene that sets the tone, mood, and theme of the story.", color: "story-beats-blue" },
  { id: 2, title: "Introduction of Protagonist", description: "The audience meets the protagonist, learning about their strengths, flaws, and motivations.", color: "story-beats-yellow" },
  { id: 3, title: "Inciting Incident", description: "An unexpected event that disrupts the protagonist’s world and sets the story in motion.", color: "story-beats-purple" },
  { id: 4, title: "Response & Exploration", description: "The protagonist reacts to the inciting incident, exploring new possibilities and facing initial challenges.", color: "story-beats-red" },
  { id: 5, title: "Building Relationships", description: "New allies and enemies emerge, shaping the protagonist’s journey and growth.", color: "story-beats-blue-2" },
  { id: 6, title: "Rising Challenges", description: "Obstacles intensify, testing the protagonist’s resolve and forcing them to make difficult choices.", color: "story-beats-gray" },
  { id: 7, title: "Higher Stakes", description: "The protagonist faces their biggest challenge yet, leading up to the climax of the story.", color: "story-beats-indigo" }
];
const handleDescriptionChange = (index: number, newValue: string) => {
  setStoryBeats((prev) =>
    prev.map((beat, i) =>
      i === index ? { ...beat, description: newValue } : beat
    )
  );
};
export default function Story() {

  const [storyBeats, setStoryBeats] = useState([]);
  const { selectedStory, setSelectedStory } = useStory();
  const { fileId } = useParams()
  useEffect(() => {
    const fetchData = async () => {

      const treatment = await getTreatmentByFile(fileId);
      const finalizedTemplate = treatment.find((template: any) => template.status === "finalized");
      console.log(finalizedTemplate)
      if (finalizedTemplate) {
        const colors = ["story-beats-blue", "story-beats-yellow", "story-beats-purple", "story-beats-red", "story-beats-blue-2", "story-beats-gray", "story-beats-indigo"];

        const getRandomColor = (index: number) => colors[index % colors.length];

        const formattedStoryBeats = finalizedTemplate.templateData[0].template.flatMap((act: any) =>
          act.predefinedBeat.map((beat: any, index: number) => ({
            id: index + 1,
            title: beat.title,
            description: beat.description,
            actTitle: act.title,
            beatId: beat._id, // if needed
            beatIndex: index,
            color: getRandomColor(index),
            placeHolder:beat.placeHolder
          }))
        );
        

        console.log(formattedStoryBeats)
        setStoryBeats(formattedStoryBeats);
      }

    }
    fetchData();

  }, []);

  return (
    <div className="px-3 py-6 w-full max-w-md mx-auto font-poppins h-screen">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-[16px] font-semibold text-[#212131]">Story Beats</h2>
        <button className="border border-[#BABABF] pl-[16px] py-[6px] pr-[8px] rounded-[12px] flex items-center text-[#9999A0] text-[14px]">
          Add <span className="ml-1">+</span>
        </button>
      </div>

      {/* Scrollable story beats list */}
      <div className="overflow-y-auto max-h-[50vh] pr-1">
        {storyBeats.map((beat) => (
          <div
            key={beat.id}
            className={`p-4 mb-2 text-[14px] leading-[18px] font-normal rounded-[16px] flex justify-between items-center ${beat.color}`}
            onClick={() => setSelectedStory(beat)}
          >
            <span className="font-normal">{beat.id}. {beat.title}</span>
            <span className="text-[#9999A0] cursor-pointer text-[20px] block">⋯</span>
          </div>
        ))}
      </div>
    </div>

  );
}
