import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
    }).replace(/ /g, ' ');
};

const SubscriptionMetrics = () => {
    const [rangeType, setRangeType] = useState("Weekly");
    const [showDropdown, setShowDropdown] = useState(false);

    const today = new Date();
    let startDate = new Date(today);
    let endDate = new Date(today);

    // Set date ranges based on selected option
    if (rangeType === "Weekly") {
        startDate.setDate(today.getDate() - 6);
    } else if (rangeType === "Monthly") {
        startDate.setMonth(today.getMonth() - 1);
    } else if (rangeType === "Yearly") {
        startDate.setFullYear(today.getFullYear() - 1);
    }

    const handleSelect = (option: string) => {
        setRangeType(option);
        setShowDropdown(false);
    };

    return (
        <div className="flex-1 p-4 border-[1px] border-gray-300 rounded-xl relative font-poppins">

            <header className="flex flex-row gap-4 justify-between">
                <section>
                    <h1 className="font-semibold text-lg">Subscription Metrics</h1>
                    <p className="text-sm text-gray-500 mt-1 mb-4">
                        {formatDate(startDate)} – {formatDate(endDate)}
                    </p>
                </section>

                <section className="relative w-max">
                    <button
                        className="border-[1px] border-gray-300 rounded-xl p-2 px-3 text-sm font-medium flex flex-row items-center gap-2 hover:text-white hover:bg-black cursor-pointer transition-colors"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        {rangeType}
                        <span className="text-lg">
                            <IoChevronDown />
                        </span>
                    </button>

                    {showDropdown && (
                        <div className="absolute z-10 mt-0.5 bg-white border border-gray-300 rounded-xl shadow-lg w-full">
                            {["Weekly", "Monthly", "Yearly"].map((option) => (
                                <div
                                    key={option}
                                    className="p-2 px-3 text-sm hover:bg-gray-100 cursor-pointer rounded-xl"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </header>

            <div className="flex flex-col gap-4">
                {/* New Subscribers */}
                <section className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                        <p className="font-medium">New Subscribers
                            <span className="bg-[#DCFCE7] text-[#2D8557] rounded-xl py-0.5 px-2">+15%</span>
                        </p>

                        <p className="font-medium">89.2k users</p>
                    </div>

                    <RangeGuage percent={15} />

                    <p className="text-[#6A6A75] text-sm">Acquisition rate of 15% growth month-over-month.</p>
                </section>

                {/* Average Engagement Hours */}
                <section className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                        <p className="font-medium">Average Engagement Hours
                            <span className="bg-[#DCFCE7] text-[#2D8557] rounded-xl py-0.5 px-2">+10.2%</span>
                        </p>

                        <p className="font-medium">12.2 hrs/week</p>
                    </div>

                    <RangeGuage percent={10.2} />

                    <p className="text-[#6A6A75] text-sm">Acquisition rate of 15% growth moth-over-month.</p>
                </section>

                {/* Retention Rate */}
                <section className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                        <p className="font-medium">Retention Rate
                            <span className="bg-[#DCFCE7] text-[#2D8557] rounded-xl py-0.5 px-2">+11.5%</span>
                        </p>

                        <p className="font-medium">12.2 hrs/week</p>
                    </div>

                    <RangeGuage percent={11.5} />

                    <p className="text-[#6A6A75] text-sm">11.5% of subscribers who stayed from previous period                    .</p>
                </section>
            </div>
        </div>
    );
}

const RangeGuage = ({ percent }: { percent: number }) => {
    return (
        <div className="bg-gray-300 rounded-2xl w-full h-4 p-0.5">
            <div
                className={"bg-[#653EFF] h-full rounded-2xl "}
                style={{ width: `${Math.min(percent, 100)}%` }}
            />
        </div>
    )
}

export default SubscriptionMetrics;