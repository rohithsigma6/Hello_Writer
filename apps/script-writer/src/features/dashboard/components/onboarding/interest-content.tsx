import { ChangeEvent } from 'react';
import { Payload } from './onboarding-modal';
import Frame1 from '@/assets/onboarding/Frame2.svg';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const interest = [
  'Write a Screenplay',
  'Collaboration',
  'Enter a Contest',
  'Learn Screenwriting',
  'Review Screenplays',
  'Pitch Screenplays',
];

const format = ['Short Film', 'Feature Film', 'Television', 'Still Exploring'];

interface InterestsContentProps {
  payload: Payload;
  handleInterestChange: (interest: string) => void;
  handleOtherInterestChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFormatChange: (format: string) => void;
  stringArray: any[];
  handlePreviousOnboard: () => void;
  handleNextInterest: () => void;
  IsInterestNextDisable: boolean;
}

export const InterestsContent: React.FC<InterestsContentProps> = ({
  payload,
  handleInterestChange,
  handleOtherInterestChange,
  handleFormatChange,
  stringArray,
  handlePreviousOnboard,
  handleNextInterest,
  IsInterestNextDisable,
}) => {
  return (
    <>
      <img
        src={Frame1}
        alt="Steps"
        className="xs:hidden block mt-5 mb-10 w-full"
      />

      <h1 className="text-[#43479B] text-[20px] text-center font-semibold mb-4">
        Where Does Your Passion Lie?
      </h1>
      <p className="text-black font-medium mb-6 text-center text-sm">
        Screenwriting is an expansive journey. Tell us what excites you the
        most—writing, collaborating, learning, or showcasing your work. Your
        interests shape your creative path!
      </p>

      <img src={Frame1} alt="Steps" className="xs:block hidden mb-8 w-full" />

      <div className="w-full grid lg:grid-cols-3 grid-cols-2 gap-2 text-base">
        {interest.map((interest, index) => (
          <label
            key={index}
            className="xs:text-base text-sm px-3 py-2 gap-3 rounded-lg flex items-center bg-white"
          >
            <input
              type="checkbox"
              className="custom-primary-checkbox min-w-4 max-w-4"
              checked={payload.passion.includes(interest)}
              onChange={() => handleInterestChange(interest)}
            />
            {interest}
          </label>
        ))}
      </div>

      <label className="text-[14px] font-medium w-full mt-4 mb-1 text-black">
        Other (Please Specify)
      </label>
      <input
        className="w-full border rounded-lg p-3 mb-6 bg-white text-sm"
        placeholder="Have unique goals? Share them with us!"
        value={payload.otherPassion || ''}
        onChange={handleOtherInterestChange}
      />

      <h2 className="mb-6 text-black font-normal text-[16px]">
        Pick the screenplay formats you’re most passionate about. You can always
        explore more later!
      </h2>

      <div className="md:flex grid grid-cols-2 justify-evenly gap-4 w-full xs:mb-6">
        {format.map((format, index) => (
          <label
            key={index}
            className="border border-gray-400 rounded-xl 900px:min-w-40 min-w-32 text-[16px] p-3 flex flex-col items-center relative pt-6 bg-transparent"
          >
            <input
              type="checkbox"
              className="mb-2 absolute top-3 right-3 custom-primary-checkbox"
              checked={payload.favoriteScreenPlayFormat.includes(format)}
              onChange={() => handleFormatChange(format)}
            />
            <div
              className={
                'rounded-full xs:w-16 w-10 mb-2' +
                ` ${payload.favoriteScreenPlayFormat.includes(format) ? 'bg-[#F0ECFF]' : 'bg-[#E9E9EA]'}`
              }
            >
              <img src={`${stringArray[index]}`} alt="" />
            </div>
            {format}
          </label>
        ))}
      </div>

      <div className={`xs:flex hidden gap-5 mt-5 w-full justify-between`}>
        <button
          onClick={handlePreviousOnboard}
          className="flex items-center px-5 py-2 rounded-full font-medium hover:text-white text-[#653EFF] hover:bg-[#653EFF] bg-transparent transition-colors"
        >
          <FaArrowLeftLong className="mr-2" />
          Previous
        </button>
        <button
          onClick={handleNextInterest}
          className={`flex items-center px-5 py-2 rounded-full font-medium ${
            IsInterestNextDisable
              ? 'text-gray-400 cursor-not-allowed'
              : 'hover:text-white text-[#653EFF] hover:bg-[#653EFF] bg-transparent transition-colors'
          }`}
          disabled={IsInterestNextDisable}
        >
          Next
          <FaArrowRightLong className="ml-2" />
        </button>
      </div>

      <div className="xs:hidden w-full flex flex-row justify-end mt-10 items-center">
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousOnboard}
            className="rounded-full p-3 font-semibold bg-[#c3b5ff] text-[#653EFF]"
          >
            <FaArrowLeftLong />
          </button>
          <button
            onClick={handleNextInterest}
            disabled={IsInterestNextDisable}
            className={`rounded-full p-3 font-semibold ${
              IsInterestNextDisable
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
