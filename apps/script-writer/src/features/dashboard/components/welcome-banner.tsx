import DashboardHeartIcon from '@/assets/landingsite/upgrade-img.svg';
import Youtube from '@/assets/dashboard/YT.svg';
import { useState } from 'react';
import FeedbackModal from './feedback-modal';
import HowToUseScreenplay from './how-to-use-screenplay';

export const WelcomeBanner = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  return (
    <section className={'w-full flex flex-row gap-x-4 pt-[24px] px-[24px]'}>
      <div className="w-1/2 rounded-[24px] bg-white flex flex-row p-[16px]">
        <img
          src={DashboardHeartIcon}
          alt="Gift Box"
          className="w-[100px] h-[100px]"
        />

        <div className="flex flex-col items-start justify-between ml-[10px]">
          <div>
            <p className="font-semibold text-base text-text-500">
              We're in Beta!
            </p>
            <p className="font-normal text-[#4D4D5A] m-0 text-[14px]">
              Share Your Feedback to Shape Screenplay.Ink's Future!
            </p>
          </div>

          <button
            onClick={() => setShowFeedback(true)}
            className="font-semibold bg-text-500 text-white rounded-[16px] mt-[16px] py-3 px-6 hover:bg-black transition-colors text-xs"
          >
            Give Feedback
          </button>
        </div>
      </div>

      <div className="w-1/2 rounded-[24px] bg-white flex flex-row p-[16px]">
        <img src={Youtube} alt="Gift Box" className="w-[92px] h-[92px]" />

        <div className="flex flex-col items-start justify-between ml-[10px]">
          <div>
            <p className="font-semibold text-base text-text-500">
              How to Use Screenplay.ink
            </p>
            <p className="font-normal text-[#4D4D5A] m-0 text-[14px]">
              Join the #Screenplay.Ink Campaign
            </p>
          </div>

          <button
            onClick={() => setShowLearnMore(true)}
            className="font-semibold bg-text-500 text-white rounded-[16px] mt-[16px] py-3 px-6 hover:bg-black transition-colors text-xs"
          >
            Learn more
          </button>
        </div>
      </div>

      <FeedbackModal
        setShowFeedback={setShowFeedback}
        showFeedback={showFeedback}
      />
      <HowToUseScreenplay
        showHowToUseScreenplay={showLearnMore}
        setShowHowToUseScreenplay={setShowLearnMore}
      />
    </section>
  );
};
