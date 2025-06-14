import { useNavigate } from 'react-router';
import SidebarTab from './sidebar-tab';
import comingSoon from '@/assets/dashboard/comingSoon.svg';
import comingVerySoon from '@/assets/dashboard/comingVerySoon.svg';
import icon1 from '@/assets/dashboard/side-bar-icon/icon-1.svg';
import icon2 from '@/assets/dashboard/side-bar-icon/script-bloc.svg';
import icon3 from '@/assets/dashboard/side-bar-icon/picths.svg';
import icon4 from '@/assets/dashboard/side-bar-icon/crowd-collab.svg';
import icon5 from '@/assets/dashboard/side-bar-icon/screeplay-icon.svg';
import icon6 from '@/assets/dashboard/side-bar-icon/shre-with-me.svg';
import icon7 from '@/assets/dashboard/side-bar-icon/library-icon.svg';
import icon9 from '@/assets/dashboard/side-bar-icon/icon-9.svg';
import icon10 from '@/assets/dashboard/side-bar-icon/icon-10.svg';

interface SidebarTabData {
  type: 'link' | 'button';
  to?: string;
  icon: React.ReactNode;
  label: string;
  extraClass?: string;
  comingSoon?: boolean;
  comingSoonImage?: string;
  onClick?: () => void;
}

interface SidebarOptionsProps {
  navigate: ReturnType<typeof useNavigate>;
}

const SidebarOptions: React.FC<SidebarOptionsProps> = ({ navigate }) => {
  const sidebarTabs: SidebarTabData[] = [
    {
      type: 'link',
      to: '/dashboard',
      icon: (
        <img
          className="justify-self-end max-w-[24px] max-h-[24px]"
          src={icon1}
          alt="Dashboard"
        />
      ),
      label: 'My dashboard',
      extraClass: 'pt-0',
    },
    {
      type: 'link',
      to: '/my-screenplays',
      icon: (
        <img
          className="justify-self-end max-w-[24px] max-h-[24px]"
          src={icon5}
          alt="Screenplays"
        />
      ),
      label: 'My Screenplays',
    },
    {
      type: 'link',
      to: '/shared-with-me',
      icon: (
        <img
          className="max-w-[24px] max-h-[24px]"
          src={icon6}
          alt="Shared With Me"
        />
      ),
      label: 'Shared With Me',
    },
    {
      type: 'button',
      icon: (
        <img
          className="max-w-[24px] max-h-[24px]"
          src={icon7}
          alt="Script Library"
        />
      ),
      label: 'Script Library',
      comingSoon: true,
      comingSoonImage: comingVerySoon,
    },
    {
      type: 'button',
      icon: (
        <img
          className="max-w-[24px] max-h-[24px]"
          src={icon4}
          alt="Crowd Collab"
        />
      ),
      label: 'Crowd Collab',
      comingSoon: true,
      comingSoonImage: comingSoon,
    },
    {
      type: 'button',
      icon: (
        <img
          className="max-w-[24px] max-h-[24px]"
          src={icon2}
          alt="ScriptBloc"
        />
      ),
      label: 'ScriptBloc',
      comingSoon: true,
      comingSoonImage: comingSoon,
    },
    {
      type: 'button',
      icon: (
        <img className="max-w-[24px] max-h-[24px]" src={icon3} alt="Pitches" />
      ),
      label: 'Pitches',
      comingSoon: true,
      comingSoonImage: comingSoon,
    },
    {
      type: 'button',
      icon: (
        <img className="max-w-[24px] max-h-[24px]" src={icon9} alt="Archives" />
      ),
      label: 'Archives',
      onClick: () => navigate('/archives'),
    },
    {
      type: 'button',
      icon: (
        <img className="max-w-[24px] max-h-[24px]" src={icon10} alt="Trash" />
      ),
      label: 'Trash',
      onClick: () => navigate('/trash'),
    },
  ];

  return (
    <section className="flex flex-col items-start w-full side-link-wrapper">
      {sidebarTabs.map((tab, index) => (
        <SidebarTab key={index} {...tab} />
      ))}
    </section>
  );
};

export default SidebarOptions;
