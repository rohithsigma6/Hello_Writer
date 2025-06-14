import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
// import { getDraftLogline } from "utils/AiCoWriter";
import WelcomeLogline from './WelcomeLogline';
import LoglineSelect from './LoglineSelect';
import LoglineEdit from './LoglineEdit';
import LoglineFinal from './LoglineFinal';
import { useParams } from 'react-router';
import { useDraftLogline } from '../api/get-draft-logline';
import { useLoglineTemplate } from '../api/get-all-logline';
import { LoglineTemplate } from './LoglineTemplate';
import Loader from '@/components/ui/loader/loader';

const Logline = () => {
  const { fileId } = useParams();
  const [loglineStatus, setLoglineStatus] = useState('welcome');
  const [slectedLogline, setslectedLogline] = useState(null);
  const [iniialData, setiniialData] = useState({});
  const { data, isLoading, error } = useDraftLogline({ id: fileId || "" });
  const { data: templates } = useLoglineTemplate();
  useEffect(() => {
    if (data?.logline?.status == 'final') {
      setiniialData(data?.logline?.finalLogline)
      setLoglineStatus('final')
    } else if (data?.logline?.status == 'draft') {
      if (data?.logline?.loglineDrafts[data?.logline?.loglineDrafts?.length - 1].templateId?._id) {
        setLoglineStatus('edit')
      } else {
        console.log(data?.logline)
        setLoglineStatus('initialize')
      }
      setDraftData(data?.logline?.loglineDrafts[data?.logline?.loglineDrafts?.length - 1].templateId?._id, data?.logline?.loglineDrafts[data?.logline?.loglineDrafts?.length - 1])
    }
  }, [data]);

  const setDraftData = (id: string, data: any) => {
    // setiniialData()


    if (id) {

      const template = templates?.Templates.find((tem) => tem._id == id)

      const selectTemplate = {
        templateName: template?.templateTitle,
        id: template?._id,
        link: template?._id,
        templateOptionTitle: template?.templateOptionTitle,
        templateLogline: template?.templateLogline,
        templateOptions: template?.templateOptions,
        component: <LoglineTemplate templateData={template} isSidebar={true} initialData={data?.templateOptions} />
      }
      setslectedLogline(selectTemplate || {});
    }
    setiniialData(data)
  }

  return (
    <div className="overflow-y-auto w-full">
      {isLoading ?
        <div className="types-wrapper w-[100%] h-[100vh] bg-slate-100 overflow-y-scroll">
          <div className="mt-[32px] ml-[40px] mr-[40px] overflow-x-hidden ">
            <div className="bg-white rounded-[24px] px-[32px] pt-[40px] font-poppins ">
              <Loader isLoading={isLoading} />
            </div>
          </div>
        </div>
        :
        <>
          {loglineStatus === 'welcome' ? (
            <WelcomeLogline setLoglineStatus={setLoglineStatus} />
          ) : loglineStatus === 'initialize' ? (
            <LoglineSelect
              setLoglineStatus={setLoglineStatus}
              setslectedLogline={setslectedLogline}
              setiniialData={setiniialData}
              iniialData={iniialData}
              loglineStatus={loglineStatus}
              setDraftData={setDraftData}
            />
          ) : loglineStatus === 'edit' ? (
            <LoglineEdit
              templates={slectedLogline}
              setslectedLogline={setslectedLogline}
              setLoglineStatus={setLoglineStatus}
              iniialData={iniialData}
              setiniialData={setiniialData}
              setDraftData={setDraftData}
            />
          ) : loglineStatus === 'final' ? (
            <LoglineFinal
              setLoglineStatus={setLoglineStatus}
              setslectedLogline={setslectedLogline}
              iniialData={iniialData}
              setiniialData={setiniialData}
            />
          ) : (
            <></>
          )}
        </>
      }
    </div>
  );
};

export default Logline;
