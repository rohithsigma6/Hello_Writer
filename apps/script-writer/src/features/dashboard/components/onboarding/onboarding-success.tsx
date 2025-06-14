import { useNavigate } from 'react-router';
import processImage from '@/assets/onboarding/Frame12.svg';
import successImage from '@/assets/onboarding/new-img-9.svg';

const OnboardingSuccessMessage = ({
  setOnboardingSuccess,
}: {
  setOnboardingSuccess: (arg: boolean) => void;
}) => {
  const navigate = useNavigate();
  const handleComplete = () => {
    setOnboardingSuccess(false);
    navigate('/dashboard', { replace: true });
  };
  return (
    <div
      className={
        'relative max-w-full xs:h-auto h-screen w-full flex flex-col items-center justify-between'
      }
    >
      <div className="text-center relative">
        <img
          src={processImage}
          alt="Steps"
          className="xs:hidden block mt-5 mb-10 w-full"
        />

        <h1 className="text-[20px] text-[#43479B] font-semibold font-poppins mb-2">
          {' '}
          Dive Into Action
        </h1>
        <p className="text-[#4D4D5A] font-poppins text-sm font-medium mb-6">
          {' '}
          Your Screenwriting Adventure Awaits
        </p>

        <img
          src={successImage}
          height={280}
          alt={'Success Image'}
          className="mx-auto mb-16 sm:max-w-sm max-w-full"
        />

        <img
          src={processImage}
          alt="Steps"
          className="xs:block hidden sm:px-6 ml-2 w-full"
        />

        <p className="text-black text-xs font-poppins xs:px-[60px] p-0 my-6">
          You're all set! Start your screenwriting journey, find inspiration,
          engage with the community, and let your stories find their audience.
          Your next big break is just around the corner at Screenplay.ink.
        </p>
      </div>

      <div className={`flex w-full gap-5 justify-center`}>
        <button
          onClick={handleComplete}
          className="sm:w-auto w-full bg-[#653EFF] text-white sm:text-[16px] text-sm font-medium sm:px-6 sm:py-2.5 px-2 py-2 flex items-center justify-center border-1  box-shadow-xs rounded-full"
        >
          Start Writing
        </button>
      </div>
    </div>
  );
};

export default OnboardingSuccessMessage;
