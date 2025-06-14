import leftArrow from '../../../../assets/preWritingTools/left-arrow.svg'
import rightArrow from '../../../../assets/preWritingTools/right-arrow.svg'
import threedots from '../../../../assets/preWritingTools/three-dots.svg'
import resizer from '../../../../assets/preWritingTools/resizer.svg'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import EmotionBarChart from './emotionGraphBar';


ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    Filler
);

// Generate labels from 1 to 34
const labels = Array.from({ length: 34 }, (_, i) => (i + 1).toString());

const data = {
    labels,
    datasets: [
        {
            label: "Emotion Level",
            data: [0, 5, 5, 6, 7, 6, 5, 3, 3, 2, 1, 0], // You can extend this to 34
            fill: true,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)", // Light fill
            pointRadius: 0,
            tension: 0, // No curve = sharp edges
        },
    ],
};

const options = {
    responsive: true,
    scales: {
        x: {
            title: {
                display: true,
                text: "Scenes",
            },
            grid: {
                display: true,
                color: "#eee",
            },
            ticks: {
                color: "#333",
            },
        },
        y: {
            min: 0,
            max: 10,
            title: {
                display: true,
                text: "Emotion Level",
            },
            grid: {
                display: true,
                color: "#eee",
            },
            ticks: {
                stepSize: 1,
                color: "#333",
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
};

export default function EmotionGraph() {
    return (
        <div className='scene-card-container-scene relative flex'>
             <div className='left-side-small-bar rounded-[24px] bg-white py-3 px-2 mt-[44px] flex flex-col gap-[24px] text-center'>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>1</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>5</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>10</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>15</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>20</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>25</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>30</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>35</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>40</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>45</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>50</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>55</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>60</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>65</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>70</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>75</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>80</span>
        <span className='text-[#212131] font-poppins font-normal text-[8px] bg-white'>85</span>
      </div>
        <div className="mt-6 bg-white rounded-[24px] block w-[96%] pt-[53px] pl-[24px] pr-[14px] mx-auto border-[#212131] font-poppins max-h-[calc(100vh-220px)] overflow-hidden border-[2px]" >
            <div className='max-h-[calc(100vh-220px)] overflow-y-auto overflow-x-hidden pb-[60px] pr-[10px]'>
           
                <h1 className="font-bold text-[#212131] text-center text-[24px] font-poppins mb-8">Emotion Graph</h1>
        
            <div className="self-stretch flex justify-between items-center">
                {/* Left side */}
                <div className="flex justify-start items-end gap-5">
                    <h1 className="w-20 justify-start text-gray-800 text-2xl font-bold font-['Poppins'] leading-7">Scenes</h1>
                    <div className='flex justify-start items-center gap-3'>
                    <img src={leftArrow} alt="Left Arrow" />
                    <img src={rightArrow} alt="Right Arrow" />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    <img src={threedots} alt="Options" />
                    <img src={resizer} alt="Resizer" />
                </div>
            </div>

            <div className='w-full border rounded-[16px] border-[#21213126] p-6 mt-6'>
                <Line className='w-full' data={data} options={options} />;
            </div>
            <div className='my-8 w-full border rounded-[16px] border-[#21213126]'>
                <EmotionBarChart />
            </div>
        </div>
        </div>
        </div>
    )
}
