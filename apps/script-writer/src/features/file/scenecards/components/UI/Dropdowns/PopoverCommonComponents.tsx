import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react"
import { AnchorProps } from "@headlessui/react/dist/internal/floating"
import { IDropdownRowElement } from "../../models"
import { ReactNode, useEffect, useRef, useState } from "react"
import { FaChevronDown } from "react-icons/fa6"
import { cn } from "../../misc"


const PopoverRowEl: React.FC<IDropdownRowElement> = (
  {
    children,
    isSelected,
    className,
    ...props
  }
) => {
  return (
    <div
      {...props}
      className={cn(`${isSelected ? "bg-[#C4EAD6]" : ""} 
      cursor-pointer hover:bg-[#E9E9EA] p-2 font-medium rounded-md flex items-center justify-between`, className)}>
      {children}
    </div>

  )
}

interface IPopoverButtonContainer {
  header: string
  value?: string
  placeholder?: string
  className?: string
  containerClassName?: string,
  shouldShowDropdownIcon?:boolean
}

export const PopoverButtonContainer: React.FC<IPopoverButtonContainer> = ({
  header,
  value,
  placeholder,
  className,
  containerClassName,
  shouldShowDropdownIcon=true
}) => {
  return (
    <div className={cn("text-xs outline-none text-left text-white", containerClassName)}>
      <span className="text-input-label  font-normal">{header}</span>
      <div
        className={cn(
          'flex gap-2 items-center text-[20px] justify-between border rounded-[16px] border-border-input px-3 py-2 min-h-[56px] text-white bg-[#38228C] font-courier',
          className
        )}
      >
        <span className={cn('text-white', { 'text-gray-300': !value && placeholder })}>
          {value || placeholder}
        </span>
        {shouldShowDropdownIcon && <FaChevronDown className="text-[#fff]" />}
      </div>
    </div>
  )
}

const PopoverContainer = (
  {
    popoverButton,
    children,
    anchor = "bottom",
    shouldBeSameWidthAsButton = false,
    containerClassName
  }: {
    children: ReactNode,
    anchor?: AnchorProps,
    popoverButton: ReactNode;
    shouldBeSameWidthAsButton?: boolean,
    containerClassName?:string
  }
) => {
  const triggerRef = useRef<HTMLButtonElement>(null); // Reference for the trigger button
  const [width, setWidth] = useState<number | undefined>(undefined); // Store the width of the trigger

  useEffect(() => {
    if (shouldBeSameWidthAsButton && triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth); // Set the width dynamically
    } else {
      setWidth(undefined); // Reset the width if condition is not met
    }
  }, [shouldBeSameWidthAsButton, triggerRef.current]);

  return (
    <Popover className={cn("relative",containerClassName)}>
      <PopoverButton ref={triggerRef} className="w-full outline-none">
        {popoverButton}
      </PopoverButton>
      <PopoverBackdrop className="fixed inset-0" />
      <PopoverPanel
        anchor={anchor}
        style={shouldBeSameWidthAsButton ? { width } : undefined} // Conditionally apply the width
        className="flex flex-col z-20"
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
};


export { PopoverContainer, PopoverRowEl }