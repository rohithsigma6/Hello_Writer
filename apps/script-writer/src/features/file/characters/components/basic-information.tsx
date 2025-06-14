import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import { FiUploadCloud } from 'react-icons/fi';
// import Calendar from "react-calendar";
// import { useParams } from "react-router-dom";
// import { fileSelectors, useFileStore } from "store/file";
const options = {
  height: ["<5'0\"", "5'0\" - 5'5\"", ">5'5\""],
  weight: ["<50kg", "50kg-70kg", ">70kg"],
  race: ["Asian", "Caucasian", "African American", "Other"],
  hairColor: ["Black", "Brown", "Blonde", "Red", "Gray"],
  eyeColor: ["Blue", "Brown", "Green", "Hazel"],
  glassesOrContacts: ["None", "Glasses", "Contact Lenses"],
  skinColor: ["Fair", "Medium", "Olive", "Dark"],
  basicword_gender: ["Female", "Male", "Other"],
  basicword_nationality: [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "India",
    "Germany",
    "France",
    "Japan",
    "China",
    "Brazil",
    "South Africa",
    "Italy",
    "Russia",
    "Mexico",
    "Spain",
  ],
};

interface IProps {
  setProfileSetting: any;
  setSetupNow: any;
  formData: any;
  setFormData: any;
  setFile: any;
  setPreviewURL: any;
  previewURL: any;
}
const BasicInformation = ({
  setProfileSetting,
  setSetupNow,
  formData,
  setFormData,
  setFile,
  setPreviewURL,
  previewURL,
  sidebar=false
}: any) => {
  const [profileData, setProfileData] = useState({});
  const [data, setData] = useState<any>({
    race: "",
    height: "",
    weight: "",
  });

  const fields = [
    // First Set
    "basicword_background",
    "basicword_siblings",
    "basicword_spouse",
    "basicword_children",
    "basicword_grandparents",
    "basicword_perception",
    "basicword_grandchildren",
    "basicword_significant",
    "basicword_relationshipSkills",

    // Second Set
    "basicword_birthdate",
    "basicword_age",
    "basicword_gender",
    "basicword_nationality",

    // Third Set
    "basicword_characterName",
    "basicword_talentsSkills",
  ];
  const [state, setState] = React.useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const genders = ["Female", "Male", "Other"];
//   const fileStore = useFileStore();
//   const characterFormData = fileSelectors.characterFormData(fileStore);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  function handleOnClick(key: string, value: string, CalendarVisible?: any) {
    setFormData((prevState: any) => ({
      ...prevState,
      basicInfo: {
        ...prevState?.basicInfo,
        [key]: value,
      },
    }));
    if (CalendarVisible) {
      setIsCalendarVisible(!isCalendarVisible);
    }
    // fileStore.updateCharacterFormData({
    //   ...characterFormData,
    //   characterBuilder: {
    //     ...characterFormData.characterBuilder,
    //     basicInfo: {
    //       ...characterFormData.characterBuilder?.basicInfo,
    //       [key]: value,
    //     },
    //   },
    // });
  }

  const { templatename } = useParams<any>();

  return (
    <>
      {
        // formData &&
        <div className="font-poppins px-8">
          <PhotoUpload
            data={formData}
            setData={setFormData}
            setFile={setFile}
            previewURL={previewURL}
            setPreviewURL={setPreviewURL}
            sidebar={sidebar}
          />
          <p className="text-2xl font-bold pt-4 mb-6 text-[#252C34]">Basic Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {[
              { question: "Character name", key: "name" },
              { question: "Talents/ Skills", key: "talentsSkills" },
            ].map((item, index) => (
              <div key={index}>
                <label htmlFor={item.key}>
                  <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
                </label>
                <input
                  disabled={sidebar}
                  id={item.key}
                  name={item.key}
                  value={formData?.basicInfo?.[item.key]}
                  onChange={(e) => handleOnClick(item.key, e.target.value)}
                  className={`w-full rounded-[16px] border border-solid ${
                    errors[item.key] ? "border-red-500" : "border-[#BABABF]"
                  } bg-white shadow-inner p-4`}
                />
                {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {[
              { question: "Birthdate", key: "birthdate" },
              // Additional items can be added here
            ].map((item, index) => (
              <div key={index}>
                <label htmlFor={item.key}>
                  <p
                    className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4"
                    onClick={() => setIsCalendarVisible(!isCalendarVisible)}
                  >
                    {item.question}
                  </p>
                </label>
                <div className="relative">
                  <input
                    disabled={sidebar}
                    type="date"
                    id={item.key}
                    // readOnly
                    onChange={(e) => handleOnClick(item.key, e.target.value)}
                    value={
                      formData?.basicInfo?.[item.key]
                    }
                    placeholder="Select your birthdate"
                    // onClick={() => setIsCalendarVisible(!isCalendarVisible)}
                    className="w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4"
                  />
                  {isCalendarVisible && (
                    <div className="absolute top-8 z-10 bg-white shadow-lg rounded-lg w-[300px]">
                      {/* <Calendar
                        onChange={(date: any) => handleOnClick(item.key, date, true)}
                        value={formData?.basicInfo?.[item.key] || null}
                        maxDate={new Date()} // Prevent future dates
                        className="react-calendar p-4 border border-solid border-gray-300 rounded-lg shadow-inner "
                      /> */}
                    </div>
                  )}
                </div>
                {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
              </div>
            ))}

            {/* <div className=""> */}
            {[{ question: "Age", key: "age" }].map((item, index) => (
              <div key={index}>
                <label htmlFor={item.key}>
                  <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
                </label>
                <input
                  disabled={sidebar}
                  type='number'
                  id={item.key}
                  name={item.key}
                  value={formData?.basicInfo?.[item.key]}
                  onChange={(e) => handleOnClick(item.key, e.target.value)}
                  className={`w-full rounded-[16px] border border-solid ${
                    errors[item.key] ? "border-red-500" : "border-[#BABABF]"
                  } bg-white shadow-inner p-4`}
                />
                {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
              </div>
            ))}
            {/* </div> */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> */}
            {[
              { question: "Gender", key: "gender", options: ["male", "female"] },
              { question: "Nationality", key: "nationality", options: ["Indian", "US"] },
              { question: "Hometown", key: "hometown", options: ["Delhi", "Mumbai"] },
            ].map((item, index) => (
              <div key={index}>
                <label htmlFor={item.key}>
                  <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
                </label>
                <div>
                <select
                  disabled={sidebar}
                  id={item.key}
                  name={item.key}
                  value={formData?.basicInfo?.[item.key]}
                  onChange={(e) => handleOnClick(item.key, e.target.value)}
                  className={`w-full custom-arrow-down rounded-[16px] border border-solid ${
                    errors[item.key] ? "border-red-500" : "border-[#BABABF]"
                  } bg-white shadow-inner p-4`}
                >
                  <option value=""
                  disabled={sidebar}
                   >
                    Select {item.question}
                  </option>
                  {item.options?.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
                </div>
                {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
              </div>
            ))}
          </div>
          {[
            { question: "Background as a Child", key: "backgroundAsChild" },
            { question: "Brothers and sisters (describe relationship)", key: "brothersSisters" },
            { question: "Husband or wife (describe relationship)", key: "husbandWife" },
            { question: "Children (describe relationship)", key: "children" },
            { question: "Grandparents (describe relationship)", key: "grandparents" },
            { question: "Grandchildren (describe relationship)", key: "grandchildren" },
            { question: "Significant others (describe relationship)", key: "significantOthers" },
            { question: "Relationship skills", key: "relationshipSkills" },
          ].map((item, index) => (
            <div key={index} className="mt-4">
              <label htmlFor={item.key}>
                <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
              </label>
              <input
                disabled={sidebar}
                id={item.key}
                name={item.key}
                value={formData?.basicInfo?.[item.key]}
                onChange={(e) => handleOnClick(item.key, e.target.value)}
                className={`w-full rounded-[16px] border border-solid ${
                  errors[item.key] ? "border-red-500" : "border-[#BABABF]"
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

export default BasicInformation;

function PhotoUpload({ data, setData, setFile, setPreviewURL, previewURL ,sidebar }: any) {
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
    if(!sidebar){

      fileInputRef.current?.click();
    }
  };
  console.log("datadatadata", data);

  return (
    <section className="py-4 font-poppins">
      <div>
      <div className="flex flex-col items-start gap-1 mb-4">
        <label htmlFor="photo" className="text-[#252C34] text-base font-semibold">
          Character’s photo
        </label>
        <p className="text-[#8F8F8F] font-medium text-[12px]">This will be displayed on your character’s profile.</p>
      </div>
      <div className="flex flex-row items-start w-full">
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
                <p className="mt-1 text-[#857E66] text-xs">
                  {"PNG or JPEG file (Max 4MB)"}
                </p>
              </div>
            }
          </div>

          
        </div>
      </div>
      </div>
    </section>
  );
}
