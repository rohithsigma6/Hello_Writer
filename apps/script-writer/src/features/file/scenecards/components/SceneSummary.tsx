import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import SceneEnvironmentDropdown from "./EnviromentDropDown";
import { EnvironmentOptions, SceneEnvironmentOptions } from "./script-breakdown.constants";
import { FaUpload } from "react-icons/fa";
import NewPlotThreadModal from "./newPlotThreadModal";
import { FiUploadCloud } from 'react-icons/fi';
import footericon1 from '../../../../assets/preWritingTools/footer-icon-1.svg'
import footericon2 from '../../../../assets/preWritingTools/footer-icon-2.svg'
import footericon3 from '../../../../assets/preWritingTools/footer-icon-3.svg'
import footericon4 from '../../../../assets/preWritingTools/footer-icon-4.svg'
import genicon from "../../../../assets/preWritingTools/genrate-icon.svg"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import leftArrow from '../../../../assets/preWritingTools/left-arrow.svg'
import rightArrow from '../../../../assets/preWritingTools/right-arrow.svg'
import threedots from '../../../../assets/preWritingTools/three-dots.svg'
import resizer from '../../../../assets/preWritingTools/resizer.svg'
import recall from '../../../../assets/preWritingTools/recall.svg'
import upload from '../../../../assets/preWritingTools/upload.svg'
import character1 from '../../../../assets/preWritingTools/character-1.svg'
import character2 from '../../../../assets/preWritingTools/character-2.svg'
import colorPalette from '../../../../assets/preWritingTools/color-palette.svg'
import downArrow from '../../../../assets/preWritingTools/down-arrow.svg'
import plus from '../../../../assets/preWritingTools/plus.svg'
import { getAllSceneCards, createOrUpdateSceneCard, createPlotThread } from "../api/scene-cards-api";
import FinalizeConfirmationModal from "./FinalizeConfirmationModal";
import { getCharactersByFile } from "../../characters/api/get-all-character";
import { useCharactersByFile } from "../../characters/api/save-draft";
import { getCharactersByFileForPlot, deletePlotThread, updatePlotThread, getAllPlotThreadsByFileId } from "../api/scene-cards-api";
import { dataTagSymbol } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";

const SceneSummary = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [allSceneCards, setAllSceneCards] = useState([]);
    const { fileId, sceneId } = useParams();

    // console.log("data is ", data);
    // const [plotThreads, setPlotThreads] = useState([]);
    const [sceneIndex, setSceneIndex] = useState(0);
    const [scene, setScene] = useState({});
    const [confirmationPopup, setConfirmationPopup] = useState(false);
    const [editedScene, setEditedScene] = useState({});
    const navigate = useNavigate();

    const [showInput, setShowInput] = useState(false);
    const [characters, setCharacters] = useState([])
    const [newDescription, setNewDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [charactersPopup, setCharactersPopup] = useState(false);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const [newThread, setNewThread] = useState({
        characters: [],
        descriptions: [],
        fileId,
        connectedScenes: [],
        status: "draft",
        title: "",
        color: "green",
        sceneId
    });

    const [selectedCharacters, setSelectedCharacters] = useState([])
    const [menuOpen, setMenuOpen] = useState(null);
    const [selectedColor, setSelectedColor] = useState({});
    const [extraDescriptions, setExtraDescriptions] = useState({});
    const [inputVisible, setInputVisible] = useState({}); // Track visibility per thread
    const [showNewThreadInput, setShowNewThreadInput] = useState(false);
    const [descriptionIndex, setDescriptionIndex] = useState<{ [key: string]: number }>({});
    const [newDescriptions, setNewDescriptions] = useState({});
    const [plotThreads, setPlotThreads] = useState([])
    const colors = [
        "bg-gray-300",
        "bg-red-300",
        "bg-green-300",
        "bg-orange-300",
        "bg-blue-300",
        "bg-purple-300",
        "bg-yellow-300",
    ];

    const [openPopup, setOpenPopup] = useState(null); // Track which popup is open

    // Toggle popup for the specific thread
    const handleTogglePopup = (threadId: any) => {
        setOpenPopup((prev) => (prev === threadId ? null : threadId));
    };

    // Close popup when clicking outside
    const handleClickOutside = (event: any) => {
        if (!event.target.closest(".popup-container")) {
            setOpenPopup(null);
        }
    };

    // Listen for clicks outside
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [])
    useEffect(() => {
        const fetchCharacters = async () => {
            const data = await getCharactersByFileForPlot(fileId)
            console.log("data is ", dataTagSymbol)
            if (data) {
                setCharacters(data?.finalized);
            }
            console.log("characters", characters)
        }
        fetchCharacters();
    }, [])


    useEffect(() => {
        const fetchAllSceneCards = async () => {
            try {
                const response = await getAllSceneCards({ fileId });
                console.log("Response is pop", response);

                if (response) {
                    const filteredScenes = response.filter(scene => scene.sceneEssentials.brief && scene.sceneEssentials.brief.trim() !== "");
                    setAllSceneCards(filteredScenes);

                    const defaultIndex = filteredScenes.findIndex((scene: any) => scene._id === sceneId);
                    const currentScene = filteredScenes[defaultIndex !== -1 ? defaultIndex : 0];

                    setScene(currentScene);
                    setSceneIndex(defaultIndex !== -1 ? defaultIndex : 0);
                    setEditedScene(currentScene);
                    setSelectedCharacters(currentScene?.characters || []);

                    console.log("selected", currentScene);
                    console.log("selected characters are", currentScene?.characters);
                }
            } catch (error) {
                console.error("Error fetching scenes:", error);
            }
        };

        fetchAllSceneCards();
    }, [fileId, sceneId]);

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
        console.log("SELECTED", selectedCharacters)
    }, [selectedCharacters])

    useEffect(() => {
        setEditedScene(scene);
        console.log("Edited", editedScene);
    }, [scene]);



    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;


        if (
            selectedFile &&
            selectedFile !== null &&
            selectedFile.type.startsWith('image/')
        ) {
            //   fileStore.updateCharacterFormData({
            //     ...characterFormData,
            //     characterBuilder: {
            //       ...characterFormData.characterBuilder,
            //       basicInfo: {
            //         ...characterFormData.characterBuilder?.basicInfo,
            //         photo: URL.createObjectURL(selectedFile),
            //       },
            //     },
            //   });
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewURL(event.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
        if (selectedFile && !selectedFile.type.startsWith('image/')) {
            setPreviewURL(null);
        }
    };


    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0] || null;
        if (droppedFile) {
            if (droppedFile.type.startsWith('image/')) {
                setFile(droppedFile);
                const reader = new FileReader();
                reader.onload = (event) => {
                    setPreviewURL(event.target?.result as string);
                };
                reader.readAsDataURL(droppedFile);
            } else {
                setPreviewURL(null);
            }
        }
    };

    const handleChangeThreadColor = async (threadId, newColor) => {
        setEditedScene(prev => ({
            ...prev,
            plotThreadId: prev?.plotThreadId.map((thread: any) =>
                thread._id === threadId ? { ...thread, color: newColor } : thread
            )
        }));
        const response = await updatePlotThread(threadId, { color: newColor })
    };


    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;

        setEditedScene(prev => ({
            ...prev,
            sceneEssentials: {
                ...prev?.sceneEssentials,  // Preserve existing fields
                [name]: value             // Update only the changed field
            }
        }));
    };

    const handleDeletePlotThread = async (plotThreadId: any) => {
        const response = await deletePlotThread(plotThreadId);
        if (response) {
            setPlotThreads(editedScene?.plotThreadId?.filter(id => id !== plotThreadId));
        }

    }

    const handleNextDescription = (threadId: string, descriptions: string[]) => {
        setDescriptionIndex(prev => ({
            ...prev,
            [threadId]: ((prev[threadId] || 0) + 1) % descriptions.length
        }));
    };

    const handlePrevDescription = (threadId: string, descriptions: string[]) => {
        setDescriptionIndex(prev => ({
            ...prev,
            [threadId]: (prev[threadId] || 0) === 0
                ? descriptions.length - 1
                : (prev[threadId] || 0) - 1
        }));
    };


    const handleAddDescription = async (threadId, index) => {
        console.log("index is ", sceneIndex)
        const description = newDescriptions[threadId];
        if (!description?.trim()) return;

        try {

            const thread = plotThreads.find(t => t._id === threadId);
            const updatedDescriptions = [...(thread.descriptions || []), `${sceneIndex + 1 + " "} . ${" " + description}`];

            await updatePlotThread(threadId, { descriptions: updatedDescriptions });

            setEditedScene(prev => ({
                ...prev,
                plotThreadId: prev.plotThreadId.map(t =>
                    t._id === threadId ? { ...t, descriptions: updatedDescriptions } : t
                )
            }));

            setNewDescriptions(prev => ({ ...prev, [threadId]: "" }));
            setInputVisible(prev => ({ ...prev, [threadId]: false }));
        } catch (err) {
            console.error("Error updating thread:", err);
        }
    };




    const handleCharacterClick = (character: any) => {
        setEditedScene((prev) => {
            const isAlreadySelected = prev.characters?.some(
                (char: any) => char._id === character._id
            );

            const updatedCharacters = isAlreadySelected
                ? prev.characters.filter((char: any) => char._id !== character._id) // remove
                : [...(prev.characters || []), character]; // add

            return {
                ...prev,
                characters: updatedCharacters,
            };
        });
    };


    const handleSaveNewThread = async () => {
        try {
            const response = await createPlotThread(newThread);
            console.log(response)
            setPlotThreads([...editedScene?.plotThreadId, Date.now()]);
        } catch (error) {
            console.error("Error addingStory Line:", error);
        }
        setShowNewThreadInput(false);
    };



    const handleAddPlotThread = async (newThread: any) => {
        try {

            console.log("handled plpt thread")
            const response = await createPlotThread(newThread);
            console.log(response)
            setPlotThreads([...editedScene?.plotThreadId, Date.now()]); // Update UI with new thread
        } catch (error) {
            console.error("Error addingStory Line:", error);
        }
    };
    useEffect(() => {
        console.log("Characters updated:", characters);
    }, [characters]);

    useEffect(() => {
        setSelectedCharacters(editedScene?.characters || []);
    }, [editedScene?.characters]);

    const goToScene = (newIndex) => {
        if (newIndex >= 0 && newIndex < allSceneCards.length) {
            const newScene = allSceneCards[newIndex];
            setScene(newScene);
            setSceneIndex(newIndex);
            navigate(`/file/${fileId}/scenecards/template/scenes/${newScene._id}`);
        }
    };

    const handleFinalize = async () => {
        const response = await createOrUpdateSceneCard(editedScene)
        console.log(response)
        setConfirmationPopup(false);
    };

    return (
        <div className="flex flex-row px-6 pt-4">


            <div className="w-[100%] h-[700px] pl-6 pr-10 py-6 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black outline-opacity-10 inline-flex flex-col justify-start items-start gap-6 overflow-y-scroll">
                <div className="self-stretch inline-flex justify-between items-center">
                    <div className="w-44 flex justify-start items-end gap-1.5">
                        <div className="w-20 justify-start text-gray-800 text-2xl font-bold font-['Poppins'] leading-7">Scenes</div>
                        <div className="flex justify-start items-center gap-3">
                            <img
                                src={leftArrow}
                                onClick={() => goToScene(sceneIndex - 1)}
                                style={{ opacity: sceneIndex === 0 ? 0.5 : 1, cursor: sceneIndex === 0 ? "not-allowed" : "pointer" }}
                            />
                            <img
                                src={rightArrow}
                                onClick={() => goToScene(sceneIndex + 1)}
                                style={{ opacity: sceneIndex === allSceneCards.length - 1 ? 0.5 : 1, cursor: sceneIndex === allSceneCards.length - 1 ? "not-allowed" : "pointer" }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-4">
                        <img src={threedots} />
                        <img src={resizer} />
                    </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch inline-flex justify-between items-center">
                        <div className="flex justify-start items-center gap-3">
                            <div className="h-14 px-3 py-5 bg-indigo-900 rounded-2xl outline outline-1 outline-offset-[-1px] outline-black outline-opacity-10 inline-flex flex-col justify-center items-start gap-2.5">
                                <div className="w-20 pr-1 inline-flex justify-start items-center gap-3">
                                    {/* <div className="w-12 justify-start text-white text-xl font-normal font-['Courier_Prime'] leading-tight">{scene?.type}</div> */}
                                    <select
                                        className=" bg-indigo-900 text-white text-xl font-normal font-['Courier_Prime'] leading-tight"
                                        name="type"
                                        value={editedScene?.sceneEssentials?.type || " "}
                                        onChange={handleSelectChange}
                                    >
                                        {EnvironmentOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {/* <img src={downArrow} /> */}
                                </div>
                            </div>
                            <div className="px-3 py-5 bg-indigo-900 rounded-2xl outline outline-1 outline-offset-[-1px] outline-black outline-opacity-10 inline-flex flex-col justify-start items-start gap-2.5">
                                <div className="w-56 pr-1 inline-flex justify-between items-center">
                                    <input
                                        className="flex-1 justify-start text-gray-400 text-xl font-normal font-['Poppins'] leading-tight bg-transparent outline-none"
                                        value={editedScene?.sceneEssentials?.location.toUpperCase() || ""}
                                        onChange={(e) => {
                                            const { value } = e.target;
                                            setEditedScene(prev => ({
                                                ...prev,
                                                sceneEssentials: {
                                                    ...prev.sceneEssentials, // Ensure existing data is retained
                                                    location: value          // Update only 'location'
                                                }
                                            }));
                                        }}

                                    />

                                </div>
                            </div>
                            <div className="h-14 px-3 py-5 bg-indigo-900 rounded-2xl outline outline-1 outline-offset-[-1px] outline-black outline-opacity-10 inline-flex flex-col justify-center items-start gap-2.5">
                                <div className="self-stretch pr-1 inline-flex justify-start items-center gap-3">
                                    <select
                                        className="bg-indigo-900 text-white text-xl font-normal font-['Courier_Prime'] leading-tight"
                                        name="timeOfDay"
                                        value={editedScene?.sceneEssentials?.timeOfDay || ""}
                                        onChange={handleSelectChange}
                                    >
                                        {SceneEnvironmentOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <img src={recall} />
                    </div>
                    <div className="w-[100%]  inline-flex justify-start items-start gap-3">
                        <div className="flex flex-row w-[40%] h-[30%] items-start ">
                            <div className="w-full">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={onFileChange}
                                />
                                <div className="flex gap-4">
                                    {previewURL && (
                                        <div
                                            className="relative group border-2 border-dashed border-[#E9E9EA] rounded-2xl w-[100%] min-h-[123px] flex justify-center items-center flex-col overflow-hidden cursor-pointer"
                                            onClick={triggerFileSelect}
                                            onDragOver={onDragOver}
                                            onDrop={onDrop}
                                        >
                                            {previewURL && (
                                                <img
                                                    src={previewURL}
                                                    alt={'image'}
                                                    className="object-cover w-full h-[300px]"
                                                />
                                            )}

                                            {/* Overlay on hover to change file */}
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex justify-center items-center transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                                                <span className="text-white font-semibold text-sm">
                                                    Change File
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {!previewURL &&
                                        <div
                                            className="border-2 border-dashed border-[#E9E9EA] flex-1 px-4 rounded-2xl min-h-[250px] flex justify-center items-center flex-col cursor-pointer "
                                            onClick={triggerFileSelect}
                                            onDragOver={onDragOver}
                                            onDrop={onDrop}
                                        >
                                            <div
                                                // onClick={handleIconClick}
                                                className="p-[10px] bg-[#F7F6F2] rounded-full cursor-pointer h-10 w-10 d-flex justify-center items-center"
                                            >
                                                <FiUploadCloud className="text-[20px] text-[#675F47]" />
                                            </div>

                                            <h1 className="text-sm text-[#252C34]">
                                                <span className="text-[#653EFF] font-bold">
                                                    Click to upload{' '}
                                                </span>
                                                or drag and drop
                                            </h1>
                                            <p className="mt-1 text-[#857E66] text-xs">
                                                {'PNG or JPEG file (Max 4MB)'}
                                            </p>
                                        </div>
                                    }
                                </div>

                                <div></div>
                            </div>
                        </div>
                        <div className="flex-1 self-stretch p-6 relative rounded-2xl outline outline-1 outline-offset-[-1px] outline-black outline-opacity-10 inline-flex flex-col justify-start items-start gap-2.5">
                            {/* Editable Title */}
                            <div
                                className="w-96 justify-start text-black text-opacity-20 text-base font-semibold font-['Poppins'] leading-tight"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newTitle = e.target.innerText.trim();
                                    setEditedScene(prev => ({
                                        ...prev,
                                        sceneEssentials: {
                                            ...prev.sceneEssentials,
                                            title: newTitle
                                        }
                                    }));
                                }}
                            >
                                {editedScene?.sceneEssentials?.title}
                            </div>

                            {/* Editable Brief */}
                            <div
                                className="self-stretch justify-start text-black text-opacity-20 text-base font-normal font-['Poppins'] leading-tight"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newBrief = e.target.innerText.trim();
                                    setEditedScene(prev => ({
                                        ...prev,
                                        sceneEssentials: {
                                            ...prev.sceneEssentials,
                                            brief: newBrief
                                        }
                                    }));
                                }}
                            >
                                {editedScene?.sceneEssentials?.brief}
                            </div>

                        </div>

                    </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch inline-flex justify-between items-start">

                        <div className="flex flex-row items-center space-x-2">

                            {selectedCharacters?.length > 0 ? (
                                selectedCharacters.map((char, index) => (
                                    <img
                                        key={index}
                                        src={char.allTemplate?.characterBuilder.basicInfo.photo}
                                        alt={char.allTemplate?.characterBuilder.basicInfo.name}
                                        className="w-7 h-7 rounded-full border"
                                        title={char.allTemplate.characterBuilder.basicInfo.name}
                                    />
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No characters selected</p>
                            )}



                            <img
                                className="w-7 h-7 relative rounded-[100px] cursor-pointer"
                                src={plus}
                                onClick={() => setCharactersPopup(true)}
                            />
                            <h1>Add Characters</h1>
                        </div>

                        {/* Right Side: Color Palette Icon */}
                        <img src={colorPalette} />
                    </div>



                    <div className="self-stretch flex flex-col justify-start items-start gap-3 overflow-y-scroll">
                        {plotThreads?.map((thread, index) => {
                            const isInputVisible = inputVisible[thread._id] || false;
                            console.log(thread)
                            return (
                                <div
                                    key={thread._id}
                                    className={`relative self-stretch px-3 bg-${thread.color}-200
              rounded-2xl outline outline-1 outline-offset-[-1px] outline-black outline-opacity-10 inline-flex justify-start items-center gap-1`}
                                >
                                    <div className="flex justify-start items-center gap-2">
                                        <img
                                            src={leftArrow}
                                            alt="left arrow"
                                            onClick={() => handlePrevDescription(thread._id, thread.descriptions)}
                                            className="cursor-pointer"
                                        />
                                        <img
                                            src={rightArrow}
                                            alt="right arrow"
                                            onClick={() => handleNextDescription(thread._id, thread.descriptions)}
                                            className="cursor-pointer"
                                        />
                                    </div>

                                    <div className="flex-1 px-2 py-3 inline-flex flex-col justify-center items-start gap-2.5">
                                        <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                                            <div className="self-stretch justify-start text-zinc-500 text-sm font-semibold">
                                                {thread.title}
                                            </div>
                                            <div className="self-stretch justify-start text-black text-opacity-80 text-sm">
                                             { !isInputVisible ?  thread.descriptions[descriptionIndex[thread._id] || 0]:""} 
                                            </div>

                                            {/* Show Extra Description */}
                                            {extraDescriptions[thread._id] && (
                                                <div className="text-black text-opacity-60 text-sm">
                                                    {extraDescriptions[thread._id]}
                                                </div>
                                            )}

                                            {/* Input Field - Only Visible for Clicked Thread */}
                                            {isInputVisible && (
                                                <div className="w-full space-y-2 mt-2">
                                                    {thread.descriptions.map((thread, index) => (
                                                        <div key={index} className="flex items-center gap-2">
                                                            <p className="text-gray-800">{thread}</p>
                                                            {/* <p className="text-gray-800">{index}</p> */}
                                                        </div>
                                                    ))} 
                                                    <div className="flex items-center gap-2">
                                                        <h1>{sceneIndex + 1}.</h1>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter a descriptions"
                                                            value={newDescriptions[thread._id] || ""}
                                                            onChange={(e) => setNewDescriptions(prev => ({
                                                                ...prev,
                                                                [thread._id]: e.target.value
                                                            }))}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                        />

                                                        <button
                                                            onClick={() => handleAddDescription(thread._id, index)}
                                                            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>


                                    <button
                                        className="text-xl text-gray-600 cursor-pointer"
                                        onClick={() => setInputVisible(prev => ({
                                            ...prev,
                                            [thread._id]: !prev[thread._id]
                                        }))}
                                    >
                                        ➕
                                    </button>

                                    {/* Three Dots Button */}
                                    <button onClick={(e) => { e.stopPropagation(); handleTogglePopup(thread._id); }}>
                                        <img src={threedots} alt="options" className="cursor-pointer" />
                                    </button>
                                    {openPopup === thread._id && (
                                        <div className="absolute right-0 top-10 bg-white shadow-md rounded-md p-3 popup-container z-[9999]">
                                            <p className="text-sm font-semibold">Change Color</p>
                                            <div className="flex gap-2 py-2">
                                                {["gray", "red", "green", "blue", "purple", "yellow"].map((color) => (
                                                    <div
                                                        key={color}
                                                        className={`w-5 h-5 rounded-full bg-${color}-500 cursor-pointer`}
                                                        onClick={() => handleChangeThreadColor(thread._id, color)}
                                                    ></div>
                                                ))}
                                            </div>
                                            <button
                                                className="text-red-500 text-sm mt-2"
                                                onClick={() => handleDeletePlotThread(thread._id)}
                                            >
                                                DeleteStory Line
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {showNewThreadInput && (
                            <NewPlotThreadModal
                                onClose={() => setShowNewThreadInput(false)}
                                onSave={(data) => {
                                    console.log("Saved Thread Data:", data);
                                    setShowNewThreadInput(false);
                                }}
                                charactersList={characters}
                            />

                        )}


                        {!showNewThreadInput && (
                            <div
                                className="self-stretch h-14 px-2 py-1.5 rounded-2xl bg-blue-600 hover:bg-blue-700 inline-flex justify-between items-center cursor-pointer transition"
                                onClick={() => setShowNewThreadInput(true)}
                            >
                                <div className="w-full flex justify-center items-center gap-1">
                                    <img src={plus} alt="plus icon" />
                                    <div className="text-white text-sm font-semibold">AddStory Line</div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className="w-2 h-[552px] bg-zinc-100 rounded-2xl" />
                <div className="w-2 h-16 bg-black bg-opacity-20 rounded-2xl" />
            </div>
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
                {/* jhgjgh */}
                <button
                    className="generateGrdient px-[18px] py-[16px] rounded-2xl text-white font-medium flex flex-row items-center text-[16px] animation-btn"
                >
                    <img src={genicon} alt="" className="h-[24px] w-[24px] pr-1" />
                    Generate
                </button>
                <button
                    className="px-[18px] py-[16px] rounded-2xl bg-[#653EFF] font-medium text-white text-[16px]"
                    onClick={() => {


                        setConfirmationPopup(true);

                    }}
                >
                    Finalize
                </button>
                <button
                    className="px-[18px] py-[16px] rounded-2xl bg-[#4D4D5A] font-medium text-white text-[16px]"
                    onClick={() => {


                        setConfirmationPopup(true);

                    }}
                >
                    Save Draft
                </button>
                <button className="px-[18px] py-[16px] rounded-2xl bg-[#4D4D5A] font-medium text-white text-[16px]">Collaboration</button>
                <button className="px-[18px] py-[16px] rounded-2xl bg-[#4D4D5A] font-medium text-white text-[16px]">...</button>
            </div>
            {confirmationPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <p className="text-lg font-semibold text-gray-900">
                            Are you sure you want to finalize this summary?
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            This action will mark it as your official summary for this scene card in the project.
                        </p>

                        <div className="flex justify-end mt-4 gap-2">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={() => setConfirmationPopup(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={handleFinalize}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {charactersPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <p className="text-lg font-semibold text-gray-900 mb-4">
                            Select characters for thisStory Line
                        </p>
                        <div className="space-y-2">
                            {characters.map((character) => {
                                const isSelected = editedScene?.characters?.some(
                                    (char: any) => char._id === character._id
                                );

                                return (
                                    <div
                                        key={character._id}
                                        className={`flex items-center space-x-3 p-2 border rounded-md cursor-pointer
                ${isSelected ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'}`}
                                        onClick={() => handleCharacterClick(character)}
                                    >
                                        <img
                                            src={character.allTemplate?.characterBuilder.basicInfo.photo}
                                            className="w-8 h-8 border rounded-full"
                                            alt={character.allTemplate?.characterBuilder.basicInfo.name}
                                        />
                                        <span className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                                            {character.allTemplate?.characterBuilder.basicInfo.name}
                                        </span>
                                        {isSelected && <span className="ml-auto text-green-600">✔</span>}
                                    </div>
                                );
                            })}

                        </div>

                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
                            onClick={() => setCharactersPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default SceneSummary;