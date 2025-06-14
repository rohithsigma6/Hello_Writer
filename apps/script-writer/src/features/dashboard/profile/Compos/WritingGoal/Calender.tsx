const Calendar = () => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];

    const dates = [
        { day: 27, type: "out" }, { day: 28, type: "out" }, { day: 29, type: "out" }, { day: 30, type: "out" },
        { day: 1, type: "progress" }, { day: 2, type: "progress" }, { day: 3, type: "missing" },
        { day: 4, type: "streak" }, { day: 5, type: "streak" }, { day: 6, type: "streak" }, { day: 7, type: "streak" }, { day: 8, type: "streak" }, { day: 9, type: "streak" }, { day: 10, type: "streak" },
        { day: 11, type: "streak" }, { day: 12, type: "progress" }, { day: 13, type: "progress" }, { day: 14, type: "streak" }, { day: 15, type: "streak" }, { day: 16, type: "progress" }, { day: 17, type: "streak" },
        { day: 18, type: "streak" }, { day: 19, type: "progress" }, { day: 20, type: "streak" }, { day: 21, type: "streak" }, { day: 22, type: "progress" }, { day: 23, type: "progress" }, { day: 24, type: "streak" },
        { day: 25, type: "streak" }, { day: 26, type: "progress" }, { day: 27, type: "streak" }, { day: 28, type: "streak" }, { day: 29, type: "streak" }, { day: 30, type: "streak" }, { day: 31, type: "streak" },
    ];

    const getDayClass = (type: string) => {
        switch (type) {
            case "streak":
                return "bg-[#D6CCFF]";
            case "progress":
                return "bg-[#FFF5CC]";
            case "out":
                return "text-gray-400";
            case "missing":
                return "bg-[#00000033]";
            default:
                return "";
        }
    };

    const getCornerRounding = (index: number) => {
        const totalCols = 7;
        const lastRowStart = dates.length - totalCols;
        if (index === lastRowStart) return "rounded-bl-2xl";
        if (index === dates.length - 1) return "rounded-br-2xl";
        return "";
    };

    const cellBaseClass = "h-11 flex items-center justify-center border border-[#00000033]";

    return (
        <div className="w-1/2 border border-[#00000033] rounded-2xl overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 text-center font-semibold">
                {days.map((d, i) => (
                    <div key={i} className={cellBaseClass}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 text-center">
                {dates.map((date, i) => (
                    <div
                        key={i}
                        className={`${cellBaseClass} ${getDayClass(date.type)} ${getCornerRounding(i)}`}
                    >
                        {date.day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
