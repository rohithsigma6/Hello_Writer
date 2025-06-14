import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SceneEnvironmentDropdown from './EnviromentDropDown';
import { motion } from 'framer-motion';
// import SceneEnvironmentDropdown from "components/ScriptBreakdownComponents/Dropdowns/EnviromentDropDown";
// import SceneSetDropdown from "components/ScriptBreakdownComponents/Dropdowns/SceneSetDropdown";
import {
  EnvironmentOptions,
  SceneEnvironmentOptions,
} from './script-breakdown.constants';
import {
  getAllSceneCards,
  createOrUpdateSceneCard,
} from '../api/scene-cards-api';
import { ChevronDown, Menu, MoreHorizontal, MoreVertical } from 'lucide-react';
import SceneCard from './scene-card';
import { toast } from 'react-toastify';
import { getPlotsByFile } from '../../plot/api/get-all-templates';
import leftArrow from '../../../../assets/preWritingTools/left-arrow.svg';
import rightArrow from '../../../../assets/preWritingTools/right-arrow.svg';
import threedots from '../../../../assets/preWritingTools/three-dots.svg';
import resizer from '../../../../assets/preWritingTools/resizer.svg';
import recall from '../../../../assets/preWritingTools/recall.svg';
import upload from '../../../../assets/preWritingTools/upload.svg';
import character1 from '../../../../assets/preWritingTools/character-1.svg';
import character2 from '../../../../assets/preWritingTools/character-2.svg';
import colorPalette from '../../../../assets/preWritingTools/color-palette.svg';
import downArrow from '../../../../assets/preWritingTools/down-arrow.svg';
import plus from '../../../../assets/preWritingTools/plus.svg';
import SceneTimeline from './SceneTimeline';
import { useRef } from 'react';
import zoomicon from '@/assets/zoom-icon.svg';
import zoomouticon from '@/assets/zoom-out-icon.svg';
import handicon from '@/assets/hand-icon.svg';
import overviewicon from '@/assets/over-view-icon.svg';
import cardviewicon from '@/assets/card-view-icon.svg';
import timelineviewicon from '@/assets/clock-icon.svg';
import CreateScenePopup from "./createScenePopup";
import { getAllTemplates } from '../../plot/api/get-all-templates';
import { IoMdChatboxes, IoMdClose, IoMdListBox } from 'react-icons/io';
import { getAllPlotThreadsByFileId } from '../api/scene-cards-api';

const SceneCardFreeform = () => {
  const className = 'Theme__Comparative';
  const [active, setActive] = useState(0);
  const [editorView, setEditorView] = useState();
  const [createScene, setCreateScene] = useState(false);
  const [generateScene, setGenerateScene] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCreateScenePopup, setIsCreateScenePopup] = useState(true)
  const { fileId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState(EnvironmentOptions[0]);
  const [selectedTime, setSelectedTime] = useState(SceneEnvironmentOptions[0]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sceneTitle, setSceneTitle] = useState('');
  const [sceneBrief, setSceneBrief] = useState('');
  const [allSceneCards, setAllSceneCards] = useState([]);
  const [scene, setScene] = useState({});
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);
  const [plots, setPlots] = useState([]);
  const [finalPlot, setFinalPlot] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const [plotThreads, setAllPlotThreads] = useState([])
  const [selectedAct, setSelectedAct] = useState("ACT-1")
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const { type, templatename } = useParams<any>();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [isLoadingScenes, setIsLoadingScenes] = useState(false);

  const [templates, setAllTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  const [insertAtIndex, setInsertAtIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(0)
  const [showAddActInput, setShowAddActInput] = useState(false);
  const [newActName, setNewActName] = useState('');
  const colors = [
    "#FAD7A0", "#F5B7B1", "#D7BDE2", "#A9CCE3", "#A3E4D7",
    "#F9E79F", "#E6B0AA", "#D5DBDB", "#F5CBA7", "#D4E6F1", "#E8DAEF",
    "#F5CBA7", "#D4E6F1"
  ];
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  // Zoom with buttons
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.3));

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(3, Math.max(0.3, prev + delta)));
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleCreateScene = async (actIndex, beatName, beatIndex, actTitle, beatId) => {
    console.log("okay", actIndex, beatIndex, actTitle, beatId, beatName)
    const response = await createOrUpdateSceneCard({
      fileId: fileId,
      act: actIndex.actTitle,
      order: actIndex.beatIndex,
      beatName: actIndex.beatName,
      selectedTemplate: 'sceneEssentials',
      sceneEssentials: {
        type: selectedEnv || 'INT.',
        location: selectedLocation || 'LOCATION',
        timeOfDay: selectedTime || 'DAY',
        title: "ADDED BEAT",
        brief: sceneBrief || 'ADDED BRIEF',
        characters: '',
        pov: '',
        timePeriod: '',
        hook: '',
        purpose: '',
        conflict: '',
        climax: '',
        characterGoal: '',
        characterDevelopment: '',
        sensoryDetail: '',
      },
    });

  }

  useEffect(() => {
    const fetchData = async () => {

      const response = await getPlotsByFile(fileId)
      console.log("HEHEHE", response)

      const templates = response[0];
      console.log('getAllTemplates', templates);
      setAllTemplates(templates);
      setSelectedTemplate(response[0]);
      console.log('what is this', selectedTemplate);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const response = await getPlotsByFile(fileId);

        if (response) {
          setPlots(response); // Store all plots
          const finalized = response.filter(
            (plot) => plot.status === 'finalized',
          ); // Filter only finalized plots
          setFinalPlot(finalized); // Store finalized plots
          console.log('Finalized plots are', finalized);
        }
      } catch (error) {
        console.error('Error fetching plots:', error);
      }
    };

    if (fileId) {
      fetchPlots();
    }
  }, [fileId]);
  useEffect(() => {
    const fetchAllSceneCards = async () => {
      try {
        const response = await getAllSceneCards({ fileId });
        console.log('Response is', response);
        if (!response || response.length === 0) {
          setIsLoadingScenes(true); // 🌀 Start loader

          const getSelectedPlot = await getPlotsByFile(fileId);
          const selectedPlot = getSelectedPlot[0] || "3-act";
          console.log("selected Plot", selectedPlot)
          const acts = selectedPlot?.templateData?.[0]?.template || [];

          let sceneOrder = insertAtIndex;

          for (const act of acts) {
            for (const beat of act.predefinedBeat) {
              const sceneTitle = "Untitled Scene";

              await createOrUpdateSceneCard({
                fileId: fileId,
                act: act.title,
                order: sceneOrder,
                beatName: beat.title,
                selectedTemplate: 'sceneEssentials',
                sceneEssentials: {
                  type: selectedEnv || 'INT.',
                  location: selectedLocation || 'LOCATION',
                  timeOfDay: selectedTime || 'DAY',
                  title: sceneTitle,
                  brief: sceneBrief || 'Untitled Brief',
                  characters: '',
                  pov: '',
                  timePeriod: '',
                  hook: '',
                  purpose: '',
                  conflict: '',
                  climax: '',
                  characterGoal: '',
                  characterDevelopment: '',
                  sensoryDetail: '',
                },
              });

              sceneOrder++;
            }
          }

          // 🔄 Fetch updated scenes
          // window.location.reload()
          setIsLoadingScenes(false); // ✅ Stop loader
        }

        if (response) {
          const groupedByAct: { [act: string]: { [beatName: string]: any[] } } = {};

          response.forEach((scene) => {
            const brief = scene.sceneEssentials?.brief?.trim();
            if (brief) {
              const act = scene.act || 'Unknown Act';
              const beatName = scene.beatName || 'Unknown Beat';

              if (!groupedByAct[act]) {
                groupedByAct[act] = {};
              }

              if (!groupedByAct[act][beatName]) {
                groupedByAct[act][beatName] = [];
              }

              groupedByAct[act][beatName].push(scene);
            }
          });

          // Sort scenes by order within each beatName
          for (const act of Object.keys(groupedByAct)) {
            const beatMap = groupedByAct[act];
            for (const beatName of Object.keys(beatMap)) {
              beatMap[beatName].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            }
          }
          console.log("GROUPED BY ACT", groupedByAct)

          setAllSceneCards(groupedByAct);

          // Flatten all scenes (in insertion order of acts and beatNames)
          const allScenes: any[] = [];
          for (const act of Object.keys(groupedByAct)) {
            const beatMap = groupedByAct[act];
            for (const beatName of Object.keys(beatMap)) {
              allScenes.push(...beatMap[beatName]);
            }
          }

          if (allScenes.length > 0) {
            setScene(allScenes[sceneIndex] || allScenes[0]);
          }
          console.log("GROUPED BY ALL SCENS", allScenes)
        }


      } catch (error) {
        console.error('Error fetching scenes:', error);
      }
    };

    fetchAllSceneCards();
  }, [fileId, isUpdated]);


  useEffect(() => {
    const fetchPlotThreadsByFileId = async () => {
      const response = await getAllPlotThreadsByFileId(fileId)
      console.log(" Story Lines are", response)
      setAllPlotThreads(response?.plotThreads)
    }
    fetchPlotThreadsByFileId()
  }, [])

  useEffect(() => {
    setScene(allSceneCards[sceneIndex]);
  }, [sceneIndex]);

  const handleAddScene = async () => {
    try {
      console.log('Finalizing scene card...');

      const response = await createOrUpdateSceneCard({
        fileId: fileId,
        act: selectedAct,
        order: insertAtIndex, // use correct order
        selectedTemplate: 'sceneEssentials',
        sceneEssentials: {
          type: selectedEnv,
          location: selectedLocation,
          timeOfDay: selectedTime,
          title: sceneTitle,
          brief: sceneBrief,
          characters: '',
          pov: '',
          timePeriod: '',
          hook: '',
          purpose: '',
          conflict: '',
          climax: '',
          characterGoal: '',
          characterDevelopment: '',
          sensoryDetail: '',
        },
      });

      setIsUpdated(!isUpdated);
      setIsOpen(false);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      toast.success('Scene card created successfully!');
      navigate(`/file/${fileId}/scenecards/template/freeform`);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error('Caught Error:', error);
    }
  };

  const insertScene = (act, newScene, index) => {
    const updatedScenes = [...allSceneCards[act]];
    updatedScenes.splice(index, 0, newScene);
    setAllSceneCards({
      ...allSceneCards,
      [act]: updatedScenes,
    });
  };

  const handleAddAct = () => {
    if (!newActName.trim()) return;
    const updatedSceneCards = {
      ...allSceneCards,
      [newActName]: [],
    };
    setAllSceneCards(updatedSceneCards);
    setNewActName('');
    setShowAddActInput(false);
  };

  return (
    <div className='w-[100%] h-full overflow-y-auto'>
      {isLoadingScenes && (
        <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className='w-full'>
        <div className="w-full h-full">
          <div className="h-full flex flex-col gap-10 mt-8 px-6 relative">
            <div
              className={className + ' ' + 'w-full flex flex-col gap-y-0 '}
            >
              <section className="w-full flex flex-row items-center justify-center px-6">
                <div className="flex flex-row justify-between rounded-2xl items-center p-1 bg-[#BABABF] w-[450px] items-center">
                  <button
                    onClick={() => setActive(0)}
                    className={
                      `${active == 0 ? 'bg-white text-[#212131]' : 'bg-gray text-[#6A6A75]'}` +
                      ' py-2 px-4  font-medium text-[16px] rounded-xl flex flex-row items-center gap-1'
                    }
                  >
                    <img src={overviewicon} alt="" className='w-[20px] h-[20px]' /> Overview
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/file/${fileId}/scenecards/template/scenes/${scene?._id}`,
                      )
                    }
                    className={
                      `${active == 1 ? 'bg-white text-[#212131]' : 'bg-gray text-[#6A6A75]'}` +
                      ' py-2 px-4  font-medium text-[16px] rounded-xl flex flex-row items-center gap-1'
                    }
                  >
                    <img src={cardviewicon} alt="" className='w-[20px] h-[20px]' /> Card View
                  </button>
                  <button
                    onClick={() => setActive(2)}
                    className={
                      `${active == 2 ? 'bg-white text-[#212131]' : 'bg-gray text-[#6A6A75]'}` +
                      ' py-2 px-4  font-medium text-[16px] rounded-xl flex flex-row items-center gap-1'
                    }
                  >
                    <img src={timelineviewicon} alt="" className='w-[20px] h-[20px]' /> Timeline View
                  </button>
                </div>
              </section>
              {active == 0 && (
                <div
                  className="w-auto h-[calc(100vh-80px)] overflow-x-scroll bg-[#FAFAFA]"
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >

                  <div
                    className="relative transition-all ease-in-out"
                    style={{
                      transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                      transformOrigin: '0 0',
                      width: 'auto',
                      display: 'inline-block',
                    }}
                  >
                    {Object.keys(allSceneCards || {}).length > 0 ? (
                      Object.entries(allSceneCards || {}).map(([act, beatMap]) => (
                        <div
                          key={act}
                          className="w-full border border-[#E0E0E0] rounded-lg p-4 mb-6 bg-white"
                        >
                          <h2 className="text-lg font-semibold mb-4">{act}</h2>

                          <div className="flex gap-6 overflow-x-auto no-scrollbar">
                            {Object.entries(beatMap).map(([beatName, scenes]) => (
                              <div
                                key={beatName}
                                className="min-w-fit border border-gray-300 rounded-lg p-3 bg-[#FAFAFA] shadow-sm"
                              >
                                <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">{beatName}</h3>

                                <div className="flex gap-4">
                                  {scenes.map((scene, index) => (
                                    <React.Fragment key={index}>
                                      <SceneCard scene={scene} index={index} />
                                      <div className="relative group w-[36px] h-[92px] flex items-center justify-center">
                                        <div
                                          className="absolute inset-0 rounded-[8px] hover:bg-[#F0ECFF] transition"
                                          onClick={() => {
                                            setSelectedAct(act);
                                            setInsertAtIndex(index + 1);
                                            setIsOpen(true);
                                          }}
                                        ></div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#653EFF] text-xl font-bold cursor-pointer z-10">
                                          +
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  ))}

                                  {/* Add Scene at End */}

                                </div>
                              </div>

                            ))}
                            <div
                              className="w-[160px] h-[92px] rounded-[8px] shadow-[0_0_20px_0_rgba(0,0,0,0.1)] font-poppins cursor-pointer"
                              onClick={() => {
                                setSelectedAct(act);
                                setInsertAtIndex(scenes.length);
                                setIsOpen(true);
                              }}
                            >
                              <div className="p-2 w-full bg-white rounded-[8px] h-full">
                                <div className="rounded-lg border border-dashed border-[#987EFF] flex justify-center items-center flex-col p-2 h-full">
                                  <div className="w-10 h-10 rounded-full bg-[#F0ECFF] flex justify-center items-center text-[#653EFF] text-[25px]">
                                    +
                                  </div>
                                  <h2 className="text-[12px] font-medium text-[#212131]">Create Scene</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full">
                        <h2 className="text-xl font-semibold text-[#212131] mb-2">ACT-1</h2>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar">
                          <div
                            className="w-[160px] h-[92px] rounded-[8px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] font-poppins cursor-pointer"
                            onClick={() => setIsOpen(true)}
                          >
                            <div className="p-2 w-full bg-white rounded-[8px] h-full">
                              <div className="rounded-lg border border-dashed border-[#987EFF] flex justify-center items-center flex-col p-2 h-full">
                                <div className="w-10 h-10 rounded-full bg-[#F0ECFF] flex justify-center items-center text-[#653EFF] text-[25px]">
                                  +
                                </div>
                                <h2 className="text-[12px] font-medium text-[#212131]">
                                  Create Scene
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Floating Add Act Button */}
                  <div className="fixed bottom-6 right-6 z-50">
                    {showAddActInput ? (
                      <motion.div
                        drag
                        dragConstraints={{ left: 0, right: 500, top: -300, bottom: 300 }}
                        className="bg-white p-4 rounded-xl shadow-xl flex items-center gap-2 border"
                      >
                        <input
                          type="text"
                          placeholder="New Act Name"
                          className="border border-gray-300 px-3 py-1 rounded-md"
                          value={newActName}
                          onChange={(e) => setNewActName(e.target.value)}
                        />
                        <button
                          onClick={handleAddAct}
                          className="bg-[#653EFF] text-white px-3 py-1 rounded-md hover:bg-[#4b2ed8]"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setShowAddActInput(false);
                            setNewActName('');
                          }}
                          className="text-gray-500 text-sm"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    ) : (
                      <button
                        onClick={() => setShowAddActInput(true)}
                        className="bg-[#653EFF] hover:bg-[#4b2ed8] text-white rounded-full w-14 h-14 text-3xl flex justify-center items-center shadow-lg"
                        title="Add New Act"
                      >
                        +
                      </button>
                    )}
                  </div>

                  {/* Bottom Center Zoom Toolbar */}
                  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#212131] p-2 flex items-center gap-6 rounded-2xl max-w-[270px] min-h-[60px] shadow-lg z-50">
                    <button onClick={zoomIn}>
                      <img src={zoomicon} alt="Zoom In" className="w-6 h-6" />
                    </button>
                    <button>
                      <img src={handicon} alt="Hand Tool" className="w-6 h-6" />
                    </button>
                    <button onClick={zoomOut}>
                      <img src={zoomouticon} alt="Zoom Out" className="w-6 h-6" />
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium font-poppins h-[44px]">
                      Create<span className="pl-1">+</span>
                    </button>
                  </div>
                </div>
              )}


              {active == 2 && (
                <div className="mt-6 ">
                  <div className="flex space-x-6 ">

                    <div className="bg-white flex flex-col">
                      <div className="w-48 px-4 py-2.5 bg-gray-400 rounded-tl-2xl rounded-tr-2xl inline-flex justify-start items-center gap-2.5">
                        <div className="justify-center text-black text-sm font-bold font-['Poppins'] leading-none">Structure</div>
                      </div>
                      <div className="w-48 h-6 px-4 py-2.5 bg-zinc-300 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-center text-black text-sm font-bold font-['Poppins'] leading-none">Beats</div>
                      </div>
                      <div className="self-stretch h-6 px-4 inline-flex justify-start items-start gap-2.5">
                        <div className="justify-center text-black text-sm font-bold font-['Poppins'] leading-none">Scene Header</div>
                      </div>
                      <div className="self-stretch h-28 px-4 py-3 inline-flex justify-start items-start gap-2.5">
                        <div className="justify-center text-black/20 text-sm font-normal font-['Poppins'] leading-none">Image</div>
                      </div>
                      <div className="self-stretch h-9 px-4 py-3 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-center text-black/20 text-sm font-normal font-['Poppins'] leading-none">Title</div>
                      </div>
                      <div className="self-stretch h-20 px-4 py-3 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-center text-black/20 text-sm font-normal font-['Poppins'] leading-none">Summary</div>
                      </div>
                      <div className="self-stretch h-[754px] px-4 py-3 inline-flex justify-start items-start gap-2.5">
                        <div className="justify-center text-black/20 text-sm font-normal font-['Poppins'] leading-none">Scene</div>
                      </div>
                      <div className="self-stretch h-14 px-4 py-3 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-center text-black/20 text-sm font-normal font-['Poppins'] leading-none">Theme</div>
                      </div>
                      <div className="self-stretch px-4 py-3 bg-violet-100 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-center text-black/20 text-sm font-medium font-['Poppins'] leading-none">Characters</div>
                      </div>
                      <div className="self-stretch h-32 px-4 py-3 inline-flex justify-start items-start gap-2.5">
                        <div className="justify-center text-zinc-500 text-xs font-normal font-['Poppins'] leading-none">3 characters added</div>
                      </div>
                      <div className="self-stretch px-4 py-3 bg-violet-100 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-center text-black/20 text-sm font-medium font-['Poppins'] leading-none">Story Lines</div>
                      </div>
                      <div className="self-stretch h-40 px-4 py-3 inline-flex justify-start items-start gap-2.5">
                        <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-2">
                          {plotThreads.map((thread, index) => (
                            <div
                              key={index}
                              className="self-stretch h-9 px-1.5 bg-red-200 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-start items-center gap-1"
                            >
                              <div className="flex-1 px-1 py-1.5 inline-flex flex-col justify-center items-start gap-2.5">
                                <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                                  <div className="self-stretch justify-start text-zinc-500 text-[8px] font-semibold font-['Poppins'] tracking-tight">
                                    {thread.title}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                      <div className="self-stretch px-4 py-3 bg-violet-100 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-center text-black/20 text-sm font-medium font-['Poppins'] leading-none">Dynamics</div>
                      </div>
                      <div className="self-stretch h-32 px-4 py-3 inline-flex justify-start items-start gap-2.5">
                        <div className="justify-center text-zinc-500 text-xs font-normal font-['Poppins'] leading-none">Tone -/+</div>
                      </div>
                      <div className="self-stretch px-4 py-3 bg-violet-100 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-center text-black/20 text-sm font-medium font-['Poppins'] leading-none">Emotions</div>
                      </div>
                      <div className="self-stretch px-4 pt-5 pb-6 inline-flex justify-start items-start gap-2.5">
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
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

                    <div className="overflow-x-auto flex flex-row space-x-4 w-full">
                      {
                        Object.keys(allSceneCards || {}).length > 0 ? (
                          Object.entries(allSceneCards || {}).map(([act, beatMap],actIndex) => (
                            <div key={act._id} className="text-sm font-bold rounded-xl w-auto mb-4">
                              <div className="w-full px-4 py-2.5 bg-red-200 rounded-xl inline-flex justify-start items-center gap-2.5">
                                <div className="justify-center text-black text-sm font-bold font-['Poppins'] leading-none">{act}</div>
                              </div>

                              <div className="flex flex-row space-x-4 w-full">
                                {Object.entries(beatMap).map(([beat, scenes], beatIndex) => (
                                  <div>

                                    <div className="w-full h-6 px-4 bg-amber-100 rounded-lg inline-flex justify-start items-center gap-2.5">
                                      <div className="justify-center text-black text-xs font-medium font-['Poppins'] leading-none w-full">
                                        {beat}
                                      </div>
                                    </div>
                                    <div className='flex flex-row'>
                                      {scenes.map((scene, index) => (
                                        <div className=''>
                                          <div key={beat._id} id={`scene-${beat._id}`} onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                              const type = e.dataTransfer.getData("text/plain");
                                              if (type === "create-scene") {
                                                // console.log("Dropped on beat index:", index);
                                                console.log("Act title:", act.title);
                                                console.log("beat title", beat.title)
                                                console.log(beat)
                                                // ✅ Call your scene creation logic here:
                                                handleCreateScene({ actIndex: actIndex, beatName: beat, beatIndex: beatIndex, actTitle: act, beatId: beat._id });
                                              }
                                            }}>
                                            <div className="bg-white-100 border border-black-100 h-[30px]" >
                                              <h1>{scene?.sceneEssentials?.title}</h1>
                                              {/* <h1>HELLO - ${index}</h1> */}
                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[110px]" >

                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[40px]" >
                                              {allSceneCards[act.title]?.[index]?.sceneEssentials?.title}
                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[80px]" >
                                              {allSceneCards[act.title]?.[index]?.sceneEssentials?.brief}
                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[750px]" >

                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[50px]" >

                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[40px]" >

                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[130px]" >

                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[40px]" >

                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[150px]"
                                              >

                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[40px]">

                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[130px]">

                                            </div>
                                            <div className="bg-white-100 border border-black-100 h-[40px]">

                                            </div>
                                            <div className="bg-white border border-black-100 h-[900px]">
                                              <div className="relative w-[350px] h-[650px] border border-gray-300 px-4 flex flex-col justify-between mt-[30px]">
                                                {colors.map((color, index) => (
                                                  <div key={index} className="flex items-center  w-full relative">

                                                    {/* Colored Circle */}
                                                    {/* <div className="w-[40px] h-[40px] " style={{ backgroundColor: color }}></div> */}

                                                    {/* Wrapper for Bar */}
                                                    <div className="relative w-full h-[50px] flex items-center">

                                                      {/* Visible Colored Bar (Expands as the slider moves) */}
                                                      <div
                                                        className="absolute h-[40px] rounded-lg transition-all duration-300"
                                                        style={{
                                                          backgroundColor: color,
                                                          width: "25%", // Default width, dynamically updated
                                                          borderRadius: "10px",
                                                        }}
                                                      ></div>

                                                      {/* Larger Slider (Visible) */}
                                                      <input
                                                        type="range"
                                                        min="0"
                                                        max="10"
                                                        defaultValue={0.5} // Initial Position
                                                        onInput={(e) => {
                                                          const value = e.target.value;
                                                          e.target.previousSibling.style.width = `${(value / 10) * 100}%`;
                                                        }}
                                                        className="w-full h-[50px] appearance-none cursor-pointer"
                                                        style={{
                                                          WebkitAppearance: "none",
                                                          appearance: "none",
                                                          background: "transparent", // Hide default track
                                                        }}
                                                      />

                                                    </div>

                                                  </div>
                                                ))}

                                                <div className="absolute bottom-2 left-10 w-[80%] flex justify-between text-xs text-gray-500 mt-[100px]">
                                                  {Array.from({ length: 11 }).map((_, i) => (
                                                    <span key={i}>{i}</span>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                        </div>))}
                                    </div>

                                  </div>


                                ))}


                              </div>


                            </div>

                          )))
                          : ""}
                      <div className="fixed bottom-6 right-20 z-50">
                        <button
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", "create-scene");
                            // Set a custom drag image so the button doesn't visually move
                            const dragIcon = document.createElement("div");
                            dragIcon.style.width = "60px";
                            dragIcon.style.height = "60px";
                            dragIcon.style.background = "#3B82F6"; // blue-600
                            dragIcon.style.borderRadius = "9999px";
                            dragIcon.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
                            document.body.appendChild(dragIcon);
                            e.dataTransfer.setDragImage(dragIcon, 30, 30);
                            setTimeout(() => document.body.removeChild(dragIcon), 0); // clean up
                          }}
                          className="w-[60px] h-[60px] rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold shadow-lg flex items-center justify-center transition duration-300 cursor-pointer"
                          title="Create Scene"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>


                  {
                    modalOpen && (
                      <div className="mt-[100px]">
                        <CreateScenePopup />
                      </div>
                    )
                  }


                  <div className="fixed bottom-0 w-[80%] shrink bg-white shadow-inner py-2  z-50 flex justify-between ">
                    {selectedTemplate?.templateData[0]?.template?.flatMap((act) =>
                      act.predefinedBeat.map((beat, index) => {
                        const pastelColors = [
                          "bg-red-100",
                          "bg-orange-100",
                          "bg-yellow-100",
                          "bg-lime-100",
                          "bg-green-100",
                          "bg-teal-100",
                          "bg-cyan-100",
                          "bg-blue-100",
                          "bg-indigo-100",
                          "bg-purple-100",
                          "bg-pink-100",
                        ];
                        const pastel = pastelColors[index % pastelColors.length];

                        return (
                          <button
                            key={beat._id}
                            onClick={() =>
                              document
                                .getElementById(`scene-${beat._id}`)
                                ?.scrollIntoView({ behavior: "smooth", block: "start" })
                            }
                            className={`${pastel} text-gray-600 flex-1  py-2 text-sm rounded-md text-center hover:scale-105 transition-transform duration-200`}
                          >
                            {index + 1}
                          </button>
                        );
                      })
                    )}
                  </div>

                </div>

              )}
            </div>

          </div>
        </div>
      </div>


      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white rounded-lg w-[809px]">
            <div className="flex justify-between items-center py-[24px] px-[40px]">
              <h2 className="text-[19px] p-0 m-0 font-bold text-[#212131]">Create Scene</h2>
              <div className='text-xl cursor-pointer'>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 text-xl"
                >
                  <IoMdClose />
                </button>
              </div>
            </div>
            <div className='text-base font-normal border-t text-[#212131] border-b border-solid border-[#9999a072] py-[26px] px-[40px] '>
              <div className="flex gap-3">
                <div className='min-w-[104px] '>
                  <SceneEnvironmentDropdown
                    header=""
                    options={EnvironmentOptions}
                    currentSceneTime={selectedEnv}
                    onSelect={(e: any) => setSelectedEnv(e)}
                  />
                </div>

                {/* Location Input */}
                <div className="flex gap-2 flex-wrap lg:gap-6 min-w-[247px]">
                  <input
                    type="text"
                    placeholder="Enter Location"
                    value={selectedLocation.toUpperCase()}
                    className="bg-[#38228c] text-white px-3 border rounded-[16px] w-full text-[20px] font-poppins"
                    onChange={(e: any) =>
                      setSelectedLocation(e.target.value)
                    }
                  />
                </div>

                {/* Day/Night Dropdown */}
                <div className="flex gap-2 flex-wrap lg:gap-6 min-w-[215px]">
                  <SceneEnvironmentDropdown
                    options={SceneEnvironmentOptions}
                    header=""
                    currentSceneTime={selectedTime}
                    onSelect={(e: any) => setSelectedTime(e)}
                  />
                </div>
              </div>


              {/* Scene Title Input */}
              <label
                htmlFor="sceneTitle"
                className="text-[#6A6A75] text-base font-semibold font-poppins mt-6 block pb-2"
              >
                Enter Scene Title
              </label>
              <input
                type="text"
                placeholder="Enter Scene Title"
                value={sceneTitle}
                className="w-full rounded-[16px] border border-solid border-[#0000002b] bg-white shadow-inner p-4"
                onChange={(e) => setSceneTitle(e.target.value)}
              />

              {/* Scene Brief Textarea */}
              <label
                htmlFor="sceneTitle"
                className="text-[#6A6A75] text-base font-semibold font-poppins mt-6 block pb-2"
              >
                Write the Scene Brief
              </label>
              <textarea
                placeholder="Write the scene brief"
                value={sceneBrief}
                className="w-full rounded-[16px] border border-solid border-[#0000002b] bg-white shadow-inner p-4 h-[140px]"
                onChange={(e) => setSceneBrief(e.target.value)}
              ></textarea>
            </div>
            {/* Buttons */}
            <div className="flex gap-2 px-[24px] py-[12px] justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="w-[160px] py-[18px] px-[52px] border border-solid border-[#9999A0] rounded-2xl text-[#9999A0] text-center"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddScene()}
                className="w-[160px] py-[18px] px-[48px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>


  );
};

export default SceneCardFreeform;
