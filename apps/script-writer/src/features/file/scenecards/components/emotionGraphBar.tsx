import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import dragDataPlugin from "chartjs-plugin-dragdata";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, dragDataPlugin);

const emotions = [
    "Action", "Comedy", "Conflict", "Fantasy", "Passion", "Romance", "Gore", "Scare",
    "Shock", "Mystery", "Tearjerk", "Tension", "Twist"
];

const pastelColors = [
    "#fde68a", "#fdba74", "#f9a8d4", "#c4b5fd", "#a5b4fc", "#fca5a5", "#f87171", "#fcd34d",
    "#d9f99d", "#99f6e4", "#bfdbfe", "#c7d2fe", "#ddd6fe"
];

const EmotionBarChart = () => {
    const [data, setData] = useState(
        Array.from({ length: emotions.length }, () => Math.floor(Math.random() * 10))
    );

    const chartData = {
        labels: emotions,
        datasets: [
            {
                label: "Emotion Level",
                data,
                backgroundColor: pastelColors,
                borderRadius: 20,
                barThickness: 25
            }
        ]
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        scales: {
            x: {
                max: 10,
                ticks: {
                    color: "#000"
                },
                grid: {
                    color: "#eee"
                }
            },
            y: {
                ticks: {
                    color: "#555"
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            dragData: {
                round: 0,
                showTooltip: true,
                onDragEnd: (e, datasetIndex, index, value) => {
                    const newData = [...data];
                    newData[index] = value;
                    setData(newData);
                }
            }
        }
    };

    return (
        <div className="w-full p-4">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default EmotionBarChart;
