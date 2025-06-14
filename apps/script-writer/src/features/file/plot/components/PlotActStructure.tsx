import React, { useState, useEffect } from 'react';
import AllTemplatesModal from './AllTemplatesModal';
import { HiOutlineCube } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from 'react-icons/io';
import { SlOptions } from 'react-icons/sl';
import { RiDeleteBinLine } from 'react-icons/ri';
import TemplateWrapper from './TemplateWrapper';
import {
  useNavigate,
  Link,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router';
import PlotToolbar from './Beat/PlotToolbar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PlotTemplateCompare from './PlotTemplateCompare';
import PlotTemplateMain from './PlotTemplateMain';
import { FiUsers } from 'react-icons/fi';
import { FiLoader } from 'react-icons/fi';
import { BsChatLeftDots } from 'react-icons/bs';
import { RiExpandDiagonalLine } from 'react-icons/ri';
import { MdOutlineZoomInMap } from 'react-icons/md';
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { FaEdit, FaTrash, FaPlus, FaRegStar } from 'react-icons/fa';
import { IoOptionsOutline } from 'react-icons/io5';
import { HiOutlinePresentationChartLine } from 'react-icons/hi2';
import { savePlotTemplate, getPlotsByFile } from '../api/get-all-templates';
import footericon1 from '../../../../assets/preWritingTools/footer-icon-1.svg';
import footericon2 from '../../../../assets/preWritingTools/footer-icon-2.svg';
import footericon3 from '../../../../assets/preWritingTools/footer-icon-3.svg';
import footericon4 from '../../../../assets/preWritingTools/footer-icon-4.svg';
import genicon from '../../../../assets/preWritingTools/genrate-icon.svg';
import { IoMdClose } from 'react-icons/io';
import plottoolicon1 from '@/assets/plot-tool-icon-1.svg';
import plottoolicon2 from '@/assets/plot-tool-icon-2.svg';
import plottoolicon3 from '@/assets/plot-tool-icon-3.svg';
import plottoolicon4 from '@/assets/plot-tool-icon-4.svg';
import plottoolicon5 from '@/assets/plot-tool-icon-5.svg';
import plottoolicon6 from '@/assets/plot-tool-icon-6.svg';
import plottoolicon7 from '@/assets/plot-tool-icon-7.svg';
import plottoolicon8 from '@/assets/plot-tool-icon-8.svg';
import { getAllTemplates } from "../api/get-all-templates";
import { FaChevronDown, FaChevronUp, FaCube, FaCubes } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import cubeplot from "@/assets/cube-plot.svg"

interface PredefinedBeat {
  title: string;
  description: string;
}

interface Template {
  title: string;
  predefinedBeat: PredefinedBeat[];
}

interface PlotType {
  _id: string;
  type: string;
  template: Template[];
}
const PlotActStructure = () => {
  const type = 'plot';

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [handleTemplateChange, setHandleTemplateChange] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const templateId = searchParams.get('id');
  const writeFreely = searchParams.get('writeFreely');
  const isPlotCompare = searchParams.get('isPlotCompare');
  const subTempName = searchParams.get('subTemp');
  const [itemLink, setItemLink] = useState<any>();
  const [templatesdata, setTemplatesdata] = useState(null);
  const [templates, setTemplates] = useState<any>();
  const [active, setActive] = useState(1);
  const [editorView, setEditorView] = useState();
  const [genrateLoader, setGenrateLoader] = useState(false);
  const [templatesPopup, setTemplatesPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [status, setStatus] = useState('draft');
  const [proceed, setProceed] = useState(false);
  const [logLine, setLogLine] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tab, setTab] = useState();
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState('');
  const parts = location.pathname.split('/');
  const templateIndex = parts.indexOf('template');
  const templateName = templateIndex !== -1 ? parts[templateIndex + 1] : null;
  const [isOpen, setIsOpen] = useState(false);
  const [isFinalizeOpen, setIsFinalizeOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [isAddTemplate, setIsAddTemplate] = useState(false);
  const [selectedType, setSelectedType] = useState<PlotType | null>(null);

  const [allTemplates, setAllTemplates] = useState<PlotType[]>([]);
  const [expandedActs, setExpandedActs] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: number | null;
  }>({});
  //   const [templateData, setTemplateData] = useState(initialTemplateData);
  const [data, setData] = useState([]);
  const { fileId } = useParams();
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedTemplateData, setSelectedTemplateData] = useState({
    type: 'freeform',
    template: [],
  });

  const toRoman = (num) => {
    const romanNumerals = [
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
      'X',
    ];
    return num <= romanNumerals.length ? romanNumerals[num - 1] : num;
  };
  const addAct = () => {
    const newActIndex = selectedTemplateData.template.length + 1;
    const newAct = {
      title: `ACT - ${toRoman(newActIndex)}`,
      predefinedBeat: [],
    };

    setSelectedTemplateData((prevData: any) => ({
      ...prevData,
      template: [...prevData.template, newAct],
    }));
    console.log(selectedTemplateData);
  };


  const renameAct = (index, newTitle) => {
    setSelectedTemplateData((prev) => {
      const updatedTemplate = [...prev.template];
      updatedTemplate[index].title = newTitle;
      return { ...prev, template: updatedTemplate };
    });
  };

  const handleSaveDraft = () => {
    if (!draftTitle.trim()) {
      alert('Please enter a draft title!');
      return;
    }
    console.log('DRAFT CLICKED');
    setClickedButton(`Draft-${draftTitle}`);
    setIsOpen(false);
  };
  const handleWriteFreely = (value: any) => {

    setClickedButton(`finalized-${Date.now()}`);
    setIsFinalizeOpen(false);
  };
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getAllTemplates();
        const templates = response.data
        console.log("getAllTemplates", templates);
        setAllTemplates(templates);

        if (templates.length > 0) {
          setSelectedType(templates[0]);

          // Expand all acts for all templates
          const initialState = templates.reduce((acc, template) => {
            template.template.forEach((act) => {
              acc[act.title] = true;
            });
            return acc;
          }, {});

          setExpandedActs(initialState);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleProceed = () => {
    // setSelectedType(decodeURIComponent(template))

    if (selectedType) {
      setIsAddTemplate(false)
      navigate(`/file/${fileId}/plot/template/${selectedType.type}`);
    } else {
      alert("Please select a template before proceeding.");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = [];

        if (fileId) {
          result = await getPlotsByFile(fileId);
          console.log('Result is ', result);
        }
        let matchingTemplate;
        if (writeFreely == false) {
          const matchingTemplate = result.find((template: any) => template.templateType == decodeURIComponent(templateName));
          console.log('Matching template:', matchingTemplate);
        } else {
          const matchingTemplate = result.find((template: any) => template.templateType == "freeform");
          console.log('Matching template:', matchingTemplate);
        }
        if (matchingTemplate) {
          setSelectedTemplateData(matchingTemplate.templateData);
          setSelectedTemplateId(matchingTemplate._id);

          // Expand all acts by default
          const expandedState: { [key: string]: boolean } = {};
          matchingTemplate?.templateData?.template?.forEach((act: any) => {
            expandedState[act.title] = true;
          });
          setExpandedActs(expandedState);
          console.log(expandedState)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fileId, writeFreely]);

  useEffect(() => {
    if (templates && templates?.subTemplate && subTempName) {
      setTab(
        templates.subTemplate
          ? templates.subTemplate.find((sub: any) => sub.link === subTempName)
            ?.component
          : templates.component,
      );
      if (subTempName && !itemLink) {
        setItemLink(subTempName);
      }
    }
  }, [itemLink, templates, templateId]);

  useEffect(() => {
    console.log('Draft Title is ', draftTitle);
    const saveDraft = async () => {
      try {
        if (active == 1) {
          if (clickedButton?.split('-')[0] == 'Draft') {
            let payload = {
              templateData: selectedTemplateData,
              status: 'draft',
              fileId: fileId,
              templateType: 'freeform',
              draftTitle: draftTitle,
            };
            console.log(payload);
            await savePlotTemplate(payload);
            console.log('saved draft');
          } else {

            let payload = {
              templateData: selectedTemplateData,
              status: 'finalize',
              fileId: fileId,
              templateType: 'freeform',
              draftTitle: "FREEFORM",
            };
            console.log(payload);
            await savePlotTemplate(payload);
            console.log('saved draft');

          }
        }
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    };
    saveDraft();
  }, [clickedButton]);

  useEffect(() => {
    if (!templateId) {
      setLogLine('');
    }
  }, [templateId]);

  useEffect(() => {
    console.log('writeFreely>>>>>>>>>>>', writeFreely, writeFreely == 'true');
    if (writeFreely == 'true') {
      setActive(1);
    } else if (isPlotCompare == 'true') {
      setActive(2);
    } else {
      setActive(0);
    }
  }, [writeFreely]);

  const handleOpenCreateFileDialog = () => {
    setTemplatesPopup(true);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prev: any) => !prev);
    setHandleTemplateChange(`TRUE-${Date.now()}`);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleRemoveDropdown = () => {
    setIsRemoveOpen((prev: any) => !prev);
  };

  const toggleAct = (title: any) => {
    setExpandedActs((prev) => ({
      ...prev,
      [title]: !prev[title], // Toggle open/close
    }));
  };
  useEffect(() => {
    if (writeFreely == true) {
      setActive(1)
    }
  }, [])
  const handleInputChange = (
    actTitle: string,
    beatId: number,
    field: string,
    value: string
  ) => {
    setSelectedTemplateData((prevData) => {
      const updatedTemplate = prevData?.template?.map((act: any) => {
        if (act.title !== actTitle) return act;

        const updatedBeats = act.predefinedBeat?.map((beat: any) => {
          if (beat.id === beatId) {
            return { ...beat, [field]: value };
          }
          return beat;
        });

        return { ...act, predefinedBeat: updatedBeats };
      });

      return { ...prevData, template: updatedTemplate };
    });
  };

  const addBeatCard = (actTitle) => {
    setSelectedTemplateData((prev) => {
      const updatedTemplate = prev.template.map((act) => {
        if (act.title === actTitle) {
          return {
            ...act,
            predefinedBeat: [
              ...act.predefinedBeat,
              {
                id: crypto.randomUUID(), // Assigning Unique ID
                title: `New Beat ${act.predefinedBeat.length + 1}`,
                description: '',
                isPredefined: false,
              },
            ],
          };
        }
        return act;
      });
      return { ...prev, template: updatedTemplate };
    });
  };

  const deleteBeatCard = (actTitle, id) => {
    setSelectedTemplateData((prev) => {
      const updatedTemplate = prev.template.map((act) => {
        if (act.title === actTitle) {
          const updatedBeats = act.predefinedBeat.filter(
            (beat) => beat.id !== id,
          );
          return { ...act, predefinedBeat: updatedBeats };
        }
        return act;
      });
      return { ...prev, template: updatedTemplate };
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Prevent errors if something goes wrong
    if (!source || !destination) return;

    setSelectedTemplateData((prev) => {
      const newTemplate = [...prev.template];

      // Find source and destination acts
      const sourceAct = newTemplate.find(
        (act) => act.title === source.droppableId,
      );
      const destinationAct = newTemplate.find(
        (act) => act.title === destination.droppableId,
      );

      if (!sourceAct || !destinationAct) return prev;

      // Extract the moved item
      const [movedItem] = sourceAct.predefinedBeat.splice(source.index, 1);

      // Add to destination act at the correct index
      destinationAct.predefinedBeat.splice(destination.index, 0, movedItem);

      return { ...prev, template: newTemplate };
    });
  };

  return (
    <div className="w-full mt-[32px] ml-[40px] mr-[40px] overflow-hidden">
      <div className="rounded-[24px] w-full  pb-[40px] font-poppins h-[calc(100vh-170px)] overflow-hidden">
        <div className={'w-full flex flex-col gap-y-0 scrollbar_wrapper'}>
          <section className="flex flex-row items-center justify-between px-6">
            <div className="flex flex-row items-center gap-x-4">
              <button
                onClick={() => {
                  subTempName
                    ? setSearchParams({
                      subTemp: subTempName,
                      writeFreely: 'false',
                    })
                    : setSearchParams({ writeFreely: 'false' });
                }}
                className={
                  `${active == 0 ? 'bg-[#212131] text-white' : 'bg-white text-[#212131]'}` +
                  ' py-5 px-10 rounded-t-lg font-medium text-[12px] min-w-[192px]'
                }
              >
                {decodeURIComponent(templateName)}
              </button>
              <button
                onClick={() => {
                  subTempName
                    ? setSearchParams({
                      subTemp: subTempName,
                      writeFreely: 'true',
                    })
                    : setSearchParams({ writeFreely: 'true' });
                }}
                className={
                  `${active == 1 ? 'bg-[#212131] text-white' : 'bg-white text-[#212131]'}` +
                  ' py-5 px-10 rounded-t-lg font-medium text-[12px] min-w-[192px]'
                }
              >
                Freeform
              </button>

            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="px-4 py-2 text-sm font-medium bg-slate-300 hover:bg-slate-200 rounded-full flex items-center gap-x-1"
                >
                  {'View all'}
                </button>

                {isDropdownOpen && (
                  <AllTemplatesModal
                    // refetch={refetch}
                    setTemplatesPopup={setIsDropdownOpen}
                    templatesdata={templatesdata}
                    handleTemplateChange={handleTemplateChange}
                  />
                )}
              </div>

              <button
                className="px-4 py-2 text-sm font-medium text-white bg-[#42BA7B] hover:bg-[#50d490] rounded-full"
                onClick={() => setIsAddTemplate(true)}
              >
                Add Template
              </button>
              {isAddTemplate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 h-full">
                <div className="relative bg-white p-6 rounded-[24px] shadow-lg w-[924px] overflow-hidden">
                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                    onClick={() => setIsAddTemplate(false)}
                  >
                    &times;
                  </button>
          
                  <h1 className='font-extrabold mb-4'>Plot Templates</h1>
                  <hr className='mt-4 mb-4 w-full' />
          
                  <div className="w-full font-poppins">
                    <div className="flex flex-row items-start max-h-[calc(100%-200px)] overflow-y-auto">
                      {/* Sidebar */}
                      <div className="min-w-[221px] max-w-[221px] h-full bg-white pr-4 sticky top-0 overflow-y-auto max-h-[calc(100vh-440px)] pb-[30px]">
                        {allTemplates?.map((item) => (
                          <div key={item._id}>
                            <div
                              className={`py-3 pl-2 text-sm cursor-pointer rounded-[8px] font-normal ${
                                selectedType?._id === item._id
                                  ? "bg-purple-100"
                                  : "hover:bg-gray-100"
                              }`}
                              onClick={() => setSelectedType(item)}
                            >
                              {item.type}
                            </div>
                          </div>
                        ))}
                      </div>
          
                      {/* Content */}
                      <div className="flex-1 bg-gray-50 px-6 h-full overflow-y-auto max-h-[calc(100vh-440px)]">
                        {selectedType ? (
                          <div>
                            {selectedType.template.map((act) => (
                              <div key={act.title} className="mb-4 w-full m-auto">
                                <div
                                  className="flex flex-row-reverse justify-end gap-2 items-center bg-white py-[18px] px-[10px] cursor-pointer border border-gray-300 rounded-[6px]"
                                  onClick={() => toggleAct(act.title)}
                                >
                                  <h3 className="text-[#212131] text-[12px] font-bold">
                                    {act.title}
                                  </h3>
                                  <span className="text-[#212131] text-[12px]">
                                    {expandedActs[act.title] ? (
                                      <FaChevronDown />
                                    ) : (
                                      <FaChevronRight />
                                    )}
                                  </span>
                                </div>
          
                                {expandedActs[act.title] && (
                                  <div className="mt-4 rounded-lg">
                                    {act.predefinedBeat.map((beat) => (
                                      <div
                                        key={beat.title}
                                        className="p-[10px] bg-[#E7EDF3] rounded-[6px] mb-2 border border-[#0000001e]"
                                      >
                                        <h4 className="text-sm flex items-center gap-1">
                                          <span className="text-gray-600">
                                            <img src={cubeplot} alt="" />
                                          </span>
                                          <span className="text-[#212131] text-[12px] font-normal">
                                            {beat.title}
                                          </span>
                                        </h4>
                                        {beat.description && (
                                          <p className="text-[#212131] text-[12px] font-normal mt-2 px-[10px] border-t border-[#00000039] pt-[10px]">
                                            {beat.description}
                                          </p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center">
                            Select a template to view details
                          </p>
                        )}
                      </div>
                    </div>
          
                    {/* Footer */}
                    <section className="flex flex-row items-center mt-6 gap-x-4 justify-end pr-6">
                      <button
                        className="py-[18px] px-[74px] border border-solid border-[#9999A0] rounded-2xl text-[#9999A0]"
                        onClick={() => setIsAddTemplate(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="py-[18px] px-[45px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
                        onClick={handleProceed}
                      >
                        Select and Proceed 
                      </button>
                    </section>
                  </div>
                </div>
              </div>
              )}


              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-400 hover:bg-[#E4B4B4] rounded-full"
                onClick={toggleDropdown}
              >
                Remove
              </button>
              {isDropdownOpen && (
                <AllTemplatesModal
                  // refetch={refetch}
                  setTemplatesPopup={setIsDropdownOpen}
                  templatesdata={templatesdata}
                  handleTemplateChange={handleTemplateChange}
                />
              )}
            </div>
          </section>

          <section
            className={`${type !== "plot" && "bg-white"} relative ${active == 2 && "bg-white"} border-2 border-black rounded-3xl ${active != 2 && " pl-[24px]  pr-[8px] pt-[24px] pb-[10px] "} flex flex-col gap-y-8  h-full overflow-y-auto`}
          >
            <div className="w-full h-full flex flex-col gap-10  overflow-y-auto">
              {active == 0 ? (

                <>

                  <PlotTemplateMain selectedTemplate={templateName} clickedButton={clickedButton} draftTitle={draftTitle} />

                  {genrateLoader ? (
                    <section className="flex flex-col gap-y-3 mt-4">
                      loading..........
                    </section>
                  ) : (
                    templates && (
                      <div>
                        {templates?.subTemplate !== undefined &&
                          templates?.subTemplate !== null ? (
                          templates.templateName.find((sub: any) =>
                            sub.link === subTempName ? subTempName : itemLink,
                          )?.component && (
                            <div>
                              <div className="flex pb-2 border-b-2 mb-8 gap-4">
                                {templates?.templateName?.map(
                                  (item: any, index: any) => (
                                    <h2
                                      key={index}
                                      className={`cursor-pointer text-${itemLink == item.link ? 'primary-blue' : ''}`}
                                      onClick={() => {
                                        setItemLink(item.link);
                                        searchParams.set('subTemp', item.link);
                                        console.log(
                                          'item.linkitem.link',
                                          searchParams,
                                        );
                                        setSearchParams(searchParams);

                                        // navigate(`/file/${fileId}/${type}/template/${item.link}?writeFreely="false"`);
                                      }}
                                    >
                                      {/* {console.log("item>>>>>>>", item.link, type)} */}
                                      {item.templateName}
                                    </h2>
                                  ),
                                )}
                              </div>
                            </div>
                          )
                        ) : type === 'plot' && templates.mainComponent ? (
                          <div>
                            <PlotToolbar />
                          </div>
                        ) : (
                          templates.component && <div> </div>
                        )}
                      </div>
                    )
                  )}
                </>
              ) : active === 2 ? (
                <PlotTemplateCompare />
              ) : (
                <>
                  <section className="flex flex-col gap-y-3">
                    <>
                      <>
                        <div>
                          <div className="flex items-center justify-between bg-white w-max p-[10px] rounded-2xl font-poppins">
                            {/* Left Icons */}
                            <div className="flex gap-1 items-center">
                              <button className="rounded-lg hover:bg-gray-200">
                                <img
                                  src={plottoolicon1}
                                  alt="plottoolicon1"
                                  className="text-gray-600"
                                />
                              </button>
                              <button className="rounded-lg hover:bg-gray-200">
                                <img
                                  src={plottoolicon2}
                                  alt="plottoolicon2"
                                  className="text-gray-600"
                                />
                              </button>
                              <button className="rounded-lg hover:bg-gray-200">
                                <img
                                  src={plottoolicon3}
                                  alt="plottoolicon3"
                                  className="text-gray-600"
                                />
                              </button>

                              <div
                                className="w-[1px] h-[20px] bg-[#E9E9EA] mx-2
        "
                              ></div>

                              <button className="rounded-lg hover:bg-gray-200">
                                <img
                                  src={plottoolicon4}
                                  alt="plottoolicon4"
                                  className="text-gray-600"
                                />
                              </button>
                              <button className="rounded-lg hover:bg-gray-200">
                                <img
                                  src={plottoolicon5}
                                  alt="plottoolicon5"
                                  className="text-gray-600"
                                />
                              </button>
                              <button className="rounded-lg hover:bg-gray-200">
                                <img
                                  src={plottoolicon6}
                                  alt="plottoolicon6"
                                  className="text-gray-600"
                                />
                              </button>
                              <button className="rounded-lg hover:bg-gray-200">
                                <img
                                  src={plottoolicon7}
                                  alt="plottoolicon7"
                                  className="text-gray-600"
                                />
                              </button>
                              <div
                                className="w-[1px] h-[20px] bg-[#E9E9EA] mx-2
        "
                              ></div>
                              <button className="rounded-lg hover:bg-gray-200">
                                <img
                                  src={plottoolicon8}
                                  alt="plottoolicon8"
                                  className="text-gray-600"
                                />
                              </button>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-2 ms-[55px]">
                              <button className="border border-[#653EFF] py-[6px] px-[12px] rounded-[16px] text-[#653EFF] flex items-center gap-2" onClick={() => addAct()}>
                                <IoMdAdd className="text-[#653EFF] font-normal" />  <span className="text-[#653EFF]">Add act</span>
                              </button>
                              <button className="border border-[#653EFF] py-[6px] px-[12px] rounded-[16px] text-[#653EFF] flex items-center gap-2">
                                <IoMdAdd className="text-[#653EFF] font-normal" />  <span className="text-[#653EFF]">Create template</span>
                              </button>
                            </div>
                          </div>
                          <DragDropContext onDragEnd={onDragEnd}>
                            <div className="max-w-xxl flex h-auto overflow-x-auto">
                              {selectedTemplateData.template.map(
                                (act, actIndex) => (
                                  <div key={actIndex} className="mb-6 mr-4">
                                    <div className="mb-3 w-80 p-4 rounded-lg cursor-pointer flex justify-between bg-white items-center">
                                      <h2
                                        onClick={() => toggleAct(act.title)}
                                        className="font-bold text-[12px] text-[#212131] flex"
                                      >
                                        <span className="text-gray-500 text-lg mr-2">
                                          {expandedActs[act.title] ? (
                                            <IoIosArrowDown />
                                          ) : (
                                            <IoIosArrowUp />
                                          )}
                                        </span>
                                        <input
                                          type="text"
                                          className="bg-transparent border-b border-gray-300 focus:outline-none"
                                          value={act.title}
                                          onChange={(e) =>
                                            renameAct(actIndex, e.target.value)
                                          }
                                        />
                                      </h2>
                                      <span
                                        onClick={() => addBeatCard(act.title)}
                                        className="text-gray-500 text-lg cursor-pointer"
                                      >
                                        <IoMdAdd />
                                      </span>
                                    </div>

                                    {expandedActs[act.title] && (
                                      <Droppable
                                        droppableId={act.title}
                                        type="content"
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="min-h-[50px]"
                                          >
                                            <ul>
                                              {act.predefinedBeat.map(
                                                (item, index) => (
                                                  <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                  >
                                                    {(provided, snapshot) => (
                                                      <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`p-4 mb-3 rounded-lg border bg-[#E7EDF3] border-gray-300 flex flex-col ${snapshot.isDragging ? 'opacity-50' : ''}`}
                                                      >
                                                        <div className="flex items-center justify-between">
                                                          <div className="flex items-center w-full">
                                                            <div className="mr-2 bg-gray-200 p-2 rounded-full">
                                                              <HiOutlineCube
                                                                style={{
                                                                  color: 'gray',
                                                                }}
                                                              />
                                                            </div>
                                                            <input
                                                              type="text"
                                                              className="font-medium text-[12px] text-[#212131] bg-transparent border-b border-gray-300 focus:outline-none"
                                                              value={item.title}
                                                              onChange={(e) =>
                                                                handleInputChange(act.title, item.id, "title", e.target.value)
                                                              }
                                                            />
                                                          </div>
                                                          {!item.isPredefined && (
                                                            <RiDeleteBinLine
                                                              className="text-red-500 cursor-pointer"
                                                              onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteBeatCard(
                                                                  act.title,
                                                                  item.id,
                                                                );
                                                              }}
                                                            />
                                                          )}
                                                        </div>

                                                        <textarea
                                                          className="w-full text-gray-500 mt-2 text-[12px] border bg-[#E7EDF3] border-[#d9e7f4] rounded-lg p-2 resize-none"
                                                          placeholder="Enter description"
                                                          value={
                                                            item.description
                                                          }
                                                          onChange={(e) =>
                                                            handleInputChange(act.title, item.id, "description", e.target.value)
                                                          }
                                                          rows={4}
                                                        />
                                                      </li>
                                                    )}
                                                  </Draggable>
                                                ),
                                              )}
                                              {provided.placeholder}
                                            </ul>
                                          </div>
                                        )}
                                      </Droppable>
                                    )}
                                  </div>
                                ),
                              )}
                            </div>
                          </DragDropContext>
                          {/* <PlotTemplateMain selectedTemplate="freely" clickedButton={clickedButton} draftTitle={draftTitle}/> */}
                        </div>
                      </>
                      {error && <p className="text-red-500">{error}</p>}
                    </>
                  </section>
                </>
              )}
            </div>
          </section>
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

          <button
            className="generateGrdient px-[18px] py-[16px] rounded-2xl text-white font-medium flex flex-row items-center text-[16px] animation-btn"
            onClick={() => {
              setClickedButton('Generate');
            }}
          >
            <img src={genicon} alt="" className="h-[24px] w-[24px] pr-1" />
            Generate
          </button>
          <button
            className="px-[18px] py-[16px] rounded-2xl bg-[#653EFF] font-medium text-white text-[16px]"
            onClick={() => setIsFinalizeOpen(true)}
          >
            Finalize
          </button>

          <button
            className="px-[18px] py-[16px] rounded-2xl bg-[#4D4D5A] font-medium text-white text-[16px]"
            onClick={() => setIsOpen(true)}
          >
            Save Draft
          </button>

          <button className="px-[18px] py-[16px] rounded-2xl bg-[#4D4D5A] font-medium text-white text-[16px]">
            Collaboration
          </button>
          <button className="px-[18px] py-[16px] rounded-2xl bg-[#4D4D5A] font-medium text-white text-[16px]">
            ...
          </button>
        </div>
      </div>
      <div>
        {/* Button to Open Modal */}

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 flex z-[99999] items-center justify-center bg-black bg-opacity-50">
            <div className="relative font-poppins z-[9999] transform overflow-hidden bg-white text-left shadow-xl transition-all rounded-3xl w-[560px]">
              <div className="flex justify-between items-center py-[24px] px-[40px]">
                <p className="text-[19px] p-0 m-0 font-bold text-[#212131]">
                  Enter Draft Title
                </p>
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <IoMdClose />
                </div>
              </div>

              <p className="text-base font-normal border-t text-[#212131] border-b border-solid border-[#9999a072] py-[26px] px-[40px]">
                <p className="text-[#212131] text-base font-normal py-2">
                  Add Draft Title
                </p>
                <input
                  type="text"
                  className="w-full rounded-[16px] border border-solid border-[#0000002b] bg-white shadow-inner p-4"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                />
              </p>

              <div className="flex gap-2 px-[24px] py-[12px] justify-end">
                <button
                  className="w-[160px] py-[18px] px-[52px] border border-solid border-[#9999A0] rounded-2xl text-[#9999A0] text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="w-[160px] py-[18px] px-[48px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
                  onClick={handleSaveDraft}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {isFinalizeOpen && (
          <div className="fixed inset-0 flex z-[99999] items-center justify-center bg-black bg-opacity-50">
            <div className="relative font-poppins z-[9999] transform overflow-hidden bg-white text-left shadow-xl transition-all rounded-3xl w-[560px]">
              <div className="flex justify-between items-center py-[24px] px-[40px]">
                <h2 className="text-[19px] p-0 m-0 font-bold text-[#212131]">
                  Finalize Plot
                </h2>
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => {
                    setIsFinalizeOpen(false);
                  }}
                >
                  <IoMdClose />
                </div>
              </div>

              <p className="text-base font-normal border-t text-[#212131] border-b border-solid border-[#9999a072] py-[26px] px-[40px]">
                Are you sure you want to finalize this plot? This action will
                mark it as your official plot for this project.
              </p>

              <div className="flex gap-2 px-[24px] py-[12px] justify-end">
                <button
                  className="w-[160px] py-[18px] px-[52px] border border-solid border-[#9999A0] rounded-2xl text-[#9999A0] text-center"
                  onClick={() => setIsFinalizeOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="w-[160px] py-[18px] px-[48px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
                  onClick={handleWriteFreely}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlotActStructure;
