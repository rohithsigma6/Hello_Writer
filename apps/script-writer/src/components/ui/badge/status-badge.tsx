interface StatusBadgeProps {
  status: 'pending' | 'accepted' | 'expired';
  className?: string;
  extraClass?: string;
}
export const StatusBadge = ({
  status,
  extraClass,
  className,
}: StatusBadgeProps) => {
  const statusStyles = {
    pending: 'bg-[#FFE2B2]',
    accepted: 'bg-[#C4EAD6]',
    expired: 'bg-[#F2AAB8]',
  };

  return (
    <span
      className={`${statusStyles[status]} ${className ? className : `font-medium text-center w-fit px-2 py-0.5 text-xs rounded-lg ${extraClass}`} `}
    >
      {status.toUpperCase()}
    </span>
  );
};
