import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getAllTemplates } from "../api/get-all-templates";
import { FaChevronDown, FaChevronUp, FaCube, FaCubes } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import cubeplot from "@/assets/cube-plot.svg"

interface PredefinedBeat {
  title: string;
  description: string;
}

interface Template {
  title: string;
  predefinedBeat: PredefinedBeat[];
}

interface PlotType {
  _id: string;
  type: string;
  template: Template[];
}
const TemplateWrapper = ({ setTemplatesPopup }: { setTemplatesPopup?: (value: any) => void }) => {
  const [type, setType] = useState("scene-cards")
  const { fileId: fileIdParam, fileId: fileidParam } = useParams<{ fileId?: string }>();
  const fileId = (fileIdParam || fileidParam)?.toLowerCase();
  const [data, setData] = useState<PlotType[]>([]);
  const [selectedType, setSelectedType] = useState<PlotType | null>(null);
  const [expandedActs, setExpandedActs] = useState({});
  const navigate = useNavigate()
  const [allTemplates, setAllTemplates] = useState<PlotType[]>([]);


  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getAllTemplates();
        const templates = response.data
        console.log("getAllTemplates", templates);
        setAllTemplates(templates);

        if (templates.length > 0) {
          setSelectedType(templates[0]);

          // Expand all acts for all templates
          const initialState = templates.reduce((acc, template) => {
            template.template.forEach((act) => {
              acc[act.title] = true;
            });
            return acc;
          }, {});

          setExpandedActs(initialState);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleProceed = () => {
    // setSelectedType(decodeURIComponent(template))
    if (selectedType) {
      navigate(`/file/${fileId}/plot/template/${selectedType.type}`);
    } else {
      alert("Please select a template before proceeding.");
    }
  };
  const toggleAct = (title: any) => {
    setExpandedActs((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="w-full font-poppins ">
      <div className="flex flex-row items-start max-h-[calc(100vh-645px)] overflow-y-auto">

        <div className="min-w-[221px] max-w-[221px] h-full bg-white pr-4 sticky top-0 overflow-y-auto max-h-[calc(100vh-620px)] pb-[30px]">
          {allTemplates?.map((item) => (
            <div key={item._id}>
              <div
                className={`py-3 pl-2 text-sm cursor-pointer rounded-[8px] font-normal ${selectedType?._id === item._id
                  ? "bg-purple-100"
                  : "hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedType(item)}
              >
                {item.type}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-gray-50 px-6 h-full overflow-y-auto ">
          {selectedType ? (
            <div>
              {selectedType.template.map((act) => (
                <div key={act.title} className="mb-4 w-full m-auto">

                  <div
                    className="flex flex-row-reverse justify-end gap-2 items-center bg-white py-[18px] px-[10px]  cursor-pointer border border-gray-300 rounded-[6px]"
                    onClick={() => toggleAct(act.title)}
                  >
                    <h3 className="text-[#212131] text-[12px] font-bold">{act.title}</h3>
                    <span className="text-[#212131] text-[12px]">
                      {expandedActs[act.title] ? <FaChevronDown /> : <FaChevronRight />}
                    </span>
                  </div>


                  {expandedActs[act.title] && (
                    <div className="mt-4 rounded-lg ">
                      {act.predefinedBeat.map((beat) => (
                        <div key={beat.title} className="p-[10px] bg-[#E7EDF3] rounded-[6px] mb-2 border border-[#0000001e]">
                          <h4 className="text-sm  flex items-center gap-1">
                            <span className="text-gray-600">
                              <img src={cubeplot} alt="" />
                            </span>
                            <span className="text-[#212131] text-[12px] font-normal">{beat.title}</span>
                          </h4>
                          {beat.description && (
                            <p className="text-[#212131] text-[12px] font-normal mt-2 px-[10px] border-t border-[#00000039] pt-[10px]">{beat.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">Select a template to view details</p>
          )}
        </div>
      </div>


      <section className="flex flex-row items-center mt-6 gap-x-4 justify-end pr-6">
        <button className="py-[18px] px-[74px] border border-solid border-[#9999A0] rounded-2xl text-[#9999A0]">
          Cancel
        </button>
        <button
          className="py-[18px] px-[45px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]"
          onClick={handleProceed}
        >
          Select and Proceed to Write
        </button>
      </section>
    </div>
  );

};

export default TemplateWrapper;
