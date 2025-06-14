import React, { useRef, useState } from "react";
import { FiUploadCloud } from 'react-icons/fi';
import { useParams } from "react-router-dom";

const SceneStudio = ({ formData, setFormData, setFile, setPreviewURL, previewURL }: any) => {
  const [errors, setErrors] = useState<any>({});

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  function handleOnClick(key: string, value: string, CalendarVisible?: any) {
    setFormData((prevState: any) => ({
      ...prevState,
      basicInformation: {
        ...prevState.basicInformation,
        [key]: value,
      },
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
          />
          <p className="text-lg py-4 border-b border-black">EXT.SOMEWHERE - DAY</p>
          <p className="text-lg py-4 border-b border-black">SCENE TITLE</p>

          {[
            { question: "POV", key: "pov" },
            { question: "Time Period", key: "time_period" },
            { question: "Hook", key: "hook" },
            { question: "Purpose", key: "purpose" },
            { question: "Conflict", key: "conflict" },
            { question: "Climax", key: "climax" },
            { question: "Character Goals", key: "character_goals" },
            { question: "Character Development", key: "character_development" },
            { question: "Sensory Details", key: "sensory_details" },
          ].map((item, index) => (
            <div key={index} className="mt-4">
              <label htmlFor={item.key}>
                <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
              </label>
              <input
                disabled={!templatename}
                id={item.key}
                name={item.key}
                value={formData?.basicInformation?.[item.key]}
                onChange={(e) => handleOnClick(item.key, e.target.value)}
                className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${
                  errors[item.key] ? "border-red-500" : "border-gray-300"
                } bg-white shadow-inner`}
              />
              {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
            </div>
          ))}
        </div>
      }
    </>
  );
};

export default SceneStudio;

function PhotoUpload({ data, setData, setFile, setPreviewURL, previewURL }: any) {
  const { type, templatename } = useParams<{ fileId: string; type: string; templatename: string; id: any }>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    fileInputRef.current?.click();
  };
  console.log("datadatadata", data);

  return (
    <section className="py-4 border-b border-slate-300 w-[100%] overflow-y-auto">
      <div className="flex flex-col items-start gap-2 mb-4">
        <label htmlFor="photo" className="text-[#252C34] text-base font-semibold">
          Scene's photo
        </label>
        <p className="text-[#8F8F8F] font-medium text-[12px]">This will be displayed on your scene's card</p>
      </div>
      <div className="flex flex-row w-full items-start">
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
              <div className="relative group border-2 border-dashed border-[#E9E9EA] bg-[#E9E9EA] rounded-2xl w-[205px] min-h-[123px] flex justify-center items-center flex-col overflow-hidden ">
                <div className="absolute bg-[#E9E9EA] flex justify-center items-center bottom-2 ">
                  <span className=" font-normal text-sm">Preview</span>
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
                <p className="mt-1 text-[#857E66] text-xs">{"PNG or JPEG file (Max 4MB)"}</p>
              </div>
            }
          </div>

          <div></div>
        </div>
      </div>
    </section>
  );
}
