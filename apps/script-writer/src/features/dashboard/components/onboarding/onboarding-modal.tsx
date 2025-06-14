import React, { useState, ChangeEvent, useEffect } from 'react';
import { onboardingSteps } from './steps';
import userIcon from '@/assets/onboarding/user.svg';
import interest1 from '@/assets/onboarding/interest1.svg';
import interest2 from '@/assets/onboarding/interest2.svg';
import interest3 from '@/assets/onboarding/interest3.svg';
import interest4 from '@/assets/onboarding/interest4.svg';
import SubscriptionModal from './subscriptions';
import { useUpdateUserOnBoard } from '@/features/users/api/update-user-onboard';
import { useSnackbar } from 'notistack';
import { useSearchParams } from 'react-router';
import { useUser } from '@/features/users/api/get-user';
import OnboardingSuccessMessage from './onboarding-success';
import { OnboardingContent } from './onboarding-content';
import { InterestsContent } from './interest-content';
import { GenresContent } from './genre-content';
import { AboutContent } from './about-content';

const stringArray: any[] = [interest1, interest2, interest3, interest4];

export interface Payload {
  passion: string[];
  otherPassion: string | null;
  favoriteScreenPlayFormat: string[];
  favouriteGenres: string[];
  profile_bio: string;
  profile_image: File | null;
}

interface MainOnboardingProps {
  eligible: boolean;
  onboardingInfo: any;
}

const MainOnboarding: React.FC<MainOnboardingProps> = ({
  eligible,
  onboardingInfo,
}) => {
  const [open, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentSuccess = searchParams.get('paymentSuccess');
  const { enqueueSnackbar } = useSnackbar();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isGenresModalOpen, setIsGenresModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [onboardingSuccess, setOnboardingSuccess] = useState(
    paymentSuccess == 'true',
  );
  const { data: userData, refetch } = useUser({
    queryConfig: {
      enabled: paymentSuccess == 'true',
    },
  });
  const { mutate: updateUserProfile } = useUpdateUserOnBoard({
    mutationConfig: {
      onSuccess: () => {
        enqueueSnackbar('Details updated', { variant: 'success' });
        setIsAboutModalOpen(false);
        setIsSubscriptionOpen(true);
      },
      onError: (err) => {
        // @ts-ignore
        let message = err?.response?.data;
        if (message) {
          enqueueSnackbar(message, { variant: 'error' });
        }
      },
    },
  });

  const [payload, setPayload] = useState<Payload>({
    passion: [],
    otherPassion: '',
    favoriteScreenPlayFormat: [],
    favouriteGenres: [],
    profile_bio: '',
    profile_image: null,
  });

  useEffect(() => {
    if (onboardingInfo && !eligible) {
      setIsSubscriptionOpen(true);
    }
    if (!onboardingInfo) {
      setIsOnboardingOpen(true);
    }

    if (!paymentSuccess && onboardingInfo && eligible) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [onboardingInfo, eligible]);

  useEffect(() => {
    if (paymentSuccess) {
      setOnboardingSuccess(true);
      setIsOpen(true);
      refetch();
    }
  }, [paymentSuccess]);

  useEffect(() => {
    if (!onboardingSuccess && onboardingInfo && eligible) {
      setIsOpen(false);
    }
  }, [onboardingSuccess]);

  const handleInterestChange = (interest: string): void => {
    setPayload((prevPayload) => {
      const updatedInterests = prevPayload.passion.includes(interest)
        ? prevPayload.passion.filter((item) => item !== interest)
        : [...prevPayload.passion, interest];
      return { ...prevPayload, passion: updatedInterests };
    });
  };

  const handleFormatChange = (format: string): void => {
    setPayload((prevPayload) => {
      const updatedFormats = prevPayload.favoriteScreenPlayFormat.includes(
        format,
      )
        ? prevPayload.favoriteScreenPlayFormat.filter((item) => item !== format)
        : [...prevPayload.favoriteScreenPlayFormat, format];
      return { ...prevPayload, favoriteScreenPlayFormat: updatedFormats };
    });
  };

  const handleOtherInterestChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPayload((prevPayload) => ({ ...prevPayload, otherPassion: value }));
  };

  const handleGenreChange = (genre: string): void => {
    setPayload((prevPayload) => {
      const updatedGenres = prevPayload.favouriteGenres.includes(genre)
        ? prevPayload.favouriteGenres.filter((item) => item !== genre)
        : [...prevPayload.favouriteGenres, genre];
      return { ...prevPayload, favouriteGenres: updatedGenres };
    });
  };

  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setPayload((prevPayload) => ({ ...prevPayload, profile_bio: value }));
  };

  const handleProfileImageChange = (e: any) => {
    const file = e.target.files[0];
    setPayload((prevPayload) => ({ ...prevPayload, profile_image: file }));
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOnboardingOpen(false);
      setIsInterestModalOpen(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreviousOnboard = () => {
    setIsOnboardingOpen(true);
    setIsInterestModalOpen(false);
  };

  const handlePreviousInterest = () => {
    setIsInterestModalOpen(true);
    setIsGenresModalOpen(false);
  };

  const handlePreviousGenre = () => {
    setIsGenresModalOpen(true);
    setIsAboutModalOpen(false);
  };

  const handleNextInterest = () => {
    setIsInterestModalOpen(false);
    setIsGenresModalOpen(true);
  };

  const handleSkip = () => {
    setIsOnboardingOpen(false);
    setIsInterestModalOpen(true);
  };

  const handleNextGenre = () => {
    setIsGenresModalOpen(false);
    setIsAboutModalOpen(true);
  };

  const handleNextAbout = () => {
    updateUserProfile(convertToFormData(payload));
  };

  function convertToFormData(payload: Payload) {
    const formData = new FormData();

    if (Array.isArray(payload.passion)) {
      payload.passion.forEach((passion: string, index: number) => {
        formData.append(`passion[${index}]`, passion);
      });
    }
    formData.append('otherPassion', payload.otherPassion ?? '');

    if (Array.isArray(payload.favoriteScreenPlayFormat)) {
      payload.favoriteScreenPlayFormat.forEach(
        (format: string, index: number) => {
          formData.append(`favoriteScreenPlayFormat[${index}]`, format);
        },
      );
    }
    if (Array.isArray(payload.favouriteGenres)) {
      payload.favouriteGenres.forEach((genre: string, index: number) => {
        formData.append(`favouriteGenres[${index}]`, genre);
      });
    }
    formData.append('profile_bio', payload.profile_bio || '');

    if (payload.profile_image && payload.profile_image instanceof File) {
      formData.append('profile_image', payload.profile_image);
    }

    return formData;
  }

  const IsInterestNextDisable =
    payload.favoriteScreenPlayFormat.length === 0 ||
    payload.passion.length === 0;
  const IsIntersetGernsDisable = payload.favouriteGenres.length < 1;
  const IsBioDisable = !payload.profile_bio;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm">
            <div
              className={
                'relative m-auto bg-[#e7ebff] rounded-[12px] w-full min-w-[898.55px] py-8 px-6 max-w-[898.55px] md:w-full mobile-media-quary max-h-[90vh] overflow-y-auto'
              }
            >
              {isOnboardingOpen &&
                !isInterestModalOpen &&
                !isGenresModalOpen &&
                !isAboutModalOpen && (
                  <OnboardingContent
                    currentStep={currentStep}
                    onboardingSteps={onboardingSteps}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    handleSkip={handleSkip}
                  />
                )}

              {isInterestModalOpen && (
                <InterestsContent
                  payload={payload}
                  handleInterestChange={handleInterestChange}
                  handleOtherInterestChange={handleOtherInterestChange}
                  handleFormatChange={handleFormatChange}
                  stringArray={stringArray}
                  handlePreviousOnboard={handlePreviousOnboard}
                  handleNextInterest={handleNextInterest}
                  IsInterestNextDisable={IsInterestNextDisable}
                />
              )}

              {isGenresModalOpen && (
                <GenresContent
                  payload={payload}
                  handleGenreChange={handleGenreChange}
                  handlePreviousInterest={handlePreviousInterest}
                  handleNextGenre={handleNextGenre}
                  IsIntersetGernsDisable={IsIntersetGernsDisable}
                />
              )}

              {isAboutModalOpen && (
                <AboutContent
                  payload={payload}
                  handleProfileImageChange={handleProfileImageChange}
                  handleBioChange={handleBioChange}
                  handlePreviousGenre={handlePreviousGenre}
                  handleNextAbout={handleNextAbout}
                  IsBioDisable={IsBioDisable}
                  userIcon={userIcon}
                />
              )}

              {isSubscriptionOpen && !eligible && (
                <SubscriptionModal isSubscriptionOpen={isSubscriptionOpen} />
              )}

              {onboardingSuccess && (
                <OnboardingSuccessMessage
                  setOnboardingSuccess={setOnboardingSuccess}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainOnboarding;
