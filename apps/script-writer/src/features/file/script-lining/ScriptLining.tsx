import React, { useState } from 'react'
import Resources from '../screenplay/components/editor/components/resources'
import ShotBreakdown from './ShotBreakdown';
import ShotList from './ShotList';
import Navbar from '@/components/layouts/file-layout/nav-bar';
import { GripVertical } from 'lucide-react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import laptopicon from '@/assets/laptop-icon.svg';
import ActiveShot from './ActiveShot';
import { Link, useParams } from 'react-router';

const ScriptLining = () => {
  const [activebtn, setActiveBtn] = React.useState<string>("Shot Breakdown");
  const [activeShot, setActiveShot] = useState("");

  function handleSetActiveButton(value: "Shot Breakdown" | "Shot List") {
    setActiveBtn(value)
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-row h-[90dvh] overflow-y-auto">
        <div className='w-[25%] bg-white'>
          <SideBar />
        </div>

        <div className="p-10 h-full w-full overflow-y-auto bg-[#F2F1F5]" id='script-lining'>
          {!activeShot ?
            activebtn === "Shot Breakdown" ?
              <ShotBreakdown
                activebtn={activebtn}
                setActiveBtn={handleSetActiveButton}
              />
              :
              <ShotList
                activebtn={activebtn}
                setActiveBtn={handleSetActiveButton}
                setActiveShot={setActiveShot}
              />
            :
            <ActiveShot
              activeShot={activeShot}
              setActiveShot={setActiveShot}
            />
          }

          <Resources />
        </div>
      </div>
    </>
  )
}

const SideBar = () => {
  const scenes = [
    "1. EXT. CHAI TAPRI - DAY",
    "2. EXT. UNDER A TREE - DAY",
    "3. INT. MAHESH'S HOME - NIGHT",
    "4. INT. PALACE - DINING HALL",
    "5. EXT. ANCIENT TEMPLE - DAY",
    "6. INT. ANCIENT TEMPLE - DAY",
    "7. INT. ANCIENT TEMPLE - DAY",
    "8. INT. ANCIENT TEMPLE - DAY",
    "9. INT. ANCIENT TEMPLE - DAY",
    "10. INT. ANCIENT TEMPLE - DAY",
    "11. INT. ANCIENT TEMPLE - DAY",
    "12. INT. ANCIENT TEMPLE - DAY",
    "13. INT. ANCIENT TEMPLE - DAY",
    "14. INT. ANCIENT TEMPLE - DAY",
    "15. INT. ANCIENT TEMPLE - DAY",
  ];
  const [selectedScene, setSelectedScene] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { fileId } = useParams<{ fileId?: string; }>();

  const filteredScenes = scenes.filter((scene) =>
    scene.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full md:w-72 h-full bg-white border-r px-4 py-3 overflow-y-auto">
      {/* Back to File */}
      {/* @ts-ignore */}
      <Link to={`/file/${fileId}/screenplay`}>
        <button className="text-sm flex flex-row items-center gap-2 font-medium hover:text-black mb-4">
          <img src={laptopicon} alt="Back" className='w-5' />
          Back to File
        </button>
      </Link>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Scenes"
          className="w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 border-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Scene List */}
      <div className="space-y-1">
        {filteredScenes.map((scene, index) => (
          <div
            key={index}
            className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm cursor-pointer ${selectedScene === index
              ? "text-[#eaeaff] bg-[#643EFF] font-semibold"
              : "hover:bg-gray-200 text-gray-800"
              }`}
            onClick={() => setSelectedScene(index)}
          >
            <div className="flex text-xs items-center gap-2 truncate">
              <GripVertical size={14} className={`${selectedScene === index ? "text-white" : "text-black"}` + " shrink-0"} />
              <span className="truncate">{scene}</span>
            </div>
            {/* @ts-ignore */}
            <BsThreeDotsVertical size={14} className={`${selectedScene === index ? "text-white" : "text-black"}` + " shrink-0"} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default ScriptLining