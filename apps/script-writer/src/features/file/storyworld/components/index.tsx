// import { useParams } from "react-router-dom";
// import { getDraftLogline } from "utils/AiCoWriter"; 

import { useEffect, useState } from "react";
import WelcomeStoryWorld from "./WelcomeStoryWorld";
import StoryWorldEdit from "./StoryworldEdit";
import { useStoryWorldDropdown } from "../api/fetch-data";
import { useParams } from "react-router";

const Logline = () => {

  const { fileId } = useParams<{ fileId: string; }>();
  const { data, isLoading, error } = useStoryWorldDropdown(fileId || null);
  const [storyWordStatus, setStoryWordStatus] = useState('welcome')
  useEffect(() => {
    if (data?.data) {
      const {
        genre = [],
        subGenre = [], createdAt, createdBy, fileId, updatedAt, __v, _id,
        ...rest
      } = data.data;

      // Filter out fields that are either arrays with length > 0 or non-empty strings
      const extraContentExists = Object.entries(rest).some(([key, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'string') return value.trim() !== '';
        return value !== null && value !== undefined;
      });

      if (extraContentExists) {
        setStoryWordStatus('edit');
      } else {
        setStoryWordStatus('welcome');
      }
    }
  }, [data]);



  // const setDraftData =(id:string,data)=>{
  //   // setiniialData()
  //   console.log(data?.templateOptions);

  //   const template=templates?.Templates.find((tem)=>tem._id==id)
  //   console.log(template);

  //   const selectTemplate ={
  //       templateName: template.templateTitle,
  //            id: template._id,
  //            link: template._id,
  //            templateOptionTitle: template.templateOptionTitle,
  //            templateLogline:template.templateLogline,
  //            templateOptions: template.templateOptions,
  //            component :<LoglineTemplate templateData={template} isSidebar={true} initialData={data?.templateOptions}/>
  //   }
  //   setslectedLogline(selectTemplate||{});
  // }

  return (
    <div className="overflow-y-auto w-full">
      {storyWordStatus === 'welcome' ? (
        <WelcomeStoryWorld setStoryWordStatus={setStoryWordStatus} />
      ) : storyWordStatus === 'edit' ? (
        <StoryWorldEdit />
      ) :
        <></>
      }
    </div>
  );
};

export default Logline;
