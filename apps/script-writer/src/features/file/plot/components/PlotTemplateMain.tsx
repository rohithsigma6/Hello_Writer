import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { templateData as initialTemplateData } from "./data/data"
import { HiOutlineCube } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { getCharactersByFileForPlot } from "../../scenecards/api/scene-cards-api";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import charImg from "../../../../assets/preWritingTools/cube.png"
import BeatCard from "./Beat/BeatCard";
import { FiUsers, FiHash } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";
import { BsChatLeftDots } from "react-icons/bs";
import { RiExpandDiagonalLine } from "react-icons/ri";
import { MdOutlineZoomInMap } from "react-icons/md";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaEdit, FaTrash, FaPlus, FaRegStar } from "react-icons/fa";
import { IoOptionsOutline } from "react-icons/io5";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";
import footericon1 from '../../../../assets/preWritingTools/footer-icon-1.svg'
import footericon2 from '../../../../assets/preWritingTools/footer-icon-2.svg'
import footericon3 from '../../../../assets/preWritingTools/footer-icon-3.svg'
import footericon4 from '../../../../assets/preWritingTools/footer-icon-4.svg'
import genicon from "../../../../assets/preWritingTools/genrate-icon.svg";
import { savePlotTemplate, getPlotsByFile, getAllTemplates } from "../api/get-all-templates";
import { Placeholder } from "@screenplay-ink/editor";
import PlotToolbar from "./PlotToolbar";
import HorizontalDots from "../../../../assets/preWritingTools/threeDotsVertical.svg";
import image from "@/assets/message-square.svg";
import notes from "@/assets/box-bottom-smal-img.svg";
import notes2 from "@/assets/box-bottom-file-text.svg";
import circleDots from "@/assets/circleDots.svg";
import star from "@/assets/bottom-star.svg";

import notstartedpop from "@/assets/Not Started pop.svg";
import inprogresspop from "@/assets/In Progress pop.svg";
import feedbackneedpop from "@/assets/Feedback Needed pop.svg";
import donepop from "@/assets/Done pop.svg";

// import { useParams } from "react-router";
interface PlotTemplatesProps {
  selectedTemplate: any;
  clickedButton: any;
  draftTitle: any;

}

const PlotTemplateMain: React.FC<PlotTemplatesProps> = ({ selectedTemplate, clickedButton, draftTitle }) => {
  // console.log(clickedButton)
  const { fileId } = useParams();
  const [expandedActs, setExpandedActs] = useState<{ [key: string]: boolean }>({});
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: number | null }>({});
  const [templateData, setTemplateData] = useState(initialTemplateData);
  const [data, setData] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [newBeatId, setNewBeatId] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTemplateData, setSelectedTemplateData] = useState();
  const [focusedBeat, setFocusedBeat] = useState(null);
  const [expandedBeats, setExpandedBeats] = useState({});
  const [expandAll, setExpandAll] = useState(true);
  const [activeFile, setActiveFile] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState({});
  const [characters, setCharacters] = useState([]);
  const [charactersOpen, setCharactersOpen] = useState(true);
  const [plotsOpen, setPlotsOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // Modal state
  const [openMenu, setOpenMenu] = useState(null);
  const [openMenu1, setOpenMenu1] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null); // Manages which submenu is open
  const [beatCharacters, setBeatCharacters] = useState({}); // Stores character IDs
  const [showCharacters, setShowCharacters] = useState(true)


  const toggleMenu1 = (id) => {
    setOpenMenu(openMenu1 === id ? null : id);
    setOpenSubMenu(null); // Close submenus when opening the main menu
  };

  const toggleSubMenu = (menuType) => {
    setOpenSubMenu(openSubMenu === menuType ? null : menuType);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await getCharactersByFileForPlot(fileId);
      setCharacters(response.finalized);
    };
    fetchCharacters();
  }, [fileId]);

  const handleCharacterSelect = (actTitle, index, characterId) => {
    setSelectedTemplateData((prevData) => {
      if (!prevData) return prevData;

      const updatedTemplate = prevData.template.map((act) =>
        act.title === actTitle
          ? {
            ...act,
            predefinedBeat: act.predefinedBeat.map((beat, i) => {
              if (i !== index) return beat;

              const existingCharacters = beat.characters || [];

              // Check if the character is already in the list
              const isAlreadySelected = existingCharacters.some(
                (c) => c._id?.toString() === characterId?.toString()
              );

              const updatedCharacters = isAlreadySelected
                ? existingCharacters.filter(
                  (c) => c._id?.toString() !== characterId?.toString()
                )
                : [
                  ...existingCharacters,
                  { _id: characterId } // Assuming you want to store the character object, not just the ID
                ];

              return {
                ...beat,
                characters: updatedCharacters,
              };
            }),
          }
          : act
      );

      return { ...prevData, template: updatedTemplate };
    });
  };

  const toggleCharacterList = (actTitle, index) => {
    if (activeFile?.actTitle === actTitle && activeFile?.index === index) {
      setActiveFile(null); // Close dropdown if already open
    } else {
      setActiveFile({ actTitle, index });
    }
  };
  const toggleMenu = (actTitle, index) => {
    setOpenMenu(openMenu === `${actTitle}-${index}` ? null : `${actTitle}-${index}`);
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = [];

        if (fileId) {
          result = await getPlotsByFile(fileId);
        }

        const matchingTemplate = result.find(
          (template: any) => template.templateType === decodeURIComponent(selectedTemplate)
        );

        if (matchingTemplate) {
          const templateData = matchingTemplate.templateData[0];
          setSelectedTemplateData(templateData);
          setSelectedTemplateId(matchingTemplate._id);

          // Expand all acts
          const expandedActsState: { [key: string]: boolean } = {};
          const expandedBeatsState: { [key: string]: { [key: number]: boolean } } = {};

          templateData.template.forEach((act: any) => {
            expandedActsState[act.title] = true;
            expandedBeatsState[act.title] = {};

            act.predefinedBeat.forEach((_: any, index: number) => {
              expandedBeatsState[act.title][index] = true;
            });
          });

          setExpandedActs(expandedActsState);
          setExpandedBeats(expandedBeatsState);
        } else {
          const response = await getAllTemplates();
          setData(response);

          const defaultTemplate = response.data.find(
            (template: any) => template.type === decodeURIComponent(selectedTemplate)
          ) || apiResult.data[0];

          if (defaultTemplate) {
            const updatedTemplate = {
              ...defaultTemplate,
              template: defaultTemplate.template.map((act: any) => ({
                ...act,
                predefinedBeat: act.predefinedBeat.map((beat: any) => ({
                  ...beat,
                  placeHolder: beat.description,
                  description: "", // reset
                })),
              })),
            };

            setSelectedTemplateData(updatedTemplate);
            setSelectedTemplateId(defaultTemplate._id);

            const expandedActsState: { [key: string]: boolean } = {};
            const expandedBeatsState: { [key: string]: { [key: number]: boolean } } = {};

            updatedTemplate.template.forEach((act: any) => {
              expandedActsState[act.title] = true;
              expandedBeatsState[act.title] = {};

              act.predefinedBeat.forEach((_: any, index: number) => {
                expandedBeatsState[act.title][index] = true;
              });
            });

            setExpandedActs(expandedActsState);
            setExpandedBeats(expandedBeatsState);
          } else {
            setSelectedTemplateData({ template: [] });
            setExpandedActs({});
            setExpandedBeats({});
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fileId, selectedTemplate]);


  useEffect(() => {
    const saveDraft = async () => {
      try {
        let payload;

        if (clickedButton?.split("-")[0] === "Draft") {
          payload = {
            templateData: selectedTemplateData,
            status: "draft",
            fileId: fileId,
            templateType: decodeURIComponent(selectedTemplate),
            draftTitle: draftTitle,
          };
          await savePlotTemplate(payload);
          toast.success("Draft saved successfully!");
        } else {
          payload = {
            templateData: selectedTemplateData,
            status: "finalized",
            fileId: fileId,
            templateType: decodeURIComponent(selectedTemplate),
            draftTitle: "FINALIZED",
          };
          await savePlotTemplate(payload);
          toast.success("Template finalized and saved!");
        }
      } catch (error) {
        console.error("Error saving:", error);
        toast.error("Something went wrong while saving.");
      }
    };

    if (clickedButton) {
      saveDraft();
    }
  }, [clickedButton]);
  const toggleAllBeats = () => {
    setExpandAll((prev) => !prev);


    setExpandedBeats((prev) => {
      const newExpandedState = {};

      selectedTemplateData?.template.forEach((act) => {
        newExpandedState[act.title] = {}; // Ensure each act has an object

        act.predefinedBeat.forEach((_, index) => {
          newExpandedState[act.title][index] = !expandAll; // Expand if false, collapse if true
        });
      });

      return newExpandedState;
    });
  };

  const toggleAct = (title) => {
    setExpandedActs((prev) => ({
      ...prev,
      [title]: !prev[title], // Toggle the current act
    }));
  };
  const toggleBeat = (actTitle, beatIndex) => {
    setExpandedBeats((prev) => ({
      ...prev,
      [actTitle]: {
        ...prev[actTitle],
        [beatIndex]: !prev[actTitle]?.[beatIndex], // Toggle beat expansion
      },
    }));
  };


  const [editingBeat, setEditingBeat] = useState({ actTitle: null, index: null, value: "" });

  const handleInputChange = (actTitle, index, field, value) => {
    if (field === "title") {
      setEditingBeat({ actTitle, index, value }); // Update local state for title
    } else {
      // Directly update description in state
      setSelectedTemplateData((prevData) => {
        if (!prevData) return prevData;

        const updatedTemplate = prevData.template.map((act) =>
          act.title === actTitle
            ? {
              ...act,
              predefinedBeat: act.predefinedBeat.map((beat, i) =>
                i === index ? { ...beat, [field]: value } : beat
              ),
            }
            : act
        );

        return { ...prevData, template: updatedTemplate };
      });
    }
  };

  const handleInputBlur = () => {
    if (editingBeat.actTitle !== null && editingBeat.index !== null) {
      setSelectedTemplateData((prevData) => {
        if (!prevData) return prevData;

        const updatedTemplate = prevData.template.map((act) =>
          act.title === editingBeat.actTitle
            ? {
              ...act,
              predefinedBeat: act.predefinedBeat.map((beat, i) =>
                i === editingBeat.index ? { ...beat, title: editingBeat.value } : beat
              ),
            }
            : act
        );

        return { ...prevData, template: updatedTemplate };
      });

      setEditingBeat({ actTitle: null, index: null, value: "" }); // Reset local state
    }
  };

  const addBeatCard = (actTitle) => {
    console.log("HELLO")
    console.log("Focused beat is ", focusedBeat)
    if (focusedBeat?.index == null || focusedBeat?.actTitle !== actTitle) return;
    console.log("Focused beat is ", focusedBeat)

    setSelectedTemplateData((prevData) => {
      const updatedTemplate = prevData.template.map((act) => {
        if (act.title !== actTitle) return act;

        const newBeat = {
          title: `New Beat - ${newBeatId}`,
          description: "",
          isPredefined: false,
        };

        // Insert new beat after the focused one
        const newPredefinedBeats = [
          ...act.predefinedBeat.slice(0, focusedBeat.index + 1),
          newBeat,
          ...act.predefinedBeat.slice(focusedBeat.index + 1),
        ];

        return {
          ...act,
          predefinedBeat: newPredefinedBeats,
        };
      });

      return {
        ...prevData,
        template: updatedTemplate,
      };
    });

    setNewBeatId((prev) => prev + 1);
  };



  const deleteBeatCard = (actTitle, index) => {
    setSelectedTemplateData((prevData) => {
      const updatedTemplate = prevData.template.map((act) =>
        act.title === actTitle
          ? {
            ...act,
            predefinedBeat: act.predefinedBeat.filter((_, beatIndex) => beatIndex !== index),
          }
          : act
      );
      return { ...prevData, template: updatedTemplate };
    });
  };
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    setSelectedTemplateData((prevData) => {
      const updatedTemplate = [...prevData.template];

      const sourceActIndex = updatedTemplate.findIndex((act) => act.title === source.droppableId);
      const destinationActIndex = updatedTemplate.findIndex((act) => act.title === destination.droppableId);

      if (sourceActIndex === -1 || destinationActIndex === -1) return prevData;

      const sourceAct = updatedTemplate[sourceActIndex];
      const destinationAct = updatedTemplate[destinationActIndex];

      const [movedItem] = sourceAct.predefinedBeat.splice(source.index, 1);

      // Prevent movement if the item is predefined
      if (movedItem.isPredefined) {
        sourceAct.predefinedBeat.splice(source.index, 0, movedItem); // Restore original position
        return prevData;
      }

      destinationAct.predefinedBeat.splice(destination.index, 0, movedItem);

      return { ...prevData, template: updatedTemplate };
    });
  };

  const addBeatCards = (actTitle, beatIndex) => {
    console.log("HELLO")
    console.log("WHATS HAPPENING")
    setSelectedTemplateData((prevData) => {
      const updatedTemplate = prevData.template.map((act) => {
        if (act.title !== actTitle) return act;

        const newBeat = {
          title: `New Beat - ${newBeatId}`,
          description: "",
          isPredefined: false,
        };

        const newPredefinedBeats = [
          ...act.predefinedBeat.slice(0, beatIndex + 1),
          newBeat,
          ...act.predefinedBeat.slice(beatIndex + 1),
        ];

        return {
          ...act,
          predefinedBeat: newPredefinedBeats,
        };
      });

      return {
        ...prevData,
        template: updatedTemplate,
      };
    });

    setNewBeatId((prev) => prev + 1);
  };


  const expandAllBeats = () => {
    setExpandedBeats(() => {
      const newExpandedState = {};
      selectedTemplateData?.template.forEach((act) => {
        newExpandedState[act.title] = {}; // Ensure each act has an object
        act.predefinedBeat.forEach((_, index) => {
          newExpandedState[act.title][index] = true; // Expand all
        });
      });
      return newExpandedState;
    });
  };

  const collapseAllBeats = () => {
    setExpandedBeats(() => {
      const newCollapsedState = {};
      selectedTemplateData?.template.forEach((act) => {
        newCollapsedState[act.title] = {}; // Ensure each act has an object
        act.predefinedBeat.forEach((_, index) => {
          newCollapsedState[act.title][index] = false; // Collapse all
        });
      });
      return newCollapsedState;
    });
  };



  return (
    <div className="w-full h-[620px] overflow-y-scroll">

      <div className="flex items-center justify-between bg-white w-[650px] p-2 rounded-xl mb-6 ">
        {/* Left Icons */}
        <ToastContainer position="top-left" autoClose={3000} />

        <div className="flex space-x-4">
          <button className={`p-2 rounded-lg hover:bg-gray-200 ${showCharacters ? 'bg-gray-200' : ''}`}
            onClick={() => { setShowCharacters(!showCharacters) }}>
            <FiUsers className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-200">
            <FiLoader className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-200">
            <BsChatLeftDots className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-200" onClick={collapseAllBeats}>
            <MdOutlineZoomInMap className="h-5 w-5 text-gray-600" />
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-200" onClick={expandAllBeats}>
            <MdOutlineZoomOutMap className="h-5 w-5 text-gray-600" />
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-200">
            <FaRegStar className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-200">
            <IoOptionsOutline className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-200">
            <HiOutlinePresentationChartLine className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex">


        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="max-w-xxl flex h-auto overflow-x-auto">
          {selectedTemplateData?.template?.map((act, actIndex) => (
            <div key={actIndex} className="mb-6 mr-4">
              <div className="mb-3 w-80 p-4 rounded-lg cursor-pointer flex justify-between  items-center bg-white">
                <h2 onClick={() => toggleAct(act.title)} className="font-bold text-[12px] text-[#212131] flex">
                  <span className="text-gray-500 text-lg mr-2 bg-white">
                    {expandedActs[act.title] ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </span>
                  {act.title}
                </h2>
                <div className="flex items-center gap-2">
                  <span onClick={() => addBeatCard(act.title)} className="text-gray-500 text-lg cursor-pointer">
                    <IoMdAdd />
                  </span>
                  <span onClick={() => addBeatCard(act.title)} className="text-gray-500 text-lg cursor-pointer">
                    <img src={HorizontalDots} />
                  </span>
                </div>

              </div>


              {expandedActs[act.title] && (
                <div>
                  <Droppable droppableId={act.title} type="content" >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[50px] ">
                        <ul>
                          {act.predefinedBeat.map((item, index) => (
                            <div>
                              <Draggable key={item.title} draggableId={item.title} index={index}>
                                {(provided, snapshot) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-[10px] mb-3 rounded-lg border border-gray-300 flex flex-col transition-all duration-200 
                            ${snapshot.isDragging ? "opacity-50" : ""}
                            ${focusedBeat?.actTitle === act.title && focusedBeat?.index === index ? "bg-white" : "bg-[#E7EDF3]"}
                          `}
                                  >

                                    <div className="flex items-center justify-between focus:bg-white">
                                      <div className="flex items-center w-full">
                                        <span
                                          className="text-gray-500 text-lg mr-2 cursor-pointer"
                                          onClick={() => toggleBeat(act.title, index)}
                                        >
                                          {expandedBeats[act.title]?.[index] ? <IoIosArrowUp /> : <HiOutlineCube />}
                                        </span>


                                        <input
                                          type="text"
                                          className="font-medium text-[12px] text-[#212131] bg-transparent focus:outline-none"
                                          value={editingBeat.actTitle === act.title && editingBeat.index === index ? editingBeat.value : item.title}
                                          onChange={(e) => handleInputChange(act.title, index, "title", e.target.value)}
                                          onFocus={() => setFocusedBeat({ actTitle: act.title, index })}
                                          onBlur={() => setFocusedBeat(null)}

                                        />
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {!item.isPredefined && ( // Only show delete button for non-predefined beats
                                          <RiDeleteBinLine
                                            className="text-red-500 cursor-pointer"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              deleteBeatCard(act.title, index);
                                            }}
                                          />
                                        )}
                                        <div className="relative inline-block">
                                          {expandedBeats[act.title]?.[index] ? (
                                            // ✅ Show 3-dot menu when beat is expanded
                                            <>
                                              <span
                                                className="text-gray-500 text-lg cursor-pointer"
                                                onClick={() => toggleMenu(act.title, index)}
                                              >
                                                <img src={HorizontalDots} alt="More Options" />
                                              </span>

                                              {openMenu === `${act.title}-${index}` && (
                                                <div className="inline-block">
                                                  {/* Three Dots Menu */}
                                                  <div className="absolute left-0 top-0 transform -translate-x-full bg-white border shadow-lg rounded-md flex">
                                                    <button
                                                      className="p-2 rounded-lg hover:bg-gray-200"
                                                      onClick={() => toggleSubMenu("characters")}
                                                    >
                                                      <FiHash className="h-5 w-5 text-gray-600" />
                                                    </button>
                                                    <button
                                                      className="p-2 rounded-lg hover:bg-gray-200"
                                                      onClick={() => toggleSubMenu("characters")}
                                                    >
                                                      <FiUsers className="h-5 w-5 text-gray-600" />
                                                    </button>
                                                    <button
                                                      className="p-2 rounded-lg hover:bg-gray-200"
                                                      onClick={() => toggleSubMenu("status")}
                                                    >
                                                      <FiLoader className="h-5 w-5 text-gray-600" />
                                                    </button>
                                                  </div>

                                                  {/* Submenus */}
                                                  {openSubMenu === "characters" && (
                                                    <div className="absolute top-[100%] left-[-55px] bg-white border border-[#00000024] rounded-tl-none rounded-[16px] p-[16px] w-[292px]">
                                                      <h4 className="font-semibold text-[14px] mb-2 text-[#28303D]">Select Characters:</h4>
                                                      <ul>
                                                        {characters.length > 0 ? (
                                                          characters.map((char) => (
                                                            <li
                                                              key={char._id}
                                                              className="flex items-center gap-2 text-gray-700 text-sm"
                                                            >
                                                              <input
                                                                type="checkbox"
                                                                value={char._id}
                                                                checked={item.characters?.some((c) => c._id?.toString() === char._id?.toString())}
                                                                onChange={() =>
                                                                  handleCharacterSelect(act.title, index, char._id)
                                                                }
                                                              />

                                                              {char.allTemplate.characterBuilder.basicInfo.name}
                                                            </li>
                                                          ))
                                                        ) : (
                                                          <p className="text-gray-500 text-sm">No characters</p>
                                                        )}
                                                      </ul>
                                                    </div>
                                                  )}

                                                  {openSubMenu === "status" && (
                                                    <div className="absolute top-[100%] left-[-55px] bg-white border border-[#00000024] rounded-tl-none rounded-[16px] p-[12px] w-[221px] z-10">
                                                      {/* <h4 className="font-bold text-sm mb-2">Select Status:</h4> */}
                                                      <ul className="text-gray-700 text-sm">
                                                        <li className="py-[10px] pl-[12px] flex items-center gap-[10px] text-[14px] font-poppins font-medium text-[#212131]"><input type="checkbox"  className="w-4 h-4 rounded-[4px]"/><img src={notstartedpop} alt="" /><span>Not Started</span></li>
                                                        <li className="py-[10px] pl-[12px] flex items-center gap-[10px] text-[14px] font-poppins font-medium text-[#212131]"><input type="checkbox" className="w-4 h-4 rounded-[4px]"/><img src={inprogresspop} alt="" /> <span>In Progress</span></li>
                                                        <li className="py-[10px] pl-[12px] flex items-center gap-[10px] text-[14px] font-poppins font-medium text-[#212131]"><input type="checkbox" className="w-4 h-4 rounded-[4px]"/><img src={feedbackneedpop} alt="" /><span>Feedback Needed</span></li>
                                                        <li className="py-[10px] pl-[12px] flex items-center gap-[10px] text-[14px] font-poppins font-medium text-[#212131]"><input type="checkbox" className="w-4 h-4 rounded-[4px]"/><img src={donepop} alt="" /><span>Done</span></li>
                                                      </ul>
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                            </>
                                          ) : (


                                            <div className="flex gap-1 items-center">{
                                              showCharacters && (

                                                <div className="flex -space-x-2">
                                                  {(item.characters || []).map((char) => (
                                                    <img
                                                      key={char._id}
                                                      src={char?.allTemplate?.characterBuilder?.basicInfo?.photo || '/default-avatar.png'}
                                                      alt={char?.allTemplate?.characterBuilder?.basicInfo?.name}
                                                      className="w-6 h-6 rounded-full border-2 border-white"
                                                      title={char?.allTemplate?.characterBuilder?.basicInfo?.name}
                                                    />
                                                  ))}
                                                </div>
                                              )}
                                            </div>

                                          )}
                                        </div>


                                      </div>
                                    </div>
                                    {expandedBeats[act.title]?.[index] && (
                                      <textarea
                                        className="w-full placeholder:text-gray-400 text-black-900 mt-2 text-[12px] bg-transparent border border-[#d9e7f4] rounded-lg p-2 resize-none  focus:outline-none"
                                        // className="font-medium text-[12px] text-[#212131] bg-transparent border-b border-gray-300 focus:outline-none"
                                        placeholder={item.placeHolder}
                                        value={item.description}
                                        onChange={(e) => handleInputChange(act.title, index, 'description', e.target.value)}
                                        onFocus={() => setFocusedBeat({ actTitle: act.title, index })}
                                        onBlur={() => setFocusedBeat(null)}
                                        rows={4}

                                      />

                                    )}

                                    {expandedBeats[act.title]?.[index] && (
                                      <div className="self-stretch inline-flex justify-between items-center mt-[10px]">
                                        <div className="flex justify-start items-center gap-2">                                        
                                              <img src={image} />
                                              <img src={notes} />     
                                              <img src={notes2} />
                                        </div>
                                        <div className="flex justify-start items-center gap-2">
                                          
                                            <img src={circleDots} />
                                        
                                         
                                              <img src={star} />
                                          
                                        </div>
                                      </div>
                                    )}

                                  </li>

                                )}
                              </Draggable>
                              {focusedBeat?.actTitle === act.title && focusedBeat?.index === index && (
                                <button
                                  className="w-full flex justify-center items-center p-2 text-gray-500 hover:bg-gray-200 
                                 rounded-lg mt-2 border border-dotted border-gray-400 mb-2"
                                  onMouseDown={(e) => {
                                    e.preventDefault(); // Keep focus
                                    addBeatCards(act.title, index);
                                  }}
                                >
                                  <IoMdAdd className="text-lg" /> Add Beat
                                </button>

                              )}

                            </div>
                          ))}
                          {provided.placeholder}
                        </ul>
                        <div>

                        </div>
                      </div>
                    )}
                  </Droppable>

                </div>
              )}

            </div>
          ))}
        </div>
      </DragDropContext>

    </div>

  );
};

export default PlotTemplateMain;
