import { Popover } from "@headlessui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDeleteLocation } from "../api/location-data";
import AddLocationModal from "./AddLocationModal";
import defaultImg from "@/assets/storyWorld/defalut_location.webp"
const values = ["A Kathkuni Heritage", "Kathkuni", "Heritage", "Kathkuni Heritage"];
const LocationCard = ({ item }: any) => {
    const [locationModal , setLocationModal] = useState(false)
    const deleteLocationMutation = useDeleteLocation();
  const navigate =useNavigate()
    const { fileId  } = useParams<{ fileId: string; }>();
    const handleDelete = () => {
      // if (confirm('Are you sure you want to delete this location?')) {
        deleteLocationMutation.mutate({locationId:item?._id, fileId:fileId||"" });
      // }
    };
  return (
    <div
      className={`w-[218px] border rounded-lg p-[16px]`}
        onClick={() => {
          navigate(`/file/${fileId}/storyworld/${item?._id}`);
        }}
    >
<div className="relative flex justify-center">
      <img
        className="w-[186px] rounded-[8px] h-[100px] object-cover"
        src={item?.images?.find((img)=>img.isPrimary==true)?.url ||defaultImg}
        alt="not found image"
      />
      
      {/* Three Dot Button */}
      <Popover className="absolute top-2 right-2 my-popover-three-dot">
        {({ open }) => (
          <>
            <Popover.Button className="transform rotate-90">
              <span className="text-[10px]">•••</span>
            </Popover.Button>

            <Popover.Panel className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
              <div className="flex flex-col">
                <button 
                  className="text-left py-2 px-4 text-black hover:bg-gray-200"
                  onClick={() =>{ setLocationModal(true)}}
                >
                  Edit
                </button>
                <button 
                  className="text-left py-2 px-4 text-black hover:bg-gray-200"
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>


      <div className="w-full bg-white">
        <p className="text-[#000000] font-Poppins text-[14px] font-medium leading-[20px] mb-[8px] max-h-[40px] overflow-hidden text-ellipsis 2-lines mt-4">{item?.name}</p>
        <div className="flex flex-wrap gap-1">
          {/* {item?.dramaticFunction ? (
            <div className="rounded-[4px] text-[10px] poppins-font font-normal border border-[#00000024]  px-[12px] py-[6px] text-[#9999A0]">{item?.dramaticFunction}</div>
          ) : (
            <></>
          )} */}
          {item?.importance ? <div className="rounded-[4px] text-[10px] poppins-font font-normal border border-[#00000024]  px-[12px] py-[6px] text-[#9999A0]">{item?.importance}</div> : <></>}
          {item?.type ? <div className="rounded-[4px] text-[10px] poppins-font font-normal border border-[#00000024]  px-[12px] py-[6px] text-[#9999A0]">{item?.type}</div> : <></>}
        </div>
          {item?.description ? <div className="text-sm my-2 text-gray-600">{item?.description}</div> : <></>} 
           {item?.feel ? <div className="text-sm my-2 text-gray-600"><b>feel: </b> {item?.feel}</div> : <></>}
           <p className="  text-gray-600 text-sm">
              <b className="my-2   text-gray-800 font-semibold">Dramatic Function:</b>
              {item?.dramaticFunction}
              </p>
              <b className="my-2 text-sm  text-gray-800 font-semibold">Sublocations :- </b>

              <div className="flex gap-1   flex-wrap">
                {item?.subLocation?.slice(0, 2)?.map((sublocation)=><span className="text-[8px] px-2 py-1 bg-[#F0ECFF] border border-[#8565FF] rounded-full">{sublocation?.name}</span>)}{item?.subLocation.length >2? <span className="text-[8px] px-2 py-1 bg-[#F0ECFF] border border-[#8565FF] rounded-full">+ {item?.subLocation.length-2} </span>:<></>}
              </div>
      </div>
      { locationModal && <AddLocationModal  data={item} setOpenDeleteTagPopp={setLocationModal} /> }
      
    </div>
  );
};

export default LocationCard;
