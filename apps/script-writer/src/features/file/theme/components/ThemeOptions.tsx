import React, { useEffect, useState } from "react";
import { ThemeTemplate } from "./ThemeTemplate";
import { useThemeTemplate } from "../api/get-all-theme";
import comingsoon from '@/assets/coming-soon-image.svg';
import { useNavigate } from "react-router";
const ThemeOptions = ({
  setThemeStatus,
  setTemplatesPopup,
  setSelectedTheme,
  setInitialData,
}: any) => {
  const [templates, setTemplates] = useState<any>([]);
  const [selectedSubTemplate, setSelectedSubTemplate] = useState<number | null>(0);
  const [expandedTemplate, setExpandedTemplate] = useState<number | null>(0);
  const [openSubtemp, setOpenSubtemp] = useState<boolean>(false);

  const { data, isLoading, error } = useThemeTemplate();
  const navigate = useNavigate();
  
  useEffect(() => {
    const template = data?.Templates.map((template: any) => ({
      templateName: template.templateTitle,
      id: template._id,
      link: template._id,
      templateOptionTitle: template.templateOptionTitle,
      templateTheme: template.templateTheme,
      templateOptions: template.templateOptions,
      component: <ThemeTemplate templateData={template} isSidebar={false} />,
    }));

    setTemplates(template);
  }, [data]);

  const handleExpandTemplate = (templateIndex: number) => {
    
    if (templateIndex === expandedTemplate) {
      setOpenSubtemp(!openSubtemp);
    } else {
      setExpandedTemplate(templateIndex);
      setOpenSubtemp(true);
      const subTemplates = templates[templateIndex]?.subTemplate;
      setSelectedSubTemplate(subTemplates?.length ? 0 : null);
    }
  };

  const handleSubTemplateSelection = (templateIndex: number, subTemplateIndex: number) => {
    setExpandedTemplate(templateIndex);
    setSelectedSubTemplate(subTemplateIndex);
  };

  return (
    <>
      {templates && templates.length > 0 ? (
        <>
          <div className="w-full font-poppins">
            <p className="text-[#252C34] text-[24px] font-bold mb-[40px] w-full border-b border-[#E7EDF3] py-[15px]">
              Theme Studio
            </p>
            <div className="flex flex-row items-start max-h-[calc(100vh-620px)] overflow-y-auto theme-studio-height">
              <div className="min-w-[221px] max-w-[221px] h-full bg-white overflow-y-auto pr-4 sticky top-0">
                {templates.map((item: any, index: number) => (
                  <div key={index} className={`py-2`}>
                    <div
                      className={`py-3 pl-2 text-sm cursor-pointer rounded-[8px] font-normal 
                          ${expandedTemplate === index ? "bg-primary-purple" : ""} `}
                      onClick={() => handleExpandTemplate(index)}
                    >
                      {item.templateName}
                      <span className="float-end pr-4">
                        {item?.subTemplate?.length > 0 ? ">" : ""}
                      </span>
                    </div>
                    {expandedTemplate === index &&
                      openSubtemp &&
                      item?.subTemplate?.length > 0 && (
                        <div className="mt-2 py-1">
                          {item.subTemplate.map((subItem: any, subIndex: number) => (
                            <div
                              key={subIndex}
                              className={`py-3 pl-2 text-sm cursor-pointer rounded-[8px] font-normal ${
                                selectedSubTemplate === subIndex ? "bg-primary-purple" : ""
                              }`}
                              onClick={() => handleSubTemplateSelection(index, subIndex)}
                            >
                              {subItem.templateName}
                            </div>
                          ))}
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
                  <div>{templates[expandedTemplate]?.component}</div>
                )}
                {expandedTemplate === null && selectedSubTemplate === null && "No Template selected"}
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
                console.log(setInitialData,setThemeStatus,setSelectedTheme);
                
                setInitialData(templates[expandedTemplate || 0]);
                setThemeStatus && setThemeStatus("edit");
                setSelectedTheme && setSelectedTheme(templates[expandedTemplate || 0]);
                if (setTemplatesPopup) {
                  setTemplatesPopup(false);
                }
                const searchParams = new URLSearchParams(location.search);
    searchParams.set('new', 'true');
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

export default ThemeOptions;
