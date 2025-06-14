import React, { useEffect, useState } from 'react';
import FinalizeConfirmationModal from './FinalizeConfirmationModal';
import footericon1 from '@/assets/preWritingFooter/footer-icon-1.svg';
import footericon2 from '@/assets/preWritingFooter/footer-icon-2.svg';
import footericon3 from '@/assets/preWritingFooter/footer-icon-3.svg';
import footericon4 from '@/assets/preWritingFooter/footer-icon-4.svg';
import genicon from '@/assets/preWritingFooter/genrate-icon.svg';
import { useParams } from 'react-router';
import AllTemplatesModal from './AllTemplatesModal';
import TemplateModal from './TemplateModal';
import RemoveTemplatesModal from './RemoveTemplatesModal';
import { useAddDraftTheme, useAddFinalTheme, useAddFreedomTheme, useUpdateDraftTheme } from '../api/save-draft';
import { enqueueSnackbar } from 'notistack';

const ThemeEdit = ({
  templates,
  setslectedTheme,
  setThemeStatus,
  iniialData,
  setiniialData,
  setDraftData
}: any) => {
  const [active, setActive] = useState(0);
  const [templatesdata, setTemplatesdata] = useState(null);
  const [genrateLoader, setGenrateLoader] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [templatesPopup, setTemplatesPopup] = useState(false);
  const [status, setStatus] = useState('draft');
  const [draftTitle, setDraftTitle] = useState('')

  const { fileId } = useParams<{ fileId: string; }>();
  const [formData, setFormData] = useState<any>({});

  const draftMutation = useAddDraftTheme();
  const finalMutation = useAddFinalTheme();
  const freedomMutation = useAddFreedomTheme();
    const updateMutation = useUpdateDraftTheme();
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [theme, setTheme] = useState('');
    const [proceed, setProceed] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const className = 'Theme__Comparative';

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getDraftThemeData = () => {
    // getDraftTheme(fileId).then((draftTheme) => {
    //   setTemplatesdata(draftTheme.data.theme.themeDrafts);
    // });
  };

  const toggleRemoveDropdown = () => {
    setIsRemoveOpen((prev) => !prev);
  };

  const handleOpenCreateFileDialog = () => {
    setTemplatesPopup(true);
  };

  useEffect(() => {
    if (proceed) {
      if(active==0) {
        handleSubmitTheme();
        }else{
          handleWriteFreely()
        }
    }
  }, [proceed, confirmationPopup]);

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
  }, [iniialData]);

  function convertAnswersToArray(data:any) {
    return data.map((item:any) => {
      // Check if the answer is already an array; if not, convert it to an array
      if (typeof item.ans === 'string') {
        item.ans = [item.ans]; // Convert string to array
      }
      return item;
    });
  }
  const handleSubmitTheme = () => {
    if (status === 'draft') {
      console.log(formData);
      
      if(iniialData?._id){
 updateMutation.mutate({payload:{...formData,draftTitle:draftTitle,templateOptions:convertAnswersToArray(formData?.templateOptions)},fileId,themeId:iniialData?._id}, {
            onSuccess: (data) => enqueueSnackbar("Draft Theme Saved"),
            onError: (error) => enqueueSnackbar("Error Saving Draft"),
          });
          setProceed(false);
        }else{
          
          draftMutation.mutate({...formData,draftTitle}, {
            onSuccess: (data) => console.log("Draft Theme Saved:", data),
            onError: (error) => console.error("Error Saving Draft:", error),
          });
          setProceed(false);
        }
        
      } else {
        finalMutation.mutate({
          fileId: formData.fileId,
          finalTheme: formData,
        }, {
          onSuccess: (data) => console.log("Final Theme Saved:", data),
          onError: (error) => console.error("Error Saving Final:", error),
        });
        setProceed(false);
        handleTemplateChange(formData?._id, 'id', false, 'finalize');
        getDraftThemeData();
      }
      setDraftTitle('')
    };
    
    const handleWriteFreely = () => {
      if (!theme.trim()) {
        return;
      } else {
        if (status === "draft") {
          freedomMutation.mutate({
            fileId: fileId,
            freeformTheme: theme,
            isFinalized: false,
            draftTitle
          }, {
            onSuccess: (data) => console.log("Freedom Theme Saved:", data),
            onError: (error) => console.error("Error Saving Freeform:", error),
          });
          setProceed(false);
        } else if (status === "finalize") {
          finalMutation.mutate({
            fileId: fileId,
            finalTheme: theme,
          }, {
            onSuccess: (data) => console.log("Final Theme Saved:", data),
            onError: (error) => console.error("Error Saving Final:", error),
          });
          setProceed(false);
          setDraftTitle('')
        }
      getDraftThemeData();
    }
  };

  const handleTemplateChange = (
    event: any,
    id: any,
    writeFreely: any,
    status: any,
  ) => {
    if (status == 'finalize') {
      setThemeStatus('final');
    }
  };

  return (
    <>
      <div className="w-full p-10 overflow-hidden">
        <div className="rounded-[24px] w-full  pb-[40px] font-poppins h-[calc(100vh-200px)] overflow-y-hidden">
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
                      setTemplatesPopup={setIsDropdownOpen}
                      templatesdata={templatesdata}
                      handleTemplateChange={handleTemplateChange}
                      setiniialData={setiniialData}
                      setThemeStatus={setThemeStatus}
                      setslectedTheme={setslectedTheme}
                      setDraftData={setDraftData}
                    />
                  )}
                  {isRemoveOpen && (
                    <RemoveTemplatesModal
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
              className={` relative bg-white border-2 border-black rounded-3xl ${active != 2 && ' pl-[32px]  pr-[24px] py-[58px]'} flex flex-col gap-y-8 max-h-[calc(100vh-270px)] overflow-y-hidden`}
            >
              <div className="w-full h-full flex flex-col gap-10 overflow-y-auto">
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
                                  status,
                                  setData:setFormData,
                                  data:formData,
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
                    <section className="flex flex-col gap-y-3 mt-4">
                      <>
                        <label htmlFor="textField" className="font-semibold">
                          {'Your Theme'}
                        </label>
                        <textarea
                          name="textField"
                          rows={10}
                          value={theme}
                          onChange={(e) => setTheme(e.target.value)}
                          className="p-3 rounded-lg border border-slate-400"
                          placeholder={
                            'Describe the core idea of your theme here.'
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
      <div className="flex flex-row items-stretch gap-x-4 bg-black px-6 py-2 justify-center rounded-lg fixed bottom-0 w-full w">
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
          className="generateGrdient px-[18px] py-[16px] rounded-2xl text-white font-medium flex flex-row items-center text-[16px] animation-btn"
          onClick={() => {
            if (active === 0) {
              // handleGenerate();
            } else {
              // handleWriteFreely("generate");
            }
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
          className="px-10 py-4 rounded-2xl w-[160px] bg-[#653EFF] font-medium text-white"
          onClick={() => {
            setStatus('finalize');
            setConfirmationPopup(true);
            // if (active === 0) {
            // } else {
            //   handleWriteFreely("finalize");
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
            //   handleWriteFreely("draft");
            // }
          }}
        >
          Save Draft
        </button>
        <button className="px-10 py-4 rounded-2xl bg-[#4D4D5A] font-medium w-[160px] text-white">
          Collaboration
        </button>
        <button className="px-6 py-4 rounded-2xl bg-[#4D4D5A] flex items-center font-medium text-white">
          ...
        </button>
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
            status === 'finalize' ? 'Finalize Theme' : 'Save Draft'
          }
          finalizeText={
            status === 'finalize'
              ? 'Are you sure you want to finalize this theme? This action will mark it as your official theme for this project.'
              : 'Are you sure you want to save this theme? This action will store your current Theme as a draft, allowing you to edit and refine it later.'
          }
        />
      )}
      {templatesPopup && <TemplateModal setiniialData={setiniialData} templatesPopup={templatesPopup} setTemplatesPopup={setTemplatesPopup} setThemeStatus={setThemeStatus} setslectedTheme={setslectedTheme} />}
    </>
  );
};

export default ThemeEdit;
