import React, { useEffect, useRef, useState } from 'react';
// import FinalizeConfirmationModal from './FinalizeConfirmationModal';
import footericon1 from '@/assets/preWritingFooter/footer-icon-1.svg';
import footericon2 from '@/assets/preWritingFooter/footer-icon-2.svg';
import footericon3 from '@/assets/preWritingFooter/footer-icon-3.svg';
import footericon4 from '@/assets/preWritingFooter/footer-icon-4.svg';
import genicon from '@/assets/preWritingFooter/genrate-icon.svg';
// import { useAddDraftCharacter, useAddFinalCharacter, useAddFreedomCharacter } from '../api/savedraft';
import { useLocation, useParams } from 'react-router';
import FinalizeConfirmationModal from './finalize-confirmation-modal';
import { useSaveCharacter, useUpdateCharacter, useUpdateCharacterStatus } from '../api/save-draft';
import AllTemplatesModal from './all-template';
import RemoveTemplatesModal from './remove-template';
import TemplateModal from './template-modal';
import { enqueueSnackbar } from 'notistack';
// import { toast } from 'react-toastify';
// import AllTemplatesModal from './AllTemplatesModal';
// import TemplateModal from './TemplateModal';
// import RemoveTemplatesModal from './RemoveTemplatesModal';
const CharacterEdit = ({
  templates,
  setslectedCharacter,
  setCharacterStatus,
  iniialData,
  setiniialData,
  setDraftData,
}: any) => {
  
  const [active, setActive] = useState(0);
  const [templatesdata, setTemplatesdata] = useState(null);
  const [genrateLoader, setGenrateLoader] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState<boolean>(false);
  const [templatesPopup, setTemplatesPopup] = useState(false);
  const [status, setStatus] = useState('draft');
  const [tab, setTab] = useState();
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  
  const [file, setFile] = useState<File | null>(null);
  // const subTempName = searchParams.get("subTemp");

  const { fileId ,charId} = useParams<{ fileId: string ,charId:string}>();
  const [formData, setFormData] = useState<any>({});
  const [proceed, setProceed] = useState(false);
  const updateStatusMutation = useUpdateCharacterStatus();
  const updateMutation = useUpdateCharacter();

  const [draftTitle, setDraftTitle] = useState('')
  const saveCharacterMutation = useSaveCharacter();
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [character, setCharacter] = useState({});
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const newParam = queryParams.get('new'); 

  useEffect(() => {
    if (templates && templates?.subTemplate) {
      setTab(templates.subTemplate[0].component
        // templates.subTemplate
        // ? templates.subTemplate.find((sub: any) => sub.link === subTempName)?.component
        // templates.component,
      );
      // if (subTempName && !itemLink) {
      //   setItemLink(subTempName);
      // }
    }
  }, [templates]);


  useEffect(() => {
    if(iniialData){
      console.log("ggggggg",iniialData);
      
      if(iniialData?.selectedTemplate=='characterBuilder'){
        
      setFormData(iniialData?.allTemplate?.characterBuilder)
    }else if(iniialData?.selectedTemplate=='characterBuilder'){

      setFormData(iniialData?.allTemplate?.characterBlueprint)
    } else{
        setFormData({basicInfo:{name:iniialData?.allTemplate?.freeform?.characterName},characterName:iniialData?.allTemplate?.freeform?.characterName, currentTemplate:"freeForm"})

      }
      setPreviewURL(iniialData?.allTemplate?.characterBuilder?.basicInfo?.photo)
    }else{
      setFormData(null);
      setPreviewURL(null)
    }
  
  }, [iniialData])
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const className = 'Theme__Comparative';

  //   useEffect(() => {
  //     getDraftCharacterData();
  //   }, [fileId]);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getDraftCharacterData = () => {
    // getDraftCharacter(fileId).then((draftCharacter) => {
    //   setTemplatesdata(draftCharacter.data.character.characterDrafts);
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
      handlSubmitCharacter();
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
  const handlSubmitCharacter = () => {
    // if (areAllAnswersFilled(formData?.templateOptions)) {
      if (status === 'draft') {
        
        let payload ={}
        if(templates?.templateName =='Character Builder'){
           payload ={characterBuilder:{...formData},photo:file, fileId,selectedTemplate:'characterBuilder',draftTitle}
        }else{
           payload ={characterBlueprint:{...formData},photo:file, fileId,selectedTemplate:'characterBlueprint',draftTitle}
        }
        if(charId){
          if(newParam=='true'){
            saveCharacterMutation.mutate(payload, {
              onSuccess: () => {
                enqueueSnackbar('Character saved successfully!');
                // setName('');
                // setDescription('');
              },
              onError: (error) => {
                console.error('Error saving character:', error);
              },
            });
          }
          updateMutation.mutate({payload,charId,template:templates?.templateName =='Character Builder'?'characterBuilder':'characterBlueprint'}, {
            onSuccess: () => {
              enqueueSnackbar('Character saved successfully!');
              // setName('');
              // setDescription('');
            },
            onError: (error) => {
              console.error('Error saving character:', error);
            },
          });
        }else{    
        saveCharacterMutation.mutate(payload, {
          onSuccess: () => {
            enqueueSnackbar('Character saved successfully!');
            // setName('');
            // setDescription('');
          },
          onError: (error) => {
            console.error('Error saving character:', error);
          },
        });
      }
      } else {
        let payload ={}
        console.log(formData);
        
        if(templates?.templateName =='Character Builder'){
           payload ={characterBuilder:{...formData},photo:file,characterStatus:'finalize' ,fileId,selectedTemplate:'characterBuilder',currentTemplate:formData?.currentTemplate}
        }else{
           payload ={characterBlueprint:{...formData},photo:file,characterStatus:'finalize', fileId,selectedTemplate:'characterBlueprint',currentTemplate:formData?.currentTemplate}
        }
        if(charId){
          // if(newParam=='true'){
          //   saveCharacterMutation.mutate(payload, {
          //     onSuccess: () => {
          //       enqueueSnackbar('Character saved successfully!');
          //       // setName('');
          //       // setDescription('');
          //     },
          //     onError: (error) => {
          //       console.error('Error saving character:', error);
          //     },
          //   });
          // }
          updateMutation.mutate({payload,charId,characterStatus:'finalize',template:templates?.templateName =='Character Builder'?'characterBuilder':'characterBlueprint'}, {
            onSuccess: () => {
              enqueueSnackbar('Character saved successfully!');
              // setName('');
              // setDescription('');
            },
            onError: (error) => {
              console.error('Error saving character:', error);
            },
          });
        }else{    
        saveCharacterMutation.mutate(payload, {
          onSuccess: () => {
            enqueueSnackbar('Character saved successfully!');
            // setName('');
            // setDescription('');
          },
          onError: (error) => {
            console.error('Error saving character:', error);
          },
        });
      }
        // if(charId){
        //   updateStatusMutation.mutate({ characterId:charId, status: 'finalize' });
        // }else{
        //   // toast('plase save draft firast')
        // }
        // finalMutation.mutate({
        //   fileId:  formData.fileId,
        //   FinalCharacter: formData.FinalCharacter[0],
        // }, {
        //   onError: (error) => console.error("Error Saving Final:", error),
        // });
        handleTemplateChange(formData?._id, 'id', false, 'finalize');
        getDraftCharacterData();
      }
    // } else {
      // enqueueSnackbar('Please Fill all data', { variant: 'error' });
    // }       
  };
  const handleWriteFreely = (value: any) => {
    if (!character?.description.trim()) {
      // setError("Character cannot be empty");
      return;
    } else {
      if (value === "draft") {
        saveCharacterMutation.mutate({fileId,selectedTemplate:"freeform",photo:file, freeform:character}, {
          onSuccess: () => {
            enqueueSnackbar('Character saved successfully!');
            // setName('');
            // setDescription('');
          },
          onError: (error) => {
            console.error('Error saving character:', error);
          },
        });
      } else if (value === "finalize") {
        console.log(formData);
        
        //  finalMutation.mutate({
        //   fileId:  fileId,
        //   FinalCharacter: character,
        // }, {
        //   onError: (error) => console.error("Error Saving Final:", error),
        // });
      }
      getDraftCharacterData();

      // setError(""); // Clear error if validation passes

    }
  };
  const handleTemplateChange = (
    event: any,
    id: any,
    writeFreely: any,
    status: any,
  ) => {
    if (status == 'finalize') {
      setCharacterStatus('final');

      //   if (writeFreely == true) {
      //     setIsDropdownOpen(false);
      //     // /file/:fileId/:type/template/finalized
      //     navigate(`/file/${fileId}/${type}/template/${event}/finalized?id=${id}&writeFreely=true`);
      //   } else {
      //     setIsDropdownOpen(false);
      //     navigate(`/file/${fileId}/${type}/template/${event}/finalized?id=${id}&writeFreely=false`);
    }
    // } else {
    //   if (writeFreely == true) {
    //     setIsDropdownOpen(false);
    //     navigate(`/file/${fileId}/${type}/template/${event}?id=${id}&writeFreely=true`);
    //   } else {
    //     setIsDropdownOpen(false);
    //     navigate(`/file/${fileId}/${type}/template/${event}?id=${id}&writeFreely=false`);
    //   }
    // }
  };
  return (
    <>
      <div className="w-full p-10 overflow-hidden">
        <div className="rounded-[24px] w-full font-poppins h-[calc(100vh-200px)] overflow-y-hidden">
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
                    `${active == 0 ? 'bg-[#212131] text-white' : 'bg-white text-black'}` +
                    ' py-5 px-10 rounded-t-[24px] font-medium text-sm'
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
              className={`relative bg-white border-2 border-black rounded-3xl ${active != 2 && ' pl-[18px] overflow-hidden pr-[18px] py-[32px]'} flex flex-col gap-y-8  max-h-[calc(100vh-270px)] overflow-y-hidden`}
            >
              <div className="w-full h-full flex flex-col gap-10 overflow-auto">
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
                          templates?.subTemplate !== null
                            ? templates.subTemplate.find(
                                (sub: any) =>
                                  // sub.link === subTempName ? subTempName : itemLink
                                  'uy',
                              )?.component && (
                                <div>
                                  <div className="flex pb-2  mb-8 justify-between font-poppins">
                                    {templates?.subTemplate?.map(
                                      (item: any, index: any) => (
                                        <h2
                                          key={index}
                                          className={`flex-1 text-center cursor-pointer pb-[19px] text-[#212131] text-sm ${tab == item.component ? 'text-primary-blue font-bold border-b-2 border-primary-blue' : 'font-normal border-b-2'}`}
                                          onClick={() => {
                                            // setItemLink(item.link);
                                            // searchParams.set("subTemp", item.link);
                                            // console.log("item.linkitem.link", searchParams);
                                            // setSearchParams(searchParams);
                                            setTab(item?.component);
                                            // navigate(`/file/${fileId}/${type}/template/${item.link}?writeFreely="false"`);
                                          }}
                                        >
                                          {item.templateName}
                                        </h2>
                                      ),
                                    )}
                                  </div>

                                  {tab &&
                                    
                                    React.cloneElement(tab, {
                                      // generateData,
                                      // finalize,
                                      // onFinalizeComplete,
                                      status,
                                      // clear,
                                      // setClear,
                                      setFormData,
                                      formData,
                                      setFile,
                                      setPreviewURL,
                                      previewURL,
                                      // file,
                                      // initialValues,
                                    })}
                                  {/* {templates.subTemplate.find((sub: any) => sub.link === templatename)?.component} */}
                                </div>
                              )
                            : templates.component && (
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
                                    setFile,
                                    setPreviewURL,
                                    previewURL,
                                    // file,
                                    isSidebar: false,
                                    // initialValues,
                                    iniialData,
                                  })}
                                </div>
                              )}
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <>
                    <section className="flex flex-col gap-y-3 mt-4">
                      <>
                      <PhotoUpload
            data={formData}
            setData={setFormData}
            setFile={setFile}
            previewURL={previewURL}
            setPreviewURL={setPreviewURL}
          />
             <div  className="mt-4">
              <label>
                <p className="text-light-black font-Poppins text-base  leading-5 mb-2">Character Name</p>
              </label>
              <input
                // disabled={!templatename}
                          value={character?.characterName}
                          onChange={(e) => setCharacter((prev:any)=>({...prev, characterName:e.target.value}))}
                className={`w-full rounded-lg border border-solid  border-gray-300
                 bg-white shadow-inner p-4`}
              />
            </div>
                        <label htmlFor="textField" className="font-semibold">
                          {'Your Character'}
                        </label>
                        <textarea
                          name="textField"
                          rows={10}
                          value={character.description}
                          onChange={(e) => setCharacter((prev:any)=>({...prev, description:e.target.value}))}
                          className="p-3 rounded-lg border border-slate-400"
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
          onClick={() => {
            if (active === 0) {
              //   handleGenerate();
            } else {
              handleWriteFreely("generate")
            }
          }}
        >
          {/* <BsStars /> */}
          <img src={genicon} alt="" className="h-[24px] w-[24px] pr-1" />
          Generate
        </button>
        <button
          className="px-10 py-4 rounded-2xl w-[160px] bg-[#653EFF] font-medium text-white"
          onClick={() => {
            if (active === 0) {
              setStatus('finalize');
              setConfirmationPopup(true);
            } else {
              handleWriteFreely("finalize");
            }
          }}
        >
          Finalize
        </button>
        <button
          className="px-10 py-4 rounded-2xl w-[160px] bg-[#4D4D5A] font-medium text-white"
          onClick={() => {
            if (active === 0) {
              setStatus('draft');
              setConfirmationPopup(true);
            } else {
              handleWriteFreely("draft");
            }
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
            status === 'finalize' ? 'Finalize Character' : 'Save Draft'
          }
          finalizeText={
            status === 'finalize'
              ? 'Are you sure you want to finalize this character? This action will mark it as your official character for this project.'
              : 'Are you sure you want to save this character? This action will store your current Character as a draft, allowing you to edit and refine it later.'
          }
        />
      )}
     
      {templatesPopup && <TemplateModal setiniialData={setiniialData} templatesPopup={templatesPopup} setTemplatesPopup={setTemplatesPopup}  setCharacterStatus={setCharacterStatus}  setslectedCharacter={setslectedCharacter}/>} 
    </>
  );
};

export default CharacterEdit;

function PhotoUpload({ data, setData, setFile, setPreviewURL, previewURL }: any) {
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { type, templatename } = useParams<{ fileId: string; type: string; templatename: string; id: any }>();
//   const fileStore = useFileStore();
//   const characterFormData = fileSelectors.characterFormData(fileStore);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleIconClick = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData: any) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    console.log("file == selectedFile", selectedFile, selectedFile !== null);

    if (selectedFile && selectedFile !== null && selectedFile.type.startsWith("image/")) {
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
    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      setPreviewURL(null);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0] || null;
    if (droppedFile) {
      if (droppedFile.type.startsWith("image/")) {
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

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };
  console.log("datadatadata", data);

  return (
    <section className="pb-4 border-b border-slate-300">
      <div className="flex flex-col items-start gap-2 mb-4">
        <label htmlFor="photo" className=" text-md">
          Character’s photo
        </label>
        <p className="text-gray-500 font-medium text-xs">This will be displayed on your character’s profile.</p>
      </div>
   
      <div className="flex flex-row w-full items-start ">
        <div className="w-full">
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={onFileChange} />
          <div className="flex gap-4">
            {previewURL ? (
              <div
                className="relative group border-2 border-dashed border-[#E9E9EA] rounded-2xl max-w-[130px] min-h-[123px] flex justify-center items-center flex-col overflow-hidden cursor-pointer"
                onClick={triggerFileSelect}
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                {previewURL && <img src={previewURL} alt={"image"} className="object-cover w-full h-full" />}

                {/* Overlay on hover to change file */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex justify-center items-center transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                  <span className="text-white font-semibold text-sm">Change File</span>
                </div>
              </div>
            ) : (
              <div className="relative group border-2 border-dashed border-[#E9E9EA] bg-[#E9E9EA] rounded-2xl w-[130px] min-h-[123px] flex justify-center items-center flex-col overflow-hidden ">
                <div className="absolute bg-[#E9E9EA] flex justify-center items-center bottom-2 ">
                  <span className=" font-semibold text-sm">Preview</span>
                </div>
              </div>
            )}

            {
              <div
                className="border-2 border-dashed border-[#E9E9EA] flex-1 px-4 rounded-2xl min-h-[123px] flex justify-center items-center flex-col cursor-pointer"
                onClick={triggerFileSelect}
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                <h1 className="text-sm text-[#252C34]">
                  <span className="text-[#653EFF] font-bold">Click to upload </span>
                  or drag and drop
                </h1>
                <p className="mt-1 text-[#857E66] text-xs">
                  {"PNG or JPEG file (Max 4MB)"}
                </p>
              </div>
            }
          </div>

          <div></div>
        </div>
      </div>
    </section>
  );
}