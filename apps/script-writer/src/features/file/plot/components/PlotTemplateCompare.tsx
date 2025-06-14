import React,{useState,useEffect} from "react";
import { getPlotsByFile } from "../api/get-all-templates";
import { useParams } from "react-router";
import { toast } from "react-toastify";
interface PlotData {
  title: string;
  genre: string;
  selfRevelation: string;
  characterFoundation: string;
  incitingIncident: string;
  problemAndNeed: {
    centralIssue: string;
  };
  desire: {
    goalSetting: string;
  };
  allyOrAllies: {
    supportNetwork: string[];
  };
}

const PlotTemplateCompare: React.FC = () => {
  const { fileId } = useParams()
  const [allTemplates, setAllTemplates] = useState([]);
   useEffect(() => {
      if (!fileId) return;
      console.log("Fetching data for fileId:", fileId);
  
      const getPlots = async () => {
        try {
          const data = await getPlotsByFile(fileId);
          if (data) {
            setAllTemplates(data);
          }
        } catch (error) {
          toast.error("Failed to fetch templates");
        }
      };
  
      getPlots();
    }, [fileId ]);
  
  

  return (
    <div className=" mx-auto p-6">
      {/* Tabs */}
      <div className="flex gap-10 mb-6">
        <div>
          <h1 className="font-bold text-black ">Plot</h1>
        </div>
        <div className="flex gap-2">
          {/* <button className="px-4 py-1 bg-black text-white rounded-full text-sm">John Truby #22</button> */}
          {allTemplates.map((template) => (
            <button
              key={template}
              className="px-4 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200"
            >
              {template}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
     
    </div>
  );
};

export default PlotTemplateCompare;
