import React, { useEffect, useState } from 'react';
import BasicInformation from './basic-information';
import PhysicalCharacteristics from './physical-characteristics';
import PersonalityPsychology from './personality-psychology';
import Thecharacteryourstory from './the-character-your-story';
import SpiritualCharacteristics from './spiritual-characteristics';
import EmotionalCharacteristics from './emotional-characteristics';
import CharacterBlueprint from './character-blueprint';
import { useLocation, useNavigate } from 'react-router';
import comingsoon from '@/assets/coming-soon-image.svg';
// import { getAllLogLine } from 'utils/utils';
// import { CharacterTemplate } from './CharacterTemplate';
// import { useCharacterTemplate } from '../api/getAllCharacter';

const CharacterOptions = ({
  setCharacterStatus,
  setTemplatesPopup,
  setslectedCharacter,
  setiniialData
}: any) => {
  const [templates, setTemplates] = useState<any>([]);
  const [selectedSubTemplate, setSelectedSubTemplate] = useState<number | null>(
    0
  ); // Track subtemplate selection
    const [formData, setFormData] = useState<any>({});
  const [expandedTemplate, setExpandedTemplate] = useState<number | null>(0);
  const [openSubtemp, setOpenSubtemp] = useState<any>(false);
  const location = useLocation();
  const navigate = useNavigate();
//   const { data, isLoading, error } = useCharacterTemplate();
  
  useEffect(() => {
    // getAllLogLine().then((res)=>{
    
    //  const template=data?.Templates.map((template:any) => ({
    //    templateName: template.templateTitle,
    //    id: template._id,
    //    link: template._id,
    //    templateOptionTitle: template.templateOptionTitle,
    //    templateCharacter:template.templateCharacter,
    //    templateOptions: template.templateOptions,
    //    component :<CharacterTemplate templateData={template} isSidebar={true}/>
    //  }))
     setTemplates([ {
      templateName: "Character Builder",
      // component: <CharacterStudio />,
      link: "Character-Studio",
      subTemplate: [
        {
          templateName: "Basic Information",
          component: <BasicInformation />,
          link: "Basic-Information",
        },
        {
          templateName: "Physical Characteristics",
          component: <PhysicalCharacteristics />,
          link: "Physical-Characteristics",
        },
        {
          templateName: "Personality & Psychology",
          component: <PersonalityPsychology />,
          link: "Personality-Psychology",
        },
        {
          templateName: "Emotional Characteristics",
          component: <EmotionalCharacteristics />,
          link: "Emotional-Characteristics",
        },
        {
          templateName: "Spiritual Characteristics",
          component: <SpiritualCharacteristics />,
          link: "Spiritual-Characteristics",
        },
        {
          templateName: "The character & your story",
          component: <Thecharacteryourstory />,
          link: "The-Character-Your-Story",
        },
      ],
    },
    {
      templateName: "Character Blueprint",
      component: <CharacterBlueprint />,
      link: "Character-Blueprint",
    },]);
      //  })
  }, []);

  const handleExpandTemplate = (templateIndex: number) => {
    if (templateIndex === expandedTemplate) {
      // setExpandedTemplate(null);
      // setSelectedSubTemplate(null);
      // setExpandedTemplate(null);
      setOpenSubtemp(!openSubtemp);
    } else {
      setExpandedTemplate(templateIndex);
      setOpenSubtemp(true);
      const subTemplates = templates[templateIndex]?.subTemplate;
      if (subTemplates && subTemplates.length > 0) {
        setSelectedSubTemplate(0);
      } else {
        setSelectedSubTemplate(null);
      }
    }
  };

  const handleSubTemplateSelection = (
    templateIndex: number,
    subTemplateIndex: number,
    subitem: any,
  ) => {

    setExpandedTemplate(templateIndex);
    setSelectedSubTemplate(subTemplateIndex);
  };
  return (
    <>
      {templates && templates.length > 0 ? (
        <>
          <div className="w-full  font-poppins">
            <p className="text-[#252C34] text-[24px] font-bold mb-[40px] w-full border-b border-[#E7EDF3] py-[15px]">
              Character Studio
            </p>
            <div className="flex flex-row items-start max-h-[calc(100vh-620px)] overflow-y-auto character-studio-height">
              <div className="min-w-[221px] max-w-[221px] h-full bg-white overflow-y-auto pr-4 sticky top-0">
                {templates.map((item: any, index: number) => (
                  <div key={index} className={`py-1`}>
                    <div
                      className={`py-3 relative pl-2 text-sm cursor-pointer rounded-[8px] font-normal 
                          ${expandedTemplate === index ? 'bg-[#663EFF] text-white' : ''} `}
                      onClick={() => handleExpandTemplate(index)}
                    >
                      {item.templateName}

                      <span className={`${expandedTemplate === index ? 'transform rotate-90' : ''} absolute right-2 top-1/2 -translate-y-1/2 `}>
                        {item?.subTemplate?.length > 0 ? '>' : ''}
                      </span>
                    </div>
                    {expandedTemplate === index &&
                      openSubtemp &&
                      item?.subTemplate?.length > 0 && (
                        <div className="mt-2 py-1">
                          {item.subTemplate.map(
                            (subItem: any, subIndex: number) => (
                              <div
                                key={subIndex}
                                className={`py-3 pl-2 text-sm cursor-pointer rounded-[8px] font-normal 
                            ${selectedSubTemplate === subIndex ? 'bg-primary-purple' : ''}`}
                                onClick={() =>
                                  handleSubTemplateSelection(
                                    index,
                                    subIndex,
                                    subItem,
                                  )
                                }
                              >
                                {subItem.templateName}
                              </div>
                            ),
                          )}
                        </div>
                      )}
                  </div>
                ))}
                <div className="flex items-center gap-2 justify-start py-3 pl-2">
                  <p className="text-sm bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                    More Templates 
                  </p>
                 <img src={comingsoon} alt="" className='mt-2'/>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-10 overflow-y-auto px-4">
                {expandedTemplate !== null && (
                  <div>
                    {selectedSubTemplate !== null
                        ? React.cloneElement(templates[expandedTemplate]?.subTemplate[selectedSubTemplate]?.component, {
                            setFormData,
                            formData,
                            sidebar:true
                          })
                          : // (formData)
                          // templates[expandedTemplate]?.component
                          React.cloneElement(templates[expandedTemplate]?.component, {
                            sidebar:true
                            // initialValues,
                          })
                          // <CharacterTemplate id={""}/>
                          } 
                    {/* {templates[expandedTemplate]?.component} */}
                  </div>
                )}
                {expandedTemplate === null &&
                  selectedSubTemplate === null &&
                  'No Template selected'}
              </div>
            </div>
          </div>
          <section className="flex flex-row items-center mt-8 gap-x-4 justify-end pr-6">
            <button
              className="py-[18px] px-[74px] border border-solid border-[#9999A0] rounded-2xl text-[#9999A0]"
              onClick={() => {
                if (setTemplatesPopup) {
                  setTemplatesPopup(false);
                }
              }}
            >
              Cancel
            </button>
            <button
              className="py-[18px] px-[45px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
              onClick={() => {
                setCharacterStatus && setCharacterStatus('edit');
                setslectedCharacter &&
                  setslectedCharacter(templates[expandedTemplate || 0]);
                if (setTemplatesPopup) {
                  setTemplatesPopup(false);
                }
                const searchParams = new URLSearchParams(location.search);
    // searchParams.set('new', 'true');
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl);
              }}
            >
              Select and proceed to write
            </button>
          </section>
        </>
      ) : (
        <h2>No Template found</h2>
      )}
    </>
  );
};

export default CharacterOptions;
