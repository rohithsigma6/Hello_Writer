import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import footericon1 from '../../../../assets/preWritingTools/footer-icon-1.svg'
import footericon2 from '../../../../assets/preWritingTools/footer-icon-2.svg'
import footericon3 from '../../../../assets/preWritingTools/footer-icon-3.svg'
import footericon4 from '../../../../assets/preWritingTools/footer-icon-4.svg'
// import TemplateWrapper from './TemplateWraper';
import TemplateWrapper from './TemplateWrapper';
// import { useAddTemplate } from "../hooks/ai-cowriter-hooks/useAiCowriter";
import genicon from "../../../../assets/preWritingTools/genrate-icon.svg";
import { toast } from "react-toastify";
// import SceneEnvironmentDropdown from './EnviromentDropDown';
// import SceneEnvironmentDropdown from "components/ScriptBreakdownComponents/Dropdowns/EnviromentDropDown";
// import SceneSetDropdown from "components/ScriptBreakdownComponents/Dropdowns/SceneSetDropdown";
// import { EnvironmentOptions, SceneEnvironmentOptions } from "./script-breakdown.constants";
// import { useFilmingLocation, useSet } from "hooks/react-query-hooks/ScriptBreakdown";
export default function SceneCardTemplates() {
  const type = "scene-cards"
  const { fileId } = useParams();
  //   const addTemplate = useAddTemplate();
  const [active, setActive] = useState(0)
  const [showFields, setShowFields] = useState<boolean>();
  // const [selectedEnv, setSelectedEnv] = useState(EnvironmentOptions[0]);  const [selectedTime, setSelectedTime] = useState(SceneEnvironmentOptions[0]); 
  //   const { data: allSets, refetch: refetchSets } = useSet(fileId!);
  const [selectedSet, setSelectedSet] = useState(null);
  const [showCreateSet, setShowCreateSet] = useState(false);
  const [logLine, setLogLine] = useState("");
  const [id, setId] = useState();
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const handleWriteFreely = (value: any) => {
    if (!logLine.trim()) {
      // setError("Logline cannot be empty");
      return;
    } else {

      //   addTemplate(
      //     {
      //       payload: {
      //         fileId: fileId,
      //         name: type,
      //         template: type,
      //         slug: `${type}`,
      //         status: value,
      //         writeFreely: true,
      //         variables: {
      //           logLine: logLine,
      //         },
      //       },
      //       id: id,
      //       isEditing: isEditing,
      //     },
      //     {
      //       onSuccess: () => {
      //         console.log("Template saved successfully");
      //         toast.success(`Template ${isEditing ? "updated" : "saved"} successfully`);
      //         // refetch();
      //         // onFinalizeComplete();
      //       },
      //       onError: (error) => {
      //         console.error("Error saving template:", error);
      //         // onFinalizeComplete();
      //       },
      //     }
      //   );
    }

    setError(""); // Clear error if validation passes

    console.log("value>>>>>>", value);
  };

  return (
    <div className="bg-white rounded-[24px] px-[32px] pt-[40px] pb-[40px] font-poppins h-[100px] w-[100%] ">

      <section>
        <p className="text-[#252C34] text-[40px] font-bold mb-[16px]">
        Develop your Scene Cards
        </p>
        {/* <p className="mt-1 font-light">A logline is the heart of your screenplay, distilled into a single, powerful sentence. It's your story's elevator pitch, capturing the essence of your narrative and hooking your audience in seconds.</p> */}
      </section>

      <div className="flex flex-row rounded-xl items-center py-2 px-2 bg-[#E9E9EA] w-max">
        <button
          onClick={() => setActive(0)}
          className={
            `${active == 0 ? "bg-white text-primary-blue" : "bg-gray text-[#252C34]"}` +
            " py-[8px] px-[12px]  font-medium text-[16px] rounded-lg min-w-[177px]"
          }
        >
          Choose a Template
        </button>
        <button
          onClick={() => setActive(1)}
          className={
            `${active == 1 ? "bg-white text-primary-blue" : "bg-gray text-[#252C34]"}` +
            " py-[8px] px-[12px]  font-medium text-[16px] rounded-lg min-w-[177px]"
          }
        >
          Freeform
        </button>
      </div>
      {/* <p className="mt-1 font-light">Please select a template to help speed up your process.</p> */}

      <section className="flex flex-col gap-y-3 overflow-y-scroll ">
        {active === 1 ? (
          <section className="">
            <p className="text-[#212131] font-semibold text-[18px] mb-0 mt-[40px]">
              Write Your Own Scene Card
            </p>
            <p className="mt-[16px] font-normal text-[#9999A0] text-[16px]">
              Create a high-level overview of your screenplay’s structure. Focus on key plot points, character arcs, and thematic elements. Aim for a series of 60-100 concise scene descriptions that capture the essence of your story’s progression from beginning to end.

            </p>

            <section className="mt-[32px]">
              <button
                onClick={() => setShowFields(!showFields)}
                className="px-[95px] py-[19px] text-black rounded-[16px] bg-primary-blue text-[16px] font-medium"
              >
                Start Writing
              </button>
            </section>
            {showFields && (
              <>

                <div className=" pb-2 flex gap-3">


                  {/* Script day + point in time */}

                </div>



                <label htmlFor="textField" className="font-semibold block mt-[40px] mb-[16px]">
                  Scene Outline

                </label>
                <textarea
                  name="textField"
                  rows={8}
                  value={logLine}
                  onChange={(e) => setLogLine(e.target.value)}
                  className="p-[16px] rounded-[16px] border border-[#BABABF] w-full"
                  placeholder=
                  "Write your outline here..."

                ></textarea>

                <div className="flex flex-row items-stretch gap-x-3 bg-[#0E0E15] px-6 py-[12px] justify-center rounded-lg fixed bottom-0 w-full left-0">
                  <button className="px-4 bg-[#212131] rounded-2xl text-white">
                    <img src={footericon1} alt="" className="h-[26px] w-[26px]" />
                  </button>
                  <button className="px-4 bg-[#212131] rounded-2xl text-white">
                    <img src={footericon2} alt="" className="h-[20px] w-[20px]" />
                  </button>
                  <button className="px-4 bg-[#212131] rounded-2xl text-white">
                    <img src={footericon3} alt="" className="h-[26px] w-[26px]" />
                  </button>
                  <button className="px-4 bg-[#212131] rounded-2xl text-white">
                    <img src={footericon4} alt="" className="h-[32px] w-[32px]" />
                  </button>

                  <button
                    className="generateGrdient px-[18px] py-[16px] rounded-2xl text-white font-medium flex flex-row items-center text-[16px] animation-btn"

                  >
                    <img src={genicon} alt="" className="h-[24px] w-[24px] pr-1" />
                    Generate
                  </button>
                  <button
                    className="px-[18px] py-[16px] rounded-2xl bg-[#653EFF] font-medium text-white text-[16px]"
                    onClick={() => {
                      handleWriteFreely("finalize");

                    }}
                  >
                    Finalize
                  </button>
                  <button
                    className="px-[18px] py-[16px] rounded-2xl bg-[#4D4D5A] font-medium text-white text-[16px]"
                    onClick={() => {
                      handleWriteFreely("draft");

                    }}
                  >
                    Save Draft
                  </button>
                  <button className="px-[18px] py-[16px] rounded-2xl bg-[#4D4D5A] font-medium text-white text-[16px]">
                    Collaboration
                  </button>
                  <button className="px-[18px] py-[16px] rounded-2xl bg-[#4D4D5A] font-medium text-white text-[16px]">
                    ...
                  </button>
                </div>

              </>
            )}
          </section>
        ) : (
          <section className="flex flex-col mt-[20px] ">
            <p className=" text-[#9999A0] text-[20px]">
              Please select a template to help speed up your process.
            </p>

            <TemplateWrapper />
          </section>
        )}
      </section>
    </div>
  );
}
