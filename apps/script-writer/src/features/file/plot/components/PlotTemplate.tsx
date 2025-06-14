import React, { useState } from "react";
import { templateData } from "./data/data"
import { HiOutlineCube } from "react-icons/hi";

interface PlotTemplatesProps {
  selectedTemplate: string;
}
const PlotTemplates: React.FC<PlotTemplatesProps> = ({ selectedTemplate }) => {
  const [expandedAct, setExpandedAct] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: number | null }>({});

  const toggleAct = (title: string) => {
    setExpandedAct((prev) => (prev === title ? null : title));
    setExpandedItems({});
  };

  const toggleItem = (actTitle: string, index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [actTitle]: prev[actTitle] === index ? null : index,
    }));
  };
  const selectedTemplateData = templateData.find((template) => template.type === selectedTemplate.toLowerCase());

  return (
    <div className="max-w-xl mx-auto ">
      {selectedTemplateData ? (
        selectedTemplateData.template.map((act) => (
          <div key={act.title} className="mb-6">
            {/* Collapsible Header */}
            <div
              className="mb-3 p-4 rounded-lg cursor-pointer flex justify-between items-center border border-gray-300"
              onClick={() => toggleAct(act.title)}
            >
              <h2 className="font-bold text-[12px] text-[#212131]">{act.title}</h2>
              <span className="text-gray-500">{expandedAct === act.title ? "-" : "+"}</span>
            </div>

            {/* Collapsible Content */}
            {expandedAct === act.title && (
              <div className="bg-white">
                <ul>
                  {act.content.map((item, index) => (
                    <li
                      key={index}
                      className="p-4 mb-3 rounded-lg border bg-[#E7EDF3] border-gray-300 flex flex-col cursor-pointer"
                      onClick={() => toggleItem(act.title, index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 bg-gray-200 p-2 rounded-full">
                            <HiOutlineCube style={{ color: "gray" }} />
                          </div>
                          <span className="font-medium text-[12px] text-[#212131]">{item.title}</span>
                        </div>
                      </div>
                      {expandedItems[act.title] === index && item.description && (
                        <p className="text-gray-500 mt-2 text-[12px]">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No template found for "{selectedTemplate}".</p>
      )}
    </div>
  );
};

export default PlotTemplates;
