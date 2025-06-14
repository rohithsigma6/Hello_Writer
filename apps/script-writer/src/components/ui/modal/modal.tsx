import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  className?: string;
  extraClass?: string;
}

export const Modal = ({
  isOpen,
  setIsOpen,
  children,
  className,
  extraClass,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex p-10 overflow-y-auto items-center justify-center bg-black bg-opacity-50 z-[999]">
      <div
        ref={modalRef}
        className={`relative font-poppins z-50 transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all 
          ${className ? 
              className
               : `${extraClass}`
          }`}
      >
        {children}
      </div>
    </div>
  );
};
