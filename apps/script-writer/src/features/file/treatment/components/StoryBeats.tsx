import { useState, useRef, useEffect } from "react";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { ChevronDown, Save, FileText, Undo, Redo } from "lucide-react";
import { MdOutlineFormatBold, MdOutlineFormatItalic, MdOutlineFormatUnderlined } from "react-icons/md";
import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from "react-icons/ai";
import { storyBeatsData } from "./Story";
import { useStory } from "./StoryContext";
import { useParams } from "react-router";
import { getTreatmentByFile } from "../api/treatment-api";
import { savePlotTemplate } from "../../plot/api/get-all-templates";
import ExpandWithAI from "@/assets/magic-wand-icon.svg";

export default function StoryBeat() {
  const [isStoryBeatOpen, setIsStoryBeatOpen] = useState(true);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [zoom, setZoom] = useState(1); // Default zoom level (1 = 100%)
  const treatmentRef = useRef(null);
  const [storyBeats, setStoryBeats] = useState([]);
  const { selectedStory, setSelectedStory } = useStory();
  const [finalTemplate, setFinalTemplate] = useState({})
  const { fileId } = useParams()
  const [description, setDescription] = useState(selectedStory?.description || "");
  useEffect(() => {
    const fetchData = async () => {

      const treatment = await getTreatmentByFile(fileId);
      const finalizedTemplate = treatment.find((template: any) => template.status === "finalized");
      console.log("finalized template is", finalizedTemplate)
      setFinalTemplate(finalizedTemplate)
      if (finalizedTemplate) {
        const colors = ["story-beats-blue", "story-beats-yellow", "story-beats-purple", "story-beats-red", "story-beats-blue-2", "story-beats-gray", "story-beats-indigo"];

        const getRandomColor = (index: number) => colors[index % colors.length];

        const formattedStoryBeats = finalizedTemplate.templateData[0].template.flatMap((act: any) =>
          act.predefinedBeat.map((beat: any, index: number) => ({
            id: index + 1,
            title: beat.title,
            description: beat?.description || "",
            actTitle: act.title,
            beatId: beat._id, // if needed
            beatIndex: index,
            color: getRandomColor(index),
            placeHolder: beat.placeHolder
            // _id:beat._id
          }))
        );

        console.log(formattedStoryBeats)
        setStoryBeats(formattedStoryBeats);
      }

    }
    fetchData();

  }, []);

  useEffect(() => {
    setDescription(selectedStory?.description || "");
  }, [selectedStory]);
  
  useEffect(() => {
    if (treatmentRef.current) {
      treatmentRef.current.innerHTML = storyBeatsData.map(beat => `${beat.description}`).join("<br/><br/>");
      updateWordCount();
    }
  }, [selectedStory?.description]);

  const updateWordCount = () => {
    const text = treatmentRef.current?.innerText.trim() || "";
    const words = text.length > 0 ? text.split(/\s+/).length : 0;
    setWordCount(words);
  };

  const handleDescriptionChange = async () => {
    const newDescription = description;
  
    if (!selectedStory?.id) return;
  
    const updatedTemplate = JSON.parse(JSON.stringify(finalTemplate));
  
    for (const templateItem of updatedTemplate.templateData) {
      for (const act of templateItem.template) {
        for (const beat of act.predefinedBeat) {
          if (beat._id === selectedStory.beatId) {
            beat.description = newDescription;
            break;
          }
        }
      }
    }
  
    const response = await savePlotTemplate({ fileId: fileId, ...updatedTemplate });
    console.log("Saved:", response);
  
    setFinalTemplate(updatedTemplate);
  
    setSelectedStory((prev: any) => ({
      ...prev,
      description: newDescription,
    }));
  };
  


  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history.pop();
      setRedoStack([...redoStack, treatmentRef.current.innerHTML]);
      treatmentRef.current.innerHTML = lastState;
      setHistory([...history]);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      setHistory([...history, treatmentRef.current.innerHTML]);
      treatmentRef.current.innerHTML = nextState;
      setRedoStack([...redoStack]);
    }
  };

  const handleSave = () => {
    localStorage.setItem("treatmentText", treatmentRef.current.innerHTML);
    alert("Saved successfully!");
  };

  const handleZoom = (factor) => {
    setZoom(factor / 100);
  };

  const handleFormat = (tag) => {
    document.execCommand(tag, false, null);
  };

  return (
    <div className="p-6 h-full w-full flex flex-col bg-gray-100">

      {/* Story Beat Section */}
      <div className="bg-white shadow-lg rounded-[24px] py-[32px] px-[24px] w-[100%] overflow-y-auto font-poppins">
        <div className="p-6 border border-[#0000002a] rounded-[16px]">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#252C34]">Story Beat</h1>

            <button onClick={() => setIsStoryBeatOpen(!isStoryBeatOpen)} className="border border-[#0000002b] w-10 h-10 flex justify-center items-center rounded-[99px] text-[#8E897C]">
              <ChevronDown className={`transition-transform ${isStoryBeatOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {isStoryBeatOpen && (
            <>
              <h3 className="my-4 text-[#6A6A75] text-[18px] font-semibold">{selectedStory?.id}. {selectedStory?.title}</h3>
              <div className="border rounded-[12px]">
                <div className="flex gap-[10px] items-center py-[7px] px-[10px] bg-[#e9e9ea59] text-[#6A6A75]">

                  <button className="w-9 h-9 flex justify-center items-center" onClick={() => handleFormat("bold")}><MdOutlineFormatBold className="cursor-pointer h-6 w-6" /></button>
                  <button className="w-9 h-9 flex justify-center items-center" onClick={() => handleFormat("italic")}><MdOutlineFormatItalic className="cursor-pointer h-6 w-6" /></button>
                  <button className="w-9 h-9 flex justify-center items-center" onClick={() => handleFormat("underline")}><MdOutlineFormatUnderlined className="cursor-pointer h-6 w-6" /></button>
                  <p className="text-[#00000010]">|</p>
                  <button className="w-9 h-9 flex justify-center items-center" onClick={() => handleFormat("justifyLeft")}><AiOutlineAlignLeft className="cursor-pointer h-6 w-6" /></button>
                  <button className="w-9 h-9 flex justify-center items-center" onClick={() => handleFormat("justifyCenter")}><AiOutlineAlignCenter className="cursor-pointer h-6 w-6" /></button>
                  <button className="w-9 h-9 flex justify-center items-center" onClick={() => handleFormat("justifyRight")}><AiOutlineAlignRight className="cursor-pointer h-6 w-6" /></button>
                </div>
                <div className="m-3">
                  <div>
                    {selectedStory && (
                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={handleDescriptionChange}
                    className="w-full bg-white focus:outline-none h-auto min-h-40 border p-3 resize-none"
                    placeholder={selectedStory.placeHolder}
                  />                  

                    )}
                  </div>
                </div>

              </div>
              <button className="mt-4 bg-[#653EFF] text-[16px] font-medium text-white py-[19px] px-8 rounded-[16px] hover:bg-white hover:text-black border border-gray-300">
                ⚡ Expand with AI
              </button>
            </>
          )}
        </div>

        <div className="p-6 border border-[#0000002a] rounded-[16px] mt-6">
          <h1 className="text-2xl font-bold text-[#252C34] mb-3">Treatment</h1>

          {/* Toolbar */}
          <div className="flex gap-6 flex-row items-center mb-8 mt-4">
            {/* Undo, Redo, Save */}
            <div className="flex gap-3 items-center">
              <button onClick={handleUndo}><Undo className="cursor-pointer" /></button>
              <button onClick={handleRedo}><Redo className="cursor-pointer" /></button>
              <p>|</p>
              <button onClick={handleSave}><FileText className="cursor-pointer" /></button>
              <button onClick={handleSave}><Save className="cursor-pointer" /></button>
            </div>

            {/* Formatting */}
            <div className="flex gap-3 items-center">
              <p>|</p>
              <button onClick={() => handleFormat("bold")}><MdOutlineFormatBold className="cursor-pointer" /></button>
              <button onClick={() => handleFormat("italic")}><MdOutlineFormatItalic className="cursor-pointer" /></button>
              <button onClick={() => handleFormat("underline")}><MdOutlineFormatUnderlined className="cursor-pointer" /></button>
              <p>|</p>
              <button onClick={() => handleFormat("justifyLeft")}><AiOutlineAlignLeft className="cursor-pointer" /></button>
              <button onClick={() => handleFormat("justifyCenter")}><AiOutlineAlignCenter className="cursor-pointer" /></button>
              <button onClick={() => handleFormat("justifyRight")}><AiOutlineAlignRight className="cursor-pointer" /></button>
            </div>

            {/* Zoom */}
            <p>|</p>
            <div className="flex gap-3 items-center">
              <button onClick={() => handleZoom(zoom * 100 + 10)}><FiZoomIn className="cursor-pointer" /></button>
              <button onClick={() => handleZoom(zoom * 100 - 10)}><FiZoomOut className="cursor-pointer" /></button>
              <span>{Math.round(zoom * 100)}%</span>
            </div>

            {/* Word Count */}
            <p>|</p>
            <div className="flex items-center gap-2">
              <p>Word count: {wordCount}</p>
              <p>| Page count: 1</p>
            </div>
            <p>|</p>

            {/* Auto Save Info */}
            <div className="flex items-center gap-2">
              <p>Auto Saved Today</p>
              <p>2.11 A.M</p>
            </div>

            <p>|</p>
            <div className="flex items-center gap-2">
              <p>Save</p>
              <p>Drafts</p>
            </div>
          </div>


          <div className="w-full p-4 bg-white rounded-[16px] border border-[#000000] focus:outline-none min-h-[180px] overflow-y-auto">
            {storyBeats.map((beat) => (
              <div key={beat._id}
                onClick={() => setSelectedStory(beat)}>
                <span className="font-normal"> {beat.description}</span>

              </div>
            ))}
          </div>
        </div>
      </div>




    </div >
  );
}
