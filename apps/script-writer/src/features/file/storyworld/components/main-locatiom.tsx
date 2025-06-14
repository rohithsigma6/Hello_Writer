import { Disclosure, Popover } from '@headlessui/react';
// import { loglineData } from "pages/common/typesData";
import {
  FaAnglesDown,
  FaAnglesUp
} from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import AddSubLocationModal from './AddSubLocationModal';
import { useState } from 'react';
import { useSubLocations } from '../api/sub-location-data';
import { useParams, useNavigate } from 'react-router';
import { useDeleteLocation } from '../api/location-data';
import AddLocationModal from './AddLocationModal';
import ImageModal from './ImageModal';
import { SubLocationCard } from './Sub-location-card';
// import { Link } from "react-router-dom";

import defaultImg from "@/assets/storyWorld/defalut_location.webp"
const MainLocation = ({ setLoglineStatus }: any) => {
    const [imageModalOpen, setImageModalOpen] = useState(null)
      const [locationModal , setLocationModal] = useState(false);
      const navigate =useNavigate();
      const deleteLocationMutation = useDeleteLocation();
  const { fileId,locationId } = useParams<{ fileId: any ,locationId:any}>();
    const { data, isLoading, error } = useSubLocations({ fileId,locationId });
    console.log(data?.data,isLoading);
    const handleDelete = () => {
      // if (confirm('Are you sure you want to delete this location?')) {
        deleteLocationMutation.mutate({locationId:data?.data?._id, fileId:fileId||"" });
        navigate(`/file/${fileId}/storyworld`);
      // }
    };
  const [subLocationModal, setSubLocationModal] = useState(false);
  return (
    <>
      {' '}
      <div className="types-wrapper w-[100%] h-[100vh] bg-slate-100 overflow-y-scroll">
        <div className="mt-[32px] ml-[40px] mr-[40px] overflow-x-hidden ">
          <div className="bg-white rounded-[24px] px-[32px] py-[40px] font-poppins overflow-y-scroll max-h-[calc(100vh-150px)] ">
          <div className="">
      <div className="">
        <div className="">
            <div className="flex items-center justify-between">
                <div className='flex gap-2 items-center cursor-pointer font-bold'   onClick={() => {
          navigate(`/file/${fileId}/storyworld`);
        }}>

                <GoArrowLeft />  All Location
                </div>
                <div>

                <button className="px-4 py-2 border-2   border-gray-500 text-gray-600 rounded-lg hover:bg-gray-50 mx-2"  onClick={() =>{ setLocationModal(true)}}>
            Edit
          </button>
                <button className="px-4 py-2 border-2   border-gray-500 text-gray-600 rounded-lg hover:bg-gray-50" 
                  onClick={() => handleDelete()}>
            Delete
          </button>
                </div>

            </div>
          <div className="flex items-start border p-4 rounded-xl my-2">
            <img
              className="h-32 w-48 object-cover rounded-lg mr-4"
              src={data?.data?.images?.find((img)=>img.isPrimary==true)?.url||defaultImg}
              alt="location"
              onClick={()=>setImageModalOpen(true)}
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{data?.data?.name}</h2>
              <div className="mt-1 flex gap-2">
              {data?.data?.type ? <span className="rounded-[4px] text-[10px] poppins-font font-normal border border-[#00000024]  px-[12px] py-[6px] text-[#9999A0]">{data?.data?.type}</span> : <></>}
              {data?.data?.importance ? <span className="rounded-[4px] text-[10px] poppins-font font-normal border border-[#00000024]  px-[12px] py-[6px] text-[#9999A0]">{data?.data?.importance}</span> : <></>}
                {/* <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Primary
                </span>
                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Rural
                </span> */}
              </div>
              <p className="mt-3   text-gray-600">
              {data?.data?.description}
              </p>
              <p className="  text-gray-600">
              <b className="mt-2   text-gray-800 font-semibold">Dramatic Function:</b>
              {data?.data?.dramaticFunction}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-gray-700">Sub Location</h3>
          <button 
              onClick={() => setSubLocationModal(true)} className="  font-medium text-violet-600 border border-violet-600 px-3 py-1 rounded-md hover:bg-violet-50">
            Add Sublocation
          </button>
        </div>
       {data?.data?.subLocation?.length==0&& <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center   text-gray-500">
          <p className="mb-3 font-medium">No Sublocations Yet</p>
          <p>Start by adding sublocations to better organize your main location.</p>
          <button 
              onClick={() => setSubLocationModal(true)} className="mt-4 px-4 py-2 border-2 border-dotted border-violet-500 text-violet-600 rounded-lg hover:bg-violet-50">
            Add Sublocation
          </button>
        </div>}
        {data?.data?.subLocation?.map((sublocation)=><SubLocationCard sublocation={sublocation}/>)}
      </div>
    </div>
          </div>
        </div>
      </div>
      
      { locationModal && <AddLocationModal  data={data?.data} setOpenDeleteTagPopp={setLocationModal} /> }
      {subLocationModal && (
        <AddSubLocationModal setOpenDeleteTagPopp={setSubLocationModal} />
      )}
      {imageModalOpen && (
        <ImageModal setOpenDeleteTagPopp={setImageModalOpen} data={data?.data?.images}/>
      )}
    </>
  );
};

export default MainLocation;
