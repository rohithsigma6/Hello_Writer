import React, { useState } from "react";

const Toggle = ({
  text,
  value = false,
  handleToggleStateChange,
}: {
  text: string;
  value: boolean;
  handleToggleStateChange: (state: boolean) => void;
}) => {
  const [active, setActive] = useState(value);

  return (
    <React.Fragment>
      <span className="px-5 py-3 flex flex-row gap-2 justify-between w-full">
        <p className="text-sm">{text} </p>
        <button
          type="button"
          // value={isOneEighthPageOn}
          // handleToggleStateChange={(checked) => setIsOneEighthPageOn(checked)}
          className={`toggle-button w-12 h-6 rounded-full flex items-center ${
            active
              ? "justify-end bg-green-200 shadow-neumorphism-green border border-green-600"
              : "justify-start bg-gray-300 shadow-neumorphism-gray border border-slate-600"
          } p-1 transition-transform duration-500 ease-in-out`}
          onClick={() => {
            handleToggleStateChange(!active);
            setActive(!active);
          }}
        >
          <div
            className={`toggle-inner w-4 h-4 rounded-full shadow-neumorphism-inner ${
              active ? "bg-green-500" : "bg-slate-500"
            }`}
          ></div>
        </button>
      </span>
    </React.Fragment>
  );
};

export default Toggle;
