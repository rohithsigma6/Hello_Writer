import React, { useContext, useState } from "react";
import { useParams } from "react-router";

const Thecharacteryourstory = ({ setFormData, formData ,sidebar=false}: any) => {
  const className = "Theme__Fundamental";
  const [active, setActive] = useState(1);
  const [editorView, setEditorView] = useState();
  const { fileId } = useParams();
//   useFile({ fileId: fileId });
//   const fileCtx = useContext(FileContext);
  const [state, setState] = React.useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const fields = [
    "character_role",
    "character_firstAppearance",
    "character_relationships",
    "character_relationshipDescription",
    "character_characterChange",
    "character_additionalNotes",
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
//   const characterFormData = fileSelectors.characterFormData(fileStore);
  function handleOnClick(key: string, value: string) {
    // setState((prevState: any) => ({
    //   ...prevState,
    //   [key]: value,
    // }));
    // setFormData((prevState: any) => ({
    //   ...prevState,
    //   [key]: value,
    // }));
    setFormData((prevState: any) => ({
      ...prevState,
      characterStory: {
        ...prevState.characterStory,
        [key]: value,
      },
    }));
    // fileStore.updateCharacterFormData({
    //   ...characterFormData,
    //   characterBuilder: {
    //     ...characterFormData.characterBuilder,
    //     characterStory: {
    //       ...characterFormData.characterBuilder?.characterStory,
    //       [key]: value,
    //     },
    //   },
    // });
    setErrors((prevErrors: any) => {
      const { [key]: removedError, ...restErrors } = prevErrors;
      return restErrors;
    });
  }
  const { templatename } = useParams<any>();


  return (
    <div className="rounded-tr-none rounded-br-lg rounded-bl-lg rounded-tl-lg  flex flex-col  font-Poppins px-6">
      <p className="text-2xl font-bold pt-4 mb-6 text-[#252C34]">The character and your story</p>

      <div>
        <form className="flex flex-col gap-4">
         

          {[
            { question: "What is this character’s role in the screenplay?", key: "roleInScreenPlay" },
            { question: "Describe the scene where this character first appears", key: "firstAppearanceScene" },
            {
              question: "Consider this character’s relationship with other characters.",
              key: "relationshipWithCharacters",
            },
            {
              question:
                "Write a line or two to describe their relationship with all the other key characters in your screenplay.",
              key: "relationshipWithAllCharacters",
            },
            { question: "How does this character change over the course of your screenplay?", key: "characterChange" },
            { question: "Any other notes on this character?", key: "additionalNotes" },
          ].map((item, index) => (
            <div key={index}>
              <label htmlFor={item.key}>
                {/* <div className="flex items-center gap-2 mb-1"> */}
                <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
                {item.key === "Value/Truth Learned" && (
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
                value={formData?.characterStory?.[item.key]}
                onChange={(e) => handleOnClick(item.key, e.target.value)}
                className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white ${errors[item.key] ? "border-red-500" : "border-gray-300"} bg-white shadow-inner p-4`}
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

export default Thecharacteryourstory;
