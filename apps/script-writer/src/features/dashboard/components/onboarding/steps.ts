import Onboarding1 from '@/assets/onboarding/setp-1-img.svg';
import Onboarding2 from '@/assets/onboarding/setp-2-img.svg';
import Onboarding3 from '@/assets/onboarding/setp-7-img.svg';
import Onboarding4 from '@/assets/onboarding/setp-6-img.svg';
import Onboarding5 from '@/assets/onboarding/setp-5-img.svg';
import Onboarding6 from '@/assets/onboarding/setp-4-img.svg';
import Onboarding7 from '@/assets/onboarding/setp-3-img.svg';
import Steps1 from '@/assets/onboarding/Frame9.svg';
import Steps2 from '@/assets/onboarding/Frame8.svg';
import Steps3 from '@/assets/onboarding/Frame7.svg';
import Steps4 from '@/assets/onboarding/Frame6.svg';
import Steps5 from '@/assets/onboarding/Frame5.svg';
import Steps6 from '@/assets/onboarding/Frame4.svg';
import Steps7 from '@/assets/onboarding/Frame3.svg';

export interface OnboardingStep {
  title: string;
  subtitle: string;
  description: string;
  description2: string;
  mainImage: string;
  stepsImage: string;
}
export const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Welcome to Your Studio',
    subtitle: 'Your Creative Sanctuary',
    description: 'Craft, Connect, and Sell Your Screenplays',
    description2:
      "Welcome to your personalised screenwriter's studio, designed to empower your storytelling journey from the first draft to the final sale.",
    mainImage: Onboarding1,
    stepsImage: Steps1,
  },

  {
    title: 'Learn and Enhance',
    subtitle: 'Master Your Craft',
    description: 'Resources Tailored to Your Growth',
    description2:
      ' Immerse yourself in a wealth of knowledge with our learning resources, tutorials, and workshops tailored to hone your screenwriting process.',
    mainImage: Onboarding2,
    stepsImage: Steps2,
  },

  {
    title: 'Write and Collaborate',
    subtitle: 'Your Script, Our Stage',
    description: 'Collaborative Writing Tools',
    description2:
      'Begin crafting your stories on our intuitive writing platform. Collaborate seamlessly with peers, mentors, and industry professionals.',
    mainImage: Onboarding7,
    stepsImage: Steps3,
  },

  {
    title: 'Protect and Pitch',
    subtitle: 'Secure Your Ideas',
    description: 'Pitch with Assurance',
    description2:
      'Safeguard your scripts with our secure storage options. Use our pitching tools to present your work to a network of producers and studios.',
    mainImage: Onboarding6,
    stepsImage: Steps4,
  },

  {
    title: 'Contests and Opportunities',
    subtitle: 'Showcase Your Talent',
    description: ' Contests and Open Calls',
    description2:
      'Participate in exclusive contests and open calls for screenplays, gain recognition, and take your screenwriting career to new heights.',
    mainImage: Onboarding5,
    stepsImage: Steps5,
  },
  {
    title: 'Market and Monetise',
    subtitle: 'Your Marketplace',
    description: 'From Script to Sale',
    description2:
      ' Discover opportunities to sell your scripts or get commissioned for writing projects. Navigate the marketplace with ease.',
    mainImage: Onboarding4,
    stepsImage: Steps6,
  },

  {
    title: ' Network and Exchange',
    subtitle: "The Screenwriter's Social",
    description: ' Engage with Your Tribe',
    description2:
      'Connect with a community of screenwriters, exchange ideas, get feedback, and build lasting professional relationships.',
    mainImage: Onboarding3,
    stepsImage: Steps7,
  },
];
