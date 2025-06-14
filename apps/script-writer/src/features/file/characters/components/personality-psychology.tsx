import React, { useContext, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import { useParams } from "react-router";
const   options = {
  height: ["<5'0\"", "5'0\" - 5'5\"", ">5'5\""],
  weight: ["<50kg", "50kg-70kg", ">70kg"],
  race: ["Asian", "Caucasian", "African American", "Other"],
  hairColor: ["Black", "Brown", "Blonde", "Red", "Gray"],
  eyeColor: ["Blue", "Brown", "Green", "Hazel"],
  glassesOrContacts: ["None", "Glasses", "Contact Lenses"],
  skinColor: ["Fair", "Medium", "Olive", "Dark"],
  personality_introvertOrExtrovert: ["Introvert", "Extrovert", "Ambivert"],
  intelligenceLevel: ["Below Average", "Average", "Above Average", "Genius"],
  mentalHealth: ["Excellent", "Good", "Fair", "Poor"],
};

const textFields = [
  { label: "Shape of face", name: "faceShape" },
  { label: "Distinguishing features", name: "distinguishingFeatures" },
  { label: "Disabilities", name: "disabilities" },
  { label: "Dress style", name: "dressStyle" },
  { label: "Mannerisms", name: "mannerisms" },
];

const fields = [
  "personality_educationalBackground",
  "personality_learningExperiences",
  "personality_shortTermGoals",
  "personality_longTermGoals",
  "personality_selfPerception",
  "personality_perceivedByOthers",
  "personality_confidence",
  "personality_emotional",
  "personality_logical",
  "personality_embarrassment",
  "personality_introvertOrExtrovert",
  "personality_intelligenceLevel",
  "personality_mentalHealth",
];

type FormData = {
  race: string;
  height: string;
  weight: string;
};

const PersonalityPsychology = ({ setFormData, formData,sidebar=false }: any) => {
  const { fileId } = useParams();
//   useFile({ fileId: fileId });
//   const fileCtx = useContext(FileContext);
  const [state, setState] = React.useState<any>({});
  const [data, setData] = useState<FormData>({
    race: "",
    height: "",
    weight: "",
  });

  const [errors, setErrors] = useState<Partial<any>>({});
  
//   const fileStore = useFileStore();
//   const characterFormData = fileSelectors.characterFormData(fileStore);
  function handleOnClick(key: string, value: string) {
    // setState((prevState: any) => ({
    //   ...prevState,
    //   [key]: value,
    // }));
    // setFormData((prevState: any) => ({
    //         ...prevState,
    //         [key]: value,
    //   }));
    setFormData((prevState: any) => ({
      ...prevState,
      personalityPsychology: {
        ...prevState.personalityPsychology,
        [key]: value,
      },
    }));

    // fileStore.updateCharacterFormData({
    //   ...characterFormData,
    //   characterBuilder: {
    //     ...characterFormData.characterBuilder,
    //     personalityPsychology: {
    //       ...characterFormData.characterBuilder?.personalityPsychology,
    //       [key]: value,
    //     },
    //   },
    // });
    setErrors((prevErrors: any) => {
      const { [key]: removedError, ...restErrors } = prevErrors;
      return restErrors;
    });
  }


  return (
    <div className="font-poppins px-6">
      {/* First 12 fields */}
      <p className="text-2xl font-bold pt-4 mb-6 text-[#252C34]">Personality and psychology</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Dropdown fields */}
        {[
          { question: "Introvert or extrovert?", key: "personality_introvertOrExtrovert" },
          { question: "Intelligence level", key: "intelligenceLevel" },
          { question: "Mental health", key: "mentalHealth" },
        ].map((item, index) => (
          <div key={index}>
            <label htmlFor={item.key}>
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
            </label>
            <select
              disabled={sidebar}
              id={item.key}
              name={item.key}
              value={formData?.personalityPsychology?.[item.key]}
              onChange={(e) => handleOnClick(item.key, e.target.value)}
              className={`w-full custom-arrow-down rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${
                errors[item.key] ? "border-red-500" : "border-gray-300"
              } bg-white shadow-inner`}
            >
              <option value="" 
              disabled={sidebar}
              >
                Select {item.question}
              </option>
              {options[item.key as keyof typeof options]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
          </div>
        ))}

       
      </div>

      {/* Other fields one by one */}
      {[
        { question: "Educational background", key: "educationalBackground" },
        { question: "Learning experiences", key: "learningExperiences" },
        { question: "Short-term goals", key: "shortTermGoals" },
        { question: "Long-term goals", key: "longTermGoals" },
        { question: "How does your character see themselves?", key: "selfPerception" },
        { question: "How does your character believe they are perceived by others?", key: "perceptionByOthers" },
        { question: "How confident is your character?", key: "confidenceLevel" },
        { question: "How emotional is your character?", key: "emotionalLevel" },
        { question: "How logical is your character?", key: "logicalLevel" },
        { question: "What would most embarrass your character?", key: "embarrassingFactors" },
      ].map((item, index) => (
        <div key={index} className="mt-4">
          <label htmlFor={item.key}>
            <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
          </label>
          <input
            disabled={sidebar}
            id={item.key}
            name={item.key}
            value={formData?.personalityPsychology?.[item.key]}
            onChange={(e) => handleOnClick(item.key, e.target.value)}
            className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${
              errors[item.key] ? "border-red-500" : "border-gray-300"
            } bg-white shadow-inner p-4`}
          />
          {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
        </div>
      ))}
      {/* <div className="btn px-14 py-2  rounded-lg  mt-5 w-32 bg-[#E8E2D8] cursor-pointer" onClick={handleSave}>
          <p className="text-white font-inter text-base font-medium text-xs uppercase">Save</p>
        </div> */}
    </div>
  );
};

export default PersonalityPsychology;
