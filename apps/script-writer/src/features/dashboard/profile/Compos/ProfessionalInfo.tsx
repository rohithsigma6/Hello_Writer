import { useUser } from "@/features/users/api/get-user";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaAngleDown } from "react-icons/fa6";
import { usePostProfessionalInfo } from "../api/use-mutate";
const genres =[
  "Action",
  "Adult",
  "Adventure",
  "Biographical",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Experimental",
  "Fantasy",
  "Historical",
  "Horror",
  "Musical",
  "Mystery",
  "Romance",
  "Sci Fi",
  "Suspense",
  "Thriller",
  "Tragedy",
  "Western",
];
const ProfessionalInfo = ({ setProfileSetting }: { setProfileSetting: (value: boolean) => void }) => {

  const [data, setData] = useState({});
    const { data:user, refetch: refetchUser } = useUser();
    const {mutate:professionalInfoUpdate} =usePostProfessionalInfo()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(data);
    setData({
      profileBio:user?.user?.profile?.professionalInfo?.profileBio,
      notableWorks:user?.user?.profile?.professionalInfo?.notableWorks,
      yearsOfExperience:user?.user?.profile?.professionalInfo?.yearsOfExperience,
      primaryGenre:user?.user?.profile?.professionalInfo?.primaryGenre,
      secondaryGenres:user?.user?.profile?.professionalInfo?.secondaryGenres,
      affiliations:user?.user?.profile?.professionalInfo?.affiliations,
      currentProjects:user?.user?.profile?.professionalInfo?.currentProjects,
      awardsAndRecognitions:user?.user?.profile?.professionalInfo?.awardsAndRecognitions,
      genre1:user?.user?.profile?.professionalInfo?.secondaryGenres[0],
      genre2:user?.user?.profile?.professionalInfo?.secondaryGenres[1]||"",
      genre3:user?.user?.profile?.professionalInfo?.secondaryGenres[2]||"",
  })
  }, [user]);
console.log("0.0..0.0.0.0.",data);

  const handleSubmit = () => {
const payload ={
  profileBio:data?.profileBio,
  notableWorks:data?.notableWorks,
  yearsOfExperience:data?.yearsOfExperience,
  primaryGenre:data?.primaryGenre,
  secondaryGenres:[data?.genre1,data?.genre2,data?.genre3 ],
  affiliations:data?.affiliations,
  currentProjects:data?.currentProjects,
  awardsAndRecognitions:data?.awardsAndRecognitions,
}
    professionalInfoUpdate(payload);
  };

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <section className="flex flex-row w-full items-center justify-between py-4 border-b border-slate-300">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold">Professional information</h1>
          <p className="text-xs text-slate-500 font-medium">Update your Professional information here.</p>
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
              // setProfileData((prev) => ({ ...prev, screennwriting_style: data }));
              setTimeout(() => {
                setProfileSetting(false);
              }, 500);
              handleSubmit()
            }}
            className="px-10 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
          >
            Save
          </button>
        </div>
      </section>

      {/**Experience */}
      <About data={data} handleChange={handleChange} />
      <Experience data={data} handleChange={handleChange} />

      {/**Primary Genre */}
      <PrimaryGenre data={data} genres={genres} handleChange={handleChange} />

      {/**Secondary */}
      <SecondaryGenres data={data} genres={genres} handleChange={handleChange} />

      {/**Notabel works */}
      <NotableWorks data={data} handleChange={handleChange} />

      {/**Affiliations */}
      <Affiliations data={data} handleChange={handleChange} />

      {/**Current Files */}
      <CurrentFiles data={data} handleChange={handleChange} />

      {/**Awards And Recognitions */}
      <AwardsAndRecognitions data={data} handleChange={handleChange} />
    </div>
  );
};

export default ProfessionalInfo;

function Experience({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="yearsOfExperience" className="font-bold w-1/4 text-sm">
        Years of Experience
      </label>

      <div className="flex w-2/4">
        <input
          type="number"
          name="yearsOfExperience"
          placeholder="Age"
          value={data.yearsOfExperience}
          onChange={handleChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl"
        />
      </div>
    </section>
  );
}

function PrimaryGenre({
  data,
  genres,
  handleChange,
}: {
  data: any;
  genres: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="primaryGenre" className="font-bold w-1/4 text-sm">
        Primary Genre Specialized In
      </label>

      <div className="w-2/4 flex flex-row items-center relative">
        <select
          className="w-full form-select appearance-none cursor-pointer select-arrow font-medium text-center flex flex-row gap-4 items-center border border-gray-300 rounded-2xl px-4 py-2 text-sm relative"
          aria-label="Default select example"
          name="primaryGenre"
          value={data.primaryGenre}
          onChange={handleChange}
        >
          {genres.map((gen, index) => (
            <option key={index} className="text-start" value={gen}>
              {gen}
            </option>
          ))}
        </select>
        <FaAngleDown className="absolute right-4 text-slate-500" />
      </div>
    </section>
  );
}

type SecondaryGenresProps = {
  data: {
    genre1: string;
    genre2: string;
    genre3: string;
  };
  genres: string[];
  handleChange: (e: { name: string; value: string }) => void;
};

const SecondaryGenres: React.FC<SecondaryGenresProps> = ({ data, genres, handleChange }) => {
  const options = genres.map((genre) => ({ label: genre, value: genre }));

  const handleSelectChange = (selected: any, actionMeta: any) => {
    handleChange({ name: actionMeta.name, value: selected?.value || '' });
  };

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <label htmlFor="genre1 genre2 genre3" className="font-bold w-1/4 text-sm">
        Secondary Genre Specialized In
      </label>

      <div className="w-3/4 flex flex-row items-center gap-4">
        {['genre1', 'genre2', 'genre3'].map((field) => (
          <div key={field} className="w-1/3 flex flex-row items-center relative">
            <Select
              name={field}
              options={options}
              className="w-full"
              classNamePrefix="react-select"
              value={options.find((opt) => opt.value === data[field]) || null}
              onChange={handleSelectChange}
              placeholder={`Select ${field}`}
              isClearable
              components={{ IndicatorSeparator: () => null }}
            />
            <FaAngleDown className="absolute right-4 text-slate-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};


function NotableWorks({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: any;
}) {
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 275;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxCharCount) {
      setCharCount(value.length);
      handleChange(e);
    } else {
      e.target.value = value.substring(0, maxCharCount);
      setCharCount(maxCharCount);
    }
  };

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <label htmlFor="notableWorks" className="font-bold w-1/4 text-sm">
        Notable Works
      </label>

      <div className="w-2/4 flex flex-col items-start gap-2">
        <textarea
          rows={4}
          value={data.notableWorks}
          name="notableWorks"
          onChange={handleTextareaChange}
          placeholder="Movies, TV Shows, Plays"
          className="w-full border border-gray-300 rounded-2xl px-4 py-2 text-sm"
        ></textarea>
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {charCount}/{maxCharCount} Characters left
          </span>
          {charCount >= maxCharCount && <span className="text-sm text-red-500">Character limit exceeded</span>}
        </div>
      </div>
    </section>
  );
}
function About({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: any;
}) {
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 275;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxCharCount) {
      setCharCount(value.length);
      handleChange(e);
    } else {
      e.target.value = value.substring(0, maxCharCount);
      setCharCount(maxCharCount);
    }
  };

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <label htmlFor="profileBio" className="font-bold w-1/4 text-sm">
      Anything about yourself
      </label>

      <div className="w-2/4 flex flex-col items-start gap-2">
        <textarea
          rows={4}
          value={data.profileBio}
          name="profileBio"
          onChange={handleTextareaChange}
          placeholder="What drives your creativity? What’s your screenwriting style? Are you inspired by the classics, or do you love breaking rules? Share your journey, A unique writing ritual or your proudest script moments! Tell us what makes you, You!"
          className="w-full border border-gray-300 rounded-2xl px-4 py-2 text-sm"
        ></textarea>
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {charCount}/{maxCharCount} Characters left
          </span>
          {charCount >= maxCharCount && <span className="text-sm text-red-500">Character limit exceeded</span>}
        </div>
      </div>
    </section>
  );
}

function Affiliations({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="affiliations" className="font-bold w-1/4 text-sm">
        Affiliations
      </label>

      <div className="w-2/4 flex gap-x-4">
        <input
          type="text"
          name="affiliations"
          value={data.affiliations}
          placeholder="writers' guilds, unions, associations, etc."
          onChange={handleChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-2xl"
        />
      </div>
    </section>
  );
}

function CurrentFiles({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: any;
}) {
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 275;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxCharCount) {
      setCharCount(value.length); //Updating no.of chars typed
      handleChange(e);
    } else {
      e.target.value = value.substring(0, maxCharCount); //trim the string to max length
      setCharCount(maxCharCount); //Do not increase count
    }
  };

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <label htmlFor="currentProjects" className="font-bold w-1/4 text-sm">
        Current Projects
      </label>

      <div className="w-2/4 flex flex-col items-start gap-2">
        <textarea
          name="currentProjects"
          rows={4}
          value={data.currentProjects}
          onChange={handleTextareaChange}
          placeholder="describe your current files in detail"
          className="w-full border border-gray-300 rounded-2xl px-4 py-2 text-sm"
        ></textarea>
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {charCount}/{maxCharCount} Characters left
          </span>
          {charCount >= maxCharCount && <span className="text-sm text-red-500">Character limit exceeded</span>}
        </div>
      </div>
    </section>
  );
}

function AwardsAndRecognitions({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4">
      <label htmlFor="awardsAndRecognitions" className="font-bold w-1/4 text-sm">
        Awards And Recognitions
      </label>

      <div className="w-2/4 flex flex-col items-start gap-2">
        <textarea
          rows={3}
          onChange={handleChange}
          value={data.awardsAndRecognitions}
          name="awardsAndRecognitions"
          placeholder="enter details about any awards and recognitions you have received."
          className="w-full border border-gray-300 rounded-2xl px-4 py-2 text-sm"
        ></textarea>
      </div>
    </section>
  );
}
