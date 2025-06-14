import React, { useState, useEffect } from "react";
import { getCharactersByFileForPlot } from "../../scenecards/api/scene-cards-api";
import { useNavigate, useParams } from "react-router";
import AddNewPlotModal from "./addNewPlotModal"; // Import the modal component
import { getAllPlotThreadsByFileId } from "../api/get-all-templates";
import NewPlotThreadModal from "../../scenecards/components/newPlotThreadModal";
import Select from "react-select";
import { createPlotThread } from "../../scenecards/api/scene-cards-api";

const colors = ["gray", "red", "green", "blue", "purple", "pink"];
const SideBarPlot = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [autoDetect, setAutoDetect] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [isPlot, setIsPlot] = useState(false)
  // const {fileId,sceneId}=useParams()

  const [characters, setCharacters] = useState([]);
  const [charactersOpen, setCharactersOpen] = useState(true);
  const [plotsOpen, setPlotsOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // Modal state
  const [extractedType, setExtractedType] = useState<string | null>(null);
  const [plotThreads, setPlotThreads] = useState([])
  const { fileId, sceneId } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const path = window.location.pathname; // Get full URL path
    const parts = path.split('/'); // Split into segments // Split into segments
    const plotIndex = parts.indexOf("plot");
    const sceneCardsIndex = parts.indexOf("scenecards")

    const type = parts.includes("storybeats")
      ? "storybeats"
      : (sceneCardsIndex !== -1 && parts[sceneCardsIndex + 1] === "template" && parts.length > sceneCardsIndex + 2)
        ? "scenecards"
        : parts.includes("scenecards/template")
          ? "scenecards/template"
          : (plotIndex !== -1 && parts[plotIndex + 1] === "template" && parts.length > plotIndex + 2)
            ? "plot"
            : parts.includes("plot/template")
              ? "plot/template"
              : parts.includes("characters")
                ? (parts.includes("relationship") ? "relationship" : "characters")
                : null;


    setExtractedType(type);
  }, [window.location.pathname]);

  useEffect(() => {
    const fetchPlotThreads = async () => {
      const response = await getAllPlotThreadsByFileId(fileId);
      console.log(response)
      setPlotThreads(response?.plotThreads)
      console.log("SETStory LineS IS ", plotThreads)
    }
    fetchPlotThreads()

  }, [])

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await getCharactersByFileForPlot(fileId);
      setCharacters(response.finalized);
    };
    fetchCharacters();
  }, [fileId]);

  const handleSubmit = async () => {
    const payload = {
      title,
      descriptions: [description],
      characters: selectedCharacters.map((c) => c.value),
      color: selectedColor,
      connectedScenes: [],
      fileId,
      sceneId,
      status: "draft",
    };
    const response = await createPlotThread(payload)
  };

  // Convert charactersList to react-select format
  const characterOptions = characters.map((char) => ({
    value: char._id,
    label: char.allTemplate?.characterBuilder?.basicInfo?.name || "Unnamed",
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-[300px]">
      {extractedType == "plot" &&
        <section>
          <div
            className="flex  items-center bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
            onClick={() => setPlotsOpen(!plotsOpen)}
          >
            <span className="px-2 pr-4a text-black">{plotsOpen ? "▼" : "▶"}</span>
            <h1 className="text-md font-semibold">Storylines</h1>

          </div>
          {plotsOpen && (
            <div className="mt-2">
              {plotThreads.map((thread, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded-md mt-2">
                  {thread.title}
                </div>
              ))}

              <button
                className="w-full border-dashed border-2 border-gray-400 px-4 py-2 mt-2 text-gray-600 rounded-lg"
                onClick={() => setIsPlot(true)}
              >
                +
              </button>
            </div>
          )}
        </section>
      }
      {/* Characters Section */}
      <section className="mt-4">
        <div
          className="flex  items-center bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
          onClick={() => setCharactersOpen(!charactersOpen)}
        >
          <span className="px-2 pr-4">{charactersOpen ? "▼" : "▶"}</span>
          <h1 className="text-md font-semibold">Characters</h1>

        </div>
        {charactersOpen && (
          <div className="mt-2">
            {characters.map(character => (
              <div
                key={character._id}
                className="flex flex-row items-center bg-slate-100 gap-4 border mt-2 ml-2 px-2 py-2 rounded-lg"
                onClick={() => {

                  navigate(`/file/${fileId}/scenecards/template/scenes/${sceneId}?characterId=${character._id}`)



                }}

              >
                <img
                  className="w-[30px] h-[30px] border rounded-full object-cover"
                  src={character?.allTemplate?.characterBuilder?.basicInfo?.photo
                    ? character?.allTemplate?.characterBuilder?.basicInfo?.photo
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDDfkqyGu92585p1QSepPS54lp8a5aODY3Pw&s"
                  }
                  alt={character?.allTemplate?.characterBuilder?.basicInfo?.name}
                />
                <p>{character?.allTemplate?.characterBuilder?.basicInfo?.name}</p>
              </div>
            ))}
            <button
              className="w-full border-dashed border-2 border-gray-400 px-4 py-2 mt-2 text-gray-600 rounded-lg"
              onClick={() => { navigate(`/file/${fileId}/characters`) }}
            >
              +
            </button>
          </div>
        )}
      </section>
      {isPlot && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white rounded-3xl p-8 w-[480px] shadow-xl">
            <h2 className="text-xl font-semibold text-center mb-4">Add NewStory Line</h2>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1"> Story Line Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Characters Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Define storyline by characters</label>
              <Select
                options={characterOptions}
                isMulti
                value={selectedCharacters}
                onChange={setSelectedCharacters}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1"> Story Line Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            {/* Color Picker */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-1">Select a Color for thisStory Line</p>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full bg-${color}-500 border-2 ${selectedColor === color ? 'border-black' : 'border-white'
                      } shadow-md cursor-pointer transition`}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                The color can represent the tone or importance of theStory Line
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setIsPlot(false)} // ✅ Fixed: use arrow function
                className="px-6 py-2 rounded-xl border border-gray-300 text-sm text-gray-700"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <NewPlotThreadModal isOpen={showPopup} onClose={() => setShowPopup(false)} charactersList={characters} /> */}
    </div>
  );
};

export default SideBarPlot;
