import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import { FiUploadCloud } from 'react-icons/fi';
// import { useParams } from "react-router-dom";
const CharacterBlueprint = ({
  formData,
  setFormData,
  setFile,
  setPreviewURL,
  previewURL,
  sidebar=false
}: any) => {


  const [errors, setErrors] = useState<any>({});

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);


  function handleOnClick(key: string, value: string, CalendarVisible?: any) {
    setFormData((prevState: any) => ({
      ...prevState,
        [key]: value,
    }));
    if (CalendarVisible) {
      setIsCalendarVisible(!isCalendarVisible);
    }
    
  }

  const { templatename } = useParams<any>();

  return (
    <>
      {
        // formData &&
        <div className="container mx-auto">
          <PhotoUpload
            data={formData}
            setData={setFormData}
            setFile={setFile}
            previewURL={previewURL}
            setPreviewURL={setPreviewURL}
            sidebar={sidebar}
          />
          <p className="text-2xl font-bold py-4">Character Blueprint</p>

          {[
            { question: "Character name", key: "characterName" },
            { question: "Describe your character in a single sentence", key: "singleSentenceDescription" },
            { question: "Describe your character’s personality", key: "personality" },
            { question: "What is this character’s purpose in the story?", key: "purposeInStory" },
            {
              question: "How is this character different from any other character in the story?",
              key: "uniqueness",
            },
            { question: "What makes this character interesting to readers?", key: "readerInterest" },
            { question: "What does your character care most about?", key: "caresMostAbout" },
            { question: "What are this character’s key physical traits?", key: "physicalTraits" },
            {
              question: "What is the most important thing that has ever happened to this character?",
              key: "mostImportantEvent",
            },
            { question: "What are the things this character cares the most about?", key: "biggestConcerns" },
            { question: "How does this character deal with problems?", key: "problemSolvingApproach" },
            { question: "What would it take to make this character change significantly?", key: "significantChangeTrigger" },
            {
              question: "What relationship does this character have with the other characters?",
              key: " relationshipsWithOthers",
            },
          ].map((item, index) => (
            <div key={index} className="mt-4">
              <label htmlFor={item.key}>
                <p className="text-light-black font-Poppins text-base  leading-5 mb-2">{item.question}</p>
              </label>
              <input
                disabled={sidebar}
                id={item.key}
                name={item.key}
                value={formData?.[item.key]}
                onChange={(e) => handleOnClick(item.key, e.target.value)}
                className={`w-full rounded-lg border border-solid ${
                  errors[item.key] ? "border-red-500" : "border-gray-300"
                } bg-white shadow-inner p-4`}
              />
              {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
            </div>
          ))}

        
        </div>
      }
    </>
  );
};

export default CharacterBlueprint;

function PhotoUpload({ data, setData, setFile, setPreviewURL, previewURL,sidebar }: any) {
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { type, templatename } = useParams<{ fileId: string; type: string; templatename: string; id: any }>();

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
    if(!sidebar){
      fileInputRef.current?.click();
    }
  };

  return (
    <section className="py-4 border-b border-slate-300">
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
                   <div
                  // onClick={handleIconClick}
                  className="p-[10px] bg-[#F7F6F2] rounded-full cursor-pointer h-10 w-10 d-flex justify-center items-center"
                >
                  <FiUploadCloud className="text-[20px] text-[#675F47]" />
                </div>
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
