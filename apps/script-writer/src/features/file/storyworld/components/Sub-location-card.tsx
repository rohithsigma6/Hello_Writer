import { Popover } from '@headlessui/react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDeleteSubLocation } from '../api/sub-location-data';
import AddSubLocationModal from './AddSubLocationModal';
import ImageModal from './ImageModal';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import defaultImg from "@/assets/storyWorld/defalut_location.webp"
// import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

export const SubLocationCard = ({ sublocation }) => {
  const [imageModalOpen, setImageModalOpen] = useState(null);
  const [locationModal, setLocationModal] = useState(false);
  const deleteLocationMutation = useDeleteSubLocation();
  const navigate = useNavigate();
  const { fileId, locationId } = useParams<{ fileId: string }>();
  const handleDelete = () => {
    // if (confirm('Are you sure you want to delete this location?')) {
    deleteLocationMutation.mutate({
      locationId: locationId,
      fileId: sublocation?._id || '',
    });
    // }
  };
  return (
    <div className="flex items-start border p-4 rounded-xl my-2">
      <Disclosure>
        {({ open }) => (
          <div className="w-full overflow-hidden transition-all duration-300">
            <Disclosure.Button className="w-full text-left flex gap-3 justify-between">
              <div className='flex gap-3'>
              <img
                src={
                  sublocation?.images?.find((img) => img.isPrimary == true)?.url ||defaultImg
                }
                alt="Temple"
                className={` object-cover rounded-lg transition-all duration-300 ${
                  open ? 'h-40' : 'h-20'
                }`}
                onClick={()=>setImageModalOpen(true)}
              />
              <div>
                <div className="flex gap-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {sublocation?.name}
                  </h2>{' '}
                  <Popover className=" relative my-popover-three-dot">
                    {({ open }) => (
                      <>
                        <Popover.Button className="transform rotate-90">
                          <span className="text-[10px]">•••</span>
                        </Popover.Button>

                        <Popover.Panel className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
                          <div className="flex flex-col">
                            <button
                              className="text-left py-2 px-4 text-black hover:bg-gray-200"
                              onClick={() => {
                                setLocationModal(true);
                              }}
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
                <div>
                  {sublocation?.type ? (
                    <span className="rounded-[4px] text-[10px] poppins-font font-normal border border-[#00000024]  px-[12px] py-[6px] text-[#9999A0]">
                      {sublocation?.type}
                    </span>
                  ) : (
                    <></>
                  )}
                  {sublocation?.importance ? (
                    <span className="rounded-[4px] text-[10px] poppins-font font-normal border border-[#00000024]  px-[12px] py-[6px] text-[#9999A0]">
                      {sublocation?.importance}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
               { open ?<div>
                <p className="mt-3   text-gray-600">
                    {sublocation?.description}
                    </p>
                   <p className="  text-gray-600">
                    <b className="mt-2   text-gray-800 font-semibold">Dramatic Function:</b>
                    {sublocation?.dramaticFunction}
                    </p>
                </div>:<></>}
              </div>
              </div>
              <div className='float-left '>
             { open? <ChevronDownIcon/>:<ChevronUpIcon/>}
              </div>
            </Disclosure.Button>

          
          </div>
        )}
      </Disclosure>
      {locationModal && (
        <AddSubLocationModal
          data={sublocation}
          setOpenDeleteTagPopp={setLocationModal}
        />
      )}

      {imageModalOpen && (
        <ImageModal
          setOpenDeleteTagPopp={setImageModalOpen}
          data={sublocation?.images}
        />
      )}
    </div>
  );
};
