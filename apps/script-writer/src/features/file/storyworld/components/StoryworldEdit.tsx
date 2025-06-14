import { useEffect, useState } from "react";

// import { useAddStoryWorld, useFetchStoryWorldDropdown } from "hooks/ai-cowriter-hooks/useAiCowriter";
import { toast } from "react-toastify";
import CoreSelection from "./CoreSelection";
import Locationscontent from "./Locationscontent";
import { useParams } from "react-router";
import { useAddStoryWorld, useStoryWorldDropdown } from "../api/fetch-data";
import { enqueueSnackbar } from "notistack";
// import NarrativeStructure from "./NarrativeStructure";
// import NatureOfStory from "./NatureOfStory";
// import SettingAndTone from "./SettingAndTone";
// import TimeFrame from "./TimeFrame";

const StoryWorldEdit = () => {
  const [dropdownData , setDropdownData] = useState({});
//   const addStoryWorld = useAddStoryWorld();
  const [active, setActive] = useState(0);
 const { fileId } = useParams<{ fileId: string; }>();

 const { data, isLoading, isError:templateDataError, refetch  } = useStoryWorldDropdown(fileId ||"");


const addStoryWorldMutation = useAddStoryWorld();
const handleSaveData = (data:any) => {
  const { locations, createdAt,createdBy,updatedAt,__v,...updatedData } = data;

setDropdownData(updatedData);
  addStoryWorldMutation.mutate({
    fileId: fileId,
    ...updatedData 
  }, {
    onSuccess: () => {
      enqueueSnackbar('Story World added successfully!');
      // setName('');
      // setDescription('');
      
    },
    onError: (error) => {
      enqueueSnackbar('Error adding Story World');
    },
  });
  //   addStoryWorld({
        // payload: {
        //   fileId: fileId,
        //   ...data 
        // }
  //   }, {
  //     onSuccess: (res) => {
  //       console.log("Response:", res);
  //       // refetch()
  //       setDropdownData(res?.data?.data)
  //       toast.success("Successfully Added");
        
  //     },
  //     onError: (error) => {
  //       console.error("Error saving template:", error);
      
  //     }
  //   });
}

useEffect(() => {
  console.log(data?.data);
  
  if(data?.data){
    setDropdownData(data?.data)
  }
}, [data]);


  return (
    <div className="w-full p-10 min-h-full overflow-y-auto font-poppins">
      <section>
        <p className="text-[40px] font-bold mb-[16px]">Define Your Story World</p>
        {/* <p className="mt-1 font-light">A logline is the heart of your screenplay, distilled into a single, powerful sentence. It's your story's elevator pitch, capturing the essence of your narrative and hooking your audience in seconds.</p> */}
      </section>

      <div className="flex flex-row rounded-xl items-center py-2 px-[10px] bg-dark-gray w-max  gap-2">
        <button
          onClick={() => setActive(0)}
          className={
            `${active == 0 ? "bg-white text-primary-blue rounded-lg" : "bg-gray text-[#252C34]"}` +
            " py-[8px] px-[12px]  font-medium text-[16px] rounded-[8px] min-w-[180px]"
          }
        >
          Core Elements
        </button>
        <button
          onClick={() => setActive(1)}
      className={
            `${active == 1 ? "bg-white text-primary-blue rounded-lg" : "bg-gray text-[#252C34]"}` +
            " py-[8px] px-[12px]  font-medium text-[16px] rounded-[8px] min-w-[180px]"
          }
        >
          Key Locations
        </button>
      </div>
      <section className="flex flex-col gap-y-3 ">
        {active === 0 ? (
          // Genre Selection content
          <CoreSelection active={active} setActive={setActive} dropdownData={dropdownData} setDropdownData={setDropdownData} handleSaveData={handleSaveData}/>
        ) 
        : active === 1 ? (
            // Locations content
            <Locationscontent />
          ) 
          
        : (
          // Default content if no tab is active
          <section className="flex flex-col">
            <p className=" font-light">Please select a template to help speed up your process.</p>
          </section>
        )}
      </section>
    </div>
  );
};

export default StoryWorldEdit;
