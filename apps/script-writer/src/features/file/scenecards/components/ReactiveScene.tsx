import React, { useRef, useState } from "react";

import { useParams } from "react-router-dom";

const ReactiveScene = ({ formData, setFormData, setFile, setPreviewURL, previewURL }: any) => {
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
            { question: "Reaction", key: "reaction" },
            { question: "Dilemma", key: "dilemma" },
            { question: "Decision", key: "decision" },
            // { question: "Purpose", key: "purpose" },
            // { question: "Conflict", key: "conflict" },
            // { question: "Climax", key: "climax" },
            // { question: "Character Goals", key: "character_goals" },
            // { question: "Character Development", key: "character_development" },
            // { question: "Sensory Details", key: "sensory_details" },
          ].map((item, index) => (
            <div key={index} className="mt-4">
              <label htmlFor={item.key}>
                <p className="text-light-black font-Poppins text-base  leading-5 mb-2">{item.question}</p>
              </label>
              <input
                disabled={!templatename}
                id={item.key}
                name={item.key}
                value={formData?.basicInformation?.[item.key]}
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

export default ReactiveScene;

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
    <section className="py-4 border-b border-slate-300 h-full w-[100%]">
      <div className="flex flex-col items-start gap-2 mb-4">
        <label htmlFor="photo" className=" text-md font-bold ">
          Scene's photo
        </label>
        <p className="text-gray-500 font-medium text-xs">This will be displayed on your scene's card</p>
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
              <div className="relative group border-2 border-dashed border-[#E9E9EA] bg-[#E9E9EA] rounded-2xl w-[35%] min-h-[153px] flex justify-center items-center flex-col overflow-hidden ">
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
