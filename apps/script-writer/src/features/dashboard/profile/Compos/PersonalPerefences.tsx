import React, { useEffect, useState } from"react";
import { FaAngleDown } from"react-icons/fa6";

import interest1 from"@/assets/onboarding/interest1.svg";
import interest2 from"@/assets/onboarding/interest2.svg";
import interest3 from"@/assets/onboarding/interest3.svg";
import interest4 from"@/assets/onboarding/interest4.svg";
import { Image } from '@tiptap/extension-image';
import { useUser } from "@/features/users/api/get-user";
import { usePostPersonalPreferences } from "../api/use-mutate";

const formatArray: any[] = [
  { name:"Short Film", image: interest1 },
  { name:"Feature Film", image: interest2 },
  { name:"Television", image: interest3 },
  { name:"Still Exploring", image: interest4 },
];
const PersonalPerefences = ({
  setProfileSetting,
}: {
  setProfileSetting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState( {});
  const genres = ["Comedy","Action","Romance","Fiction","Mythology","Drama"];

  const {mutate:persnoalUpdate} = usePostPersonalPreferences();
  const { data:user, refetch: refetchUser } = useUser();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit =()=>{
   const payload ={
      favoriteMovies:data?.favoriteMovies, 
  passion:data?.passion,
  otherPassion:data?.otherPassion,
  favoriteScreenPlayFormat:data?.favoriteScreenPlayFormat,
  favoriteScreenWriters:data?.favoriteScreenWriters, 
  favoriteDirectors:data?.favoriteDirectors, 
  favoriteWritingTools:data?.favoriteWritingTools, 
    }
    persnoalUpdate(payload);
    
  }

  useEffect(() => {
    setData(user?.user?.profile?.personalPreferences)
  }, [])
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <section className="flex flex-row w-full items-center justify-between py-4 border-b border-slate-300">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold">Personal Preferences</h1>
          <p className="text-xs text-slate-500 font-medium">Update your Personal Perefences here.</p>
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

      {/**Favourite Movies */}
      <FavouriteMovies data={data} handleChange={handleChange} />

      {/**Favourite Screenwriters */}
      <Passtions data={data} handleChange={handleChange} />
      <FavoriteFormate data={data} handleChange={handleChange} genres={genres} />
      <FavScreewriters data={data} handleChange={handleChange} />
      <FavDirectors data={data} handleChange={handleChange} />

      {/**Fav Screendirectors */}

      {/**FavoriteFormate */}

      {/**Favorite writing tools */}
      <FavWritingTools data={data} handleChange={handleChange} />
    </div>
  );
};

export default PersonalPerefences;

function FavouriteMovies({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
}) {
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300">
      <label htmlFor="favoriteMovies" className="font-bold w-1/4 text-sm">
        Favourite Movies
      </label>

      <div className="flex w-2/4">
        <input
          type="text"
          name="favoriteMovies"
          value={data?.favoriteMovies}
          placeholder="Count of fav movies"
          onChange={handleChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
        />
      </div>
    </section>
  );
}

function FavScreewriters({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: any;
}) {

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
  };

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <label htmlFor="favoriteScreenWriters" className="font-bold w-1/4 text-sm">
        Favorite Screewriters
      </label>

      <div className="w-2/4 flex flex-col items-start gap-2">
        <textarea
          name="favoriteScreenWriters"
          rows={4}
          value={data?.favoriteScreenWriters }
          onChange={handleTextareaChange}
          placeholder="Users can enter the names of their favorite screenwriters."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        ></textarea>
      </div>
    </section>
  );
}
function Passtions({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: any;
}) {

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    handleChange(e);

  };

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <label htmlFor="otherPassion" className="font-bold w-1/4 text-sm">
        Where Does Your Passion Lie?
      </label>

      <div className="w-3/4 flex flex-col items-start gap-2">
        <div className="flex flex-wrap gap-3">
         {data?.passion?.map((p:any)=> <span className="bg-purple-50 border rounded-lg p-2 border-purple-200  font-medium ">
            {p}
          </span>)}
        </div>
        <textarea
          name="otherPassion"
          rows={4}
          value={data?.otherPassion }
          onChange={handleTextareaChange}
          placeholder="Have unique goals? Share them with us!"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        ></textarea>
      </div>
    </section>
  );
}
function FavDirectors({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: any;
}) {

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
  };

  return (
    <section className="flex flex-row w-full items-start py-4 border-b border-slate-300">
      <label htmlFor="favoriteDirectors" className="font-bold w-1/4 text-sm">
        Favorite Screedirectors
      </label>

      <div className="w-2/4 flex flex-col items-start gap-2">
        <textarea
          name="favoriteDirectors"
          rows={4}
          value={data?.favoriteDirectors }
          onChange={handleTextareaChange}
          placeholder="Users can enter the names of their favorite directors."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        ></textarea>
      </div>
    </section>
  );
}

function FavoriteFormate({
  data,
  genres,
  handleChange,
}: {
  data: any;
  genres: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {  
  return (
    <section className="flex flex-row w-full items-start py-4  border-b border-slate-300 ">
      <label htmlFor="fav_genre1 fav_genre2 fav_genre3" className="font-bold w-1/4 text-sm">
        Favourite Screenplay formats
      </label>

      <div className="w-3/4 flex flex-row items-center gap-3">
        <div className="flex flex-wrap gap-4">
         {formatArray.filter(f => data?.favoriteScreenPlayFormat?.includes(f?.name)).map((format,i)=> <div key={i} className="bg-purple-50 border rounded-lg p-2 items-center border-purple-200  font-medium flex">
             <img src={format.image} className="h-6 w-6"/>  <span className="mx-2">{format.name}</span>
          </div>)}
        </div>
      </div>
    </section>
  );
}

function FavWritingTools({
  handleChange,
  data,
}: {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  data: any;
}) {

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
  };

  return (
    <section className="flex flex-row w-full items-start py-4">
      <label htmlFor="favoriteWritingTools" className="font-bold w-1/4 text-sm">
        Favorite Writing Tools
      </label>

      <div className="w-2/4 flex flex-col items-start gap-2">
        <textarea
          name="favoriteWritingTools"
          rows={4}
          value={data?.favoriteWritingTools}
          onChange={handleTextareaChange}
          placeholder="Users can describe their favorite writing tools, including software, notebooks, or any other items they prefer"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        ></textarea>
      </div>
    </section>
  );
}
