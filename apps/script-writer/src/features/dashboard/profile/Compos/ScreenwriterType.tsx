import React, { useEffect, useState } from "react";
import { useProfile } from "../../../context/profilecontext";

const ScreenwriterType = ({
  setProfileSetting,
}: {
  setProfileSetting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { profileData, setProfileData } = useProfile();
  const [data, setData] = useState(profileData.screenwriter_type || {});
  const [radioIndex, setRadioIndex] = useState<string>("0");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   setData(profileData.screenwriter_type || {});
  // }, [profileData.screenwriter_type]);

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <section className="flex flex-row w-full items-center justify-between py-4 border-b border-slate-300">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold">Screenwriter Type</h1>
          <p className="text-xs text-slate-500 font-medium">Update your Screenwriter Type details here.</p>
        </div>

        <div className="flex flex-row gap-x-2 items-center">
          <button
            onClick={() => setProfileSetting(false)}
            className="border border-gray-600 px-10 py-3 font-medium rounded-2xl bg-white text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              setProfileData((prev) => ({ ...prev, screennwriting_style: data }));
              setTimeout(() => {
                setProfileSetting(false);
              }, 500);
            }}
            className="px-10 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
          >
            Save
          </button>
        </div>
      </section>

      <WritingProcess data={data} handleChange={handleChange} setRadioIndex={setRadioIndex} />

      <section className="px-6 py-4 bg-gray-300 rounded-lg">
        <p className="text-sm text-black">
          {radioIndex === "Forest Writer" &&
            "A Forest Writer embraces the journey of discovery in their writing process. They start with a spark of an idea or an intriguing concept and let the story unfold organically. Without a detailed outline, they allow the plot, characters, and themes to emerge naturally, like exploring an untamed forest where paths reveal themselves step by step. This approach is driven by creativity and spontaneity, often leading to surprising twists and raw, authentic storytelling. While it can sometimes lead to unexpected detours, the process is invigorating, offering new perspectives and freedom for ideas to flow."}

          {radioIndex === "Tree Writer" &&
            "A Tree Writer thrives on structure and meticulous planning. Like carefully planting and nurturing a tree, they construct their story with a clear outline, branch by branch. Every scene, character arc, and plot point is thoughtfully mapped out before the writing begins. This approach ensures that every element of the story has purpose and connection, leading to a well-rooted narrative that is cohesive and polished. For a Tree Writer, the process is about precision and control, where they cultivate their story with deliberate care, ensuring nothing is left to chance."}

          {radioIndex === "Both" &&
            "A writer who combines the traits of a Forest and Tree Writer enjoys the best of both worlds. They start with a loose framework—a roadmap of the story's major landmarks—but leave room for exploration and discovery along the way. This hybrid approach allows for creative freedom while maintaining a sense of direction and structure. By balancing spontaneity and planning, they can adapt to new ideas as they arise while keeping the story focused and coherent. For these writers, the process is a dynamic blend of inspiration and intention, enabling them to craft stories that are both organic and refined."}
        </p>
      </section>
    </div>
  );
};

export default ScreenwriterType;

function WritingProcess({
  handleChange,
  data,
  setRadioIndex,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
  setRadioIndex: (value: string) => void;
}) {
  const handleSelection = (e: any, name: string) => {
    handleChange(e);
    setRadioIndex(name);
  };

  return (
    <section className="flex flex-row w-full items-start py-4">
      <p className="font-bold w-1/4 text-sm">Writing Process</p>

      <div className="w-3/4 flex flex-row gap-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="forest-writer"
            name="writing_process"
            value="Forest Writer"
            onChange={(e) => handleSelection(e, "Forest Writer")}
            checked={data.writing_process === "Forest Writer"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="forest-writer">
            Forest Writer
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="tree-writer"
            name="writing_process"
            value="Tree Writer"
            onChange={(e) => handleSelection(e, "Tree Writer")}
            checked={data.writing_process === "Tree Writer"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="tree-writer">
            Tree Writer
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="both"
            name="writing_process"
            value="Both"
            onChange={(e) => handleSelection(e, "Both")}
            checked={data.writing_process === "Both"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="both">
            Both
          </label>
        </div>
      </div>
    </section>
  );
}
