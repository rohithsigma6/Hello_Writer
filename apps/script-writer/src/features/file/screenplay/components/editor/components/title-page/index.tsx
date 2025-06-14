import lock from "@/assets/titlePage/lock.svg";
import toggle from "@/assets/titlePage/toggle.svg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddressModal from "./AddressModal";
import RevisionModal from "./RevisionModal";
// import "./titleStyle.css";
// import { getUpdateFile } from "hooks/useFetch";
import { FaTimes } from "react-icons/fa";
import EditedByModal from "./EditedByModal";
import ScreenplayTitle from "./ScreenplayTitlePage";
import TitleContent from "./TitleContent";

type Props = {
  setCurrentTab: any;
};
const TitlePage = ({ setCurrentTab }: Props) => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [curruntModal, setCurruntModal] = useState<string | null>(null);

//   const { refetch } = getUpdateFile({ fileId: fileId });
  // useFile({ fileId: fileId });
  const modalStyles = "relative bg-white rounded-lg shadow-xl max-w-[900px]  w-full";

  const handleComplete = () => {
    setCurrentTab("");
  };

//   useEffect(() => {
//     if(curruntModal==null){
//       refetch()
//     }
//   }, [curruntModal])
  



  return (
    <>
      <div className="fixed inset-0 z-[999] overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm" />
        <div className="flex min-h-screen items-center justify-center">
          <div className={modalStyles}>
            <div className="text-center relative">
              {curruntModal === "revision" && <RevisionModal setCurruntModal={setCurruntModal} />}
              {/* {curruntModal === "copyRight" && <CopyRightModal setCurruntModal={setCurruntModal} />} */}
              {curruntModal === "title" && <EditedByModal setCurruntModal={setCurruntModal} />}
              {curruntModal === "address" && <AddressModal setCurruntModal={setCurruntModal} />}
              <div style={{ padding: "20px" }} className="flex justify-between">
                <div className="flex">
                  <button className="bg-slate-200 rounded-lg border-none p-2 mx-2">
                    <img src={lock} alt="lock" />{" "}
                  </button>
                  {/* <button
                    className="bg-slate-200 rounded-lg border-none p-2 flex items-center"
                    onClick={() => {
                      setCurruntModal("revision");
                    }}
                  >
                    <img src={toggle} alt="toggle" /> <span> Tag Revision </span>
                  </button> */}
                </div>
                <button onClick={handleComplete} className=" text-black hover:text-black">
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="title-editor">
                {/* <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}  
        onChange={handleFileChange}
      /> */}
                {/* <EditorContent editor={editor} /> */}
                <TitleContent setCurruntModal={setCurruntModal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitlePage;
