import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import leftArrow from '../../../../assets/preWritingTools/left-arrow.svg'
import rightArrow from '../../../../assets/preWritingTools/right-arrow.svg'
import threedots from '../../../../assets/preWritingTools/three-dots.svg'
import resizer from '../../../../assets/preWritingTools/resizer.svg'
import recall from '../../../../assets/preWritingTools/recall.svg'
import upload from '../../../../assets/preWritingTools/upload.svg'
import character1 from '../../../../assets/preWritingTools/character-1.svg'
import { EnvironmentOptions, SceneEnvironmentOptions } from "./script-breakdown.constants";
import character2 from '../../../../assets/preWritingTools/character-2.svg'
import colorPalette from '../../../../assets/preWritingTools/color-palette.svg'
import downArrow from '../../../../assets/preWritingTools/down-arrow.svg'
import plus from '../../../../assets/preWritingTools/plus.svg'
import { getAllSceneCards, createOrUpdateSceneCard } from "../api/scene-cards-api";
const Scene = () => {

  const [allSceneCards, setAllSceneCards] = useState([]);
  const { fileId, sceneId } = useParams();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [scene, setScene] = useState({});
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [editedScene, setEditedScene] = useState({});
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleSave = async () => {
    try {
      // Update scene structure in the database
      const response = await createOrUpdateSceneCard({
        _id: sceneId,
        fileId,
        sceneEssentials: {
          ...editedScene.sceneEssentials,
          sceneStructure: content
        },
        selectedTemplate: "sceneEssentials"
      });

      console.log("Scene updated successfully:", response);
    } catch (error) {
      console.error("Error updating scene:", error);
    }
  };


  useEffect(() => {
    const fetchAllSceneCards = async () => {
      try {
        const response = await getAllSceneCards({ fileId });
        console.log("Response is pop", response);

        if (response) {
          const filteredScenes = response.filter(scene => scene.sceneEssentials.brief && scene.sceneEssentials.brief.trim() !== "");
          setAllSceneCards(filteredScenes);
          console.log("idk", allSceneCards)

          const defaultIndex = filteredScenes.findIndex(scene => scene._id === sceneId);
          if (defaultIndex !== -1) {
            setScene(filteredScenes[defaultIndex]);
          }
          setSceneIndex(defaultIndex !== -1 ? defaultIndex : 0);
          setScene(filteredScenes[sceneIndex]);
          setEditedScene(scene);
          setContent(scene.sceneEssentials.sceneStructure);
          console.log(content)
        }
      } catch (error) {
        console.error("Error fetching scenes:", error);
      }
    };

    fetchAllSceneCards();
  }, [fileId, sceneId]);

  useEffect(() => {
    if (scene) {
      setEditedScene(scene);
      setContent(scene.sceneEssentials?.sceneStructure || ""); 
    }
  }, [scene]);
  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setEditedScene(prev => ({
      ...prev,
      sceneEssentials: {
        ...prev?.sceneEssentials,  // Preserve existing fields
        [name]: value             // Update only the changed field
      }
    }));
  };
  const goToScene = (newIndex) => {
    if (newIndex >= 0 && newIndex < allSceneCards.length) {
      const newScene = allSceneCards[newIndex];
      setScene(newScene);
      setSceneIndex(newIndex);
      navigate(`/file/${fileId}/scenecards/template/scenes/${newScene._id}`);
    }
  };
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
    <div className="mt-6 bg-white rounded-[24px] block w-[96%] p-6 mx-auto">
      <div className="self-stretch flex justify-between items-center">
        <div className="flex justify-start items-end gap-5">
          <div className="w-20 justify-start text-gray-800 text-2xl font-bold font-['Poppins'] leading-7">Scenes</div>
          <div className="flex justify-start items-center gap-3">
            <img
              src={leftArrow}
              onClick={() => goToScene(sceneIndex - 1)}
              style={{ opacity: sceneIndex === 0 ? 0.5 : 1, cursor: sceneIndex === 0 ? "not-allowed" : "pointer" }}
            />
            <img
              src={rightArrow}
              onClick={() => goToScene(sceneIndex + 1)}
              style={{ opacity: sceneIndex === allSceneCards.length - 1 ? 0.5 : 1, cursor: sceneIndex === allSceneCards.length - 1 ? "not-allowed" : "pointer" }}
            />
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <img src={threedots} />
          <img src={resizer} />
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-4 mt-4 mb-3">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-3">
            <div className="bg-[#38228C] rounded-[16px] min-h-14 w-[104px]">
              <div className="inline-flex justify-start items-center py-4 px-3 relative w-full">
                
                <select
                  className="  bg-[#38228C] text-white text-xl font-normal font-['Courier_Prime'] leading-tight appearance-none w-full cursor-pointer"
                  name="type"
                  value={editedScene?.sceneEssentials?.type || " "}
                  onChange={handleSelectChange}
                >
                  {EnvironmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <img src={downArrow} className="absolute right-3 top-1/2 -translate-y-1/2 z-0" />
              </div>
            </div>
            <div>
              <div>
                <input
                  className="text-[#BABABF] text-xl font-poppins py-[15px] px-3 bg-[#38228C] rounded-[16px] min-h-14 min-w-[247px]"
                  value={editedScene?.sceneEssentials?.location || ""}
                  onChange={(e) => {
                    const { value } = e.target;
                    setEditedScene(prev => ({
                      ...prev,
                      sceneEssentials: {
                        ...prev.sceneEssentials, // Ensure existing data is retained
                        location: value          // Update only 'location'
                      }
                    }));
                  }}

                />

              </div>
            </div>
            <div className="bg-[#38228C] rounded-[16px] min-h-14 w-[215px]">
              <div className="inline-flex justify-start items-center py-4 px-3 relative w-full">
                <select
                  className="bg-[#38228C] text-white text-xl font-normal font-['Courier_Prime'] leading-tight appearance-none w-full cursor-pointer"
                  name="timeOfDay"
                  value={editedScene?.sceneEssentials?.timeOfDay || ""}
                  onChange={handleSelectChange}
                >
                  {SceneEnvironmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <img src={downArrow} className="absolute right-3 top-1/2 -translate-y-1/2 z-0" />
              </div>
            </div>
          </div>
          <img src={recall} />
        </div>
      </div>
      <div className="w-full">
        <textarea
          className="rounded-[16px] border border-[#0000004e] shadow-inner text-sm font-courier-prime w-full px-[64px] py-[34px] min-h-[calc(100vh-500px)] overflow-y-auto mx-auto focus:outline-none"
          value={content} // Ensure content is the controlled state
          onChange={(e) => setContent(e.target.value)} // Update content state
        />
        <div className='text-end mt-6'>
        <button
          onClick={handleSave}
          className="py-[18px] px-[45px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
        >
          Save
        </button>
        </div>
      </div>

    </div>
    </div>
  )
}

export default Scene;