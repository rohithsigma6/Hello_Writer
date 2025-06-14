import { Link } from 'react-router';

export interface SidebarTabProps {
  type: 'link' | 'button';
  to?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  extraClass?: string;
  comingSoon?: boolean;
  comingSoonImage?: string;
}

const SidebarTab: React.FC<SidebarTabProps> = ({
  type,
  to = '',
  onClick,
  icon,
  label,
  extraClass = '',
  comingSoon = false,
  comingSoonImage,
}) => {
  const content = (
    <>
      <div className="min-w-[24px] text-left">{icon}</div>
      <p className="text-base text-text-500 font-medium">{label}</p>
      {comingSoon && comingSoonImage && (
        <img className="coming-soon" src={comingSoonImage} alt="Coming soon" />
      )}
    </>
  );

  if (type === 'link') {
    return (
      <Link to={to} className={`side-link ${extraClass}`}>
        <button className="flex flex-row gap-2 items-center">{content}</button>
      </Link>
    );
  }

  return (
    <button
      className="flex flex-row gap-2 items-center side-link"
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default SidebarTab;
