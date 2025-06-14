import React, { useEffect, useState } from 'react';
import Frame4 from '@/assets/onboarding/Frame11.svg';
import betaImg from '@/assets/exclusive-bg.svg';
import betaImgSmall from '@/assets/onboarding/PlanSmallImg.svg';
import inkBottle from '@/assets/ink-bottle-black.svg';
import blackInkBottle from '@/assets/onboarding/black-ink-bottle.svg';
import checkPurple from '@/assets/onboarding/check-purple.svg';
import checkPink from '@/assets/onboarding/check-pink.svg';
import PaymentModal from './payment';

// -------------------- Header Component --------------------
const SubscriptionHeader: React.FC = () => (
  <>
    <h1 className="text-[20px] text-[#43479B] font-semibold font-poppins text-center mb-5">
      Exclusive Beta Access Plan
    </h1>
    <div className="text-[#4D4D5A] font-poppins text-[17px] font-medium text-center">
      The World’s Most Advanced Real-time Collaborative Screenplay Editor
    </div>
  </>
);

// -------------------- Desktop Subscription Card --------------------
interface DesktopSubscriptionCardProps {
  handleOpen: () => void;
}

const DesktopSubscriptionCard: React.FC<DesktopSubscriptionCardProps> = ({
  handleOpen,
}) => (
  <div className="sm:flex hidden absolute justify-end right-[8px] top-[10px] font-poppins w-[190px] h-[246px] max-h-[90vh] overflow-y-auto">
    <div className="rounded-[30px] py-4 px-3 bg-white">
      
        <h3 className="text-[18px] font-bold text-[#43479B]">
          Beta Access Plan
        </h3>
        <div className="max-w-[150px] ml-[16px]">
        <p className="text-[11px] text-[#212131] font-medium my-2 arrow-blue-left-side relative">
        Limited-Time Offer Only 1,000 Invites Available
        </p>
        <p className="text-[11px] text-[#212131] font-medium arrow-blue-left-side relative">
        Full Access to All Features
        </p>
        </div>
  
      <section className="mt-[24px] mb-[6px]">
        <p className="text-[28px] font-bold text-[#F28C99]">
          ₹2,999 <small className="text-xs font-semibold">/ annum</small>
        </p>
        <p className="text-[11px] text-[#212131] font-medium flex items-center gap-1">
          <img src={inkBottle} alt="Ink Bottle" />
          AI Ink credits additional</p>
      </section>
      <button
        onClick={handleOpen}
        className="w-full bg-[#F28C99] text-white text-xs py-[10px] px-2 rounded-[14px] font-semibold hover:bg-[#ff6e7a] transition-colors"
      >
        Subscribe Now →
      </button>
    </div>
  </div>
);

// -------------------- Mobile Subscription Card --------------------
interface MobileSubscriptionCardProps {
  handleOpen: () => void;
}

const MobileSubscriptionCard: React.FC<MobileSubscriptionCardProps> = ({
  handleOpen,
}) => (
  <div className="sm:hidden w-full flex flex-col my-8 gap-4">
    <div className="rounded-[30px] py-4 px-3 bg-white">
      <section className="flex flex-col gap-1">
      <h3 className="text-[18px] font-bold text-[#43479B]">Beta Access Plan</h3>
      <div className="ml-[16px]">
        <p className="text-[11px] text-[#212131] font-medium my-2 arrow-blue-left-side relative">Limited-Time Offer Only 1,000 Invites Available</p>
        <p className="text-[11px] text-[#212131] font-medium arrow-blue-left-side relative">Full Access to All Features</p></div>
      </section>
     
      <section className="flex flex-col gap-1 mt-[20px]">
        <div className="xs:text-sm text-xs text-black">
          <span className="line-through font-semibold text-primary-blue">
            ₹9999
          </span>
          <span className="ml-1">
            Original Price:{' '}
            <span className="font-semibold text-primary-blue">70% OFF</span>
          </span>
        </div>
        <p className="text-[28px] font-bold text-[#F28C99]">
          ₹2,999{' '}
          <span className="xs:text-xs text-sm font-semibold">per annum</span>
        </p>
        <div className="xs:text-sm text-xs text-black flex gap-1 items-center">
          <img className="w-3 h-3" src={blackInkBottle} alt="Ink Bottle" /> 5000
          ink credits / <span>month</span>
        </div>
      </section>
    </div>
    <button
      onClick={handleOpen}
      className="w-full bg-[#F28C99] text-white text-base py-[8px] px-2 rounded-full font-semibold hover:bg-[#ff6e7a] transition-colors"
    >
      Subscribe Now →
    </button>
  </div>
);

// -------------------- Plan Image Section --------------------
interface PlanImageSectionProps {
  handleOpen: () => void;
}

const PlanImageSection: React.FC<PlanImageSectionProps> = ({ handleOpen }) => (
  <div className="mx-auto relative max-w-[600px] mt-[30px] mb-10 h-[266px] subscription-img">
    <img
      src={betaImg}
      alt="Beta Plan"
    />
    <DesktopSubscriptionCard handleOpen={handleOpen} />
  </div>
);

// -------------------- Feature Card --------------------
interface FeatureCardProps {
  title: string;
  features: string[];
  containerClass: string;
  titleClass: string;
  liClass: string;
  checkIcon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  features,
  containerClass,
  titleClass,
  liClass,
  checkIcon,
}) => (
  <div className={containerClass}>
    <h4 className={titleClass}>{title}</h4>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className={liClass}>
          <img className="w-3 h-3 mr-1" src={checkIcon} alt="Check" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

// -------------------- Features Grid --------------------
const FeaturesGrid: React.FC = () => {
  const featuresAvailableNow = [
    'Real-time Collaborative Screenplay Editor',
    'Unlimited Projects with Multilingual Support',
    'Prewriting Tools (story outline, scene cards, structure templates)',
    'Industry-standard Formatting',
  ];

  const upcomingFeatures = [
    'AI Writing Tools – Late January 2025',
    'Blockchain-based Script Registry – Late January 2025',
    'Advanced Script Analysis – Early February 2025',
    'Crowd Collaborative Writing – Late February 2025',
  ];

  const betaFeatures = [
    'Early Access to New Features',
    'Discounted Ink Credits   on Beta Launch of the AI Co-Writer',
    'Priority Support and Free Updates',
    'Exclusive Early Adopter Benefits',
  ];

  const limitedTimeFeatures = [
    'Only 1000 Invites Available',
    'One Year Access to Professional Writer Plan Features',
    'Avail Inclusion as Additional Ink Credits',
    'Get Writer’s Representation for free',
  ];

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-3 mx-auto w-full gap-y-5 font-poppins max-w-[736.81px]">
      <FeatureCard
        title="Features Available Now"
        features={featuresAvailableNow}
        containerClass="border-[1px] border-[#3F3566] bg-[#43479b0a] rounded-[10px] p-4"
        titleClass="text-[#F28C99] text-[14px] font-semibold mb-3"
        liClass="text-[10px] text-[#212131] flex items-center font-inter font-normal"
        checkIcon={checkPurple}
      />
      <FeatureCard
        title="Upcoming Features (Included in Your Plan)"
        features={upcomingFeatures}
        containerClass="bg-[#3F3566] rounded-[10px] p-4"
        titleClass="text-white text-[14px] font-semibold mb-3"
        liClass="text-[10px] text-white flex items-center font-inter font-normal"
        checkIcon={checkPink}
      />
      <FeatureCard
        title="Beta"
        features={betaFeatures}
        containerClass="bg-[#3F3566] rounded-[10px] p-4"
        titleClass="text-white text-[14px] font-semibold mb-3"
        liClass="text-[10px] text-white flex items-center font-inter font-normal"
        checkIcon={checkPink}
      />
      <FeatureCard
        title="Limited-Time Offer"
        features={limitedTimeFeatures}
        containerClass="border-[1px] border-[#3F3566] bg-[#43479b0a] rounded-[10px] p-4"
        titleClass="text-[#F28C99] text-[14px] font-semibold mb-3"
        liClass="text-[10px] text-[#212131] flex items-center font-inter font-normal"
        checkIcon={checkPurple}
      />
    </div>
  );
};

// -------------------- Main Subscription Modal Component --------------------
interface SubscriptionModalProps {
  isSubscriptionOpen: boolean;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isSubscriptionOpen,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
      <SubscriptionHeader />
      <PlanImageSection handleOpen={handleOpen} />
      <MobileSubscriptionCard handleOpen={handleOpen} />
      <PaymentModal open={open} handleClose={handleClose} />
      <FeaturesGrid />
    </>
  );
};

export default SubscriptionModal;
