import React, { useContext, useEffect, useState } from "react";
import footericon1 from '../../../../assets/preWritingTools/footer-icon-1.svg'
import footericon2 from '../../../../assets/preWritingTools/footer-icon-2.svg'
import footericon3 from '../../../../assets/preWritingTools/footer-icon-3.svg'
import footericon4 from '../../../../assets/preWritingTools/footer-icon-4.svg'
import genicon from "../../../../assets/preWritingTools/genrate-icon.svg"
import FinalizeConfirmationModal from "./FinalizeConfirmationModal";
import Scene from './Scene'
import SceneStudio from "./SceneStudio";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import TemplateModal from "./TemplateModal";
import { toast } from "react-toastify";
import SceneSummary from "./SceneSummary";
import SceneStudioSceneCard from "./SceneStudioScenCards";
import CharacterGraph from "./characterGraph";
import EmotionGraph from "./emotionGraph";
import summayblackicon from "@/assets/summary-black-icon.svg"
import summaygrayicon from "@/assets/summary-gray.svg"
// import backArrow from '../../../assets/scriptBreakdown/backArrow.svg'
import scenenotesblack from "@/assets/scenenotes-black.svg"
import scenenotesgray from "@/assets/scenenotes-gray.svg"

import Scenesicongray from "@/assets/Scenes-icon-gray.svg"
import Scenesiconblack from "@/assets/Scenes-icon-black.svg"

import Characterarcgray from "@/assets/Character Arc -gray.svg"
import Characterarcblack from "@/assets/Character Arc -black.svg"
import backArrow from '@/assets/scriptBreakdown/backArrow.svg'
interface DataState {
  template: string;
}
const SelectedScene = ({ initialValues }: any) => {
  const type = "scene-cards"
  const navigate = useNavigate();
  const className = "Theme__Comparative";
  const [active, setActive] = useState(0);
  const [editorView, setEditorView] = useState();
  const [genrateLoader, setGenrateLoader] = useState(false);
  const [templatesPopup, setTemplatesPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [status, setStatus] = useState("draft");
  const [proceed, setProceed] = useState(false);
  const [id, setId] = useState();
  const { fileId, templatename } = useParams<{ fileId: string; type: string; templatename: string; id: any }>();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>

      <div className="w-full mt-[32px] ml-[40px] mr-[40px] overflow-hidden">
        <div className="absolute mt-2 mx-4 flex flex-row cursor-pointer" onClick={() => navigate(`/file/${fileId}/scenecards/template/scene-essentials`)}>
          <img src={backArrow} className="w-6 h-6 mx-2" />
          <span className="text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">
            Overview
          </span>
        </div>
        <section className="w-full flex flex-row items-center justify-center px-6">
          {/* <div className="relative w-full h-screen"> parent */}

          {/* </div> */}

          <div className="flex flex-row justify-center rounded-2xl items-center py-1 px-1 bg-[#BABABF] w-max">

            <button
              onClick={() => setActive(0)}
              className={
                `${active == 0 ? "bg-white text-[#212131]" : "bg-gray text-[#6A6A75]"}` +
                " py-2 px-4  font-medium text-sm rounded-xl flex flex-row items-center gap-1"
              }
            >
              {active == 0 ? <img src={summayblackicon} alt="summary" /> : <img src={summaygrayicon} alt="summary" />}
              Summary
            </button>
            <button
              onClick={() => setActive(1)}
              className={
                `${active == 1 ? "bg-white text-[#212131]" : "bg-gray text-[#6A6A75]"}` +
                " py-2 px-4  font-medium text-sm rounded-xl flex flex-row items-center gap-1"
              }
            >
              {active == 1 ? <img src={scenenotesblack} alt="summary" /> : <img src={scenenotesgray} alt="summary" />}
              Scene Notes
            </button>
            <button
              onClick={() => setActive(2)}
              className={
                `${active == 2 ? "bg-white text-[#212131]" : "bg-gray text-[#6A6A75]"}` +
                " py-2 px-4  font-medium text-sm rounded-xl flex flex-row items-center gap-1"
              }
            >
              {active == 2 ? <img src={Scenesiconblack} alt="summary" /> : <img src={Scenesicongray} alt="summary" />}
              Scenes
            </button>
            <button
              onClick={() => setActive(3)}
              className={
                `${active == 3 ? "bg-white text-[#212131]" : "bg-gray text-[#6A6A75]"}` +
                " py-2 px-4  font-medium text-sm rounded-xl flex flex-row items-center gap-1"
              }
            >
              {active == 3 ? <img src={Characterarcblack} alt="summary" /> : <img src={Characterarcgray} alt="summary" />}
              Character Arc
            </button>
            <button
              onClick={() => setActive(4)}
              className={
                `${active == 4 ? "bg-white text-[#212131]" : "bg-gray text-[#6A6A75]"}` +
                " py-2 px-4  font-medium text-sm rounded-xl flex flex-row items-center gap-1"
              }
            >
              {active == 4 ? <img src={Characterarcblack} alt="summary" /> : <img src={Characterarcgray} alt="summary" />}
              Emotion Graph
            </button>
          </div>
        </section>


        <section
          className={`
    ${active == 1 ? " w-full mt-[23px] overflow-hidden" : ""}`}
        >
          <div>
            {active === 0 ? (
              <>
                {genrateLoader ? (
                  <section className="flex flex-col gap-y-3 mt-4">loading..........</section>
                ) : (
                  <SceneSummary />
                )}
              </>
            ) : active === 1 ? (
              <SceneStudioSceneCard />
            ) : active === 2 ? (
              <Scene />
            ) : active === 3 ? (
              <CharacterGraph />
            ) :
              active === 4 ? (
                <EmotionGraph />
              ) : (
                <SceneSummary />
              )}
          </div>
        </section>


      </div>
      {confirmationPopup && (
        <FinalizeConfirmationModal
          templatesPopup={confirmationPopup}
          setTemplatesPopup={setConfirmationPopup}
          setProceed={setProceed}
          finalizeHeading={
            type === "scene-cards"
              ? status === "finalize"
                ? "Finalize Scene Card"
                : "Save as Draft"
              : type === "logline"
                ? status === "finalize"
                  ? "Finalize Logline"
                  : "Save Draft"
                : type === "theme"
                  ? status === "finalize"
                    ? "Finalize Theme"
                    : "Save Draft"
                  : ""
          }
          finalizeText={
            type === "scene-cards"
              ? "Are you sure you want to finalize this summary? This action will mark it as your official summary for this scene card in the project."
              : type === "logline"
                ? status === "finalize"
                  ? "Are you sure you want to finalize this logline? This action will mark it as your official logline for this project."
                  : "Are you sure you want to save this logline? This action will store your current Logline as a draft, allowing you to edit and refine it later."
                : type === "theme"
                  ? status === "finalize"
                    ? "Are you sure you want to finalize this theme? This action will mark it as your official theme for this project."
                    : "Are you sure you want to save this Theme? This action will store your current Theme as a draft, allowing you to edit and refine it later."
                  : ""
          }
        />
      )}
      {templatesPopup && <TemplateModal templatesPopup={templatesPopup} setTemplatesPopup={setTemplatesPopup} />}
    </>
  );
};

export default SelectedScene;
