import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

interface OnboardingContentProps {
  currentStep: number;
  onboardingSteps: any[];
  handlePrevious: () => void;
  handleNext: () => void;
  handleSkip: () => void;
}

export const OnboardingContent: React.FC<OnboardingContentProps> = ({
  currentStep,
  onboardingSteps,
  handlePrevious,
  handleNext,
  handleSkip,
}) => {
  const step = onboardingSteps[currentStep - 1];
  return (
    <>
      <div className="text-center relative">
        <img
          src={step.stepsImage}
          alt="Steps"
          className="xs:hidden block mt-5 mb-10 w-full"
        />
        <h1 className="text-[20px] text-[#43479B] font-semibold font-poppins mb-2">
          {step.title}
        </h1>
        <p className="text-[#4D4D5A] font-poppins text-sm font-medium mb-6">
          {step.subtitle}
        </p>
        <img
          src={step.mainImage}
          alt={step.title}
          className="mx-auto mb-16 sm:max-w-sm max-w-full"
        />
        <img
          src={step.stepsImage}
          alt="Steps"
          className="xs:block hidden sm:px-6 ml-2 mb-3 w-full"
        />
        <p className="text-black text-sm font-semibold font-poppins mb-2">
          {step.description}
        </p>
        <p className="text-black text-xs font-poppins xs:px-[60px] p-0 mb-8">
          {step.description2}
        </p>
      </div>

      <div
        className={`xs:flex hidden gap-2 w-full mt-4 ${currentStep > 1 ? 'justify-between' : 'justify-end'}`}
      >
        <div className={`flex flex-row w-full  ${currentStep > 1 ? 'justify-between' : 'justify-center'}`}>
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="flex items-center px-5 py-2 rounded-full font-medium hover:text-white text-[#653EFF] hover:bg-[#653EFF] bg-transparent transition-colors"
            >
              <FaArrowLeftLong className="mr-2" />
              Previous
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex items-center px-5 py-2 rounded-full font-medium hover:text-white text-[#653EFF] hover:bg-[#653EFF] bg-transparent transition-colors"
          >
            Next <FaArrowRightLong className="ml-2" />
          </button>
        </div>

        <span
          className="rounded-full absolute sm:top-6 top-4 sm:right-6 right-4 font-medium px-5 py-2 cursor-pointer text-primary-blue hover:text-white hover:bg-[#653EFF]"
          onClick={handleSkip}
        >
          Skip
        </span>
      </div>

      <div className="xs:hidden w-full flex flex-row justify-between mt-10 items-center">
        <span
          className="cursor-pointer font-semibold font-robot text-black hover:text-[#653EFF]"
          onClick={handleSkip}
        >
          Skip
        </span>

        <div className="flex space-x-2">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="rounded-full p-3 font-semibold bg-[#c3b5ff] text-[#653EFF]"
            >
              <FaArrowLeftLong />
            </button>
          )}
          <button
            onClick={handleNext}
            className="rounded-full p-3 font-semibold bg-[#653EFF] text-white"
          >
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </>
  );
};
