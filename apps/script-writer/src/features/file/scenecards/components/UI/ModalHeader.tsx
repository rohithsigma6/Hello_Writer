import React from 'react'
import ModalCloseButton from './ModalCloseButton'
import { cn } from 'utils/misc';
import { IoChevronBack } from 'react-icons/io5';

type TModalHeaderProps = {
    toggle: () => void;
    headerTitle: string;
    className?: string;
    shouldShowBackButton?: {
        show: boolean;
        onBack: () => void;
        backButtonClassName?: string
    };

}
const ModalHeader: React.FC<TModalHeaderProps> = ({ toggle, headerTitle, className, shouldShowBackButton }) => {
    return (
        <header className={cn("px-8 py-4  flex w-full justify-between items-center border-b border-gray-300", className)}>
            <div className='flex text-2xl gap-2 items-center'>
                {shouldShowBackButton?.show && 
                    <IoChevronBack 
                        className={cn("cursor-pointer", shouldShowBackButton.backButtonClassName)} 
                        onClick={shouldShowBackButton.onBack} 
                        />
                }
                <h2 className="font-bold whitespace-nowrap">{headerTitle}</h2>
            </div>

            <ModalCloseButton closeHandler={toggle} />
        </header>
    )
}

export default ModalHeader