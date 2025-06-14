import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SceneStudio from "./SceneStudio";
import ProactiveScene from "./ProactiveScene";
import ReactiveScene from "./ReactiveScene";
import comingsoon from '@/assets/coming-soon-image.svg';

const TemplateWrapper = ({ setTemplatesPopup }: { setTemplatesPopup?: (value: any) => void }) => {
  const [type,setType] = useState("scene-cards")
  const { fileId: fileIdParam, fileId: fileidParam } = useParams<{ fileId?: string }>();
  const fileId = (fileIdParam || fileidParam)?.toLowerCase();
  const [expandedTemplate, setExpandedTemplate] = useState(0) // To handle which template is expanded
  const [selectedSubTemplate, setSelectedSubTemplate] = useState<number | null>(null); // Track subtemplate selection
  const [templates, setTemplates] = useState<any>( [
    {
      templateName: "Scene Essentials",
      component: <SceneStudio />,
      link: "Scene-Essentials",
    },
   
  ]);
  const [formData, setFormData] = useState<any>({});
  const [plotTemplateName, setPlotTemplateName] = useState<any>("Scene Essentials");
  const [initialValues, setInitialValues] = useState<any>([]);



  const [openSubtemp, setOpenSubtemp] = useState<any>(false);



 
  const handleExpandTemplate = (templateIndex: number, link: any) => {
    setPlotTemplateName(link)
    
    
    console.log("templateIndex === expandedTemplate",templateIndex , expandedTemplate)
    if (templateIndex === expandedTemplate) {
   
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

  const handleSubTemplateSelection = (templateIndex: number, subTemplateIndex: number, subitem: any) => {
    console.log("clicked", templateIndex, subTemplateIndex);
    
    setExpandedTemplate(templateIndex);
    setSelectedSubTemplate(subTemplateIndex);
  };

  return (
    <>
   
       
   
          <div className="w-full  font-poppins">
          {/* <p className="text-[#252C34] text-[28px] font-bold mb-[24px] w-full">{type === 'characters' ? "Character Studio" : type !='plot' && "Logline Studio"}</p> */}
            <div className="flex flex-row items-start max-h-[calc(100vh-620px)] overflow-y-auto theme-studio-height">
            <div className="min-w-[221px] max-w-[221px] h-full bg-white overflow-y-auto pr-4">
              {templates.map((item: any, index: number) => (
                <div key={index} className="border-b-2 py-2">
                  <div
                    className={`py-3 pl-2 text-sm cursor-pointer rounded-[8px] font-normal 
                      ${expandedTemplate === index && type == "scene-cards" ? "bg-primary-purple" : ""} 
`}
                    onClick={() => handleExpandTemplate(index, item.link)}
                  >
                    {item.templateName}

                    <span className="float-end pr-4">{item?.subTemplate?.length > 0 ? ">" : ""}</span>
                  </div>
                  {expandedTemplate === index && openSubtemp && item?.subTemplate?.length > 0 && (
                    <div className="mt-2 py-1">
                      {item.subTemplate.map((subItem: any, subIndex: number) => (
                        <div
                          key={subIndex}
                          className={`py-4 pl-3 cursor-pointer rounded-lg font-normal ${selectedSubTemplate === subIndex ? "bg-primary-purple" : ""}`}
                          onClick={() => handleSubTemplateSelection(index, subIndex, subItem)}
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
                <div>
                  {selectedSubTemplate !== null
                    ? React.cloneElement(templates[expandedTemplate]?.subTemplate[selectedSubTemplate]?.component, {
                        setFormData,
                        formData,
                      })
                    : // (formData)
                      // templates[expandedTemplate]?.component
                      React.cloneElement(templates[expandedTemplate]?.component, {
                        initialValues,
                      })
                      // <LoglineTemplate id={""}/>
                      }
                </div>
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
              <Link
              className="py-[18px] px-[45px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
              to={`/file/${fileId}/scenecards/template/scene-essentials`}
              onClick={() => {
                if (setTemplatesPopup) {
                  setTemplatesPopup(false);
                }
              }}
            >
              Select and proceed to write
            </Link>
          </section>
       
    
    </>
  );
};

export default TemplateWrapper;
