import React, { useEffect, useState } from 'react';
import FinalizeConfirmationModal from './FinalizeConfirmationModal';
import footericon1 from '@/assets/preWritingFooter/footer-icon-1.svg';
import footericon2 from '@/assets/preWritingFooter/footer-icon-2.svg';
import footericon3 from '@/assets/preWritingFooter/footer-icon-3.svg';
import footericon4 from '@/assets/preWritingFooter/footer-icon-4.svg';

import bottomicon1 from '@/assets/bottom-drop-icon-1.svg';
import bottomicon2 from '@/assets/bottom-drop-icon-2.svg';
import bottomicon3 from '@/assets/bottom-drop-icon-3.svg';
import bottomicon4 from '@/assets/bottom-drop-icon-4.svg';


import genicon from '@/assets/preWritingFooter/genrate-icon.svg';
import { useAddDraftLogline, useAddFinalLogline, useAddFreedomLogline, useUpdateDraftLogline } from '../api/save-draft';
import { useParams } from 'react-router';
import AllTemplatesModal from './AllTemplatesModal';
import TemplateModal from './TemplateModal';
import RemoveTemplatesModal from './RemoveTemplatesModal';
import { enqueueSnackbar } from 'notistack';
const LoglineEdit = ({
  templates,
  setslectedLogline,
  setLoglineStatus,
  iniialData,
  setiniialData,
  setDraftData
}: any) => {
  const [active, setActive] = useState(0);
  const [templatesdata, setTemplatesdata] = useState(null);
  const [genrateLoader, setGenrateLoader] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState<boolean>(false);
  const [templatesPopup, setTemplatesPopup] = useState(false);
  const [status, setStatus] = useState('draft');
const [draftTitle, setDraftTitle] = useState('')
    const { fileId  } = useParams<{ fileId: string; }>();
  const [formData, setFormData] = useState<any>({});
  const [proceed, setProceed] = useState(false);

  // const addDraftMutation = useAddDraftLogline();
  // const addFredomMutation = useAddFredomLogline();
  // const addFinalMutation = useAddFinalLogline();
  const draftMutation = useAddDraftLogline();
  const updateMutation = useUpdateDraftLogline();
  const finalMutation = useAddFinalLogline();
  const freedomMutation = useAddFreedomLogline();
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [logLine, setLogLine] = useState('');

  const [isCollapsed, setIsCollapsed] = useState(false);
  const className = 'Theme__Comparative';

  //   useEffect(() => {
  //     getDraftLoglineData();
  //   }, [fileId]);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getDraftLoglineData = () => {
    // getDraftLogline(fileId).then((draftLogline) => {
    //   setTemplatesdata(draftLogline.data.logline.loglineDrafts);
    // });
  };

  const toggleRemoveDropdown = () => {
    setIsRemoveOpen((prev) => !prev);
  };
  const handleOpenCreateFileDialog = () => {
    // createFilePopup(userCtx);
    setTemplatesPopup(true);
  };
  useEffect(() => {
    if (proceed) {
      if(active==0) {
      handlSubmitLogline();
      }else{
        handleWriteFreely()
      }
    }
  }, [proceed]);
  const areAllAnswersFilled = (
    templateOptions: { que: string; ans?: string }[],
  ): boolean => {
    return templateOptions.every(
      (option) => option.ans && option.ans.trim() !== '',
    );
  };
  useEffect(() => {
    if(iniialData?.draftTitle){
      
      setDraftTitle(iniialData?.draftTitle)
    }
  }, [iniialData])
  
  const handlSubmitLogline = () => {
    // if (areAllAnswersFilled(formData?.templateOptions)) {
    
      if (status === 'draft') {
        if(iniialData?._id){

          updateMutation.mutate({payload:{...formData,draftTitle:draftTitle},fileId,loglineId:iniialData?._id}, {
            onSuccess: (data) => enqueueSnackbar("Draft Logline Saved"),
            onError: (error) => enqueueSnackbar("Error Saving Draft"),
          });
        }else{

          draftMutation.mutate({...formData,draftTitle:draftTitle}, {
            onSuccess: (data) => enqueueSnackbar("Draft Logline Saved"),
            onError: (error) => enqueueSnackbar("Error Saving Draft"),
          });
        }
      } else {
        finalMutation.mutate({
          fileId:  formData.fileId,
          FinalLogline: formData?.FinalLogline,
        }, {
          onSuccess: (data) => enqueueSnackbar("Final Logline Saved"),
          onError: (error) => enqueueSnackbar("Error Saving Final"),
        });
        handleTemplateChange(formData?._id, 'id', false, 'finalize');
        getDraftLoglineData();
      }
      setProceed(false)
    // } else {
      // enqueueSnackbar('Please Fill all data', { variant: 'error' });
    // }
  };
  const handleWriteFreely = () => {
    if (!logLine.trim()) {
      // setError("Logline cannot be empty");
      return;
    } else {
      console.log(logLine);
      
      if (status === "draft") {
        freedomMutation.mutate({
          fileId: fileId,
          freeformLogline: logLine,
          draftTitle,
          isFinalized: false,
        }, {
          onSuccess: (data) => enqueueSnackbar("Freedom Logline Saved"),
          onError: (error) => enqueueSnackbar("Error Saving Freeform"),
        });
        // addFredomMutation({
        //   fileId: fileId,
        //   freeformLogline: logLine,
        //   isFinalized: false,
        // });
      } else if (status === "finalize") {

         finalMutation.mutate({
          fileId:  fileId,
          FinalLogline: logLine,
          draftTitle
        }, {
          onSuccess: (data) => enqueueSnackbar("Final Logline Saved"),
          onError: (error) => enqueueSnackbar("Error Saving Final"),
        });
      }
      getDraftLoglineData();

      // setError(""); // Clear error if validation passes

    }
  };
  const handleTemplateChange = (
    event: any,
    id: any,
    writeFreely: any,
    status: any,
  ) => {
    // console.log("eventid", writeFreely == "true", event, id, writeFreely, templatesdata);
    if (status == 'finalize') {
      setLoglineStatus('final');

    }
    
  };
  return (
    <>
      <div className="w-full p-10 overflow-hidden">
        <div className="rounded-[24px] w-full  pb-[40px] font-poppins h-[calc(100vh-200px)] overflow-hidden">
          <div
            className={
              className +
              ' ' +
              'w-full flex flex-col gap-y-0 scrollbar_wrapper'
            }
          >
            <section className="flex flex-row items-center justify-between px-6">
              <div className="flex flex-row items-center gap-x-4">
                <button
                  onClick={() => {
                    //   subTempName
                    //     ? setSearchParams({ subTemp: subTempName, writeFreely: "false" })
                    //     : setSearchParams({ writeFreely: "false" });
                    setActive(0);
                  }}
                  className={
                    `${active == 0 ? 'bg-black text-white' : 'bg-white text-black'}` +
                    ' py-5 px-10 rounded-t-[16px] font-medium text-sm'
                  }
                >
                  {templates?.templateName}
                </button>
                <button
                  onClick={() => {
                    //   subTempName
                    //     ? setSearchParams({ subTemp: subTempName, writeFreely: "true" })
                    //     : setSearchParams({ writeFreely: "true" });
                    setActive(1);
                  }}
                  className={
                    `${active == 1 ? 'bg-black text-white' : 'bg-white text-black'}` +
                    ' py-5 px-10 rounded-t-[16px] font-medium text-sm'
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
                    setiniialData={setiniialData}
                    setLoglineStatus={setLoglineStatus}
setslectedLogline={setslectedLogline}
setDraftData={setDraftData}
                  />
                )}
                {isRemoveOpen && (
                  <RemoveTemplatesModal
                    // refetch={refetch}
                    setTemplatesPopup={setIsRemoveOpen}
                    templatesdata={templatesdata}
                    handleTemplateChange={handleTemplateChange}
                  />
                )} 
                </div>

                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-[#42BA7B] hover:bg-[#50d490] rounded-full"
                  onClick={handleOpenCreateFileDialog}
                >
                  Add Template
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-full "
                  onClick={() => {
                    toggleRemoveDropdown();
                  }}
                >
                  Remove
                </button>
              </div>
            </section>

            <section
              className={` relative bg-white border-2 border-black rounded-3xl ${active != 2 && ' pl-[32px] pr-[16px] pt-[56px] pb-[50px] '} flex flex-col gap-y-8  max-h-[calc(100vh-270px)] overflow-y-hidden`}
            >
              <div className="w-full h-full flex flex-col gap-10 overflow-y-auto pr-[16px]">
                {active == 0 ? (
                  <>
                    {genrateLoader ? (
                      <section className="flex flex-col gap-y-3 mt-4">
                        loading..........
                      </section>
                    ) : (
                      templates && (
                        <div>
                          {templates?.subTemplate !== undefined &&
                          templates?.subTemplate !== null ? (
                            <></>
                          ) : (
                            templates.component && (
                              <div>
                                {React.cloneElement(templates.component, {
                                  // generateData,
                                  // finalize,
                                  // onFinalizeComplete,
                                  status,
                                  // clear,
                                  // setClear,
                                  setFormData,
                                  formData,
                                  // setFile,
                                  // setPreviewURL,
                                  // previewURL,
                                  // file,
                                  isSidebar: false,
                                  // initialValues,
                                  iniialData,
                                })}
                              </div>
                            )
                          )}
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <>
                    <section className="flex flex-col">
                      <>
                        <label htmlFor="textField" className="font-semibold text-base text-[#212131] mb-[16px]">
                          {'Your Logline'}
                        </label>
                        <textarea
                          name="textField"
                          rows={10}
                          value={logLine}
                          onChange={(e) => setLogLine(e.target.value)}
                          className="p-3 rounded-lg border border-[#BABABF]"
                          placeholder={
                            'In the near future, a jaded police officer tracks down a band of rogue androids who seek a longer life.'
                          }
                        ></textarea>
                      </>
                    </section>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-stretch gap-x-4 bg-black px-6 py-2 justify-center rounded-lg fixed bottom-0 w-full w ">
      <button className="px-4 bg-[#212131] rounded-2xl text-white">
                      <img
                        src={footericon1}
                        alt=""
                        className="h-[26px] w-[26px]"
                      />
                    </button>
                    <button className="px-4 bg-[#212131] rounded-2xl text-white">
                      <img
                        src={footericon2}
                        alt=""
                        className="h-[20px] w-[20px]"
                      />
                    </button>
                    <button className="px-4 bg-[#212131] rounded-2xl text-white">
                      <img
                        src={footericon3}
                        alt=""
                        className="h-[26px] w-[26px]"
                      />
                    </button>
                    <button className="px-4 bg-[#212131] rounded-2xl text-white">
                      <img
                        src={footericon4}
                        alt=""
                        className="h-[32px] w-[32px]"
                      />
                    </button>
        {/* jhgjgh */}
        <button
           className="generateGrdient px-[18px] py-[16px] rounded-2xl text-white font-medium flex flex-row items-center text-[16px] animation-btn"
          onClick={() => {
            if (active === 0) {
              //   handleGenerate();
            } else {
              // handleWriteFreely("generate")
            }
          }}
        >
          {/* <BsStars /> */}
          <img
                        src={genicon}
                        alt=""
                        className="h-[24px] w-[24px] pr-1"
                      />
          Generate
        </button>
        <button
          className="px-10 py-4 rounded-2xl w-[160px] bg-[#653EFF] font-medium text-white"
          onClick={() => {
            setStatus('finalize');
            setConfirmationPopup(true);
            // if (active === 0) {
            // } else {
            //     handleWriteFreely("finalize");
            // }
          }}
        >
          Finalize
        </button>
        <button
          className="px-10 py-4 rounded-2xl w-[160px] bg-[#4D4D5A] font-medium text-white"
          onClick={() => {
            setStatus('draft');
            setConfirmationPopup(true);
            // if (active === 0) {
            // } else {
            //     handleWriteFreely("draft");
            // }
          }}
        >
          Save Draft
        </button>
        <button className="px-8 py-4 rounded-2xl bg-[#4D4D5A] font-medium w-[160px] text-white">
          Collaboration
        </button>
        <div className="relative">
          <button 
            onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
            className="px-6 py-4 rounded-2xl bg-[#4D4D5A] flex items-center font-medium text-white"
          >
            ...
          </button>
          {isMoreDropdownOpen && (
            <ul className="absolute top-0 left-0 rounded-2xl shadow-lg custome-drop-down custome-drop-down-bottom font-poppins">
              <li>
                <span className='drop-tex'>Undo</span>
                <img src={bottomicon1} alt="" />
              </li>
              <li>
                <span className='drop-tex'>Redo</span>
                <img src={bottomicon2} alt="" />
              </li>
              <li>
                <span className='drop-tex'>Revert to original</span>
                <img src={bottomicon3} alt="" />
              </li>
              <li>
                <span className='drop-tex'>Delete</span>
                <img src={bottomicon4} alt="" />
              </li>
            </ul>
          )}
        </div>
      </div>
      {confirmationPopup && (
        <FinalizeConfirmationModal
          templatesPopup={confirmationPopup}
          setTemplatesPopup={setConfirmationPopup}
          setProceed={setProceed}
          status={status}
          draftTitle={draftTitle}
setDraftTitle={setDraftTitle}
          finalizeHeading={
            status === 'finalize' ? 'Finalize Logline' : 'Save Draft'
          }
          finalizeText={
            status === 'finalize'
              ? 'Are you sure you want to finalize this logline? This action will mark it as your official logline for this project.'
              : 'Are you sure you want to save this logline? This action will store your current Logline as a draft, allowing you to edit and refine it later.'
          }
        />
      )}
      {templatesPopup && <TemplateModal setiniialData={setiniialData} templatesPopup={templatesPopup} setTemplatesPopup={setTemplatesPopup}  setLoglineStatus={setLoglineStatus}  setslectedLogline={setslectedLogline}/>}
    </>
  );
};

export default LoglineEdit;
