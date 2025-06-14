import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiUploadCloud } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { useParams } from 'react-router';
import { enqueueSnackbar } from 'notistack';
import Select from 'react-select'; // Import react-select
import { useAddSubLocation } from '../api/sub-location-data';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import { BsBack } from 'react-icons/bs';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';

interface AddLocationModalProps {
  setOpenDeleteTagPopp: (value: boolean) => void;
  data: any;
}

const ImageModal: React.FC<AddLocationModalProps> = ({
  data,
  setOpenDeleteTagPopp,
}) => {
 

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

  };


  const swiperRef = useRef(null);
  const thumbnailSwiperRef = useRef(null);



  const handleThumbnailClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index); // Go to the clicked slide
    }
  };
  return (
    <div className="fixed inset-0 z-[999999]">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative z-50 transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 w-[800px]">
          <div className="w-full p-[24px] rounded-[24px] shadow-2xl">
              <div className="flex justify-between items-center pb-[24px] mb-[24px]">
                <p className="text-[#212131] text-[19px] font-poppins font-bold">
                 View Location Image
                </p>
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => setOpenDeleteTagPopp(false)}
                >
                  <IoMdClose />
                </div>
              </div>
              <div className="relative">
      {/* Main Swiper */}
      <Swiper
        ref={swiperRef}
        pagination={{
          type: "fraction",
        }}
        na  
        
            vigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image?.url} alt={`Slide ${index + 1}`} className='w-full max-h-80'/>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="custom-prev bg-gray-800 bg-opacity-15 px-3 py-1 text-white z-50 rounded-full absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer">
        <FaChevronLeft className="h-9" />
      </div>
      <div className="custom-next bg-gray-800 bg-opacity-15 px-3 py-1 text-white z-50 rounded-full absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer">
        <FaChevronRight className="h-9" />
      </div>

      {/* Thumbnail Swiper */}
      <Swiper
        ref={thumbnailSwiperRef}
        slidesPerView={5}
        spaceBetween={10}
        watchSlidesVisibility
        watchSlidesProgress
        className="thumbnail-swiper mt-4"
      >
        {data?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image?.url}
              alt={`Thumbnail ${index + 1}`}
              className="cursor-pointer max-h-24 w-full"
              onClick={() => handleThumbnailClick(index)} // Handle thumbnail click
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
