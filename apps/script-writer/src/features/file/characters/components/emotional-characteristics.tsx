import React, { useContext, useState } from "react";
import { useParams } from "react-router";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * EmotionalCharacteristics component
 *
 * This component is used to generate the emotional characteristics page for
 * the character studio. It receives the setFormData and formData as props and
 * displays a form with the relevant fields. It also handles the form data
 * submission and validation.
 *
 * @param {object} setFormData - Set the form data to be submitted
 * @param {object} formData - The form data to be submitted
 *
 * @returns {JSX.Element} - The EmotionalCharacteristics component
 */
/******  fb3d132b-60ca-4074-a86f-d2009794be6a  *******/
const EmotionalCharacteristics = ({ setFormData,formData ,sidebar=false }:any) => {
  const className = "Theme__Fundamental";
  const [active, setActive] = useState(1);
  const [editorView, setEditorView] = useState();
  const { fileId } = useParams();
//   useFile({ fileId: fileId });
//   const fileCtx = useContext(FileContext);
  const [state, setState] = React.useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const fields = [
    "emotional_strengths",
    "emotional_weaknesses",
    "emotional_conflict",
    "emotional_sadness",
    "emotional_change",
    "emotional_loss",
    "emotional_lifeGoals",
    "emotional_lifeChanges",
    "emotional_happiness",
    "emotional_judgmental",
    "emotional_generosity",
    "emotional_politeness",
  ];

  // if (fileCtx.isFileLoading)
  //   return (
  //     <Loader
  //       title="Getting your file!"
  //       description="Hang tight while we are getting your file"
  //       isLoading={fileCtx.isFileLoading}
  //     />
  //   );
//   const fileStore = useFileStore();
//     const characterFormData = fileSelectors.characterFormData(fileStore);
  function handleOnClick(key: string, value: string) {
    // setState((prevState: any) => ({
    //   ...prevState,
    //   [key]: value,
    // }));
    // setFormData((prevState: any) => ({
    //     ...prevState,
    //     [key]: value,
    //   }));
    setFormData((prevState: any) => ({
      ...prevState,
      emotionalCharacteristics:{
      ...prevState?.emotionalCharacteristics,
      [key]: value,
     }
    }));

    // fileStore.updateCharacterFormData({
    //   ...characterFormData,
    //   characterBuilder: {
    //     ...characterFormData.characterBuilder,
    //     emotionalCharacteristics: {
    //       ...characterFormData.characterBuilder?.emotionalCharacteristics,
    //       [key]: value,
    //     },
    //   },
    // });
    setErrors((prevErrors: any) => {
      const { [key]: removedError, ...restErrors } = prevErrors;
      return restErrors;
    });
  }

  function validateForm() {
    const newErrors: any = {};
    fields.forEach((field) => {
      if (!state[field]) {
        newErrors[field] = `${field} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors means the form is valid
  }

  // function handleSave() {
  //   if (validateForm()) {
  //     setFormData((prevState: any) => ({
  //       ...prevState,
  //       ...state,
  //     }));
  //     console.log("Form Data:", state);
  //     // Here you can send form data to the server or handle it as needed
  //   } else {
  //     console.log("Validation failed. Please fill all fields.");
  //   }
  // }

  // function handleEditorView(view) {
  //   setEditorView(view);
  //   // console.log(view, editorView);
  // }
  const { templatename } = useParams<any>();

  return (
    <div className="rounded-tr-none rounded-br-lg rounded-bl-lg rounded-tl-lg  flex flex-col  font-Poppins px-6">
      <p className="text-2xl font-bold pt-4 mb-6 text-[#252C34]">Emotional Characteristics</p>

      <div>
        {/* <p className="text-gray-600 font-Poppins text-base font-normal leading-5 pt-4">
        The Internal Struggle Formula focuses on the conflicts that rage within a character's psyche, serving as a powerful narrative engine that drives both character development and thematic depth. This formula underscores the silent battles that characters face against their own doubts, fears, and desires, which often reflect the larger moral and ethical questions of the story.

        </p>
        <p className="text-gray-600 font-Poppins text-base font-normal leading-5 pt-4">
        By leveraging the Internal Struggle Formula, writers craft a rich internal world that becomes just as compelling as the external plot. The audience is drawn into the intimate challenges the characters confront, creating a resonant experience that mirrors the internal struggles of the viewers themselves.


        </p>
        <p className="text-gray-600 font-Poppins text-base font-normal leading-5 pt-4">
        Writers who harness this formula give life to characters who are complex and relatable, whose journeys of self-discovery and internal confrontation captivate the audience. These internal battles are a crucible for change, forcing characters to evolve and often leading to pivotal moments in the narrative.


        </p> */}
        {/* <p className="text-gray-600 font-Poppins text-base font-normal leading-5 pt-4">
        Using this formula, writers can create a powerful theme statement that serves as a thesis for their story. This statement encapsulates the essence of the narrative struggle and the overarching lesson or message intended to be conveyed to the audience.
        </p> */}
        <form className="flex flex-col gap-4">
          {/* <div>
            <label htmlFor={"Your_Moral_Premise"}>
              <p className="text-light-black font-Poppins text-base font-bold leading-5 mb-1 py-3">Your Moral Premise</p>
            </label>
            <textarea
            placeholder="In the near future, a jaded police officer tracks down a band of rogue androids who seek a longer life"
              id={"Your_Moral_Premise"}
              value={state["Your Moral Premise"]}
              onChange={(e) => handleOnClick("Your Moral Premise", e.target.value)}
              className={`h-40 w-full rounded-lg border border-solid ${errors["Your Moral Premise"] ? "border-red-500" : "border-gray-300"} bg-white shadow-inner p-2`}
            ></textarea>
            {errors["Your Moral Premise"] && <p className="text-red-500 text-sm">{errors["Your Moral Premise"]}</p>}
          </div> */}

          {/* {["Define your protagonist. What is their role?", "Use an adjective to define your protagonist"].map((name) => (
            <div key={name}>
              <label htmlFor={name}>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-light-black font-Poppins text-base font-bold leading-5 py-3">{name}</p>
                
                </div>
              </label>
              <input
                id={name}
                value={state[name]}
                onChange={(e) => handleOnClick(name, e.target.value)}
                className={`w-full rounded-lg border border-solid ${errors[name] ? "border-red-500" : "border-gray-300"} bg-white shadow-inner p-4`}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))} */}

          {[
            { question: "Strengths", key: "strengths" },
            { question: "Weaknesses", key: "weaknesses" },
            { question: "How does the character deal with conflict?", key: "dealingWithConflict" },
            { question: "How does the character deal with sadness?", key: "dealingWithSadness" },
            { question: "How does the character deal with change?", key: "dealingWithChange" },
            { question: "How does the character deal with loss?", key: "dealingWithLoss" },
            { question: "What does the character want out of life?", key: "lifeGoals" },
            { question: "What would the character like to change in his or her life?", key: "desiredChanges" },
            { question: "What makes this character happy?", key: "happinessSources" },
            { question: "Is the character judgmental of others?", key: "judgmental" },
            { question: "Is the character generous or stingy?", key: "generosity" },
            { question: "Is the character generally polite or rude?", key: "politeness" }
          ].map((item, index) => (
            <div key={index}>
              <label htmlFor={item.key}>
                {/* <div className="flex items-center gap-2 mb-1"> */}
                <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
                {item.question === "Value/Truth Learned" && (
                  <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">
                    (Specify the value or truth that is learned through battling the internal conflict. E.g.,
                    "Forgiveness, both of oneself and by others, is essential for true healing.")
                  </p>
                )}

                {/* </div> */}
              </label>
              <input
             disabled={sidebar}
                id={item.key}
                value={formData?.emotionalCharacteristics?.[item.key]}
                onChange={(e) => handleOnClick(item.key, e.target.value)}
                className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner ${errors[item.key] ? "border-red-500" : "border-gray-300"} bg-white shadow-inner p-4`}
              />
              {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
            </div>
          ))}
        </form>

        {/* <div className="btn px-14 py-2  rounded-lg  mt-5 w-32 bg-[#E8E2D8] cursor-pointer" onClick={handleSave}>
          <p className="text-white font-inter text-base font-medium text-xs uppercase">Save</p>
        </div> */}
      </div>
    </div>
  );
};

export default EmotionalCharacteristics;
