// import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    LabelList,
} from "recharts";
import { IoChevronDown } from "react-icons/io5";
import { useState } from "react";

const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
    }).replace(/ /g, ' ');
};

const data = [
    { date: "12/01", value: 2100 },
    { date: "13/01", value: 4300 },
    { date: "14/01", value: 7500 },
    { date: "15/01", value: 6300 },
    { date: "16/01", value: 6400 },
    { date: "17/01", value: 7200 },
    { date: "18/01", value: 8800 },
];

const SubscriptionTrendsChart = () => {
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
        <div className="p-4 border border-gray-300 rounded-xl flex-1 bg-white">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h2 className="font-semibold text-lg">Subscription Trends</h2>
                    <p className="text-sm text-gray-600">{formatDate(startDate)} – {formatDate(endDate)}</p>
                </div>

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
            </div>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={30}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 10000]} />
                        <Tooltip
                            formatter={(value: number | string) => `${Number(value) / 1000}k`}
                        />
                        <Bar dataKey="value" fill="#653EFF" radius={[2, 2, 0, 0]}>
                            <LabelList
                                dataKey="value"
                                position="top"
                                fill="#000"
                                formatter={(value: number | string) => `${(Number(value) / 1000).toFixed(1)}k`}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SubscriptionTrendsChart;
