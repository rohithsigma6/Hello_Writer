import React, { useEffect, useState } from 'react';

import footericon1 from '@/assets/preWritingFooter/footer-icon-1.svg';
import footericon2 from '@/assets/preWritingFooter/footer-icon-2.svg';
import footericon3 from '@/assets/preWritingFooter/footer-icon-3.svg';
import footericon4 from '@/assets/preWritingFooter/footer-icon-4.svg';
import genicon from '@/assets/preWritingFooter/genrate-icon.svg';
import LoglineOptions from './LoglineOptions';
import FinalizeConfirmationModal from './FinalizeConfirmationModal';
import { useAddFinalLogline, useAddFreedomLogline } from '../api/save-draft';
import { useParams } from 'react-router';
import { enqueueSnackbar } from 'notistack';
import AllTemplatesModal from './AllTemplatesModal';
import RemoveTemplatesModal from './RemoveTemplatesModal';
import TemplateModal from './TemplateModal';

const LoglineSelect = ({ setLoglineStatus, setslectedLogline ,setiniialData ,iniialData,loglineStatus,setDraftData}: any) => {
  const [showFields, setShowFields] = useState<boolean>();
  const [confirmationPopup, setConfirmationPopup] = useState(false);  
  
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
    const [templatesPopup, setTemplatesPopup] = useState(false);
      const [templatesdata, setTemplatesdata] = useState(null);
    const [proceed, setProceed] = useState(false);
    const [draftTitle, setDraftTitle] = useState('')
      const finalMutation = useAddFinalLogline();
      const freedomMutation = useAddFreedomLogline();
        const [status, setStatus] = useState('draft');
        const { fileId  } = useParams<{ fileId: string; }>();

        const toggleDropdown = () => {
          setIsDropdownOpen((prev) => !prev);
        };
      

      
        const toggleRemoveDropdown = () => {
          setIsRemoveOpen((prev) => !prev);
        };
        const handleOpenCreateFileDialog = () => {
          // createFilePopup(userCtx);
          setTemplatesPopup(true);
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
  const [logLine, setLogLine] = useState('');
  const [active, setActive] = useState(0);
  
  useEffect(() => {

    if(iniialData?.freeformLogline){
      // setLogLine()
      
      setActive(1)
      setShowFields(true);
      setLogLine(iniialData?.freeformLogline);
    }
  }, [iniialData])
  
    useEffect(() => {
      if (proceed) {
        handleWriteFreely();
      }
    }, [proceed]);
    const handleWriteFreely = () => {
      if (!logLine.trim()) {
        // setError("Logline cannot be empty");
        return;
      } else {
        if (status === "draft") {
          freedomMutation.mutate({
            fileId: fileId,
            freeformLogline: logLine,
            isFinalized: false,
            draftTitle
          }, {
            onSuccess: (data) => enqueueSnackbar('Draft save successfully'),
            onError: (error) => console.error("Error Saving Freeform:", error),
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
          }, {
            onSuccess: (data) => enqueueSnackbar("Final Logline Saved:", data),
            onError: (error) => console.error("Error Saving Final:", error),
          });
        }
        // getDraftLoglineData();
  
        // setError(""); // Clear error if validation passes
  
      }
      setProceed(false)
    };
  return (
    <div className="w-full p-10 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full px-[32px] pt-[40px] pb-[40px] font-poppins h-[calc(100vh-150px)] overflow-y-auto">
        <section>
          <p className="text-[#252C34] text-[40px] font-bold mb-[16px]">
            Write Your Logline
          </p>
          {/* <p className="mt-1 font-light">A logline is the heart of your screenplay, distilled into a single, powerful sentence. It's your story's elevator pitch, capturing the essence of your narrative and hooking your audience in seconds.</p> */}
        </section>
    <div className='flex justify-between'>
      
        <div className="flex flex-row rounded-xl items-center py-2 px-2 bg-[#E9E9EA] w-max">
          <button
            onClick={() => setActive(0)}
            className={
              `${active == 0 ? 'bg-white text-primary-blue' : 'bg-gray text-[#252C34]'}` +
              ' py-[8px] px-[12px]  font-medium text-[16px] rounded-lg min-w-[177px]'
            }
          >
            Choose a Templete
          </button>
          <button
            onClick={() => setActive(1)}
            className={
              `${active == 1 ? 'bg-white text-primary-blue' : 'bg-gray text-[#252C34]'}` +
              ' py-[8px] px-[12px]  font-medium text-[16px] rounded-lg min-w-[177px]'
            }
          >
            Freeform
          </button>
        </div>
        {iniialData?.freeformLogline && <div className="flex flex-row items-center gap-2">
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
                      </div>}
                      </div>
        {/* <p className="mt-1 font-light">Please select a template to help speed up your process.</p> */}

        <section className="flex flex-col gap-y-3 ">
          {active === 1 ? (
            <section className="">
              <p className="text-[#212131] font-semibold text-[18px] mb-0 mt-[40px]">
                Write Your Own Logline
              </p>
              <p className="mt-[16px] font-normal text-[#9999A0] text-[16px]">
                Fell free to write your logline without any template
                constraints. Aim for 25-30 words that capture the essence of
                your story.
              </p>

              <section className="mt-[32px]">
                <button
                  onClick={() => setShowFields(!showFields)}
                  className="px-[95px] py-[19px] text-white rounded-[16px] bg-primary-blue text-[16px] font-medium"
                >
                  Start Writing
                </button>
              </section>
              {showFields && (
                <>
                  <label
                    htmlFor="textField"
                    className="font-semibold block mt-[40px] mb-[16px]"
                  >
                    Your Logline
                  </label>
                  <textarea
                    name="textField"
                    rows={8}
                    value={logLine}
                    onChange={(e) => setLogLine(e.target.value)}
                    className="p-[16px] rounded-[16px] border border-[#BABABF] w-full"
                    placeholder={
                      'In the near future, a jaded police officer tracks down a band of rogue androids who seek a longer life.'
                    }
                  ></textarea>
                  {/* flex flex-row items-stretch gap-x-4 bg-black px-6 py-2 justify-end rounded-lg fixed bottom-0 w-full left-0 */}
                  <div className="flex flex-row items-stretch gap-x-3 bg-[#0E0E15] px-6 py-[12px] justify-center rounded-lg fixed bottom-0 w-full left-0">
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

                    <button
                      // className="px-10 py-3 rounded-lg text-white font-medium flex flex-row items-center gap-x-1 bg-gradient-to-bl from-[#003499] to-[#259999]"
                      className="generateGrdient px-[18px] py-[16px] rounded-2xl text-white font-medium flex flex-row items-center text-[16px] animation-btn"
                      onClick={() => {
                        // if(active === 0){
                        //   handleGenerate();
                        // }
                        // else{
                        // }
                      }}
                    >
                      <img
                        src={genicon}
                        alt=""
                        className="h-[24px] w-[24px] pr-1"
                      />
                      Generate
                    </button>
                    <button
                      className="px-[18px] py-[16px] rounded-2xl bg-[#653EFF] font-medium text-white text-[16px]"
                      onClick={() => {
                        // handleWriteFreely("finalize");
                        setStatus('finalize');
              setConfirmationPopup(true);
                      }}
                    >
                      Finalize
                    </button>
                    <button
                      className="px-[18px] py-[16px] rounded-2xl bg-[#4D4D5A] font-medium text-white text-[16px]"
                      onClick={() => {
                        // handleWriteFreely("draft");
                        setStatus('draft');
              setConfirmationPopup(true);
                      }}
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
                </>
              )}
            </section>
          ) : (
            <section className="flex flex-col mt-[16px] ">
              <p className=" text-[#9999A0] text-[20px] mb-[40px]">
                Please select a template to help speed up your process.
              </p>
              <LoglineOptions
              setiniialData={setiniialData}
                setLoglineStatus={setLoglineStatus}
                setslectedLogline={setslectedLogline}
                loglineStatus={loglineStatus}
              />
            </section>
          )}
        </section>
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

    </div>
  );
};

export default LoglineSelect;
