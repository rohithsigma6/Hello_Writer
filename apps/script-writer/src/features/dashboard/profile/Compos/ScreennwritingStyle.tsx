import React, { useEffect, useState } from "react";
import { usePostScreenwritingStyle } from "../api/use-mutate";
import { useUser } from "@/features/users/api/get-user";

const ScreennwritingStyle = ({
  setProfileSetting,
}: {
  setProfileSetting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const genres = ["Comedy", "Action", "Romance", "Fiction", "Mythology", "Drama"];
  const [data, setData] = useState({});

  const {mutate:screenwritingStyleUpdate} = usePostScreenwritingStyle();
  const [radioIndex, setRadioIndex] = useState<string>("0");
  
  const { data:user, refetch: refetchUser } = useUser();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  console.log("ScreennwritingStyle", data);

  const handleSubmit = () => {
    const payload = {
      writingStyle:data?.writingStyle,
      writingPreference:data?.writingPreference,
      collaborationPreferences:data?.collaborationPreferences,
      inspiration:data?.inspiration,
      themesOftenExplored:data?.themesOftenExplored,
      toneAndMood:data?.toneAndMood,
    };
    screenwritingStyleUpdate(payload);
  };

  useEffect(() => {
    setData(user?.user?.profile?.screenwritingStyle);
    setRadioIndex(user?.user?.profile?.screenwritingStyle?.writingStyle)
  }, [user]);

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <section className="flex flex-row w-full items-center justify-between py-4 border-b border-slate-300">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold">Screenwriting Style</h1>
          <p className="text-xs text-slate-500 font-medium">Update your Screenwriting Style details here.</p>
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
              setTimeout(() => {
                setProfileSetting(false);
              }, 500);
              handleSubmit();
            }}
            className="px-10 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
          >
            Save
          </button>
        </div>
      </section>

      {/**Writing Process */}
      <WritingStyle data={data} handleChange={handleChange} setRadioIndex={setRadioIndex} />

      <section className="px-6 py-4 bg-gray-300 rounded-lg w-full">
        <p className="text-sm text-black">
          {radioIndex === "Forest Writer" &&
            "A Forest Writer embraces the journey of discovery in their writing process. They start with a spark of an idea or an intriguing concept and let the story unfold organically. Without a detailed outline, they allow the plot, characters, and themes to emerge naturally, like exploring an untamed forest where paths reveal themselves step by step. This approach is driven by creativity and spontaneity, often leading to surprising twists and raw, authentic storytelling. While it can sometimes lead to unexpected detours, the process is invigorating, offering new perspectives and freedom for ideas to flow."}

          {radioIndex === "Tree Writer" &&
            "A Tree Writer thrives on structure and meticulous planning. Like carefully planting and nurturing a tree, they construct their story with a clear outline, branch by branch. Every scene, character arc, and plot point is thoughtfully mapped out before the writing begins. This approach ensures that every element of the story has purpose and connection, leading to a well-rooted narrative that is cohesive and polished. For a Tree Writer, the process is about precision and control, where they cultivate their story with deliberate care, ensuring nothing is left to chance."}

          {radioIndex === "Both" &&
            "A writer who combines the traits of a Forest and Tree Writer enjoys the best of both worlds. They start with a loose framework—a roadmap of the story's major landmarks—but leave room for exploration and discovery along the way. This hybrid approach allows for creative freedom while maintaining a sense of direction and structure. By balancing spontaneity and planning, they can adapt to new ideas as they arise while keeping the story focused and coherent. For these writers, the process is a dynamic blend of inspiration and intention, enabling them to craft stories that are both organic and refined."}
        </p>
      </section>
      <WritingProcess data={data} handleChange={handleChange} />

      {/**Collaboration Preferences */}
      <CollaborationPreferences data={data} handleChange={handleChange} />

      {/**Inspiration */}
      <Inspiration data={data} handleChange={handleChange} />

      {/**Theme */}
      <ThemeOftenExplored data={data} handleChange={handleChange} />

      {/**Tone and Mood */}
      <ThemeAndMood data={data} handleChange={handleChange} />
    </div>
  );
};

export default ScreennwritingStyle;

function WritingProcess({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <p className="font-bold w-1/4 text-sm">Writing Process</p>

      <div className="w-3/4 flex flex-row gap-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="outline-first"
            name="writingPreference"
            value="Outline first"
            onChange={handleChange}
            checked={data?.writingPreference === "Outline first"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="outline-first">
            Outline first
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="straight-to-draft"
            name="writingPreference"
            value="Straight to Draft"
            onChange={handleChange}
            checked={data?.writingPreference === "Straight to Draft"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="straight-to-draft">
            Straight to Draft
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="draft-and-revise"
            name="writingPreference"
            value="Draft and Revise"
            onChange={handleChange}
            checked={data?.writingPreference === "Draft and Revise"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="draft-and-revise">
            Draft and Revise
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="structured-approach"
            name="writingPreference"
            value="Structured Approach"
            onChange={handleChange}
            checked={data?.writingPreference === "Structured Approach"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="structured-approach">
            Structured Approach
          </label>
        </div>
      </div>
    </section>
  );
}

function CollaborationPreferences({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <p className="font-bold w-1/4 text-sm">Collaboration Preferences</p>

      <div className="w-3/4 flex flex-row gap-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="solo"
            name="collaborationPreferences"
            value="Solo"
            onChange={handleChange}
            checked={data?.collaborationPreferences === "Solo"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="solo">
            Solo
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="co-writer"
            name="collaborationPreferences"
            value="Co-Writer"
            onChange={handleChange}
            checked={data?.collaborationPreferences === "Co-Writer"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="co-writer">
            Co-Writer
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="writing-room"
            name="collaborationPreferences"
            value="Writing Room"
            onChange={handleChange}
            checked={data?.collaborationPreferences === "Writing Room"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="writing-room">
            Writing Room
          </label>
        </div>
      </div>
    </section>
  );
}

function ThemeAndMood({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4">
      <p className="font-bold w-1/4 text-sm">Theme and Mood</p>

      <div className="w-3/4 flex flex-row gap-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="dark"
            name="toneAndMood"
            value="Dark"
            onChange={handleChange}
            checked={data?.toneAndMood === "Dark"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="dark">
            Dark
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="light-hearted"
            name="toneAndMood"
            value="Light Hearted"
            onChange={handleChange}
            checked={data?.toneAndMood === "Light Hearted"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="light-hearted">
            Light Hearted
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="suspenseful"
            name="toneAndMood"
            value="Suspenseful"
            onChange={handleChange}
            checked={data?.toneAndMood === "Suspenseful"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="suspenseful">
            Suspenseful
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="melodramatic"
            name="toneAndMood"
            value="Medodramatic"
            onChange={handleChange}
            checked={data?.toneAndMood === "Medodramatic"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="melodramatic">
            Medodramatic
          </label>
        </div>
      </div>
    </section>
  );
}

function Inspiration({ handleChange, data }: { handleChange: (e: any) => void; data: any }) {
  const [checkedItems, setCheckedItems] = useState(data?.inspiration || []);

  useEffect(() => {
    setCheckedItems(data?.inspiration || []);
  }, [data?.inspiration]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedItems = checked ? [...checkedItems, value] : checkedItems.filter((item: string) => item !== value);

    setCheckedItems(updatedItems);
    handleChange({ target: { name: "inspiration", value: updatedItems } });
  };

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <p className="font-bold w-1/4 text-sm">Inspiration</p>
      <div className="w-3/4 flex flex-row gap-4">
        {["Real Life Events", "Books", "Folklore", "Film/Tv"].map((inspiration) => (
          <div className="flex items-center gap-2" key={inspiration}>
            <input
              name="inspiration"
              type="checkbox"
              id={inspiration.toLowerCase().replace(/ /g, "-")}
              value={inspiration}
              onChange={handleCheckboxChange}
              checked={checkedItems.includes(inspiration)}
              className="custom-checkbox"
            />
            <label className="text-sm" htmlFor={inspiration.toLowerCase().replace(/ /g, "-")}>
              {inspiration}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}

function ThemeOftenExplored({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: any;
}) {

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
  };

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <label htmlFor="themesOftenExplored" className="font-bold w-1/4 text-sm">
        Theme Often Explored
      </label>

      <div className="w-2/4 flex flex-col items-start gap-2">
        <textarea
          rows={4}
          name="themesOftenExplored"
          value={data?.themesOftenExplored}
          onChange={handleTextareaChange}
          placeholder="Users can describe their favorite writing tools, including software, notebooks, or any other items they prefer"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        ></textarea>
        
      </div>
    </section>
  );
}

function WritingStyle({
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
      <p className="font-bold w-1/4 text-sm">Writing Style</p>

      <div className="w-3/4 flex flex-row gap-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="forest-writer"
            name="writingStyle"
            value="Forest Writer"
            onChange={(e) => handleSelection(e, "Forest Writer")}
            checked={data?.writingStyle === "Forest Writer"}
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
            name="writingStyle"
            value="Tree Writer"
            onChange={(e) => handleSelection(e, "Tree Writer")}
            checked={data?.writingStyle === "Tree Writer"}
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
            name="writingStyle"
            value="Both"
            onChange={(e) => handleSelection(e, "Both")}
            checked={data?.writingStyle === "Both"}
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
