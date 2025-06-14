import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsStars } from "react-icons/bs";
// import { useParams } from "react-router-dom";
// import { FileContext } from "context/filecontext";
// import { useFile } from "hooks/useFetch";

import { FaAngleDown } from "react-icons/fa6";
import { useParams } from "react-router";
// import { fileSelectors, useFileStore } from "store/file";
const options = {
  height: ["<5'0\"", "5'0\" - 5'5\"", ">5'5\""],
  weight: ["<50kg", "50kg-70kg", ">70kg"],
  race: ["Asian", "Caucasian", "African American", "Other"],
  hairColor: ["Black", "Brown", "Blonde", "Red", "Gray"],
  eyeColor: ["Blue", "Brown", "Green", "Hazel"],
  glassesOrContacts: ["None", "Glasses", "Contact Lenses"],
  skinColor: ["Fair", "Medium", "Olive", "Dark"],
};

const textFields = [
  { label: "Shape of face", name: "faceShape" },
  { label: "Distinguishing features", name: "distinguishingFeatures" },
  { label: "Disabilities", name: "disabilities" },
  { label: "Dress style", name: "dressStyle" },
  { label: "Mannerisms", name: "mannerisms" },
];

type FormData = {
  gender: string;
  height: string;
  weight: string;
  race: string;
  hairColor: string;
  eyeColor: string;
  glassesOrContacts: string;
  skinColor: string;
  faceShape: string;
  distinguishingFeatures: string;
  disabilities: string;
  dressStyle: string;
  mannerisms: string;
};

const PhysicalCharacteristics = ({ setFormData, formData ,sidebar=false}: any) => {
  const { fileId } = useParams();
//   useFile({ fileId: fileId });
//   const fileCtx = useContext(FileContext);

 const [heightUnit, setHeightUnit] = useState('cm')
const [weightUnit, setWeightUnit] = useState('kg')
  const [state, setState] = React.useState<any>({});
  const [errors, setErrors] = useState<any>({});


  function handleOnClick(key: string, value: string) {

    setFormData((prevState: any) => ({
      ...prevState,
      physicalCharacteristics: {
        ...prevState?.physicalCharacteristics,
        [key]: value,
      },
    }));

    setErrors((prevErrors: any) => {
      const { [key]: removedError, ...restErrors } = prevErrors;
      return restErrors;
    });
  }

  const handleHeight =(value:string) => {
    setFormData((prevState: any) => ({
      ...prevState,
      physicalCharacteristics: {
        ...prevState?.physicalCharacteristics,
       height: `${value} ${heightUnit}`,
      },
    }));
  }

  const handleWeight =(value:string) => {
    setFormData((prevState: any) => ({
      ...prevState,
      physicalCharacteristics: {
        ...prevState?.physicalCharacteristics,
        weight:`${value} ${weightUnit}`,
      },
    }));
  }


  useEffect(() => {
    setFormData((prevState: any) => ({
      ...prevState,
      physicalCharacteristics: {
        ...prevState?.physicalCharacteristics,
        height:`${prevState?.physicalCharacteristics?.height.split(' ').slice(0, -1).join(' ')} ${heightUnit}`,
        weight:`${prevState?.physicalCharacteristics?.weight.split(' ').slice(0, -1).join(' ')} ${weightUnit}`,
      },
    }));
  }, [weightUnit,heightUnit])

  return (
    <div className="font-poppins px-6">
      {/* First 12 fields */}
      <p className="text-2xl font-bold pt-4 mb-6 text-[#252C34]">Physical Characteristics</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="flex flex-col  h-full">
      <label >  <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">Height</p></label>
      <div className="flex w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner overflow-hidden h-full">
        <input
          type="number"
          // value={height}
          disabled={sidebar}
          onChange={(e) => handleHeight(e.target.value)}
          name="height"
          className="p-2 w-full outline-none"
          // placeholder="Enter height"
        />
        <select
          value={heightUnit}
          onChange={(e) => setHeightUnit(e.target.value)}
          className="py-2 px-5 custom-arrow-down  outline-none border border-solid "
        >
          <option value="cm">cm</option>
          <option value="inch">inch</option>
        </select>
      </div>
    </div>
      <div className="flex flex-col ">
      <label >  <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">Weight</p></label>
      <div className="flex w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner overflow-hidden h-full">
        <input
          type="number"
          // value={height}
          disabled={sidebar}
          onChange={(e) => handleWeight(e.target.value)}
          name="weight"
          className="p-2 w-full outline-none" 
          // placeholder="Enter We"
        />
        <select
          value={weightUnit}
          onChange={(e) => setWeightUnit(e.target.value)}
          className="py-2 px-5 custom-arrow-down  outline-none border border-solid "
        >
          <option value="kg">Kg</option>
          <option value="lbs">Lbs</option>
        </select>
      </div>
    </div>
        {/* Dropdown fields */}
        {[
          // { question: "Height", key: "height" },                           
          // { question: "Weight", key: "weight" },
          { question: "Race", key: "race" },
          { question: "Hair color", key: "hairColor" },
          { question: "Eye color", key: "eyeColor" },
          { question: "Glasses or contacts", key: "glassesOrContacts" },
          { question: "Skin color", key: "skinColor" },
        ].map((item, index) => (
          <div key={index}>
            <label htmlFor={item.key}>
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
            </label>
            <select
              disabled={sidebar}
              id={item.key}
              name={item.key}
              value={formData?.physicalCharacteristics?.[item.key]}
              onChange={(e) => handleOnClick(item.key, e.target.value)}
              className={`w-full custom-arrow-down rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${
                errors[item.key] ? "border-red-500" : "border-gray-300"
              } bg-white shadow-inner p-4`}
            >
              <option value="" 
              disabled={sidebar}
              >
                Select {item.question}
              </option>
              {options[item.key as keyof typeof options]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
          </div>
        ))}

        {/* Text fields */}
        {[
          { question: "Shape of face", key: "shapeOfFace" },
          { question: "Distinguishing features", key: "distinguishingFeatures" },
          { question: "Disabilities", key: "disabilities" },
          { question: "Dress style", key: "dressStyle" },
          { question: "Mannerisms", key: "mannerisms" },
        ].map((item, index) => (
          <div key={index}>
            <label htmlFor={item.key}>
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
            </label>
            <input
              disabled={sidebar}
              id={item.key}
              name={item.key}
              value={formData?.physicalCharacteristics?.[item.key]}
              onChange={(e) => handleOnClick(item.key, e.target.value)}
              className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${
                errors[item.key] ? "border-red-500" : "border-gray-300"
              } bg-white shadow-inner`}
            />
            {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
          </div>
        ))}
      </div>

      {/* Other fields one by one */}
      {[
        { question: "Physical habits (drinking, etc.)", key: "physicalHabits" },
        { question: "Health", key: "health" },
        { question: "Favourite sayings", key: "favoriteSayings" },
        { question: "Style", key: "style" },
        { question: "Greatest flaw", key: "greatestFlaw" },
        { question: "Best quality", key: "bestQuality" },
      ].map((item, index) => (
        <div key={index} className="mt-4">
          <label htmlFor={item.key}>
            <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">{item.question}</p>
          </label>
          <input
            disabled={sidebar}
            id={item.key}
            name={item.key}
            value={formData?.physicalCharacteristics?.[item.key]}
            onChange={(e) => handleOnClick(item.key, e.target.value)}
            className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${
              errors[item.key] ? "border-red-500" : "border-gray-300"
            } bg-white shadow-inner`}
          />
          {errors[item.key] && <p className="text-red-500 text-sm">{errors[item.key]}</p>}
        </div>
      ))}
      {/* <div className="btn px-14 py-2  rounded-lg  mt-5 w-32 bg-[#E8E2D8] cursor-pointer" onClick={handleSave}>
        <p className="text-white font-inter text-base font-medium text-xs uppercase">Save</p>
      </div> */}
    </div>
  );
};

export default PhysicalCharacteristics;
