import React, { useEffect, useState } from 'react';
import location from '../../../../assets/preWritingTools/location.svg'
import slideshow from '../../../../assets/preWritingTools/slideshow.svg'
import filter from '../../../../assets/preWritingTools/filter.svg'
import dots from '../../../../assets/preWritingTools/threeDotsVertical.svg'
import undo from '../../../../assets/preWritingTools/undo.svg'
import redo from '../../../../assets/preWritingTools/redo.svg'
import expand from '../../../../assets/preWritingTools/expand.svg'
import upload from '../../../../assets/preWritingTools/upload.svg'
import downArrow from '../../../../assets/preWritingTools/down-arrow.svg'
import singleCharacter from '../../../../assets/preWritingTools/singleCharacter.svg'
import info from '../../../../assets/preWritingTools/info.svg'
import leftArrow from '../../../../assets/preWritingTools/left-arrow.svg'
import rightArrow from '../../../../assets/preWritingTools/right-arrow.svg'
import threeDots from '../../../../assets/preWritingTools/three-dots.svg'
import { useParams } from 'react-router';
import { getCharactersByFileForPlot, createPlotThread, getAllPlotThreadsByFileId } from '../api/scene-cards-api';


const CreateScenePopup = () => {
    const { fileId } = useParams()
    const [sceneHeading, setSceneHeading] = useState("")
    const [sceneImage, setSceneImage] = useState("")
    const [sceneImages, setSceneImages] = useState([])
    const [sceneTitle, setSceneTitle] = useState("")
    const [sceneBrief, setSceneBrief] = useState("")
    const [scene, setScene] = useState("")
    const [themeExploration, setThemeExploration] = useState([])
    const [characters, setCharacters] = useState([])
    const [sceneCharacters, setSceneCharacters] = useState([])
    const [toneValue, setToneValue] = useState(0)
    const [storyLine, setStoryLine] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [allPlotThreads, setAllPlotThreads] = useState([])
    const [emotions, setEmotions] = useState({
        action: 0,
        comedy: 0,
        conflict: 0,
        fantasy: 0,
        passion: 0,
        romance: 0,
        gore: 0,
        scare: 0,
        shock: 0,
        mystery: 0,
        tearjerk: 0,
        tension: 0,
        twist: 0
    });
    useEffect(() => {
        const fetchPlotThreadsByFileId = async () => {
            const response = await getAllPlotThreadsByFileId(fileId)
            console.log(" Story Lines are", response)
            setAllPlotThreads(response?.plotThreads)
        }
        fetchPlotThreadsByFileId()
    }, [])

    useEffect(() => {
        const getCharacters = async () => {
            const response = await getCharactersByFileForPlot(fileId)
            if (response) {
                setCharacters(response?.finalized)
            }
        }
        getCharacters()
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleDrag = (e) => {
        const slider = e.target.closest(".slider-container");
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        let newValue = ((e.clientX - rect.left) / rect.width) * 200 - 100;
        newValue = Math.max(-100, Math.min(100, newValue)); // Limit between -100 and 100

        setToneValue(Math.round(newValue));
    };


    const handleCharacterSelect = (character) => {
        setSceneCharacters((prev: any) =>
            prev.some((c) => c._id === character._id)
                ? prev.filter((c) => c._id !== character._id)
                : [...prev, character]
        );
    };

    const handleCheckboxChange = (theme: any) => {
        setThemeExploration((prev: any) =>
            prev.includes(theme) ? prev.filter((item) => item !== theme) : [...prev, theme]
        );
    };

    const handlePlotThreadCreation = async () => {
        const payload = {
            title: inputValue,
            descriptions: [],
            characters: [],
            color: "green",
            connectedScenes: [],
            fileId,
            status: "draft",
        };
        const response = await createPlotThread(payload)
        console.log(response)
    }

    return (

        <div className="w-[830px] p-6 bg-white rounded-3xl inline-flex flex-col justify-start items-start gap-6  fixed inset-0  flex items-center mx-auto z-10000 bg-black bg-opacity-100 overflow-y-scroll oerflow-x-hidden mt-[100px]">
            <div className="self-stretch py-5 inline-flex justify-between items-center">
                <div className="justify-start text-gray-800 text-2xl font-semibold font-['Poppins'] leading-7">Scenes</div>
                <div className="flex justify-start items-start gap-8">
                    <div className="w-6 h-6 relative overflow-hidden">

                        <img src={filter} />

                    </div>
                    <div className="w-6 h-6 relative overflow-hidden">
                        <img src={dots} />
                    </div>
                    <div className="w-6 h-6 relative overflow-hidden">
                        <img src={undo} />
                    </div>
                    <div className="w-6 h-6 relative overflow-hidden">
                        <img src={redo} />
                    </div>
                    <div className="w-6 h-6 relative overflow-hidden">
                        <img src={expand} />
                    </div>
                </div>
            </div>
            <div className="inline-flex justify-start items-start gap-6">
                <div className="flex justify-start items-center gap-2">
                    <div className="w-11 h-11 relative bg-violet-100 rounded-xl overflow-hidden">
                        <div className="w-6 h-6 left-[11px] top-[11px] absolute">
                            <img src={location} />
                        </div>
                    </div>
                    <div className="justify-center text-black text-sm font-medium font-['Poppins'] leading-tight">Add Story Beat</div>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <div className="w-11 h-11 relative bg-violet-100 rounded-xl overflow-hidden">
                        <div className="w-6 h-6 left-[11px] top-[11px] absolute">
                            <img src={slideshow} />
                        </div>
                    </div>
                    <div className="justify-center text-black text-sm font-medium font-['Poppins'] leading-tight">In slideshow</div>
                </div>

            </div>
            <div className="flex flex-col justify-start items-start gap-5">
                <div className="flex flex-col justify-start items-start gap-1">
                    <div className="inline-flex justify-start items-center gap-1">
                        <div className="justify-start text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">Scene Heading</div>
                    </div>
                    <div className="h-14 flex flex-col justify-start items-start gap-3">
                        <input className="w-[750px] flex-1 relative bg-white rounded-2xl shadow-[inset_0px_1px_1px_1px_rgba(0,0,0,0.08)] border border-stone-300" value={sceneHeading} onChange={(e) => setSceneHeading(e.target.value)} />
                    </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div className="w-72 flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch justify-start text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">Scene Image</div>
                        <div className="self-stretch inline-flex justify-start items-center gap-1">
                            <div className="justify-start text-neutral-400 text-xs font-medium font-['Poppins'] leading-none">This will be displayed on your character profile.</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-4">
                        <div className="w-[750px] p-4 bg-white rounded-2xl outline outline-2 outline-offset-[-2px] outline-gray-200 flex flex-col justify-start items-center gap-1">
                            <div className="self-stretch flex flex-col justify-start items-center gap-3">
                                <div className="w-10 h-10 relative bg-stone-100 rounded-3xl outline outline-[6px] outline-offset-[-3px] outline-stone-50">
                                    <img src={upload} />
                                </div>
                                <div className="self-stretch flex flex-col justify-start items-center gap-1">
                                    <div className="self-stretch inline-flex justify-center items-start gap-1">
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="justify-start text-violet-600 text-sm font-bold font-['Poppins'] leading-none">Click to upload</div>
                                        </div>
                                        <div className="justify-start text-gray-800 text-sm font-normal font-['Poppins'] leading-none">or drag and drop</div>
                                    </div>
                                    <div className="self-stretch text-center justify-start text-stone-500 text-xs font-normal font-['Inter'] leading-none">JPEG or PNG file (Max 1MB)</div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch inline-flex justify-start items-start gap-4">
                            <div className="w-36 h-32 relative rounded-2xl">
                                <img src="https://c4.wallpaperflare.com/wallpaper/957/166/521/random-pix-wallpaper-preview.jpg" />
                            </div>
                            <div className="w-36 h-32 relative rounded-2xl">
                                <img src="https://c4.wallpaperflare.com/wallpaper/957/166/521/random-pix-wallpaper-preview.jpg" />
                            </div>
                            <div className="w-36 h-32 relative rounded-2xl">
                                <img src="https://c4.wallpaperflare.com/wallpaper/957/166/521/random-pix-wallpaper-preview.jpg" />
                            </div>
                            <div className="w-36 h-32 relative rounded-2xl">
                                <img src="https://c4.wallpaperflare.com/wallpaper/957/166/521/random-pix-wallpaper-preview.jpg" />
                            </div>
                            <div className="w-36 h-32 relative rounded-2xl">
                                <img src="https://c4.wallpaperflare.com/wallpaper/957/166/521/random-pix-wallpaper-preview.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                    <div className="inline-flex justify-start items-center gap-1">
                        <div className="justify-start text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">Scene Title</div>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-3">
                        <input className="w-[750px] h-14 relative bg-white rounded-2xl shadow-[inset_0px_1px_1px_1px_rgba(0,0,0,0.08)] border border-stone-300" value={sceneTitle}
                            onChange={(e) => {
                                setSceneTitle(e.target.value)
                            }} />
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                    <div className="inline-flex justify-start items-center gap-1">
                        <div className="justify-start text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">Scene Summary</div>
                    </div>
                    <div className="h-48 flex flex-col justify-start items-start gap-3">
                        <input className="w-[750px] flex-1 relative bg-white rounded-2xl shadow-[inset_0px_1px_1px_1px_rgba(0,0,0,0.08)] border border-stone-300" value={sceneBrief} onChange={(e) => {
                            setSceneBrief(e.target.value)
                        }} />
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                    <div className="inline-flex justify-start items-center gap-1">
                        <div className="justify-start text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">Scene</div>
                    </div>
                    <div className="h-[600px] flex flex-col justify-start items-start gap-3">
                        <input className="w-[750px] flex-1 relative bg-white rounded-2xl shadow-[inset_0px_1px_1px_1px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-stone-300 overflow-hidden" value={scene}
                            onChange={(e) => (setScene(e.target.value))} />

                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2.5">
                    <div className="flex flex-col justify-start items-start gap-1">
                        <div className="inline-flex justify-start items-center gap-1">
                            <div className="justify-start text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">Theme Exploration</div>
                        </div>
                        <div className="inline-flex justify-start items-end gap-3">
                            {["Explored", "Challenged", "Stated"].map((theme) => (
                                <div key={theme} className="self-stretch flex justify-start items-start gap-4">
                                    <div className="h-14 p-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-400 flex justify-start items-center gap-2.5">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5"
                                            checked={themeExploration.includes(theme)}
                                            onChange={() => handleCheckboxChange(theme)}
                                        />
                                        <div className="justify-start text-black/20 text-base font-normal font-['Poppins'] leading-tight">
                                            {theme}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-[750px] flex flex-col justify-start items-start gap-4">
                <div className="self-stretch inline-flex justify-between items-center">
                    <div className="flex justify-start items-center gap-1">
                        <div className="justify-start text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">
                            Characters
                        </div>
                    </div>
                    <div className="self-stretch flex justify-start items-start gap-4 relative">
                        <div
                            className="h-14 p-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-400 flex justify-start items-center gap-2.5 cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            <div className="justify-start text-black/20 text-base font-normal font-['Poppins'] leading-tight">
                                Add Characters
                            </div>
                            <div className="w-7 h-7 relative">
                                <img src={downArrow} alt="Dropdown Arrow" />
                            </div>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-60 bg-white shadow-md rounded-lg z-10">
                                {characters.length > 0 ? (
                                    characters.map((character) => {
                                        const { name, photo } = character.allTemplate.characterBuilder.basicInfo;
                                        return (
                                            <div
                                                key={character._id}
                                                className={`p-2 cursor-pointer hover:bg-gray-200 flex items-center ${sceneCharacters.some((c) => c._id === character._id) ? "bg-gray-300" : ""
                                                    }`}
                                                onClick={() => handleCharacterSelect(character)}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={sceneCharacters.some((c) => c._id === character._id)}
                                                    className="mr-2"
                                                    readOnly
                                                />
                                                <img src={photo} alt={name} className="w-6 h-6 rounded-full mr-2" />
                                                {name}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="p-2 text-gray-500">No characters available</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="inline-flex justify-start items-start gap-4">
                    {sceneCharacters.length > 0 ? (
                        sceneCharacters.map((character) => {
                            const { name, photo } = character.allTemplate.characterBuilder.basicInfo;
                            return (
                                <div
                                    key={character._id}
                                    className="h-14 p-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-400/50 flex justify-start items-center gap-2.5"
                                >
                                    <img src={photo} alt={name} className="w-8 h-8 rounded-full" />
                                    <div className="justify-start text-gray-800 text-base font-normal font-['Poppins'] leading-tight">
                                        {name}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="h-14 p-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-400/50 flex justify-start items-center gap-2.5">
                            <img src={singleCharacter} alt="Character Icon" />
                            <div className="justify-start text-black/20 text-base font-normal font-['Poppins'] leading-tight">
                                None Added
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-[750px] flex flex-col justify-start items-start gap-3">
                {/* Dynamic Label */}
                <div className="inline-flex justify-start items-start gap-1.5">
                    <div className="justify-start text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">
                        Dynamic
                    </div>
                </div>

                {/* Tone Label */}
                <div className="inline-flex justify-start items-center gap-1.5">
                    <div className="justify-start text-zinc-600 text-sm font-medium font-['Poppins'] leading-none">
                        Tone {toneValue}
                    </div>
                </div>

                {/* Slider */}
                <div
                    className={`self-stretch h-5 relative rounded-3xl outline outline-1 outline-zinc-400 slider-container transition-all duration-200
                    ${toneValue > 0 ? "bg-green-500" : toneValue < 0 ? "bg-red-500" : "bg-gray-300"}`}
                    onMouseDown={(e) => handleDrag(e)}
                >
                    {/* Knob */}
                    <div
                        className={`w-9 h-9 absolute rounded-full shadow-[0px_0px_15px_0px_rgba(0,0,0,0.16)] outline outline-1 cursor-pointer transition-colors duration-200
                        ${toneValue > 0 ? "bg-green-700 outline-green-700" : toneValue < 0 ? "bg-red-700 outline-red-700" : "bg-gray-400 outline-gray-400"}`}
                        style={{
                            left: `${((toneValue + 100) / 200) * 100}%`,
                            transform: "translateX(-50%)",
                            top: "-8px",
                        }}
                        draggable
                        onDrag={(e) => handleDrag(e)}
                    />
                </div>
            </div>
            <div className="w-[750px] flex flex-col justify-start items-start gap-3">
            <div className="w-[750px] flex flex-col justify-start items-start gap-3">
  <div className="self-stretch p-3 rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col items-stretch gap-3">
    
    {/* Header */}
    <div className="flex items-center gap-1 text-sm text-gray-700 font-semibold">
      <span className="border-l-2 border-blue-300 pl-2"> Story Lines</span>
      <span className="text-gray-400 cursor-default">ⓘ</span>
    </div>

    {/* Input */}
    <input
      type="text"
      placeholder="Find or create aStory Line…"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="h-14 bg-gray-100 text-gray-800 px-4 rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.10)] border border-gray-300 text-sm w-full"
    />

    {/* Create Button or List */}
    {inputValue.trim() !== "" ? (
      <button
        className="bg-[#00B4FF] text-white text-sm py-3 rounded-md text-center font-medium"
        onClick={handlePlotThreadCreation}
      >
        CreateStory Line: <strong>{inputValue}</strong>
      </button>
    ) : (
      allPlotThreads.length > 0 ? (
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          {allPlotThreads.map((thread, index) => (
            <div key={index} className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-2">
              <div className="self-stretch h-9 px-1.5 bg-red-200 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-start items-center gap-1">
                <div className="flex-1 px-1 py-1.5 inline-flex flex-col justify-center items-start gap-2.5">
                  <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                    <div className="self-stretch justify-start text-zinc-500 text-[8px] font-semibold font-['Poppins'] tracking-tight">
                      {thread.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-sm text-center w-full">None added.</div>
      )
    )}
  </div>
</div>

            </div>

            <div className="w-[750px] flex flex-col justify-start items-start gap-3">
                <div className="inline-flex justify-start items-center gap-1">
                    <div className="justify-start text-gray-800 text-base font-semibold font-['Poppins'] leading-tight">Emotions</div>
                </div>
                <div className="self-stretch inline-flex justify-start items-start gap-3">
                    <div className="w-40 inline-flex flex-col justify-start items-start gap-3">
                        <div className="w-40 h-96 flex flex-col justify-start items-start gap-1">
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-amber-100 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Action</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-orange-200 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Comedy</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-red-200 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Conflict</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-purple-300 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Fantasy</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-indigo-200 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Passion</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-pink-200 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Romance</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-red-200 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Gore</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-red-200 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Scare</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-lime-100 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Shock</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-gray-300 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Mystery</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-slate-200 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Tearjerk</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-gray-200 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Tension</div>
                                </div>
                            </div>
                            <div data-alignment="right" data-icon="true" className="self-stretch h-6 p-6 bg-slate-300 rounded-[48px] inline-flex justify-center items-center gap-6">
                                <div className="self-stretch inline-flex flex-col justify-center items-end">
                                    <div className="text-right justify-start text-zinc-600 text-xs font-medium font-['Poppins'] leading-none">Twist</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 
            <div className="self-stretch inline-flex justify-center items-center gap-6">
                <div className="flex-1 h-14 px-3.5 py-3 rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-1.5">
                    <div className="justify-start text-neutral-400 text-base font-medium font-['Poppins'] leading-tight">Cancel</div>
                </div>
                <div className="flex-1 h-14 px-3.5 py-3 bg-violet-600 rounded-2xl flex justify-center items-center gap-1.5">
                    <div className="justify-start text-white text-base font-medium font-['Poppins'] leading-tight">Save</div>
                </div>
            </div> */}

        </div>

    )


}
export default CreateScenePopup