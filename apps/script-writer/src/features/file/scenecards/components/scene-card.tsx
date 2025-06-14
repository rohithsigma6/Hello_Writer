import { useNavigate, useParams } from "react-router-dom";

import expandicon from '@/assets/expand-icon.svg';

const getTitleBarColor = (sceneType, timeOfDay, timingLabel = "BASE") => {
  if (!sceneType || !timeOfDay) return "#4B5563"; // default gray-700

  const colorMap = {
    "INT.": {
      DAY: { BASE: "#ADD9F6", CONTINUOUS: "#8CBCE0", "MOMENTS LATER": "#C7E4F9" },
      SUNRISE: { BASE: "#C4DFF5", CONTINUOUS: "#A9C8E7", "MOMENTS LATER": "#D9EDFB" },
      MORNING: { BASE: "#91CFF2", CONTINUOUS: "#78B8DB", "MOMENTS LATER": "#ABE2FA" },
      AFTERNOON: { BASE: "#7DC2EB", CONTINUOUS: "#62A6C9", "MOMENTS LATER": "#9FD8F5" },
      "MAGIC HOUR": { BASE: "#D6B4D8", CONTINUOUS: "#B48EB7", "MOMENTS LATER": "#EDD0E9" },
      SUNDOWN: { BASE: "#6D9AC4", CONTINUOUS: "#4F7CA3", "MOMENTS LATER": "#89B2DE" },
      EVENING: { BASE: "#A0C0DE", CONTINUOUS: "#7CA3C5", "MOMENTS LATER": "#BCD7EC" },
      NIGHT: { BASE: "#5B7A9E", CONTINUOUS: "#496688", "MOMENTS LATER": "#7390B2" },
    },
    "EXT.": {
      DAY: { BASE: "#F5E8A3", CONTINUOUS: "#E5D47C", "MOMENTS LATER": "#FBF2C2" },
      SUNRISE: { BASE: "#FAEDB2", CONTINUOUS: "#E1D7A4", "MOMENTS LATER": "#FDF0C5" },
      MORNING: { BASE: "#FFE37D", CONTINUOUS: "#FAD54D", "MOMENTS LATER": "#FFF7AD" },
      AFTERNOON: { BASE: "#FFD86F", CONTINUOUS: "#F5C03D", "MOMENTS LATER": "#FFEAA5" },
      "MAGIC HOUR": { BASE: "#FFA45C", CONTINUOUS: "#E48446", "MOMENTS LATER": "#FFD3A0" },
      SUNDOWN: { BASE: "#FFBC69", CONTINUOUS: "#DA9A41", "MOMENTS LATER": "#FFDCA1" },
      EVENING: { BASE: "#767577", CONTINUOUS: "#5F5E60", "MOMENTS LATER": "#929193" },
      NIGHT: { BASE: "#4E4E50", CONTINUOUS: "#3C3C3E", "MOMENTS LATER": "#656567" },
    },
    "I/E.": {
      DAY: { BASE: "#B3B1E7", CONTINUOUS: "#9A97D2", "MOMENTS LATER": "#CFCDF0" },
      SUNRISE: { BASE: "#C8B9E3", CONTINUOUS: "#AFA5CD", "MOMENTS LATER": "#E3D6F1" },
      MORNING: { BASE: "#AFA9EB", CONTINUOUS: "#9683D0", "MOMENTS LATER": "#C8B8F6" },
      AFTERNOON: { BASE: "#A59EDE", CONTINUOUS: "#8E85C7", "MOMENTS LATER": "#C4BBF1" },
      "MAGIC HOUR": { BASE: "#E2A1C0", CONTINUOUS: "#C882A5", "MOMENTS LATER": "#F2BDD6" },
      SUNDOWN: { BASE: "#A28AB7", CONTINUOUS: "#876A96", "MOMENTS LATER": "#C8A5D7" },
      EVENING: { BASE: "#777695", CONTINUOUS: "#615F7C", "MOMENTS LATER": "#918FA9" },
      NIGHT: { BASE: "#5F5B76", CONTINUOUS: "#4C495F", "MOMENTS LATER": "#787593" },
    },
    "E/I.": {
      DAY: { BASE: "#F2B8A6", CONTINUOUS: "#E79D8D", "MOMENTS LATER": "#F8D3C8" },
      SUNRISE: { BASE: "#F5C4B6", CONTINUOUS: "#E7AA9E", "MOMENTS LATER": "#FBD3CD" },
      MORNING: { BASE: "#F8A98F", CONTINUOUS: "#E08476", "MOMENTS LATER": "#FABEAE" },
      AFTERNOON: { BASE: "#F58B6E", CONTINUOUS: "#DC7354", "MOMENTS LATER": "#FAB89A" },
      "MAGIC HOUR": { BASE: "#F79A86", CONTINUOUS: "#D87762", "MOMENTS LATER": "#FAB3A1" },
      SUNDOWN: { BASE: "#E98577", CONTINUOUS: "#C86454", "MOMENTS LATER": "#F5A68B" },
      EVENING: { BASE: "#C3DFB9", CONTINUOUS: "#A0C9A0", "MOMENTS LATER": "#D4ECD1" },
      NIGHT: { BASE: "#95B39E", CONTINUOUS: "#7C9987", "MOMENTS LATER": "#AAC7B4" },
    },
  };

  const typeMap = colorMap[sceneType];
  const timeMap = typeMap?.[timeOfDay];

  // Try BASE, fallback to CONTINUOUS
  return timeMap?.[timingLabel] || timeMap?.BASE || "#4B5563";
};

const SceneCard = ({ scene, index }) => {
  const navigate = useNavigate();
  const { fileId } = useParams();

  const sceneType = scene?.sceneEssentials?.type?.toUpperCase();
  const timeOfDay = scene?.sceneEssentials?.timeOfDay?.toUpperCase();
  const titleBarColor = getTitleBarColor(sceneType, timeOfDay); // Defaults to BASE


  return (
    <div
      className="w-[260px] h-[192px] rounded-[8px] cursor-pointer flex flex-col shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]"
      onClick={() => navigate(`/file/${fileId}/scenecards/template/scenes/${scene?._id}`)}
    >
      {/* Fixed Title Bar */}
      {/* <div className={`w-full text-white py-3 px-3 text-sm font-semibold flex items-center gap-2 ${titleBarColor}`}> */}
      <div style={{ backgroundColor: titleBarColor }} className={`w-full font-poppins text-white py-1 px-2 text-[10px] font-medium flex items-center bg-[#38228C] rounded-t-[8px]`}>
        <p className="text-center text-[10px] ps-[3px]"

          title={scene?.sceneEssentials?.type.toUpperCase() + scene?.sceneEssentials?.location.toUpperCase() + scene?.sceneEssentials?.timeOfDay.toUpperCase()}>
          <span className="pe-1">{index + 1}.</span>
          {`${(scene?.sceneEssentials?.type.toUpperCase() + scene?.sceneEssentials?.location.toUpperCase() + " - " + scene?.sceneEssentials?.timeOfDay.toUpperCase())?.slice(0, 20)}${(scene?.sceneEssentials?.type.toUpperCase() + scene?.sceneEssentials?.location.toUpperCase() + " - " + scene?.sceneEssentials?.timeOfDay.toUpperCase())?.length > 20 ? '...' : ''}`}
        </p>

        <img src={expandicon} alt="" className="w-4 h-4 ms-auto" />

      </div>

      {/* Card Content */}
      <div className="flex-1 px-[8px] pt-[4px] pb-[8px] bg-white w-full flex flex-col justify-between rounded-b-[8px] font-poppins h-full">
        <div>
          <h1 className="text-[8px] text-[#212131] font-semibold mb-[1px]">
            {scene?.sceneEssentials?.title}
          </h1>
          <p className="text-[8px] text-[#212131] font-medium ">
            {scene?.sceneEssentials?.brief}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SceneCard;
