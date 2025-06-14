import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import leftArrow from '../../../../assets/preWritingTools/left-arrow.svg'
import rightArrow from '../../../../assets/preWritingTools/right-arrow.svg'
import threedots from '../../../../assets/preWritingTools/three-dots.svg'
import resizer from '../../../../assets/preWritingTools/resizer.svg'
import { getCharacterByIdSceneCard } from '../api/scene-cards-api';

import characterImage from '@/assets/character-hero-img.svg'

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import zoomPlugin from "chartjs-plugin-zoom";
import dragDataPlugin from "chartjs-plugin-dragdata";
import { Line } from "react-chartjs-2";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    zoomPlugin,
    dragDataPlugin
);

// Sample labels
const labels = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

const data = {
    labels,
    datasets: [
        {
            label: "Emotion Status",
            data: [
                2, -1, 3, -4, 0, 5, -3, 1, 4, -2, -5, 3, 0, 2, -1, 5,
                -3, 4, -2, 1, -5, 3, 0, -4, 2, -1, 5, -2, 4, -3
            ],
            borderColor: "rgba(47, 14, 235, 0.93)",
            backgroundColor: "rgba(255, 99, 132, 1)",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointRadius: 4,
            tension: 0.4,
        }
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
            labels: {
                color: "#000",
                font: { size: 14 },
            },
        },
        zoom: {
            zoom: {
                wheel: { enabled: true },
                pinch: { enabled: true },
                mode: "x",
            },
            pan: {
                enabled: true,
                mode: "x",
            },
        },
        dragData: {
            round: 1,
            showTooltip: true,
            onDragEnd: (e, datasetIndex, index, value) => {
                console.log(`Value at index ${index} changed to ${value}`);
                // Optional: you can update state or trigger API here
            },
            onDragStart: () => console.log("Dragging started"),
        },
    },
    scales: {
        x: {
            ticks: { color: "#333", font: { size: 10 }, maxRotation: 45, minRotation: 45 },
            grid: { display: true, color: "#eee" },
        },
        y: {
            beginAtZero: true,
            min: -5,
            max: 5,
            ticks: { color: "#333", stepSize: 1 },
            grid: { display: true, color: "#eee" },
        },
    },
};

const CharacterGraph = () => {
    const { fileId, sceneId } = useParams()
    const [character, setCharacter] = useState({})
    const [searchParams] = useSearchParams();
    const characterId = searchParams.get('characterId');
    useEffect(() => {
        const fetchCharacter = async () => {
            console.log("characterId is ", characterId)
            const response = await getCharacterByIdSceneCard(characterId)
            console.log("response data i s", response);
            setCharacter(response)
        }
        fetchCharacter()
    }, [characterId, sceneId, fileId])

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
            <h1 className="font-bold text-[#212131] text-center text-[24px] font-poppins mb-8">Character Arc</h1>
         
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
            
                <h1 className='font-bold text-[#212131] text-[19px] font-poppins mb-6 mt-3 text-left'>{character.allTemplate?.characterBuilder.basicInfo.name}</h1>
           
            <div className='flex flex-row'>
               
                <img src={character.allTemplate?.characterBuilder.basicInfo.photo} className='min-w-[250px] h-[250px] border-[#21213126] rounded-[20px] mr-3' />
                <div className="h-[250px] w-full border rounded-[16px] border-[#21213126] p-6">
                    <div className="font-bold text-[#212131] text-[16px] font-poppins mb-3">Scene Title</div>
                        <div className="font-medium text-[#212131] text-[16px] font-poppins mb-0">Character Involvement :</div>
                        <div className="text-[#6a6a75] text-[16px] font-poppins font-normal">A typical morning unfolds in a gated community, with kids rushing to school and parents scrambling to leave for work.</div>
                  
                </div>
            </div>
            <div className="mt-8">
                <div className='w-full border rounded-[16px] border-[#21213126] p-5'>
                <div className="flex h-[304px] gap-5">
                    <div className="min-w-[330px] p-5 border rounded-[16px] border-[#21213126]">
                     
                            
                                <div className="font-medium text-[#212131] text-[16px] font-poppins mb-4">Change Type</div>
                             
                                 
                                        <div className="border rounded-[16px] border-[#21213126] px-4 py-[16px] mb-6 flex justify-between items-center">
                                            Turn to the positive  <img src={rightArrow} alt="Right Arrow" className='w-[30px] h-[30px] transform rotate-90' />
                                            </div>
                                      
                            
                           
                            <div className="self-stretch flex flex-col justify-start items-start gap-2">
                                <div className="font-medium text-[#212131] text-[16px] font-poppins mb-4">Emotional Type</div>
                                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                                    <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                                        <div className="self-stretch inline-flex justify-between items-center">
                                            <div className="justify-start text-zinc-500 text-base font-medium font-['Poppins'] leading-tight">-</div>
                                            <div className="justify-start text-zinc-500 text-base font-medium font-['Poppins'] leading-tight">+</div>
                                        </div>
                                        <div className="self-stretch flex flex-col justify-start items-start gap-2">
                                            <div className="self-stretch h-4 relative bg-white rounded-3xl outline outline-1 outline-zinc-400">
                                                <div className="w-20 h-4 left-[61px] top-0 absolute bg-rose-400" />
                                                <div className="w-6 h-6 left-[52px] top-[-4px] absolute bg-white rounded-full shadow-[0px_0px_15px_0px_rgba(0,0,0,0.16)] outline outline-1 outline-zinc-400" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="self-stretch pl-11 pr-10 inline-flex justify-start items-center gap-2.5">
                                        <div className="justify-start text-black text-base font-medium font-['Poppins'] leading-tight">-30</div>
                                    </div>
                                </div>
                            </div>
                    
                    </div>



                    
                    <div className="p-5 border rounded-[16px] border-[#21213126] overflow-hidden w-[100%]">
                        <Line data={data} options={options} className='w-full'/>
                    </div>
                    </div>
                </div>
            </div>
            <div className='pb-8'>
            <div className="w-[100%] mt-8">
                <div className="font-semibold text-[#212131] text-[16px] font-poppins mb-4">What does your character want or need in this step?</div>
                <div className="w-full h-20 pl-4 pr-24 pt-4 pb-8 bg-white rounded-[16px] border border-[#21213126]" />
            </div>
            <div className="w-[100%] mt-8">
                <div className="font-semibold text-[#212131] text-[16px] font-poppins mb-4">What does your character get or learn in this step?</div>
                <div className="w-full h-20 pl-4 pr-24 pt-4 pb-8 bg-white rounded-[16px] border border-[#21213126]" />
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default CharacterGraph;