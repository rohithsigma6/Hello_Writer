import React from 'react';

import { useNavigate, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useCharactersByFile } from '@/features/file/characters/api/save-draft';
import userImage from '../../../../assets/default-user.png';
import { Minus, Plus } from 'lucide-react';
import { useAddCharacterRelationship, useAllCharacterRelationships, useRemoveCharacterRelationship } from '@/features/file/characters/api/relationship-add';
import { enqueueSnackbar } from 'notistack';
const CharacterRelationshipSelect = () => {
  const { fileId, type } = useParams<{ fileId?: string; type: any }>();

  const navigate = useNavigate();
  const { data, isLoading, error } = useAllCharacterRelationships({ fileId });
  const handleButtonClick = (link: string) => {
    if (link) navigate(link);
  };

  const addRelationshipMutation = useAddCharacterRelationship();
  const addRelationship = (id) => {
    addRelationshipMutation.mutate(
      { fileId: fileId, characterId: id, connections: [] },
      {
        onSuccess: () => {
          enqueueSnackbar('Relationship added successfully!');
        },
        onError: (error) => {
          console.error('Error adding relationship:', error);
        },
      },
    );
  };

  const removeRelationshipMutation = useRemoveCharacterRelationship();

  const handleRemove = (id) => {
    removeRelationshipMutation.mutate({ characterId:id }, {
      onSuccess: () => {
        enqueueSnackbar('Relationship removed successfully!');
      },
      onError: (error) => {
        console.error('Error removing relationship:', error);
      },
    });
  };

  return (
    <section className="flex flex-col items-start gap-4 mt-[32px] bg-[#E9E9EA] w-full rounded-xl p-3">
      <div className="w-full overflow-x-hidden w-full">
        {/* Finalized Characters */}
        <h2 className="text-[17px] font-medium  my-2 text-[#212131] font-poppins">
          Create Connection
        </h2>
        <div className="w-full border-[#653EFF] border-dashed flex border-2 rounded-md text-[#653EFF] justify-center gap-2 font-medium p-2 my-2"  onClick={()=>handleButtonClick(`/file/${fileId}/characters`)}>
          Add Character <Plus />
        </div>
        <div className="max-w-full max-h-96 overflow-y-auto">

          {data?.withoutConnections?.map((char: any) => (
            <div className="flex justify-between bg-white my-4 p-4 rounded-2xl items-center">
              <div className="flex gap-2">
                <img
                  src={
                    char?.allTemplate?.characterBuilder?.basicInfo?.photo ||
                    char?.allTemplate?.characterBlueprint?.photo ||
                    char?.allTemplate?.freeform?.photo ||
                    userImage
                  }
                  className="rounded-full h-9 w-9 object-cover"
                />
                <p>
                  {char?.allTemplate?.characterBuilder?.basicInfo?.name ||
                    char?.allTemplate?.characterBlueprint?.characterName ||
                    char?.allTemplate?.freeform?.characterName}
                </p>
              </div>
              <div
                className="rounded-full"
                onClick={() => addRelationship(char._id)}
              >
                <Plus />
              </div>
            </div>
          ))}
          {data?.withConnections?.map((char: any) => (
            <div className="flex justify-between bg-white my-4 p-4 rounded-2xl items-center">
              <div className="flex gap-2">
                {console.log(char)}
                <img
                  src={
                    char?.characterId?.allTemplate?.characterBuilder?.basicInfo?.photo ||
                    char?.characterId?.allTemplate?.characterBlueprint?.photo ||
                    char?.characterId?.allTemplate?.freeform?.photo ||
                    userImage
                  }
                  className="rounded-full h-9 w-9 object-cover"
                />
                <p>
                  {char?.characterId?.allTemplate?.characterBuilder?.basicInfo?.name ||
                    char?.characterId?.allTemplate?.characterBlueprint?.characterName ||
                    char?.characterId?.allTemplate?.freeform?.characterName}
                </p>
              </div>
              <div
                className="rounded-full"
                onClick={() => handleRemove(char?.characterId?._id)}
              >
                <Minus />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacterRelationshipSelect;
