import { ReactNode, useEffect, useRef } from "react";
import { cn } from "utils/misc";

interface Props {
  bottom: number;
  left: number;
  text?: string;
  groupHoverId?: string;
  shouldReAdjustToViewport?: boolean;
  children?: ReactNode;
  className?: string
}


const Tooltip = ({ children, bottom, text, left, groupHoverId = "", shouldReAdjustToViewport = true, className }: Props) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldReAdjustToViewport) return
    const tooltipElement = tooltipRef.current;

    if (tooltipElement) {
      const tooltipRect = tooltipElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Adjust left position if tooltip is going beyond the viewport
      if (tooltipRect.right > viewportWidth) {
        const newLeft = left - (tooltipRect.right - viewportWidth);
        tooltipElement.style.left = `${newLeft}px`;
      }
    }
  }, [left, shouldReAdjustToViewport]);
  return (
    <div
      ref={tooltipRef}
      style={{ bottom, left }}
      className={cn(
        `sm:flex hidden items-center z-[9999] 
        border-gray-300 border-thin bg-white gap-2 
        py-1 px-2 whitespace-nowrap absolute 
        scale-0  group-hover:scale-100 rounded-md`,
        className
      )}
    >
      {children ? (
        children
      ) : (
        <span className="text-black">
          {/* I know, I know, right now this is the only use case */}
          {text}
        </span>
      )}
    </div>


  )
}

export default Tooltip