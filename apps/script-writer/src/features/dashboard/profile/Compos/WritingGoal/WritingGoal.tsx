import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import Calendar from "./Calender";

const StatRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between">
        <span className="font-bold">{label}</span>
        <span>{value}</span>
    </div>
);

const ProgressCircle = ({ value, label }: { value: number; label: string }) => (
    <div className="border w-1/2 border-[#00000033] rounded-xl p-5 flex flex-col items-center justify-center">
        <div className="w-[12.5rem] h-[12.5rem]">
            <CircularProgressbar
                value={value}
                text={`${value}%`}
                styles={buildStyles({
                    rotation: 0.26,
                    strokeLinecap: 'butt',
                    pathColor: `rgba(102, 62, 255, ${value / 100})`,
                    trailColor: '#d6d6d6',
                    textColor: '#333',
                    textSize: '18px',
                })}
            />
        </div>
        <p className="mt-2 text-center">{label}</p>
    </div>
);

const LegendItem = ({ color, label }: { color: string; label: string }) => (
    <div className="flex items-center gap-2">
        <div className={`h-4 w-4 rounded-sm`} style={{ backgroundColor: color }} />
        <p>{label}</p>
    </div>
);

const TimeSelector = () => (
    <div className="flex items-center gap-2">
        <select className="border border-[#00000033] rounded-xl py-2 px-5">
            {Array.from({ length: 12 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}
        </select>
        <p>:</p>
        <select className="border border-[#00000033] rounded-xl py-2 px-5">
            {Array.from({ length: 59 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}
        </select>
        <select className="border border-[#00000033] rounded-xl py-2 px-5">
            {["AM", "PM"].map((val, idx) => <option key={idx}>{val}</option>)}
        </select>
    </div>
);

const WritingGoal = () => {
    return (
        <div className="m-2">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-2xl">Writing Stats</h3>
                    <p className="text-[#9999A0]">Your writing progress at a glance—days active, streaks, and daily averages.</p>
                </div>
                <div className="flex gap-2">
                    <button className="border border-gray-500 px-10 py-3 font-medium rounded-2xl bg-white text-gray-600">Cancel</button>
                    <button className="px-10 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white">Save</button>
                </div>
            </div>

            {/* Stats */}
            <div className="w-1/2 mt-20 space-y-5">
                <StatRow label="Total Writing Days" value="134 days" />
                <StatRow label="Current Streak" value="21 days" />
                <StatRow label="Longer Streak" value="44 days" />
                <StatRow label="Avg. Words/day" value="432" />
                <StatRow label="Avg. Minutes/day" value="52 minutes" />
            </div>

            {/* Calendar Text */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold">Streak Calendar</h3>
                <p className="text-[#9999A0]">See your daily writing streaks and stay on track with your goals.</p>
            </div>

            {/* Goal Type & Selectors */}
            <div className="mt-10 space-y-5">
                <div className="flex gap-12">
                    {["Minutes Goal", "Scene Goal"].map((goal, idx) => (
                        <label key={idx} className="flex items-center gap-2">
                            <input type="radio" name="goal-type" value={goal.toLowerCase().replace(" ", "-")} />
                            {goal}
                        </label>
                    ))}
                </div>

                <div className="flex gap-5">
                    <select className="border border-[#857E66] rounded-xl px-10 py-2">
                        {[2025, 2024, 2023, 2022, 2021].map((year) => (
                            <option key={year}>{year}</option>
                        ))}
                    </select>
                    <select className="border border-[#857E66] rounded-xl px-10 py-2">
                        {[
                            "January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December",
                        ].map((month, idx) => (
                            <option key={idx} value={(idx + 1).toString().padStart(2, "0")}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Calendar and Progress */}
            <div className="flex justify-between mt-10 gap-4">
                {/* Calendar */}
                <div className="w-1/2 border border-[#00000033] rounded-xl p-5">
                    <h3 className="font-bold mb-2">May 2025</h3>
                    <div className="flex gap-4">
                        <Calendar />
                        <div className="border w-1/2 border-[#00000033] rounded-xl p-5 space-y-2">
                            <h3 className="font-semibold">Streak Calendar - May’2025</h3>
                            <LegendItem color="#B9A6FF" label="Writing day - 12 Days" />
                            <LegendItem color="#FFE0AC" label="Just hit minimum goal - 10 Days" />
                            <LegendItem color="#BABABF" label="Missed day - 8 Days" />
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="w-1/2 border border-[#00000033] rounded-xl p-5">
                    <h3 className="font-bold mb-2">Goal Progress</h3>
                    <div className="flex gap-4 justify-center">
                        <ProgressCircle value={74} label="Monthly target progress" />
                        <ProgressCircle value={72} label="Weekly Consistency (Mon-Sun)" />
                    </div>
                </div>
            </div>

            {/* Reminder */}
            <div className="mt-10">
                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        className="h-6 w-6 appearance-none rounded border border-[#653EFF] bg-[#d7cefc] checked:border-[#653EFF] relative
              checked:after:content-['✔'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-[#653EFF] checked:after:text-xs"
                    />
                    <p>Remind me to write daily at</p>
                </div>
                <TimeSelector />
                <div className="mt-5">
                    <button className="font-semibold text-[#653EFF] px-4 py-2 border border-[#653EFF] rounded-xl">Reset Streak</button>
                </div>
            </div>
        </div>
    );
};

export default WritingGoal;
