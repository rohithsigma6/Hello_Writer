import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllTemplates } from "../../plot/api/get-all-templates";

const SceneTimeline = ({ scene }: any) => {
  const { fileId } = useParams()
  const navigate = useNavigate();
  const [templates, setAllTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllTemplates()
      const templates = response.data
      console.log("getAllTemplates", templates);
      setAllTemplates(templates);
      setSelectedTemplate(templates[0])
    }
  }, []);
  return (
    <div
      className={`min-w-[300px] w-[300px]`}
      onClick={() => {
        // navigate(scene?._id);
      }}
    >
      <div className="bg-[#F6E3C6] text-xs font-medium py-1 px-4 rounded-lg">Opening Image</div>
      <div className="rounded-t-lg w-full bg-[#38228C] text-white py-1 px-2 text-[10px] font-medium flex justify-between items-center">
        <p className="line-clamp-1 ">{scene?.sceneEssentials?.sceneTitle}</p>
      </div>
      <div className="px-2 pt-1 pb-2 w-full bg-white rounded-b-lg">
        <img src="" className="w-full bg-gray-100 min-h-[100px] rounded my-1.5 mb-2.5" />
        <h1 className="py-3 text-xs text-[#212131] font-semibold mb-[2px] border-y border-[#E9E9EA] line-clamp-1 h-[50px]">
          {scene?.sceneEssentials?.title}
        </h1>
        <p className="py-3 text-xs text-[#212131] line-clamp-3 border-b border-[#E9E9EA] h-[50px]">{scene?.sceneEssentials?.brief}</p>
        <textarea className="py-3 text-xs text-[#212131] min-h-[100px] w-[300px] pl-[10px]">{scene?.sceneEssentials?.sceneStructure}</textarea>
      </div>
    </div>
  );
};

export default SceneTimeline;
