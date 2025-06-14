import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
// import { ReactComponent as QuestionMarkLogo } from '../../../assets/logline/questionmarklogo.svg';
// import { useAddTemplate, useFetchTemplate } from "hooks/ai-cowriter-hooks/useAiCowriter";
// import { useParams, useSearchParams } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import { getAllLogLine } from 'utils/utils';

export function LoglineTemplate({
  generateData,
  finalize,
  onFinalizeComplete,
  setFormData,
  formData,
  status,
  clear,
  setClear,
  templateData,
  isSidebar = false,
  initialData,
  loglineStatus
}: any) {
  const [state, setState] = useState({
    logLine: '',
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
  
    const location = useLocation();
    
    const [newParam, setNewParam] = useState('');
  const [id, setId] = useState();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setNewParam(params.get('new') === 'true' ? 'true' : 'false');
  }, [location.search]);
  useEffect(() => {
    setFormData &&
      setFormData({
        fileId: fileId,
        templateId: templateData?._id,
        templateOptions: templateData?.templateOptions,
      });
  }, [templateData]);

  useEffect(() => {
    if (clear) {
      setState({
        logLine: '',
        Hero: '',
        WHAT: '',
        Goal: '',
        Opposition: '',
        Stakes: '',
        WHY: '',
      });
      setClear(false);
    }
  }, [clear]);



  useEffect(() => {
    if (generateData && generateData.data) {
      setState({
        logLine:
          `${generateData.data.Hero} has to ${generateData.data.WHAT} on ${generateData.data.Goal} during ${generateData.data.Opposition} because if they don’t ${generateData.data.Stakes}, ${generateData.data.WHY} will happen.` ||
          '',
        Hero: generateData.data.Hero || '',
        WHAT: generateData.data.WHAT || '',
        Goal: generateData.data.Goal || '',
        Opposition: generateData.data.Opposition || '',
        Stakes: generateData.data.Stakes || '',
        WHY: generateData.data.WHY || '',
      });
    }
  }, [generateData]);

  useEffect(() => {
    if (finalize) {
      validateFields();
    }
  }, [finalize,initialData]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [dynamicLoglines, setDynamicLoglines] = useState<string[]>([]);

  useEffect(() => {
    updateLoglines();
  }, [answers]);
  const updateLoglines = () => {
   
    const replacements: Record<string, string> = {
      "{world of story}": answers["World of Story"] || "{world of story}",
      "{Goal}": answers["Goal"] || "{Goal}",
      "{Method}": answers["Method"] || "{Method}",
      "{Opposition}": answers["Opposition"] || "{Opposition}",
      "{Stakes}": answers["Stakes"] || "{Stakes}",
      "{I.I}": answers["Inciting Incident"] || "{I.I}",
      "{I.I.}": answers["Inciting Incident"] || "{I.I}",
      "{Hero}": `${answers["Part - 2"] || ""} ${answers["Part - 1"] || "{Hero}"}`,
      "(preposition, synonym despite)": "",
      "(verb, synonym achieve)": "",
      "[where]": "",
      "(in spite of/despite)": "",
      "(action verb, synonym puts at risk)": "",
      "(action verb, synonym wants)": "",
      "(action verb, synonym struggles)": "",
      "(action verb, synonym risks)": "",
      "(adverb, synonym when) (s)": "",
      "(preposition, synonym against)": "",
      "(action verb, synonym achieve)": "",
      "(action verb, synonym - achieve)": "",
      "(verb, synonym must) (verb, synonym avoid)": "",
      "(Action verb, synonym - protect)": ""
      .trim(),
    };
  
    const updatedLoglines = templateData?.templateLogline?.map((logline: string) => {
      let updatedLogline = logline;
      if(answers){
        Object.entries(replacements).forEach(([key, value]) => {
          updatedLogline = updatedLogline.split(key).join(value); // Replaces all occurrences
        });
      }
      return updatedLogline;
    });
  
    setDynamicLoglines(updatedLoglines);
    
  };
useEffect(() => {
 setFormData && setFormData((prevState: any) => ({...prevState,finalLogline:dynamicLoglines}))
}, [dynamicLoglines])


  const validateFields = () => {
    submitForm();
  };

  const submitForm = () => {
    addTemplate(
      {
        payload: {
          fileId: fileId,
          name: type,
          template: templatename,
          slug: templatename,
          status: status,
          variables: {
            ...Object.fromEntries(
              Object.entries(state).map(([key, value]: any) => [key, value]),
            ),
          },
        },
        id: id,
        isEditing: isEditing,
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Template saved successfully');
          // toast.success(
          //   `Template ${isEditing ? 'updated' : 'saved'} successfully`,
          // );
          onFinalizeComplete();
        },
        onError: (error) => {
          console.error('Error saving template:', error);
          onFinalizeComplete();
        },
      },
    );
    onFinalizeComplete();
  };

  const handleInputChange = (que: any, value: any) => {
    setFormData &&
      setFormData((prevState: any) => {
        const updatedOptions = prevState?.templateOptions?.map(
          (option: any) => {
            if (option.que === que) {
              const { queDescription, _id, ...rest } = option;
              return { ...rest, ans: value };
            }
            return option;
          },
        );

        return {
          ...prevState,
          templateOptions: updatedOptions,
          finalLogline: dynamicLoglines,
        };
      });
    setAnswers((prev: any) => ({ ...prev, [que]: value }));
  };
  useEffect(() => {
    if (initialData) {
      // Convert initialData array to an object for easy access
      let initialFormData =[]

         initialFormData = Object.fromEntries(
          initialData?.map(({ que, ans }) => [que, ans])
        );
      
  
      setState({
        logLine: "",
        Hero: `${initialFormData["Part - 2"] || ""} ${initialFormData["Part - 1"] || ""}`.trim(),
        WHAT: initialFormData["Method"] || "",
        Goal: initialFormData["Goal"] || "",
        Opposition: initialFormData["Opposition"] || "",
        Stakes: initialFormData["Stakes"] || "",
        WHY: "", // No corresponding field in initialData
      });
      const replacements: Record<string, string> = {
        "{world of story}": initialFormData["World of Story"] || "{world of story}",
        "{Goal}": initialFormData["Goal"] || "{Goal}",
        "{Method}": initialFormData["Method"] || "{Method}",
        "{Opposition}": initialFormData["Opposition"] || "{Opposition}",
        "{Stakes}": initialFormData["Stakes"] || "{Stakes}",
        "{I.I}": initialFormData["Inciting Incident"] || "{I.I}",
        "{I.I.}": initialFormData["Inciting Incident"] || "{I.I}",
        "{Hero} (action verb, synonym risks)": `${initialFormData["Part - 2"] || ""} ${initialFormData["Part - 1"] || "{Hero}"}`,
        "(preposition, synonym despite)": "",
        "[where]": "",
        "(verb, synonym achieve)": "",
        "(in spite of/despite)": "",
        "(action verb, synonym puts at risk)": "",
        "(action verb, synonym wants)": "",
        "(action verb, synonym struggles)": "",
        "(action verb, synonym risks)": "",
        "(adverb, synonym when) (s)": "",
        "(preposition, synonym against)": "",
        "(action verb, synonym achieve)": "",
        "(action verb, synonym - achieve)": "",
        "(verb, synonym must) (verb, synonym avoid)": "",
        "(Action verb, synonym - protect)": "".trim(),
      };
    
      const updatedLoglines = templateData?.templateLogline?.map((logline: string) => {
        let updatedLogline = logline;
        Object.entries(replacements).forEach(([key, value]) => {
          updatedLogline = updatedLogline.split(key).join(value); // Replaces all occurrences
        });
        return updatedLogline;
      });
    
      setDynamicLoglines(updatedLoglines);
      setAnswers(initialFormData)
      setFormData((prevState: any) => ({
        ...prevState,
        templateOptions: initialData.map(({ que, ans }) => ({
          que,
          ans,
        }))
      }));
  
       updateLoglines();
    }else{
      // setFormData&& setFormData(null);
      const initialFormData = Object.fromEntries(
        templateData?.templateOptions.map(({ que, ans }) => [que, ''])
      );
      setAnswers(initialFormData);
      setDynamicLoglines(templateData?.templateLogline)
    }
  }, [initialData,newParam,templateData]);
  console.log(newParam);
  
  const [selectedLogline, setSelectedLogline] = useState(
    dynamicLoglines?.[0] || ''
  );
  
  useEffect(() => {
    // Update selected logline when dynamicLoglines change
    setSelectedLogline(dynamicLoglines?.[0] || '');
  }, [dynamicLoglines]);
  
  useEffect(() => {
    // Send the selected logline whenever it changes
    setFormData && setFormData((prevState: any) => ({
      ...prevState,
      FinalLogline: selectedLogline
    }));
  }, [selectedLogline]);
  return (
    <div className="rounded-tr-none rounded-br-lg rounded-bl-lg rounded-tl-lg flex flex-col font-poppins ">
      {/* <ToastContainer /> */}
      {/* Title section */}
      <p className="text-lg font-bold mb-[24px]">{templateData?.templateOptionTitle}</p>

      {/* Log line section */}
      <div className="w-full rounded-2xl bg-[#E7EDF3] text-[#8F8F8F] p-[20px] mb-[24px]">
        {isSidebar
          ? templateData?.templateLogline?.map((logline: any) => (
              <p key={logline} className="mb-[16px] text-[#8F8F8F] text-[14px] font-normal leading-[19px]">
                {logline}
              </p>
            ))
          : dynamicLoglines.map((logline, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="logline"
                value={logline}
                checked={selectedLogline === logline}
                onChange={() => setSelectedLogline(logline)}
                className="mr-2"
              />
              {logline}
            </label>
          ))}
      </div>
      <div
        className={`${isSidebar ? '' : 'overflow-y-auto'}`}
      >
        {' '}
        {/* Set height based on available space */}
        <form className="flex flex-col gap-[24px]">
          {/* Render dynamic input fields */}
          {templateData?.templateOptions?.map(
            ({ que, queDescription }: any) => (
              <div key={que}>
                <label htmlFor={que}>
                  <div className="mb-[16px]">
                    <p className="text-[#252C34] font-poppins text-base font-bold leading-[19px] mb-[16px]">
                      {que}
                    </p>
                    <p className="text-[#8F8F8F] font-poppins text-base font-semibold leading-[19px]">
                      {queDescription}
                    </p>
                  </div>
                </label>
                <input
                disabled={isSidebar}
                  id={que}
                  className="w-full rounded-lg border border-solid border-[#BABABF] bg-white shadow-inner p-2"
                  value={answers && answers[que] || ""}
                  onChange={(e) => {
                    handleInputChange(que, e.target.value);
                  }}
                />
              </div>
            ),
          )}
        </form>
      </div>
    </div>
  );
}
