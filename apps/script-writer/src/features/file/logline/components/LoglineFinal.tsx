// import { useAddFinalLogline } from 'hooks/ai-cowriter-hooks/useAiCowriter';
// import ReWriteModal from 'pages/common/RewriteModal';
// import TemplateModal from 'pages/common/TemplateModal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAddFinalLogline } from '../api/save-draft';
import TemplateModal from './TemplateModal';
import { enqueueSnackbar } from 'notistack';
// import { useParams } from 'react-router-dom';
// import { getDraftLogline } from 'utils/AiCoWriter';

const LoglineFinal = ({ setLoglineStatus, setslectedLogline, iniialData, setiniialData }: any) => {
  const [logline, setLogline] = useState('');
  //
  const [openReWriteModal, setOpenReWriteModal] = useState(false);

  const [templatesPopup, setTemplatesPopup] = useState(false);
  const finalMutation = useAddFinalLogline();
  // const addFinalMutation = useAddFinalLogline();
  const { fileId } = useParams<{
    fileId: string;
  }>();

  useEffect(() => {
    setLogline(iniialData);
  }, [iniialData]);

  const [IsEdit, setIsEdit] = useState(true);
  const saveChnage = () => {
    finalMutation.mutate({
      fileId: fileId,
      FinalLogline: logline,
    }, {
      onSuccess: (data) => enqueueSnackbar("Final Logline Saved:"),
      onError: (error) => console.error("Error Saving Final:", error),
    });
    // addFinalMutation({
    //   fileId: fileId,
    //   FinalLogline: logline,
    // });
    setIsEdit(true);
  };
  const handleOpenCreateFileDialog = () => {
    // createFilePopup(userCtx);
    setTemplatesPopup(true);
  };
  return (
    <>
      <div className={'w-full min-h-full p-10 flex flex-col gap-y-0 '}>
        <section
          className={`relative border-2 border-black rounded-3xl px-5 py-7 flex flex-col gap-y-8`}
        >
          <div className="w-full h-fit flex flex-col gap-10  overflow-y-auto px-4">
            <p className="text-2xl font-bold pb-2">Finalized Template</p>

            <section className="flex flex-col gap-y-3 mt-4">
              <>
                <label htmlFor="textField" className=" font-bold">
                  Your Logline
                </label>
                <textarea
                  name="textField"
                  rows={10}
                  readOnly={IsEdit}
                  className="p-3 rounded-lg border border-slate-400"
                  // placeholder="In the near future, a jaded police officer tracks down a band of rogue androids who seek a longer life."
                  value={logline}
                  onChange={(e) => setLogline(e.target.value)}
                ></textarea>
              </>
            </section>
            <section className="flex flex-row items-center gap-4">
              <button
                className="px-16 py-3 text-white rounded-lg bg-primary-blue border border-gray-300 "
                onClick={handleOpenCreateFileDialog}
              >
                Rewrite
              </button>
              {IsEdit ? (
                <button
                  className="px-16 py-3 rounded-lg bg-violet-300 hover:bg-violet-200 font-medium text-violet-600"
                  onClick={() => setIsEdit(false)}
                >
                  Edit
                </button>
              ) : (
                <button
                  className="px-16 py-3 rounded-lg bg-violet-300 hover:bg-violet-200 font-medium text-violet-600"
                  onClick={saveChnage}
                >
                  save
                </button>
              )}
            </section>
          </div>
        </section>
      </div>
      {templatesPopup
        &&
        <TemplateModal setiniialData={setiniialData}
          templatesPopup={templatesPopup}
          setTemplatesPopup={setTemplatesPopup}
          setLoglineStatus={setLoglineStatus}
          setslectedLogline={setslectedLogline}
        />
      }
      {/* {openReWriteModal && <ReWriteModal openReWriteModal={openReWriteModal} setOpenReWriteModal={setOpenReWriteModal} />} */}
    </>
  );
};

export default LoglineFinal;
