import { Modal } from '@/components/ui/modal';
import React, { useEffect, useState } from 'react';
import closeicon from '@/assets/close-icon.svg';
import userImage from '@/assets/default-user.png';
import { Minus, Plus } from 'lucide-react';
import { FaAngleRight, FaAngleUp } from 'react-icons/fa';
import { Disclosure } from '@headlessui/react';
import { useAddCharacterRelationship, useCharacterRelationshipById } from '../api/relationship-add';
import { useParams } from 'react-router';
import { useCharactersByFile } from '../api/save-draft';
import { enqueueSnackbar } from 'notistack';
import { FiSearch } from 'react-icons/fi';

const ConnectionCard = ({
  name,
  role,
  image,
  icon = 'add',
  handleFunction,
  id,
}: any) => {
  const { fileId, type } = useParams<{ fileId?: string; type: any }>();
  const { data, isLoading, error } = useCharactersByFile({ fileId });

  // Local state to handle input visibility and button state
  const [isRelationshipInputVisible, setIsRelationshipInputVisible] =
    useState(false);
  const [relationshipType, setRelationshipType] = useState('');

  const handleButtonClick = () => {
    setIsRelationshipInputVisible(true); // Show the input field
    // handleFunction(id); // Trigger the function passed via props
  };

  const handleAddClick = () => {
    if (relationshipType) {
      // Handle the 'Add' functionality when the user enters a relationship type
      console.log('Relationship Type:', relationshipType);
      handleFunction({id,relationship:relationshipType})
      // You can add logic to save the relationshipType or handle it as needed
    }
  };

  return (
    <div className="border border-[#B9A6FF] rounded-xl p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-gray-400 text-sm">{role}</p>
          </div>
        </div>
        <div>
          {!isRelationshipInputVisible && (
            <button
              className="p-2 text-primary-cta border border-primary-cta rounded-full hover:bg-primary-cta hover:text-white transition"
              onClick={handleButtonClick}
            >
              {icon === 'remove' ? <Minus size={15} /> : <Plus size={15} />}
            </button>
          )}
          {isRelationshipInputVisible && (
            <button
              onClick={handleAddClick}
              className="mt-2 px-[30.5px] py-[5.5px] text-white bg-primary-cta rounded-xl text-sm  hover:bg-primary-cta transition"
            >
              Add
            </button>
          )}
        </div>
      </div>
      {isRelationshipInputVisible && (
        <div>
          <label className="block text-sm  text-[#9999A0] my-1  tracking-wider">
            Relationship Type
          </label>
          <input
            type="text"
            placeholder="Enter Relationship Type"
            value={relationshipType}
            onChange={(e) => setRelationshipType(e.target.value)}
            className="border border-primary-cta rounded-xl p-2 mt-2   w-full"
          />
        </div>
      )}
    </div>
  );
};
const ConnectionAddCard = ({
  name,
  role,
  image,
  relation,
  icon = 'add',
  handleFunction,
  handleUpdate,
  id,
}: any) => {
  const { fileId, type } = useParams<{ fileId?: string; type: any }>();
  const { data, isLoading, error } = useCharactersByFile({ fileId });
  

  // Local state to handle input visibility and button state
  const [isRelationshipInputVisible, setIsRelationshipInputVisible] =
    useState(false);
  const [relationshipType, setRelationshipType] = useState('');
useEffect(() => {
  setRelationshipType(relation)
}, [relation])

  const handleButtonClick = () => {
    setIsRelationshipInputVisible(true); // Show the input field
    // handleFunction(id); // Trigger the function passed via props
  };

  const handleAddClick = () => {
    if (relationshipType) {
      // Handle the 'Add' functionality when the user enters a relationship type
      console.log('Relationship Type:', relationshipType);
      handleUpdate({id,relationship:relationshipType})
      // You can add logic to save the relationshipType or handle it as needed
    }
  };

  return (
    <div className="border border-[#B9A6FF] rounded-xl p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
           <div className='flex gap-2'>
             <h3 className="font-medium">{name}</h3> <span className='p-1 bg-slate-200 rounded-lg text-sm text-black'>{relation}</span>
            </div> 
            <p className="text-gray-400 text-sm">{role}</p>
          </div>
        </div>
        <div>
          {!isRelationshipInputVisible && (
            <div className="flex gap-2">
              {' '}
              <button
                className="p-2 text-primary-cta border border-primary-cta  hover:bg-pri transition mt-2 px-[30.5px] py-[5.5px]   rounded-xl text-sm   "
                onClick={handleButtonClick}
              >
                Edit
              </button>{' '}
              <button
                className="mt-2 px-[30.5px] py-[5.5px] text-white bg-primary-cta rounded-xl text-sm  hover:bg-primary-cta transition"
                onClick={()=>handleFunction(id)}
              >
                remove
              </button>{' '}
            </div>
          )}
          {isRelationshipInputVisible && (
            <button
              onClick={handleAddClick}
              className="mt-2 px-[30.5px] py-[5.5px] text-white bg-primary-cta rounded-xl text-sm  hover:bg-primary-cta transition"
            >
              Update
            </button>
          )}
        </div>
      </div>
      {isRelationshipInputVisible && (
        <div>
          <label className="block text-sm  text-[#9999A0] my-1  tracking-wider">
            Relationship Type
          </label>
          <input
            type="text"
            placeholder="Enter Relationship Type"
            value={relationshipType}
            onChange={(e) => setRelationshipType(e.target.value)}
            className="border border-primary-cta rounded-xl p-2 mt-2  w-full"
          />
        </div>
      )}
    </div>
  );
};

function AddRelationshipModal({ isOpen, onClose, currentData }: any) {
  if (!isOpen) return null;
  const { fileId, type } = useParams<{ fileId?: string; type: any }>();
  // const { data:aa} = useCharacterRelationshipById({ currentData?._id });
  const addRelationshipMutation = useAddCharacterRelationship();
  const { data } = useCharactersByFile({ fileId });
  console.log(currentData);

  const [searchQuery, setSearchQuery] = useState(''); 

  const filteredData = data?.finalized?.filter((item) =>
    item?.allTemplate?.characterBuilder?.basicInfo?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    item?.allTemplate?.characterBlueprint?.characterName
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    item?.allTemplate?.freeform?.characterName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );


  const addConnection = (data) => {

    addRelationshipMutation.mutate(
      {
        fileId: fileId,
        characterId: currentData?.characterId?._id,
        connections: [...currentData?.connections?.map((item) =>({ id:item?.id?._id,relationship:item?.relationship})), data],
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Relationship added successfully!');
        },
        onError: (error) => {
          console.error('Error adding relationship:', error);
        },
      },
    );
    onClose()
  };
  const updateConnection = (data) => {
    console.log(
      [...currentData?.connections?.map((item) =>({ id:item?.id?._id,relationship:item?.relationship})), data],
      'sssssssss',
      data,
    );
    
    addRelationshipMutation.mutate(
      {
        fileId: fileId,
        characterId: currentData?.characterId?._id,
        connections: [...currentData?.connections?.map((item) =>({ id:item?.id?._id,relationship:item?.relationship})).filter((item) => item.id != data?.id), data],
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Relationship added successfully!');
        },
        onError: (error) => {
          console.error('Error adding relationship:', error);
        },
      },
    );
    onClose()
  };
  const RemoveConnection = (id) => {
    addRelationshipMutation.mutate(
      {
        fileId: fileId,
        characterId: currentData?.characterId?._id,
        connections: currentData?.connections
        ?.map( (item) =>({ id:item?.id?._id,relationship:item?.relationship}))
        .filter((item) => item.id != id),
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Relationship added successfully!');
        },
        onError: (error) => {
          console.error('Error adding relationship:', error);
        },
      },
    );
    onClose()
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        className="bg-white rounded-[24px] shadow-md w-[920px]"
      >
        <div>
          <div className="flex justify-between pl-[40px] pr-[24px] py-[24px] items-center] items-center">
            <h2 className="text-[19px] text-[#212131] font-poppins font-bold">
              Add Connection
            </h2>
            <button
              className=" bg-white duration-500 text-[#2C3E50] "
              onClick={onClose}
            >
              <img src={closeicon} alt="" />
            </button>
          </div>

          <div className="px-[24px]">
            <div className="  rounded-lg flex items-center gap-6 my-6">
              <img
                src={
                  currentData?.characterId?.allTemplate?.characterBuilder
                    ?.basicInfo?.photo ||
                  currentData?.characterId?.allTemplate?.characterBlueprint
                    ?.photo ||
                  currentData?.characterId?.allTemplate?.freeform?.photo ||
                  userImage
                }
                alt="Character"
                className="w-24 h-24  object-cover"
              />
              <div>
                <h2 className="text-gray-600 ">Character name</h2>
                <p className="text-xl font-bold">
                  {currentData?.characterId?.allTemplate?.characterBuilder
                    ?.basicInfo?.name ||
                    currentData?.characterId?.allTemplate?.characterBlueprint
                      ?.characterName ||
                    currentData?.characterId?.allTemplate?.freeform
                      ?.characterName ||
                    'test'}
                </p>
                <h2 className="text-gray-600 ">Role in the story</h2>

                <p className="text-indigo-500 font-semibold">
                  {currentData?.characterId?.allTemplate?.characterBuilder
                    ?.characterStory?.roleInScreenPlay ||
                    currentData?.characterId?.allTemplate?.characterBlueprint
                      ?.characterRole ||
                    currentData?.characterId?.allTemplate?.freeform
                      ?.characterName ||
                    'test'}
                </p>
              </div>
            </div>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-[20px] py-[18px] text-sm font-medium text-left text-[#212131] rounded-[16px] border">
                    <p className="text-base font-semibold text-[#212131] font-poppins">
                      {currentData?.connections.length} Connections
                    </p>
                    <span>{open ? <FaAngleUp /> : <FaAngleRight />}</span>
                  </Disclosure.Button>
                  <section className="flex flex-col gap-y-3 p-4 h-fit overflow-auto font-poppins">
                    {currentData?.connections?.map((item, index) => {
                      return (
                        <Disclosure.Panel
                          key={index}
                          className="text-[#9999A0] text-[19px] font-normal  items-center gap-1"
                        >
                          <ConnectionAddCard
                            id={item?.id?._id}
                            name={
                              item?.id?.allTemplate?.characterBuilder?.basicInfo
                                ?.name ||
                              item?.id?.allTemplate?.characterBlueprint
                                ?.characterName ||
                              item?.id?.allTemplate?.freeform?.characterName ||
                              'unknown'
                            }
                            role={
                              item?.id?.allTemplate?.characterBuilder
                                ?.characterStory?.roleInScreenPlay ||
                              item?.id?.allTemplate?.characterBlueprint
                                ?.characterName ||
                              item?.id?.allTemplate?.freeform?.characterName ||
                              'unknown'
                            }
                            image={
                              item?.id?.allTemplate?.characterBuilder?.basicInfo
                                ?.photo ||
                              item?.id?.allTemplate?.characterBlueprint?.photo ||
                              item?.id?.allTemplate?.freeform?.photo ||
                              userImage
                            }
                            relation={
                              item?.relationship ||'unknown'
                            }
                            icon="remove"
                            handleFunction={RemoveConnection}
                            handleUpdate={updateConnection}
                          />
                        </Disclosure.Panel>
                      );
                    })}
                  </section>
                </>
              )}
            </Disclosure>
            <h4 className="text-xl font-medium mb-3 px-2">Connect to</h4>
            <div className="flex flex-row items-center relative my-5 w-fit px-2">
              <input
                type="text"
                name="search"
                className="w-[260px] px-4 py-2 rounded-2xl border "
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Step 3: Handle search input change
              />
              <FiSearch className="absolute right-0 mx-3 text-lg" />
            </div>
            <section className="flex  gap-y-3 flex-wrap max-h-[250px] h-fit overflow-auto font-poppins">
              {filteredData
                ?.filter(
                  (item) =>
                    ![
                      ...currentData?.connections?.map((item) => item.id?._id),
                      currentData?.characterId?._id,
                    ].includes(item?._id),
                )
                .map((item, index) => {
                  return (
                    <div className="w-1/2 px-2">
                      <ConnectionCard
                        id={item?._id}
                        name={
                          item?.allTemplate?.characterBuilder?.basicInfo
                            ?.name ||
                          item?.allTemplate?.characterBlueprint
                            ?.characterName ||
                          item?.allTemplate?.freeform?.characterName ||
                          'unknown'
                        }
                        role={
                          item?.allTemplate?.characterBuilder?.characterStory
                            ?.roleInScreenPlay ||
                          item?.allTemplate?.characterBlueprint
                            ?.characterName ||
                          item?.allTemplate?.freeform?.characterName ||
                          'unknown'
                        }
                        image={
                          item?.allTemplate?.characterBuilder?.basicInfo
                            ?.photo ||
                          item?.allTemplate?.characterBlueprint?.photo ||
                          item?.allTemplate?.freeform?.photo ||
                          userImage
                        }
                        icon="add"
                        handleFunction={addConnection}
                      />
                    </div>
                  );
                })}
            </section>
            <div className="flex justify-end py-[12px]">
              <button
                type="reset"
                className="rounded-[16px] min-w-[160px] text-[#6A6A75] font-medium py-[18px] px-[14px] text-[16px] font-poppins mr-2 border-solid border-[1px] border-[#9999A0]"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                type="submit"
                className="max-w-[160px] py-[18px] font-poppins text-[16px] rounded-[16px] min-w-[160px] bg-[#653EFF] text-white px-0"
              >
                ok
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddRelationshipModal;

