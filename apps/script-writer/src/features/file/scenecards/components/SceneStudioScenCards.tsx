import React, { useRef, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import SceneCard from './scene-card';
import { createOrUpdateSceneCard, getSceneById } from '../api/scene-cards-api';
import { FiUploadCloud } from 'react-icons/fi';

const SceneStudioSceneCard = () => {
  const [errors, setErrors] = useState<any>({});
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const { fileId, sceneId } = useParams();
  const [scene, setScene] = useState({});

  const [formData, setFormData] = useState({
    pov: '',
    timePeriod: '',
    hook: '',
    purpose: '',
    conflict: '',
    climax: '',
    characterGoal: '',
    characterDevelopment: '',
    sensoryDetail: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSceneById({ sceneCardId: sceneId });
      console.log('Fetched response:', response);
      setScene(response);
    };
    fetchData();
  }, [sceneId]); // Ensure this runs when sceneId changes

  useEffect(() => {
    if (scene?.sceneEssentials) {
      setFormData(scene.sceneEssentials);
      console.log('Updated form data:', scene.sceneEssentials);
    }
  }, [scene]); // This ensures formData updates only when scene updates

  const handleSave = async () => {
    const response = await createOrUpdateSceneCard({
      _id: sceneId,
      fileId,
      sceneEssentials: formData,
      selectedTemplate: 'sceneEssentials',
    });
    console.log(response);
  };

  function handleInputChange(e, key) {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="rounded-[24px] w-full  pb-[40px] font-poppins h-[calc(100vh-200px)] overflow-y-hidden">
      <div className="flex flex-row items-center justify-between px-6">
        <div className="flex flex-row items-center gap-x-4">
          <button className="bg-black text-white py-5 px-10 rounded-t-[16px] font-medium text-sm">
            Scene Essentials{' '}
          </button>
          <button className="bg-white text-black py-5 px-10 rounded-t-[16px] font-medium text-sm">
            Freeform
          </button>
        </div>
      </div>

      <div className=" relative bg-white border-2 border-black rounded-3xl  pl-[32px]  pr-[24px] py-[58px] flex flex-col gap-y-8 max-h-[calc(100vh-270px)] overflow-y-hidden font-poppins">
        <div className='w-full h-full flex flex-col gap-6 overflow-y-auto px-6'>
          <div>
            <PhotoUpload
              data={formData}
              setData={setFormData}
              setFile=""
              previewURL="{previewURL}"
              setPreviewURL="{setPreviewURL}"
            />
            <p className="pb-[6px] border-b border-black my-8 text-[#212131] text-base font-semibold">
              {scene?.sceneEssentials?.type}
              {scene?.sceneEssentials?.location} -{' '}
              {scene?.sceneEssentials?.timeOfDay}
            </p>
            <p className="pb-[6px] border-b border-black text-[#212131] text-base font-semibold">
              {scene?.sceneEssentials?.title}
            </p>
          </div>

          <div>
            <label htmlFor="pov">
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">
                POV
              </p>
            </label>
            <input
              id="pov"
              name="pov"
              value={formData?.pov || ''}
              onChange={(e) => handleInputChange(e, 'pov')}
              className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${errors.pov ? 'border-red-500' : 'border-gray-300'} bg-white shadow-inner p-4`}
            />
            {errors.pov && <p className="text-red-500 text-sm">{errors.pov}</p>}
          </div>

          {/* Time Period */}
          <div>
            <label htmlFor="timePeriod">
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">
                Time Period
              </p>
            </label>
            <input
              id="timePeriod"
              name="timePeriod"
              value={formData?.timePeriod || ''}
              onChange={(e) => handleInputChange(e, 'timePeriod')}
              className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${errors.timePeriod ? 'border-red-500' : 'border-gray-300'} bg-white shadow-inner p-4`}
            />
            {errors.timePeriod && (
              <p className="text-red-500 text-sm">{errors.timePeriod}</p>
            )}
          </div>

          {/* Hook */}
          <div>
            <label htmlFor="hook">
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">
                Hook
              </p>
            </label>
            <input
              id="hook"
              name="hook"
              value={formData?.hook || ''}
              onChange={(e) => handleInputChange(e, 'hook')}
              className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${errors.hook ? 'border-red-500' : 'border-gray-300'} bg-white shadow-inner p-4`}
            />
            {errors.hook && (
              <p className="text-red-500 text-sm">{errors.hook}</p>
            )}
          </div>

          {/* Purpose */}
          <div>
            <label htmlFor="purpose">
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">
                Purpose
              </p>
            </label>
            <input
              id="purpose"
              name="purpose"
              value={formData?.purpose || ''}
              onChange={(e) => handleInputChange(e, 'purpose')}
              className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${errors.purpose ? 'border-red-500' : 'border-gray-300'} bg-white shadow-inner p-4`}
            />
            {errors.purpose && (
              <p className="text-red-500 text-sm">{errors.purpose}</p>
            )}
          </div>

          {/* Conflict */}
          <div>
            <label htmlFor="conflict">
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">
                Conflict
              </p>
            </label>
            <input
              id="conflict"
              name="conflict"
              value={formData?.conflict || ''}
              onChange={(e) => handleInputChange(e, 'conflict')}
              className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${errors.conflict ? 'border-red-500' : 'border-gray-300'} bg-white shadow-inner p-4`}
            />
            {errors.conflict && (
              <p className="text-red-500 text-sm">{errors.conflict}</p>
            )}
          </div>

          {/* Climax */}
          <div>
            <label htmlFor="climax">
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">
                Climax
              </p>
            </label>
            <input
              id="climax"
              name="climax"
              value={formData?.climax || ''}
              onChange={(e) => handleInputChange(e, 'climax')}
              className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${errors.climax ? 'border-red-500' : 'border-gray-300'} bg-white shadow-inner p-4`}
            />
            {errors.climax && (
              <p className="text-red-500 text-sm">{errors.climax}</p>
            )}
          </div>

          {/* Character Goals */}
          <div>
            <label htmlFor="characterGoal">
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">
                Character Goals
              </p>
            </label>
            <input
              id="characterGoal"
              name="characterGoal"
              value={formData?.characterGoal || ''}
              onChange={(e) => handleInputChange(e, 'characterGoal')}
              className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${errors.characterGoal ? 'border-red-500' : 'border-gray-300'} bg-white shadow-inner p-4`}
            />
            {errors.characterGoal && (
              <p className="text-red-500 text-sm">{errors.characterGoal}</p>
            )}
          </div>

          {/* Character Development */}
          <div>
            <label htmlFor="characterDevelopment">
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">
                Character Development
              </p>
            </label>
            <input
              id="characterDevelopment"
              name="characterDevelopment"
              value={formData?.characterDevelopment || ''}
              onChange={(e) => handleInputChange(e, 'characterDevelopment')}
              className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${errors.characterDevelopment ? 'border-red-500' : 'border-gray-300'} bg-white shadow-inner p-4`}
            />
            {errors.characterDevelopment && (
              <p className="text-red-500 text-sm">
                {errors.characterDevelopment}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="sensoryDetail">
              <p className="text-[#6A6A75] font-Poppins text-base font-semibold mb-4">
                Sensory Detail
              </p>
            </label>
            <input
              id="sensoryDetail"
              name="sensoryDetail"
              value={formData?.sensoryDetail || ''}
              onChange={(e) => handleInputChange(e, 'sensoryDetail')}
              className={`w-full rounded-[16px] border border-solid border-[#BABABF] bg-white shadow-inner p-4 ${errors.sensoryDetail ? 'border-red-500' : 'border-gray-300'} bg-white shadow-inner p-4`}
            />
            {errors.sensoryDetail && (
              <p className="text-red-500 text-sm">{errors.sensoryDetail}</p>
            )}
          </div>
          <div className='w-full flex justify-end'>
          <button
            onClick={() => handleSave()}
            className="py-[18px] px-[45px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
          >
            Save
          </button>
          </div>
          </div>
      </div>
    </div>
  );
};

export default SceneStudioSceneCard;

function PhotoUpload({
  data,
  setData,
  setFile,
  setPreviewURL,
  previewURL,
}: any) {
  const { type, templatename } = useParams<{
    fileId: string;
    type: string;
    templatename: string;
    id: any;
  }>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    console.log('file == selectedFile', selectedFile, selectedFile !== null);

    if (
      selectedFile &&
      selectedFile !== null &&
      selectedFile.type.startsWith('image/')
    ) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewURL(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      setPreviewURL(null);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0] || null;
    if (droppedFile) {
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreviewURL(event.target?.result as string);
        };
        reader.readAsDataURL(droppedFile);
      } else {
        setPreviewURL(null);
      }
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };
  console.log('datadatadata', data);

  return (
    <section>
      <div className="flex flex-col items-start gap-1 mb-4">
        <label htmlFor="photo" className="text-[#252C34] text-base font-semibold">
          Scene's photo
        </label>
        <p className="text-[#8F8F8F] font-medium text-[12px]">
          This will be displayed on your scene's card
        </p>
      </div>
      <div className="flex flex-row items-start w-full">
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={onFileChange}
          />
          <div className="flex gap-4">
            {previewURL ? (
              <div
                className="relative group border-2 border-dashed border-[#E9E9EA] bg-[#E9E9EA] rounded-2xl w-[205px] min-h-[123px] flex justify-center items-center flex-col overflow-hidden "
                onClick={triggerFileSelect}
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                {previewURL && (
                  <img
                    src={previewURL}
                    alt={'image'}
                    className="object-cover w-full h-full"
                  />
                )}

             
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex justify-center items-center transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                  <span className="text-white font-semibold text-sm">
                    Change File
                  </span>
                </div>
                <div className="absolute  flex justify-center items-center bottom-2 "><span className=" font-normal text-sm">Preview</span></div>
              </div>
            ) : (
              <div className="relative group border-2 border-dashed border-[#E9E9EA] bg-[#E9E9EA] rounded-2xl  min-h-[153px] flex justify-center items-center flex-col overflow-hidden w-[35%]">
                <div className="absolute bg-[#E9E9EA] flex justify-center items-center bottom-2 ">
                  <span className=" font-semibold text-sm">Preview</span>
                </div>
              </div>
            )}

            {
              <div
                className="border-2 border-dashed border-[#E9E9EA] flex-1 px-4 rounded-2xl min-h-[123px] flex justify-center items-center flex-col cursor-pointer"
                onClick={triggerFileSelect}
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                  <div
                 
                  className="p-[10px] bg-[#F7F6F2] rounded-full cursor-pointer h-10 w-10 d-flex justify-center items-center"
                >
                  <FiUploadCloud className="text-[20px] text-[#675F47]" />
                </div>
                <h1 className="text-sm text-[#252C34]">
                  <span className="text-[#653EFF] font-bold">
                    Click to upload{' '}
                  </span>
                  or drag and drop
                </h1>
                <p className="mt-1 text-[#857E66] text-xs">
                  {'PNG or JPEG file (Max 4MB)'}
                </p>
              </div>
            }
          </div>

          <div></div>
        </div>
      </div>
    </section>
  );
}
