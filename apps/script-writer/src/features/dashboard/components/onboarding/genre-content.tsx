import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { Payload } from './onboarding-modal';
import Frame2 from '@/assets/onboarding/Frame1.svg';

const genre = [
  'Action',
  'Adult',
  'Adventure',
  'Biographical',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Experimental',
  'Fantasy',
  'Historical',
  'Horror',
  'Musical',
  'Mystery',
  'Romance',
  'Sci Fi',
  'Suspense',
  'Thriller',
  'Tragedy',
  'Western',
];

interface GenresContentProps {
  payload: Payload;
  handleGenreChange: (genre: string) => void;
  handlePreviousInterest: () => void;
  handleNextGenre: () => void;
  IsIntersetGernsDisable: boolean;
}

export const GenresContent: React.FC<GenresContentProps> = ({
  payload,
  handleGenreChange,
  handlePreviousInterest,
  handleNextGenre,
  IsIntersetGernsDisable,
}) => {
  return (
    <>
      <img
        src={Frame2}
        alt="Steps"
        className="xs:hidden block mt-5 mb-10 w-full"
      />

      <h1 className="text-[#43479B] text-[20px] text-center font-semibold mb-4">
        What Spark Your Creativity?
      </h1>
      <p className="text-black font-medium mb-6 text-center text-sm">
        Every great writer has their go-to genres. Let us know what inspires you
        to write, or dream. Your preferences could connect you with like minded
        storytellers
      </p>

      <img src={Frame2} alt="Steps" className="xs:block hidden mb-10 w-full" />

      <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 gap-y-3 mb-6">
        {genre.map((genre, index) => (
          <label
            key={index}
            className="xs:text-base text-sm md:p-3 p-2 rounded-lg flex items-center justify-start bg-white"
          >
            <input
              type="checkbox"
              className="mr-2 accent-[#653EFF] custom-primary-checkbox"
              onChange={() => handleGenreChange(genre)}
              checked={payload.favouriteGenres.includes(genre)}
            />
            {genre}
          </label>
        ))}
      </div>
      <p className="text-black font-semibold text-center text-sm mb-4">
        Select as many genres as you love. Don’t hold back!
      </p>

      <div className={`xs:flex hidden gap-5 mt-5 w-full justify-between`}>
        <button
          onClick={handlePreviousInterest}
          className="flex items-center px-5 py-2 rounded-full font-medium hover:text-white text-[#653EFF] hover:bg-[#653EFF] bg-transparent transition-colors"
        >
          <FaArrowLeftLong className="mr-2" />
          Previous
        </button>
        <button
          onClick={handleNextGenre}
          className={`flex items-center px-5 py-2 rounded-full font-medium ${
            IsIntersetGernsDisable
              ? 'text-gray-400 cursor-not-allowed'
              : 'hover:text-white text-[#653EFF] hover:bg-[#653EFF] bg-transparent transition-colors'
          }`}
          disabled={IsIntersetGernsDisable}
        >
          Next
          <FaArrowRightLong className="ml-2" />
        </button>
      </div>

      <div className="xs:hidden w-full flex flex-row justify-end mt-10 items-center">
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousInterest}
            className="rounded-full p-3 font-semibold bg-[#c3b5ff] text-[#653EFF]"
          >
            <FaArrowLeftLong />
          </button>
          <button
            onClick={handleNextGenre}
            disabled={IsIntersetGernsDisable}
            className={`rounded-full p-3 font-semibold ${
              IsIntersetGernsDisable
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
