import React from 'react'

import { useNavigate, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useCharactersByFile } from '@/features/file/characters/api/save-draft';
import userImage from '../../../../assets/default-user.png';
const CharacterSelect = () => {
    const { fileId, type } = useParams<{ fileId?: string; type: any }>();
    
  const navigate = useNavigate();
  const { data, isLoading, error } = useCharactersByFile({ fileId});
  const handleButtonClick = (link: string) => {
    if (link) navigate(link);
  };
  
  return (
    <section className="flex flex-col items-start gap-4 mt-[32px] w-full">
      <div className="w-full overflow-x-hidden">
      {/* Finalized Characters */}
      <h2 className="text-[17px] font-bold mb-2 text-[#212131] font-poppins">Finalized Characters</h2>
      <div className='max-w-full'>
     <Swiper
        slidesPerView={2} 
        spaceBetween={10} 
        navigation
        modules={[Navigation]}
        className="mb-4 max-w-full my-swiper-slider"
      >
        {data?.finalized?.map((char:any) => (
          <SwiperSlide  className=" bg-gray-100 rounded-lg text-center max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] my-swiper-slider-items"  key={char?._id} onClick={()=>handleButtonClick(`/file/${fileId}/characters/${char?._id}`)}>
          <img src={char?.allTemplate?.characterBuilder?.basicInfo?.photo ||char?.allTemplate?.characterBlueprint?.photo||char?.allTemplate?.freeform?.photo||userImage}  className=" mx-auto" />
          <p>{char?.allTemplate?.characterBuilder?.basicInfo?.name ||char?.allTemplate?.characterBlueprint?.characterName||char?.allTemplate?.freeform?.characterName}</p>
        </SwiperSlide>
        ))}
      </Swiper> 
        {data?.finalized.length==0 && "Finalized character not found"}
     </div>
      {/* Draft Characters */}
      <h2 className="text-[17px] font-bold mb-2 text-[#212131] font-poppins mt-10">Draft Characters</h2>
      <Swiper 
        slidesPerView={2} 
        spaceBetween={10}  
        navigation
        modules={[Navigation]}
        className="mb-4 w-full my-swiper-slider"
      >
        {data?.drafts?.map((char:any) => (
          <SwiperSlide  className=" bg-gray-100 rounded-lg text-center max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] my-swiper-slider-items"  key={char?._id} onClick={()=>handleButtonClick(`/file/${fileId}/characters/${char?._id}`)}>
            <img src={char?.allTemplate?.characterBuilder?.basicInfo?.photo ||char?.allTemplate?.characterBlueprint?.photo||char?.allTemplate?.freeform?.photo||userImage}  className=" mx-auto" />
            <p>{char?.allTemplate?.characterBuilder?.basicInfo?.name ||char?.allTemplate?.characterBlueprint?.characterName||char?.allTemplate?.freeform?.characterName}</p>
            <p>{char?.allTemplate?.characterBuilder?.basicInfo?.name}</p>
          </SwiperSlide>
        ))}
      </Swiper> 
      {data?.drafts.length==0 && "Drafts character not found"}
     <div className='text-center'>
      <button className="bg-[#D6CCFF] text-[#653EFF] py-2 px-6 rounded-lg mt-3 text-[14px] font-poppins" onClick={()=>handleButtonClick(`/file/${fileId}/characters`)}>Add new</button>
      </div>
    </div>
      </section>
  )
}

export default CharacterSelect