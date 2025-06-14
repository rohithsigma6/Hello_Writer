import React from "react";

import { FaCheck } from "react-icons/fa";
import { IPopoverCustom } from "./models";

import {
  PopoverButtonContainer,
  PopoverContainer,
  PopoverRowEl,
} from "./UI/Dropdowns/PopoverCommonComponents";
import { cn } from "./misc";

interface ISceneEnvironmentDropdown extends IPopoverCustom {
  currentSceneTime: string;
  header?: string;
  options?: any;
}

const SceneEnvironmentDropdown: React.FC<ISceneEnvironmentDropdown> = ({
  currentSceneTime,
  header = "",
  options,
  onSelect,
  listClassName,
  buttonContainerClassName,
  // placeholder = " - Time of Day"
}) => {
  return (
    <PopoverContainer
      containerClassName="w-full z-100"
      popoverButton={
        <PopoverButtonContainer
          containerClassName={buttonContainerClassName}
          header={header}
          value={currentSceneTime}
        />
      }
    >
      <div
        className={cn(
          "flex flex-col gap-1  bg-white border rounded-inputStandard py-2 text-sm px-1 min-w-[232px] ",
          listClassName
        )}
      >
        {/* ============== list ========== */}
        <div className="flex flex-col ">
          {options &&
            options.length > 0 &&
            options.map((environment: any, index: any) => (
              <PopoverRowEl
                isSelected={currentSceneTime === environment}
                onClick={() => {
                  if (onSelect) {
                    onSelect(environment);
                  }
                }}
              >
                <span>{environment}</span>
                {currentSceneTime === (environment ||  "- Time of Day ") && <FaCheck />}
              </PopoverRowEl>
            ))}
        </div>
      </div>
    </PopoverContainer>
  );
};

export default SceneEnvironmentDropdown;
