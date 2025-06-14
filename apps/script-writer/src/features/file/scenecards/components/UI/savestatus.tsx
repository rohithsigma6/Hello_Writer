import React from "react";
import "./savestatus.css";
import { SaveStatus } from "../../utils/enums";

interface SaveStatusIndicatorProps {
  saveStatus: SaveStatus;
}

const SaveStatusIndicator = ({ saveStatus }: SaveStatusIndicatorProps) => {
  const classnames = saveStatus === SaveStatus.Saved ? "ready" : "progress";
  let statusText = "Saving";
  switch (saveStatus) {
    case SaveStatus.Saving:
      statusText = "Saving";
      break;
    case SaveStatus.NotSaved:
      statusText = "Not saved";
      break;
    case SaveStatus.Error:
      statusText = "Error Saving";
      break;
    case SaveStatus.Saved:
      statusText = "Saved";
      break;
    default:
      statusText = "Saving";
  }

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <p className="text-xs bg-amber-600 rounded-full text-white p-1 px-2">{statusText}</p>

      <svg
        id="check"
        version="1.1"
        viewBox="0 0 100 100"
        className={classnames}
        style={{ width: "25px", height: "25px" }}
      >
        <circle id="circle" cx="50" cy="50" r="46" fill="transparent" />
        <polyline id="tick" points="25,55 45,70 75,33" fill="transparent" />
      </svg>
    </div>
  );
};

export default SaveStatusIndicator;
