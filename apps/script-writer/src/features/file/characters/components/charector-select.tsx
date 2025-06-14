import React, { useEffect, useRef, useState } from 'react';

import footericon1 from '@/assets/preWritingFooter/footer-icon-1.svg';
import footericon2 from '@/assets/preWritingFooter/footer-icon-2.svg';
import footericon3 from '@/assets/preWritingFooter/footer-icon-3.svg';
import footericon4 from '@/assets/preWritingFooter/footer-icon-4.svg';
import genicon from '@/assets/preWritingFooter/genrate-icon.svg';
import CharacterOptions from './charector-option';
import { useParams } from 'react-router';
import FinalizeConfirmationModal from './finalize-confirmation-modal';
import { useSaveCharacter, useUpdateCharacter } from '../api/save-draft';
import { enqueueSnackbar } from 'notistack';
// import CharacterOptions from './CharacterOptions';
import { FiUploadCloud } from 'react-icons/fi';

const CharectorSelect = ({
  setCharacterStatus,
  setslectedCharacter,
  setiniialData,
  iniialData,
}: any) => {
  const [showFields, setShowFields] = useState<boolean>();

  const { fileId ,charId} = useParams<{ fileId: string ,charId:string}>();
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [character, setCharacter] = useState({});
  const [proceed, setProceed] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [status, setStatus] = useState('draft');

  const [file, setFile] = useState<File | null>(null);
  const [logLine, setLogLine] = useState({});
  const [active, setActive] = useState(0);
    const updateMutation = useUpdateCharacter();
      const saveCharacterMutation = useSaveCharacter();
  useEffect(() => {
    if (iniialData) {
      console.log(iniialData);
      setActive(1);
      setCharacter(iniialData?.allTemplate?.freeform);
      setPreviewURL(iniialData?.allTemplate?.freeform?.photo);
      setShowFields(true);
      setDraftTitle(iniialData?.draftTitle)
    }
  }, [iniialData]);

    useEffect(() => {
      if (proceed) {
        handlSubmitCharacter();
      }
    }, [proceed]);  

    const handlSubmitCharacter=()=>{
      if (status === 'draft') {
        const payload ={fileId,photo:file,freeform:character,selectedTemplate:'freeform',characterStatus:'draft'}
        if(charId){
          updateMutation.mutate({payload,charId,template:'freeform'}, {
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
      }else{
        const payload ={fileId,photo:file,freeform:character,selectedTemplate:'freeform',characterStatus:'finalize'}
        if(charId){
          updateMutation.mutate({payload,charId,template:'freeform'}, {
            onSuccess: () => {
              ('Character saved successfully!');
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
      }
    }

  return (
    <div className="w-full mt-[32px] ml-[40px] mr-[40px] overflow-hidden">
      <div className="bg-white rounded-[24px] w-full px-[32px] pt-[40px] pb-[40px] font-poppins h-[calc(100vh-150px)] overflow-auto">
        <section>
          <p className="text-[#252C34] text-[40px] font-bold mb-[16px]">
            Develop Your Characters
          </p>
          {/* <p className="mt-1 font-light">A character is the heart of your screenplay, distilled into a single, powerful sentence. It's your story's elevator pitch, capturing the essence of your narrative and hooking your audience in seconds.</p> */}
        </section>

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
        {/* <p className="mt-1 font-light">Please select a template to help speed up your process.</p> */}

        <section className="flex flex-col gap-y-3 ">
          {active === 1 ? (
            <section className="">
              <p className="text-[#212131] font-semibold text-[18px] mb-0 mt-[40px]">
                Write Your Own Character
              </p>
              <p className="mt-[16px] font-normal text-[#9999A0] text-[16px]">
                Fell free to write your character without any template
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
                  <PhotoUpload
                    // data={formData}
                    // setData={setFormData}
                    setFile={setFile}
                    previewURL={previewURL}
                    setPreviewURL={setPreviewURL}
                  />
                  <div className="mt-4">
                    <label>
                      <p className="text-light-black font-Poppins text-base  leading-5 mb-2">
                        Character Name
                      </p>
                    </label>
                    <input
                      // disabled={!templatename}
                      value={character?.characterName}
                      onChange={(e) =>
                        setCharacter((prev: any) => ({
                          ...prev,
                          characterName: e.target.value,
                        }))
                      }
                      className={`w-full rounded-xl border border-solid  border-gray-300
                 bg-white p-4`}
                    />
                  </div>
                  <label
                    htmlFor="textField"
                    className="font-semibold block mt-[40px] mb-[16px]"
                  >
                    Your Character
                  </label>
                  <textarea
                    name="textField"
                    rows={8}
                    value={character.description}
                    onChange={(e) =>
                      setCharacter((prev: any) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
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
            <section className="flex flex-col mt-[20px] ">
              <p className=" text-[#9999A0] text-[20px]">
                Please select a template to help speed up your process.
              </p>
              <CharacterOptions
                setiniialData={setiniialData}
                setCharacterStatus={setCharacterStatus}
                setslectedCharacter={setslectedCharacter}
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
            status === 'finalize' ? 'Finalize Character' : 'Save Draft'
          }
          finalizeText={
            status === 'finalize'
              ? 'Are you sure you want to finalize this character? This action will mark it as your official character for this project.'
              : 'Are you sure you want to save this character? This action will store your current Character as a draft, allowing you to edit and refine it later.'
          }
        />
      )}
    </div>
  );
};

export default CharectorSelect;

function PhotoUpload({
  data,
  setData,
  setFile,
  setPreviewURL,
  previewURL,
}: any) {
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { type, templatename } = useParams<{
    fileId: string;
    type: string;
    templatename: string;
    id: any;
  }>();
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
    console.log('file == selectedFile', selectedFile, selectedFile !== null);

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

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };
  console.log('datadatadata', data);

  return (
    <section className="py-4 border-b border-slate-300">
      <div className="flex flex-col items-start gap-2 mb-4">
        <label htmlFor="photo" className=" text-md">
          Character’s photo
        </label>
        <p className="text-gray-500 font-medium text-xs">
          This will be displayed on your character’s profile.
        </p>
      </div>

      <div className="flex flex-row w-full items-start ">
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={onFileChange}
          />
          <div className="flex gap-4">
            {previewURL ? (
              <div
                className="relative group border-2 border-dashed border-[#E9E9EA] rounded-2xl max-w-[130px] min-h-[123px] flex justify-center items-center flex-col overflow-hidden cursor-pointer"
                onClick={triggerFileSelect}
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                {previewURL && (
                  <img
                    src={previewURL}
                    alt={'image'}
                    className="object-cover w-full h-full"
                  />
                )}

                {/* Overlay on hover to change file */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex justify-center items-center transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                  <span className="text-white font-semibold text-sm">
                    Change File
                  </span>
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
    </section>
  );
}
