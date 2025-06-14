import React, { useEffect, useState } from "react";
import { usePostNetworkingGoals } from "../api/use-mutate";
import { useUser } from './../../../users/api/get-user';


const NetworkingGoals = ({
  setProfileSetting,
}: {
  setProfileSetting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {mutate:networkingGoalsUpdate} = usePostNetworkingGoals();
  const [data, setData] = useState<any>({});

  const [openForWork, setOpenForWork] = useState(false);
  const { data:user, refetch: refetchUser } = useUser();

  const handleToggle = () => {
    setOpenForWork(!openForWork);
    setData((prevValues: any) => ({
      ...prevValues,
      openForWork: !openForWork,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setData({
      lookingFor: user?.user?.profile?.networkingGoals?.lookingFor[0],
      typesOfProjects: user?.user?.profile?.networkingGoals?.typesOfProjects[0],
    });
    setOpenForWork(user?.user?.profile?.networkingGoals?.openForWork);
  }, [user]);
  const handleSubmit = () => {
    const payload = {
      lookingFor: [data?.lookingFor],
      openForWork: openForWork,
      typesOfProjects: [data?.typesOfProjects],
    };
    networkingGoalsUpdate(payload);
  };

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <section className="flex flex-row w-full items-center justify-between py-4 border-b border-slate-300">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold">Networking Goals</h1>
          <p className="text-xs text-slate-500 font-medium">Update your Networking Goals details here.</p>
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
              handleSubmit();
            }}
            className="px-10 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
          >
            Save
          </button>
        </div>
      </section>

      <LookingFor handleChange={handleChange} data={data} />

      <section className="flex flex-row w-full items-start py-4">
        <p className="font-bold w-1/4 text-sm">Availability for New Files</p>

        <div className="w-3/4 flex flex-row gap-4">
          <button
            type="button"
            className={`toggle-button w-10 h-6 rounded-full flex items-center ${
              openForWork
                ? "justify-end bg-primary-blue shadow-neumorphism-green border border-green-600"
                : "justify-start bg-slate-200 shadow-neumorphism-gray"
            } p-1 transition-transform duration-500 ease-in-out`}
            onClick={handleToggle}
          >
            <div
              className={`toggle-inner w-4 h-4 rounded-full shadow-neumorphism-inner ${
                openForWork ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          </button>

          <p className="text-sm">Open for Work</p>
        </div>
      </section>

      <TypesOfFiles handleChange={handleChange} data={data} />
    </div>
  );
};

export default NetworkingGoals;

function LookingFor({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4">
      <p className="font-bold w-1/4 text-sm">Looking For</p>

      <div className="w-3/4 flex flex-row gap-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="collaborators"
            name="lookingFor"
            value="Collaborators"
            className="custom-radio"
            onChange={handleChange}
            checked={data?.lookingFor === "Collaborators"}
          />
          <label className="text-sm" htmlFor="collaborators">
            Collaborators
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="mentors"
            name="lookingFor"
            value="Mentors"
            onChange={handleChange}
            checked={data?.lookingFor === "Mentors"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="mentors">
            Mentors
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="agents"
            name="lookingFor"
            value="Agents"
            onChange={handleChange}
            checked={data?.lookingFor === "Agents"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="agents">
            Agents
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="industry-contacts"
            name="lookingFor"
            value="Industry Contacts"
            onChange={handleChange}
            checked={data?.lookingFor === "Industry Contacts"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="industry-contacts">
            Industry Contacts
          </label>
        </div>
      </div>
    </section>
  );
}

function TypesOfFiles({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4">
      <p className="font-bold w-1/4 text-sm">Types of Files</p>

      <div className="w-3/4 flex flex-row gap-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="short-films"
            name="typesOfProjects"
            value="Short Films"
            onChange={handleChange}
            className={
              "appearance-none cursor-pointer relative w-4 h-4 flex flex-row items-center justify-center border border-gray-500 rounded-full " +
              "checked:before:border-primary-blue checked:before:bg-primary-blue checked:before:absolute checked:before:h-2 checked:before:w-2 checked:before:rounded-full"
            }
          />
          <label className="text-sm" htmlFor="short-films">
            Short Films
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="featured-length-films"
            name="typesOfProjects"
            value="Feature-length Films"
            onChange={handleChange}
            checked={data?.typesOfProjects === "Feature-length Films"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="featured-length-films">
            Feature-length Films
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="tv-series"
            name="typesOfProjects"
            value="TV Series"
            onChange={handleChange}
            checked={data?.typesOfProjects === "TV Series"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="tv-series">
            TV Series
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="web-series"
            name="typesOfProjects"
            value="Web Series"
            onChange={handleChange}
            checked={data?.typesOfProjects === "Web Series"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="web-series">
            Web Series
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="documentaries"
            name="typesOfProjects"
            value="Documentaries"
            onChange={handleChange}
            checked={data?.typesOfProjects === "Documentaries"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="Documentaries">
            Documentaries
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="Theater"
            name="typesOfProjects"
            value="Theater"
            onChange={handleChange}
            checked={data?.typesOfProjects === "Theater"}
            className="custom-radio"
          />
          <label className="text-sm" htmlFor="Theater">
            Theater
          </label>
        </div>
      </div>
    </section>
  );
}
