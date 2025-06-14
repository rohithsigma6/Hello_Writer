import { ChangeEvent } from 'react';
import { Payload } from './onboarding-modal';
import Frame3 from '@/assets/onboarding/Frame10.svg';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
interface AboutContentProps {
  payload: Payload;
  handleProfileImageChange: (e: any) => void;
  handleBioChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handlePreviousGenre: () => void;
  handleNextAbout: () => void;
  IsBioDisable: boolean;
  userIcon: string;
}

export const AboutContent: React.FC<AboutContentProps> = ({
  payload,
  handleProfileImageChange,
  handleBioChange,
  handlePreviousGenre,
  handleNextAbout,
  IsBioDisable,
  userIcon,
}) => {
  return (
    <>
      <img
        src={Frame3}
        alt="Steps"
        className="xs:hidden block mt-5 mb-10 w-full"
      />
      <h1 className="text-[#43479B] text-[20px] text-center font-semibold mb-4">
        Your Story Matters - Share It!
      </h1>
      <p className="text-black font-medium mb-6 text-center text-sm">
        Let the world of screenwriters know who you are. Share your passion,
        your process, and the stories that define you. Your words can spark
        connections and collaborations!
      </p>
      <img src={Frame3} alt="Steps" className="xs:block hidden w-full mb-8" />

      <div className="w-full flex md:flex-row flex-col xs:gap-6 gap-4 items-start xs:mb-8 mb-0">
        <div className="flex flex-col items-center md:w-1/3 w-full">
          <div className="xs:h-40 h-32 xs:w-40 w-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            {payload?.profile_image ? (
              <img
                src={URL.createObjectURL(payload?.profile_image)}
                alt="profile Img"
                className="h-full w-full rounded-full"
              />
            ) : (
              <img src={userIcon} alt="userIcon" />
            )}
          </div>
          <label
            htmlFor="profile-picture"
            className="cursor-pointer xs:text-base text-sm xs:font-base font-medium mb-2 bg-[#653EFF] hover:bg-[#653EFF]/90 text-white px-6 py-2 rounded-full"
          >
            Choose Profile Picture
          </label>
          <input
            id="profile-picture"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
          />
        </div>

        <div className="flex-1 w-full">
          <h2 className="text-sm font-medium mb-2">Anything about yourself</h2>
          <textarea
            className="w-full xs:h-48 h-40 p-4 text-sm border rounded-lg resize-none bg-white"
            placeholder="What drives your creativity? What’s your screenwriting style? Are you inspired by the classics, or do you love breaking rules? Share your journey, A unique writing ritual or your proudest script moments! Tell us what makes you, You!"
            onChange={handleBioChange}
            value={payload.profile_bio}
          />
        </div>
      </div>

      <div className={`xs:flex hidden gap-5 mt-5 w-full justify-between`}>
        <button
          onClick={handlePreviousGenre}
          className="flex items-center px-5 py-2 rounded-full font-medium hover:text-white text-[#653EFF] hover:bg-[#653EFF] bg-transparent transition-colors"
        >
          <FaArrowLeftLong className="mr-2" />
          Previous
        </button>
        <button
          onClick={handleNextAbout}
          className={`flex items-center px-5 py-2 rounded-full font-medium ${
            IsBioDisable
              ? 'text-gray-400 cursor-not-allowed'
              : 'hover:text-white text-[#653EFF] hover:bg-[#653EFF] bg-transparent transition-colors'
          }`}
          disabled={IsBioDisable}
        >
          Next
          <FaArrowRightLong className="ml-2" />
        </button>
      </div>

      <div className="xs:hidden w-full flex flex-row justify-end mt-10 items-center">
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousGenre}
            className="rounded-full p-3 font-semibold bg-[#c3b5ff] text-[#653EFF]"
          >
            <FaArrowLeftLong />
          </button>
          <button
            onClick={handleNextAbout}
            disabled={IsBioDisable}
            className={`rounded-full p-3 font-semibold ${
              IsBioDisable
                ? 'bg-[#535353] text-white'
                : 'bg-[#653EFF] text-white'
            }`}
          >
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </>
  );
};
