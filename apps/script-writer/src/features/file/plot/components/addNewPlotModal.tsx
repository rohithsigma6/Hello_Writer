import React, { useState, useEffect } from "react";
import { getAllSceneCards } from "../../scenecards/api/scene-cards-api";
import { useParams } from "react-router";

const AddNewPlotModal = ({ isOpen, onClose, charactersList }: any) => {
    const [storylineTitle, setStorylineTitle] = useState("");
    const [selectedCharacters, setSelectedCharacters] = useState<any[]>([]);
    const [storylineDescription, setStorylineDescription] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedScenes, setSelectedScenes] = useState<any[]>([]);
    const [sceneList, setSceneList] = useState<any[]>([]);
    const { fileId } = useParams()
    useEffect(() => {
        const fetchAllSceneList = async () => {
            const response = await getAllSceneCards({ fileId: fileId })
            setSceneList(response)
        }
        fetchAllSceneList()
    }, [])
    // const scenesList = [
    //     "Scene 1: Morning in the Gated Community",
    //     "Scene 2: Conflict in the Office",
    //     "Scene 3: Midnight Chase",
    // ];

    // Toggle character selection
    const toggleCharacterSelection = (character: any) => {
        setSelectedCharacters((prev) =>
            prev.includes(character)
                ? prev.filter((c) => c !== character)
                : [...prev, character]
        );
    };

    // Toggle scene selection
    const toggleSceneSelection = (scene: any) => {
        setSelectedScenes((prev) =>
            prev.includes(scene) ? prev.filter((s) => s !== scene) : [...prev, scene]
        );
    };

    const handleGenerate = () => {
        const newPlot = {
            title: storylineTitle,
            characters: selectedCharacters,
            descriptions: storylineDescription,
            color: selectedColor,
            scenes: selectedScenes,
        };
        console.log("Generated Plot:", newPlot);
        onClose();
    };

    if (!isOpen) return null; // Hide modal when not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-[800px] p-8 bg-white rounded-3xl shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-gray-600 text-2xl"
                    onClick={onClose}
                >
                    ✖
                </button>
                <div className="justify-start text-gray-800 text-2xl font-bold font-['Poppins'] leading-7">Add New Story Line</div>

                {/* Storyline Title */}
                <div className="mt-6">
                    <label className="text-gray-800 text-base font-semibold">Storyline Title</label>
                    <input
                        type="text"
                        value={storylineTitle}
                        onChange={(e) => setStorylineTitle(e.target.value)}
                        className="w-full h-14 px-4 py-3 bg-white rounded-2xl border border-stone-300 shadow-sm mt-2"
                        placeholder="Enter Storyline Title"
                    />
                </div>

                {/* Characters Selection */}
                <div className="mt-6">
                    <label className="text-gray-800 text-base font-semibold">Storyline Characters</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedCharacters.map((char) => (
                            <div
                                key={char._id}
                                className="px-3 py-1 bg-neutral-300 rounded-2xl flex items-center gap-1"
                            >
                                <span className="text-white text-sm font-medium">{char.allTemplate.characterBuilder.basicInfo.name}</span>
                                <button
                                    onClick={() => toggleCharacterSelection(char)}
                                    className="text-white text-sm font-bold"
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                    <select
                        className="mt-2 p-2 border border-gray-400 rounded-xl w-full"
                        onChange={(e) =>
                            toggleCharacterSelection(
                                charactersList.find((char: any) => char.allTemplate.characterBuilder.basicInfo.name === e.target.value)
                            )
                        }
                    >
                        <option value="">Select Characters</option>
                        {charactersList.map((char: any) => (
                            <option key={char._id} value={char.allTemplate.characterBuilder.basicInfo.name}>
                                {char.allTemplate.characterBuilder.basicInfo.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Storyline Description */}
                <div className="mt-6">
                    <label className="text-gray-800 text-base font-semibold">Storyline Description</label>
                    <textarea
                        value={storylineDescription}
                        onChange={(e) => setStorylineDescription(e.target.value)}
                        className="w-full h-24 px-4 py-2 rounded-2xl border border-gray-400 mt-2"
                        placeholder="Enter Description"
                    />
                </div>

                {/* Color Selection */}
                <div className="mt-6">
                    <label className="text-gray-800 text-base font-semibold">Select a Color for thisStory Line</label>
                    <div className="flex gap-3 mt-2">
                        {["gray", "violet", "green", "rose"].map((color) => (
                            <div
                                key={color}
                                className={`w-12 h-12 rounded-full bg-${color}-300 cursor-pointer ${selectedColor === color ? "outline outline-2 outline-black" : ""
                                    }`}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>
                </div>

                {/* Scene Selection */}
                <div className="mt-6">
                    <label className="text-gray-800 text-base font-semibold">Select Scenes</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedScenes.map((scene) => (
                            <div
                                key={scene}
                                className="px-3 py-1 bg-blue-300 rounded-2xl flex items-center gap-1"
                            >
                                <span className="text-white text-sm font-medium">{scene}</span>
                                <button
                                    onClick={() => toggleSceneSelection(scene)}
                                    className="text-white text-sm font-bold"
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                    <select
                        className="mt-2 p-2 border border-gray-400 rounded-xl w-full"
                        onChange={(e) => toggleSceneSelection(e.target.value)}
                    >
                        <option value="">Select Scenes</option>
                        {sceneList.map((scene) => (
                            <option key={scene._id} value={scene.sceneEssentials.title}>
                                {scene.sceneEssentials.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        className="w-32 h-12 px-4 py-2 rounded-2xl border border-neutral-400"
                        onClick={onClose}
                    >
                        Save Draft
                    </button>
                    <button
                        className="w-32 h-12 px-4 py-2 bg-violet-600 rounded-2xl text-white"
                        onClick={handleGenerate}
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewPlotModal;
