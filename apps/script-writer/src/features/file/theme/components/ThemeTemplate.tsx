import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

export function ThemeTemplate({
  generateData,
  finalize,
  onFinalizeComplete,
  setData,
  data,
  status,
  clear,
  setClear,
  templateData,
  isSidebar = false,
  initialData,
}: any) {
  const [state, setState] = useState({
    themeText: '',
    Hero: '',
    WHAT: '',
    Goal: '',
    Opposition: '',
    Stakes: '',
    WHY: '',
  });

  const { fileId, type, templatename } = useParams<{
    fileId: string;
    type: string;
    templatename: string;
  }>();

  const [isEditing, setIsEditing] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [dynamicThemes, setDynamicThemes] = useState<string[]>([]);
  const [id, setId] = useState();

  // useEffect(() => {
  //   if (setFormData) {
  //     setFormData({
  //       fileId,
  //       templateId: templateData?._id,
  //       templateOptions: templateData?.templateOptions,
  //     });
  //   }
  // }, [templateData]);

  // useEffect(() => {
  //   if (clear) {
  //     setState({
  //       themeText: '',
  //       Hero: '',
  //       WHAT: '',
  //       Goal: '',
  //       Opposition: '',
  //       Stakes: '',
  //       WHY: '',
  //     });
  //     setClear(false);
  //   }
  // }, [clear]);

  // useEffect(() => {
  //   if (generateData?.data) {
  //     setState({
  //       themeText:
  //         `${generateData.data.Hero} must ${generateData.data.WHAT} to achieve ${generateData.data.Goal} while facing ${generateData.data.Opposition} or risk ${generateData.data.Stakes}, ultimately leading to ${generateData.data.WHY}.` ||
  //         '',
  //       Hero: generateData.data.Hero || '',
  //       WHAT: generateData.data.WHAT || '',
  //       Goal: generateData.data.Goal || '',
  //       Opposition: generateData.data.Opposition || '',
  //       Stakes: generateData.data.Stakes || '',
  //       WHY: generateData.data.WHY || '',
  //     });
  //   }
  // }, [generateData]);

  // useEffect(() => {
  //   if (finalize) {
  //     validateFields();
  //   }
  // }, [finalize, initialData]);

  // useEffect(() => {
  //   updateThemes();
  // }, [answers]);

  const updateThemes = () => {
    const replacements: Record<string, string> = {
      "{world of story}": answers["World of Story"] || "{world of story}",
      "{Goal}": answers["Goal"] || "{Goal}",
      "{Method}": answers["Method"] || "{Method}",
      "{Opposition}": answers["Opposition"] || "{Opposition}",
      "{Stakes}": answers["Stakes"] || "{Stakes}",
      "{I.I}": answers["Inciting Incident"] || "{I.I}",
      "{Hero}": `${answers["Part - 2"] || ""} ${answers["Part - 1"] || "{Hero}"}`.trim(),
    };

    const updatedThemes = templateData.templateTheme?.map((theme: string) => {
      let updatedTheme = theme;
      Object.entries(replacements).forEach(([key, value]) => {
        updatedTheme = updatedTheme.split(key).join(value); // Replace all occurrences
      });
      return updatedTheme;
    });

    setDynamicThemes(updatedThemes);
  };

  const validateFields = () => {
    submitForm();
  };

  const submitForm = () => {
    console.log('Submitting form data:', state);

    // Add the template submission logic here
    onFinalizeComplete();
  };

  const handleInputChange = (question: string, value: string) => {
    setFormData &&
      setFormData((prevState: any) => {
        const updatedOptions = prevState?.templateOptions?.map((option: any) => {
          if (option.que === question) {
            const { queDescription, _id, ...rest } = option;
            return { ...rest, ans: value };
          }
          return option;
        });

        return {
          ...prevState,
          templateOptions: updatedOptions,
          finalTheme: dynamicThemes,
        };
      });

    setAnswers((prev: any) => ({ ...prev, [question]: value }));
  };

  // useEffect(() => {
  //   if (initialData) {
  //     const initialFormData = Object.fromEntries(
  //       initialData?.map(({ que, ans }) => [que, ans])
  //     );

  //     setState({
  //       themeText: "",
  //       Hero: `${initialFormData["Part - 2"] || ""} ${initialFormData["Part - 1"] || ""}`.trim(),
  //       WHAT: initialFormData["Method"] || "",
  //       Goal: initialFormData["Goal"] || "",
  //       Opposition: initialFormData["Opposition"] || "",
  //       Stakes: initialFormData["Stakes"] || "",
  //       WHY: "",
  //     });

  //     setAnswers(initialFormData);

  //     setFormData((prevState: any) => ({
  //       ...prevState,
  //       templateOptions: initialData?.map(({ que, ans }) => ({
  //         que,
  //         ans,
  //       })),
  //       finalTheme: dynamicThemes,
  //     }));

  //     updateThemes();
  //   }
  // }, [initialData]);

  ///////////
   
    const [formData, setFormData] = useState({
      coreMessage: "",
      subjectMatter: [""],
      exploration: "",
      relevance: "",
      symbols: [""],
      scenes: [""],
      characters: [{ name: "", type: "", startingPoint: "", resolution: "", keyDecisions: [""] }],
      conflicts: { internal: "", external: "", resolution: "" },
      motifs: [""],
      quotes: [""],
      influences: { films: "", books: "", realLifeEvents: "" },
      audienceTakeaway: "",
      subThemes: [""]
    });

  useEffect(() => {
    if (initialData) {
      console.log("iii".initialData);
      
      const updatedFormData = {
        coreMessage: initialData.find(item => item.que === "Core Message")?.ans[0] || "",
        subjectMatter: initialData.find(item => item.que === "Subject Matter")?.ans || [""],
        exploration: initialData.find(item => item.que === "Exploration of Subject")?.ans[0] || "",
        relevance: initialData.find(item => item.que === "Universal Relevance")?.ans[0] || "",
        symbols: initialData.find(item => item.que === "Symbolism")?.ans || [""], 
        vice: initialData.find(item => item.que === "Vice")?.ans[0] ||"", 
        defeat: initialData.find(item => item.que === "Defeat")?.ans[0] || "", 
        virtue: initialData.find(item => item.que === "Virtue")?.ans[0] || "", 
        success: initialData.find(item => item.que === "Success")?.ans[0] || "", 
        characters: initialData.find(item => item.que === "Character Arcs")?.ans.map(char => ({
          name: char?.name || "",
          type: char?.type || "",
          startingPoint: char?.startingPoint || "",
          resolution: char?.resolution || "",
          keyDecisions: char?.keyDecisions || [""]
        })) || [{ name: "", type: "", startingPoint: "", resolution: "", keyDecisions: [""] }],
        conflicts: {
          internal: initialData.find(item => item.que === "Conflicts and Resolutions")?.ans[0] || "",
          external: initialData.find(item => item.que === "Conflicts and Resolutions")?.ans[1] || "",
          resolution: initialData.find(item => item.que === "Conflicts and Resolutions")?.ans[2] || ""
        },
        motifs: initialData.find(item => item.que === "Motifs")?.ans || [""],
        quotes: initialData.find(item => item.que === "Quotes/Dialogue")?.ans || [""],
        influences: {
          films: initialData.find(item => item.que === "Influences & Inspirations")?.ans[0] || "",
          books: initialData.find(item => item.que === "Influences & Inspirations")?.ans[1] || "",
          realLifeEvents: initialData.find(item => item.que === "Influences & Inspirations")?.ans[2] || ""
        },
        audienceTakeaway: initialData.find(item => item.que === "Desired Audience Takeaway")?.ans[0] || "",
        subThemes: initialData.find(item => item.que === "Potential Variations or Sub-themes")?.ans || [""]
      };
      setFormData(updatedFormData);
    }
  }, [initialData]);
  
    // Handle change for different fields
    const handleChange = (field, index = null, subField = null) => (e) => {
      setFormData((prev) => {
        if (index !== null && subField) {
          const updatedArray = Array.isArray(prev[field]) ? [...prev[field]] : [];
          updatedArray[index] = { ...updatedArray[index], [subField]: e.target.value };
          return { ...prev, [field]: updatedArray };
        } else if (index !== null) {
          const updatedArray = Array.isArray(prev[field]) ? [...prev[field]] : [];
          updatedArray[index] = e.target.value;
          return { ...prev, [field]: updatedArray };
        } else {
          return { ...prev, [field]: [e.target.value] };
        }
      });
    };
    const handleChangeConflict = (field, index = null, subField = null) => (e) => {      
      setFormData((prev) => {      
        return {...prev,[field]:{...prev[field],[subField]:e.target.value}}
      });
    };
  
    // Add a new field to the array (for subjectMatter, symbols, scenes, etc.)
    const addField = (field, defaultValue) => {
      setFormData((prev) => {
        const updatedArray = Array.isArray(prev[field]) ? [...prev[field], defaultValue] : [defaultValue];
        return { ...prev, [field]: updatedArray };
      });
    };
  
    useEffect(() => {
      if(setData){
        setData({fileId:fileId,templateId:  templateData?._id,templateOptions:transformFormData(formData)})
      }
    }, [formData])
    
    // Transform form data to the desired structure
    const transformFormData = (formData) => {
      console.log("6",formData);
      
      return [
        { que: "Vice", ans: formData?.vice || "" },
        { que: "Defeat", ans: formData?.defeat || "" },
        { que: "Virtue", ans: formData?.virtue || "" },
        { que: "Success", ans: formData?.success || "" },
        { que: "Core Message", ans: formData?.coreMessage || "" },
        { que: "Subject Matter", ans: formData?.subjectMatter || [] },
        { que: "Exploration of Subject", ans: formData?.exploration || "" },
        { que: "Universal Relevance", ans: formData?.relevance || "" },
        { que: "Symbolism", ans: formData?.symbols || [] },
        { que: "Conflicts and Resolutions", ans: [
          formData?.conflicts?.internal || "",
          formData?.conflicts?.external || "",
          formData?.conflicts?.resolution || ""
        ]},
        { que: "Influences & Inspirations", ans: [
          formData?.influences?.films || "",
          formData?.influences?.books || "",
          formData?.influences?.realLifeEvents || ""
        ]},
        { que: "Motifs", ans: formData?.motifs || [] },
        { que: "Quotes/Dialogue", ans: formData?.quotes || [] },
        { que: "Desired Audience Takeaway", ans: formData?.audienceTakeaway || "" },
        { que: "Potential Variations or Sub-themes", ans: formData?.subThemes || [] },
      ];
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      const transformedData = transformFormData(formData);
      console.log("Transformed Form Data:", transformedData);
      // Now, transformedData is the array format you wanted
    };
  
    return (
      <div className="w-full rounded-2xl-lg flex flex-col font-poppins">
        <p className="text-lg font-bold">Template Title</p>
        <form onSubmit={handleSubmit} className="p-6 w-full">
          <h1 className="text-2xl font-bold mb-8 text-center text-[#212131">Your Story's Moral Premise</h1>
          <label className="block font-semibold pb-4 text-[16px] text-[#212131]">The Moral Premise Formula</label>
          <div className="flex items-center gap-4 mb-8 justify-between">
          
         

              <input 
              disabled={isSidebar}
                className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] text-sm max-w-[167px]" 
                placeholder="Vice" 
                value={formData.vice} 
                onChange={handleChange("vice")} 
              />
              
              <span className="block font-semibold text-[16px] text-[#212131]">Leads to</span>

              <input 
               disabled={isSidebar}
                className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] text-sm max-w-[167px]" 
                placeholder="Defeat" 
                value={formData.defeat} 
                onChange={handleChange("defeat")} 
              />
         

            <span className="block font-semibold text-[16px] text-[#212131]">But</span>

              <input 
               disabled={isSidebar}
                className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] text-sm max-w-[167px]" 
                placeholder="Virtue" 
                value={formData.virtue} 
                onChange={handleChange("virtue")} 
              />

              <span className="block font-semibold text-[16px] text-[#212131]">Leads to</span>

              <input 
               disabled={isSidebar}
                className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] text-sm max-w-[167px]" 
                placeholder="Success" 
                value={formData.success} 
                onChange={handleChange("success")} 
              />
          
          </div>
  
          <div className="mb-8 ">
            <label className="block font-semibold pb-4 text-[16px] text-[#212131]">1. Core Message</label>
          
<textarea   disabled={isSidebar}
              className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
              placeholder="Explore the subject matter in more depth." 
              value={formData.coreMessage} 
              onChange={handleChange("coreMessage")}  
            />
          </div>
  
          {["subjectMatter"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block font-semibold text-[16px] text-[#212131]">2. {field}</label>
              <div className='flex items-center gap-4 my-4'> 
              <button type="button" className="px-4 py-3 bg-white text-[#252C34] rounded-2xl border border-[#BABABF] text-base font-medium"  onClick={() => addField(field, "Love")}  >Love</button>
              <button type="button" className="px-4 py-3 bg-white text-[#252C34] rounded-2xl border border-[#BABABF] text-base font-medium"   onClick={() => addField(field, "War")} >War</button>
              <button type="button" className="px-4 py-3 bg-white text-[#252C34] rounded-2xl border border-[#BABABF] text-base font-medium"   onClick={() => addField(field, "Betrayal")} >Betrayal</button>
              <button type="button" className="px-4 py-3 bg-white text-[#252C34] rounded-2xl border border-[#BABABF] text-base font-medium"   onClick={() => addField(field, "Freedom")} >Freedom</button>
              <button type="button" onClick={() => addField(field, "")} className="px-4 py-3 bg-white text-[#252C34] rounded-2xl border border-[#BABABF] text-base font-medium">+ Add {field}</button>
              </div>
              
              {formData[field]?.map((item, index) => (
                // <input  disabled={isSidebar}
                //   key={index}
                //   type="text"
                //   className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm mb-4"
                //   value={item}
                //   placeholder='Freedom vs. Confinement'
                //   onChange={handleChange(field, index)}
                // />
                <textarea   disabled={isSidebar} key={index}
                className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
                placeholder="Freedom vs. Confinement" 
                value={item}
                onChange={handleChange(field, index)}
              />
              ))}
         
            </div>
          ))}
  
          <div className="mb-8 ">
            <label className="block font-semibold pb-4 text-[16px] text-[#212131]">3. Exploration of Subject</label>
            <textarea   disabled={isSidebar}
              className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
              placeholder="Explore the subject matter in more depth." 
              value={formData.exploration} 
              onChange={handleChange("exploration")} 
            />
          </div>
  
          <div className="mb-8 ">
            <label className="block font-semibold pb-4 text-[16px] text-[#212131]">4. Universal Relevance</label>
            <textarea 
              className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
              placeholder="Why is this theme relevant to a wide audience?" 
              value={formData.relevance} 
              onChange={handleChange("relevance")} 
            />
          </div>
          {["symbols"].map((field) => (
            <div key={field} className="mb-8 ">
              <label className="block font-semibold pb-4 text-[16px] text-[#212131]">5. {field}</label>
              {formData[field]?.map((item, index) => (
              

                <textarea disabled={isSidebar}
                key={index}
                className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
                placeholder="(Are there specific symbols in your screenplay that represent or reflect your theme? For example, a ' bird ' could symbolize freedom or captivity, depending on the context.)" 
                value={item}
                onChange={handleChange(field, index)}
              />
              ))}
              <button type="button" onClick={() => addField(field, "")} className="px-4 py-3 bg-white text-[#252C34] rounded-2xl text-base font-medium">+ Add {field}</button>
            </div>
          ))}
          
          {/* <div className="mb-8 ">
            <label className="block font-semibold pb-4">Character Arcs</label>
            {formData.characters.map((char, index) => (
              <div key={index} className="mb-8 ">
                <input 
                  type="text" 
                  className="border p-2 rounded-2xl w-full mb-2" 
                  placeholder="Character name" 
                  value={char.name} 
                  onChange={handleChange("characters", index, "name")} 
                />
                <input 
                  type="text" 
                  className="border p-2 rounded-2xl w-full mb-2" 
                  placeholder="Character type" 
                  value={char.type} 
                  onChange={handleChange("characters", index, "type")} 
                />
                <input 
                  type="text" 
                  className="border p-2 rounded-2xl w-full mb-2" 
                  placeholder="Starting Point" 
                  value={char.startingPoint} 
                  onChange={handleChange("characters", index, "startingPoint")} 
                />
                <input 
                  type="text" 
                  className="border p-2 rounded-2xl w-full mb-2" 
                  placeholder="Resolution" 
                  value={char.resolution} 
                  onChange={handleChange("characters", index, "resolution")} 
                />
              </div>
            ))}
            <button type="button" onClick={() => addField("characters", { name: "", type: "", startingPoint: "", resolution: "", keyDecisions: [""] })} className="mt-2 text-blue-500">+ Add Character</button>
          </div> */}
  
            <label className="block font-semibold pb-4 text-[16px] text-[#212131]">8. Conflicts and Resolutions</label>
          <div className="mb-8 border p-4 rounded-2xl">
            <input 
              type="text" 
              className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm mb-4" 
              placeholder="Internal Conflict" 
              value={formData.conflicts.internal} 
              onChange={handleChangeConflict("conflicts", null, "internal")} 
            />
            <input 
              type="text" 
              className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm mb-4" 
              placeholder="External Conflict" 
              value={formData.conflicts.external} 
              onChange={handleChangeConflict("conflicts", null, "external")} 
            />
            <input 
              type="text" 
              className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
              placeholder="Resolution" 
              value={formData.conflicts.resolution} 
              onChange={handleChangeConflict("conflicts", null, "resolution")} 
            />
          </div>
          {[  "motifs"].map((field) => (
            <div key={field} className="mb-8 ">
              <label className="block font-semibold pb-4 text-[16px] text-[#212131]">9. {field}</label>
              {formData[field]?.map((item, index) => (
                // <input  disabled={isSidebar}
                //   key={index}
                //   placeholder='(Specify the value or principle that is illuminated through the comparison. E.g., "True happiness.")'
                //   type="text"
                //   className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm"
                //   value={item}
                //   onChange={handleChange(field, index)}
                // />
                <textarea disabled={isSidebar}
                key={index}
                className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
                placeholder='(Specify the value or principle that is illuminated through the comparison. E.g., "True happiness.")'
                value={item}
                onChange={handleChange(field, index)}
              />
              ))}
              <button type="button" onClick={() => addField(field, "")} className="px-4 py-3 bg-white text-[#252C34] rounded-2xl text-base font-medium">+ Add {field}</button>
            </div>
          ))}
            {["quotes"].map((field) => (
            <div key={field} className="mb-8 ">
              <label className="block font-semibold pb-4 text-[16px] text-[#212131]">10. Quotes/Dialogue</label>
              {formData[field]?.map((item, index) => (
                <textarea disabled={isSidebar}
                key={index}
                className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
                  placeholder='(Are there specific lines of dialogue that encapsulate or highlight the theme?)'
                value={item}
                onChange={handleChange(field, index)}
              />
              ))}
              <button type="button" onClick={() => addField(field, "")} className="px-4 py-3 bg-white text-[#252C34] rounded-2xl text-base font-medium">+ Add {field}</button>
            </div>
          ))}

<label className="block font-semibold pb-4 text-[16px] text-[#212131]">11. Influences & Inspirations</label>
          <div className="mb-8 border p-4 rounded-2xl">
            <input  disabled={isSidebar}
              type="text" 
              className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm mb-4" 
              placeholder="Films" 
              value={formData.influences.films} 
              onChange={handleChangeConflict("influences", null, "films")} 
            />
            <input  disabled={isSidebar}
              type="text" 
              className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm mb-4" 
              placeholder="Books" 
              value={formData.influences.books} 
              onChange={handleChangeConflict("influences", null, "books")} 
            />
            <input  disabled={isSidebar}
              type="text" 
              className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
              placeholder="Real-life events" 
              value={formData.influences.realLifeEvents} 
              onChange={handleChangeConflict("influences", null, "realLifeEvents")} 
            />
          </div>
          <div className="mb-8 ">
            <label className="block font-semibold pb-4 text-[16px] text-[#212131]">12. Desired Audience Takeaway</label>
            {/* <input 
              type="text" 
              placeholder="True freedom is not about escaping boundaries but learning to break the ones we create for ourselves." 
              className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
              value={formData.audienceTakeaway} 
              onChange={handleChange("audienceTakeaway")} 
            /> */}

<textarea disabled={isSidebar}
              
                className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
                placeholder="True freedom is not about escaping boundaries but learning to break the ones we create for ourselves." 
                  value={formData.audienceTakeaway} 
                  onChange={handleChange("audienceTakeaway")} 
              />
          </div>

          {["subThemes"].map((field) => (
            <div key={field} className="mb-8 ">
              <label className="block font-semibold pb-4 text-[16px] text-[#212131]">13. Potential Variations or Sub-themes</label>
              {formData[field]?.map((item, index) => (
                // <input
                //   key={index}
                //   type="text"
                //   className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm"
                //   value={item}
                //   placeholder='(Are there secondary themes or variations of the primary theme you wish to explore in subplots or through secondary characters?)'
                //   onChange={handleChange(field, index)}
                // />

                <textarea disabled={isSidebar}
                key={index}
                className="p-4 bg-white text-black rounded-2xl border border-[#BABABF] w-full text-sm" 
                 placeholder='(Are there secondary themes or variations of the primary theme you wish to explore in subplots or through secondary characters?)'
                value={item}
                onChange={handleChange(field, index)}
              />
              ))}
              <button type="button" onClick={() => addField(field, "")} className="px-4 py-3 bg-white text-[#252C34] rounded-2xl text-base font-medium">+ Add {field}</button>
            </div>
          ))}
          {/* <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-2xl">Submit</button> */}
        </form>
      </div>
    );
  };
  