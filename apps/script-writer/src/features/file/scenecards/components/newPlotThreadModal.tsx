import React, { useState } from "react";
import { useParams } from "react-router";
import Select from "react-select";
import { createPlotThread } from "../api/scene-cards-api";
const colors = ["gray", "red", "green", "blue", "purple", "pink"];

const NewPlotThreadModal = ({ onClose, onSave, charactersList = [] }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const [autoDetect, setAutoDetect] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const {fileId,sceneId}=useParams()
//   const [newThread, setNewThread] = useState({
//         characters: [],
//         descriptions: [],
//         fileId,
//         connectedScenes: [],
//         status: "draft",
//         title: "",
//         color: "green",
//         sceneId
//     });

    const handleSubmit =async () => {
        const payload = {
            title,
            descriptions:[description],
            characters: selectedCharacters.map((c) => c.value),
            color:selectedColor,
            connectedScenes: [],
            fileId,
            sceneId,
            status: "draft",
        };
        const response = await createPlotThread(payload)
    };

    // Convert charactersList to react-select format
    const characterOptions = charactersList.map((char) => ({
        value: char._id,
        label: char.allTemplate?.characterBuilder?.basicInfo?.name || "Unnamed",
    }));

    return (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-3xl p-8 w-[800px] shadow-xl font-poppins">
                <h2 className="text-[#212131] text-[24px] font-bold text-center mb-8">Add NewStory Line</h2>

            
                <div className="mb-8">
                    <label className="block text-[16px] font-semibold mb-1 text-[#252C34]"> Story Line Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-[#CCCCCC] rounded-[16px] focus:outline-none"
                    />
                </div>

                {/* Characters Dropdown */}
                <div className="mb-8">
                    <label className="block text-[24px] font-semibold text-[#252C34] mb-6">Define storyline by characters</label>
                    <label className="block text-[16px] font-semibold text-[#252C34] mb-4">Stroyline characters:</label>
                    <Select
                        options={characterOptions}
                        isMulti
                        value={selectedCharacters}
                        onChange={setSelectedCharacters}
                        className="react-select-container w-full rounded-[16px] focus:outline-none"
                        classNamePrefix="react-select"
                    />
                    
                </div>

                {/* Description */}
                <div className="mb-8">
                    <label className="block text-[16px] font-semibold text-[#252C34] mb-4"> Story Line Description</label>
                    <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-[#CCCCCC] rounded-[16px] resize-none focus:outline-none"
                    ></textarea>
                </div>

                {/* Color Picker */}
                <div className="mb-6">
                    <p className="block text-[16px] font-semibold mb-4 text-[#252C34]">Select a Color for thisStory Line</p>
                    <div className="flex gap-3 mb-3">
                        {colors.map((color) => (
                            <div
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-12 h-12 rounded-full bg-${color}-500 border-2 ${selectedColor === color ? "border-black" : "border-transparent"
                                    } shadow-md cursor-pointer transition`}
                            ></div>
                        ))}
                    </div>
                    <p className="text-[14px] text-[#9999A0] font-normal font-poppins">
                        The color can represent the tone or importance of theStory Line
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-10">
                    <button
                        onClick={onClose}
                        className="px-[60px] py-[18px] rounded-[16px] border border-[#9999A0] text-[16px] text-[#9999A0] font-medium font-poppins"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-[60px] py-[18px] rounded-[16px] text-[16px] text-white bg-[#653EFF] font-medium font-poppins"
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPlotThreadModal;
