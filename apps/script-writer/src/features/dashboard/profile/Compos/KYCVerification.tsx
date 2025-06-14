import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FiUploadCloud } from "react-icons/fi";


const KYCVerification = ({ setProfileSetting }: { setProfileSetting: (value: boolean) => void }) => {
  const [data, setData] = useState({});
  const docs = ["Aadhar Card", "PAN Card", "Voter ID", "Driving License"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <section className="flex flex-row w-full items-center justify-between py-4 border-b border-slate-300">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold">KYC Verification</h1>
          <p className="text-xs text-slate-500 font-medium">Update your KYC Verification details here.</p>
        </div>

        <div className="flex flex-row gap-x-2 items-center">
          <button
            onClick={() => setProfileSetting(false)}
            className="border border-gray-600 px-10 py-3 font-medium rounded-2xl bg-white text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setTimeout(() => {
                setProfileSetting(false);
              }, 500);
            }}
            className="px-10 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
          >
            Save
          </button>
        </div>
      </section>

      <Documents data={data} docs={docs} handleChange={handleChange} />

      <UploadPhotos setData={setData} data={data} />

      <Name handleChange={handleChange} data={data} />
      <DateOfBirth handleChange={handleChange} data={data} />
    </div>
  );
};

export default KYCVerification;

function Documents({
  data,
  docs,
  handleChange,
}: {
  data: any;
  docs: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="document" className="font-bold w-1/4 text-sm">
        Documents
      </label>

      <div className="w-2/4 flex flex-row items-center relative">
        <select
          className="w-full form-select appearance-none cursor-pointer select-arrow font-medium text-start flex flex-row gap-4 items-center border border-gray-300 rounded-lg px-4 py-2 text-sm relative"
          aria-label="Default select example"
          name="document"
          value={data.document}
          onChange={handleChange}
        >
          {docs.map((document, index) => (
            <option key={index} value={document}>
              {document}
            </option>
          ))}
        </select>
        <FaAngleDown className="absolute right-4 text-slate-500" />
      </div>
    </section>
  );
}

function UploadPhotos({ setData, data }: { setData: React.Dispatch<React.SetStateAction<any>>; data: any }) {
  const frontInputRef = useRef<HTMLInputElement | null>(null);
  const backInputRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState({ front: "", back: "" });

  const handleIconClick = (name: string) => {
    name === "front" ? frontInputRef?.current?.click() : backInputRef?.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, side: string) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prevData: any) => ({
          ...prevData,
          files: {
            ...prevData.files,
            [side]: reader.result,
          },
        }));
        setFileNames((prevNames) => ({
          ...prevNames,
          [side]: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFrontSideUpload = (event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, "front");
  const handleBackSideUpload = (event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, "back");

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <div className="flex flex-col items-start w-1/4">
        <label htmlFor="photo" className="font-bold text-sm">
          Your Photo
        </label>
        <p className="text-gray-500 font-medium text-xs">This will be displayed on your profile</p>
      </div>

      <div className="w-3/4 flex flex-row items-start gap-x-4">
        <div className="w-1/2 border border-dashed rounded-lg border-gray-300 p-4 flex flex-col items-center gap-4">
          <input
            ref={frontInputRef}
            type="file"
            name="front"
            className="hidden"
            accept=".svg, .png, .jpg, .jpeg, .gif"
            onChange={(e) => handleFrontSideUpload(e)}
          />

          <div onClick={() => handleIconClick("front")} className="p-2 bg-gray-300 rounded-full cursor-pointer">
            <FiUploadCloud className="text-2xl" />
          </div>
          <p className="text-sm font-bold">Front Side</p>
          {fileNames.front && <p className="text-sm text-green-500">{fileNames.front}</p>}

          <p className="text-sm">
            <span
              onClick={() => handleIconClick("front")}
              className="text-green-500 hover:underline font-semibold cursor-pointer"
            >
              Click to upload
            </span>{" "}
            or drag and drop
            <br />
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
        <div className="w-1/2 border border-dashed rounded-lg border-gray-300 p-4 flex flex-col items-center gap-4">
          <input
            ref={backInputRef}
            type="file"
            name="back"
            className="hidden"
            accept=".svg, .png, .jpg, .jpeg, .gif"
            onChange={(e) => handleBackSideUpload(e)}
          />

          <div onClick={() => handleIconClick("back")} className="p-2 bg-gray-300 rounded-full cursor-pointer">
            <FiUploadCloud className="text-2xl" />
          </div>
          <p className="text-sm font-bold">Back Side</p>
          {fileNames.back && <p className="text-sm text-green-500">{fileNames.back}</p>}

          <p className="text-sm">
            <span
              onClick={() => handleIconClick("back")}
              className="text-green-500 hover:underline font-semibold cursor-pointer"
            >
              Click to upload
            </span>{" "}
            or drag and drop
            <br />
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
      </div>
    </section>
  );
}

function Name({ handleChange, data }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; data: any }) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="firstname lastname" className="font-bold w-1/4 text-sm">
        Name
      </label>

      <div className="flex gap-x-4 w-2/4">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          value={data.firstname}
          className="w-1/2 px-4 py-2 text-sm border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          value={data.lastname}
          className="w-1/2 px-4 py-2 text-sm border border-gray-300 rounded-lg"
        />
      </div>
    </section>
  );
}

function DateOfBirth({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4">
      <label htmlFor="dob" className="font-bold w-1/4 text-sm">
        Date of Birth
      </label>

      <div className="flex gap-x-4 w-2/4">
        <input
          type="date"
          name="dob"
          id="dob"
          value={data.dob}
          onChange={handleChange}
          className="w-full cursor-pointer px-4 py-2 text-sm border border-gray-300 rounded-lg"
        />
      </div>
    </section>
  );
}
