import { getBackgroundColorClass } from "./helper";

export const RangeBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-full rounded-full transition-all duration-500 ${getBackgroundColorClass(percentage)}`}
        style={percentage <= 100 ? { width: `${percentage}%` } : { width: "100%"}}
      />
    </div>
  );
};
