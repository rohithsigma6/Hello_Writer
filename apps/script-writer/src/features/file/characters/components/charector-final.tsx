import React, { Fragment, useContext, useEffect, useState } from "react";

import userImage from '../../../../assets/default-user.png';
import relatioShip from '@/assets/character/relationship.svg'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
// import {

//   useFetchCharacters,
//   useFetchFinalizeTemplate,
//   useFetchTemplate,
// } from "hooks/ai-cowriter-hooks/useAiCowriter";
// import CharacterCard from "./CharacterCard";
import { Link, useNavigate, useParams } from "react-router";
// const templatesdata: any = ["Template 1", "Template 2", "Template 3", "Template 4"];


const CharectorFinal = ({ data, setCharacterStatus }: any) => {


  const [logline, setLogline] = useState("");

  const { fileId, type, templatename } = useParams<{
    fileId: string;
    type: string;
    templatename: string;
    id: any;
  }>();
  console.log(data);


  const [expandedSection, setExpandedSection] = useState(null);
  const [showDetails, setShowDetails] = useState(false);


  // Toggle the accordion section
  const toggleSection = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const [userData, setUserData] = useState<any>()
  const [accordionData, setAccordionData] = useState({})

  useEffect(() => {
    if (data) {
      if (data?.selectedTemplate == 'characterBuilder') {
        setUserData({
          name: data?.allTemplate?.characterBuilder?.basicInfo?.name,
          age: data?.allTemplate?.characterBuilder?.basicInfo?.age,
          photo: data?.allTemplate?.characterBuilder?.basicInfo?.photo,
          role: data?.allTemplate?.characterBuilder?.characterStory?.roleInScreenPlay,
        });
      } else if (data?.selectedTemplate == 'characterBlueprint') {
        setUserData({
          name: data?.allTemplate?.characterBlueprint?.characterName,
          age: data?.allTemplate?.characterBlueprint?.basicInfo?.age,
          photo: data?.allTemplate?.characterBlueprint?.photo,
          role: data?.allTemplate?.characterBlueprint?.characterStory?.roleInScreenPlay,
        });
      } else {
        setUserData({
          name: data?.allTemplate?.freeform?.characterName,
          photo: data?.allTemplate?.freeform?.photo,
        });
      }
      if (data?.allTemplate?.characterBuilder) {
        setAccordionData(data?.allTemplate?.characterBuilder)
      } else if (data?.allTemplate?.freeform) {

        const { freeform, ...result } = data?.allTemplate
        setAccordionData({ freeform })
      }
      else {
        const { characterBlueprint, ...result } = data?.allTemplate
        setAccordionData({ characterBlueprint })
      }
    }


  }, [data])
  const navigate = useNavigate();
  const handleButtonClick = (link: string) => {
    if (link) navigate(link);
  };


  return (
    <div className="w-full p-10 min-h-full overflow-hidden">
      <div className="bg-white rounded-[24px] w-full p-8 font-poppins h-[calc(100vh-150px)] overflow-y-auto">
        <section
          className={`overflow-auto`}
        >
          <div className="flex justify-between">
            <p className="text-3xl font-bold "> Characters</p>
            <button className="flex w-52 h-10 gap-2 border rounded-3xl items-center p-4" onClick={() => handleButtonClick(`/file/${fileId}/characters/relationship?charId=${data?._id}`)}                             ><img src={relatioShip} alt="relation" className="h-5" /> <span className="flex">Relationship Map</span> </button>
          </div>
          {(
            data && (
              <div className="p-2  overflow-auto custom-scrollbar">
                <div className="bg-white border border-[rgba(0,0,0,0.1)] p-6 rounded-lg flex items-center gap-6">
                  <img
                    src={userData?.photo || userImage}
                    alt="Character"
                    className="w-24 h-24  object-cover"
                  />
                  <div>
                    <h2 className="text-gray-600 ">Character name</h2>
                    <p className="text-xl font-bold">{userData?.name}</p>
                    <h2 className="text-gray-600 ">Role in the story</h2>

                    <p className="text-indigo-500 font-semibold">{userData?.role}</p>
                  </div>
                  <div className="ml-auto flex gap-4">
                    <Link
                      className="px-16 py-3 text-white rounded-lg bg-primary-blue border border-gray-300 "
                      to={`/file/${fileId}/characters`}
                    >
                      Rewrite
                    </Link>
                    <div
                      className="px-16 py-3 rounded-lg bg-violet-300 hover:bg-violet-200 font-medium text-violet-600"
                      onClick={() => { data?.allTemplate?.freeform ? setCharacterStatus('initialize') : setCharacterStatus('edit') }}
                    // to={`/file/${fileId}/${type}/template/${data?.data?.data?.slug}?id=${data?.data?.data?._id}&writeFreely=${data?.data?.data?.writeFreely}`}
                    >
                      Edit
                    </div>


                  </div>
                </div>
                <div className="mt-6">
                  {
                    data?.allTemplate &&

                    Object.entries(accordionData).map(([sectionKey, sectionData]: any) => (
                      <Accordion
                        key={sectionKey}
                        title={formatKey(sectionKey)}
                        expanded={expandedSection === sectionKey}
                        onClick={() => toggleSection(sectionKey)}
                      >
                        {expandedSection === sectionKey && (
                          <div className="bg-white shadow-sm p-6 rounded-lg">
                            {Object.entries(sectionData)?.map(([key, value]: any) => key !== "photo" && (
                              <div key={key} className="mb-4">
                                <span className="text-sm font-semibold text-gray-700">{formatKey(key)} :</span>
                                <span className="text-gray-800">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </Accordion>

                    ))
                  }

                </div>
              </div>
            )
          )}

        </section>
      </div>
    </div>
  );
};

export default CharectorFinal;

const formatKey = (key: any) => {
  // Remove underscores and prefixes like 'basicword_', 'family_', and capitalize words
  return key
    .replace(/(basicword_|family_|personality_|physicalchar_)/g, "")
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str: any) => str.toUpperCase());
};

const Accordion = ({ title, expanded, onClick, children }: any) => {
  return (
    <div className="mb-4 border border-gray-300 rounded-3xl">
      <div className="flex items-center pr-3">
        <button
          className={`w-full text-left p-4 text-lg font-medium rounded-lg`}
          onClick={onClick}
        >
          {title}

        </button>
        {expanded ? <FaAngleUp /> : <FaAngleDown />}
      </div>

      {expanded && <div>{children}</div>}
    </div>
  );
};
