// import {
//   CallParticipantsList,
//   CancelCallButton,
//   ParticipantView,
//   ReactionsButton,
//   ScreenShareButton,
//   ToggleAudioPreviewButton,
//   ToggleVideoPreviewButton,
//   useCallStateHooks,
// } from "@stream-io/video-react-sdk";
// import { useState } from "react";
// const MeetingRoom = () => {
//   const [showParticipants, setShowParticipants] = useState(false);
//   const { useParticipants } = useCallStateHooks();
//   const participants = useParticipants();

//   return (
//     <div className="relative  pt-4 w-full text-white bg-gray-900">
//       <div className="relative flex size-full items-center justify-center">
//         <div className="flex flex-col h-[90vh] items-center max-w-[1000px] justify-center">
//           {/* <CallLayout /> */}

//           <div className="flex size-full h-[80vh] ">
//             <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
//               {participants.map((p) => (
//                 <ParticipantView participant={p} key={p.sessionId} />
//               ))}
//             </div>
//           </div>
//           {/* Participants List */}
//           <>
//             {showParticipants && (
//               <div className="h-[calc(100vh)] absolute right-0 ml-2 bg-gray-800 p-4">
//                 <CallParticipantsList onClose={() => setShowParticipants(false)} />
//               </div>
//             )}
//           </>
//         </div>

//         {/* Call Controls */}
//         <div className="fixed bottom-0 flex w-full items-center justify-center gap-2  p-4 max-w-[600px] m-auto">
//           <div className=" flex items-center justify-between gap-3 max-w-[200px]">
//             <ToggleAudioPreviewButton />
//             <ToggleVideoPreviewButton />
//             <ScreenShareButton />
//             <ReactionsButton />
//             <CancelCallButton onLeave={() => console.log("leaved")} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingRoom;

import {
  CallParticipantsList,
  CallPreview,
  CancelCallButton,
  PaginatedGridLayout,
  ParticipantView,
  ReactionsButton,
  ScreenShareButton,
  SpeakerLayout,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const MeetingRoom = ({ isGuest }: { isGuest: boolean }) => {
  const [showParticipants, setShowParticipants] = useState(false);
  const [copied, setCopied] = useState(false);

  const { useParticipants } = useCallStateHooks();
  const navigate = useNavigate();
  const { fileId } = useParams();

  const participants = useParticipants();
  const handleCallHang = () => {
    if (!isGuest) {
      return navigate(`/file/${fileId}/screenplay`);
    }
    return navigate(`/dashboard`);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide the success message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
 
      <div className="relative flex size-full items-center justify-center text-white w-full z-[9999]">
        <div className="flex flex-col w-screen p-[16px] size-full items-center ">
          {isGuest ? (
            <div className="size-full h-[80vh] flex m-auto">
              <SpeakerLayout participantsBarPosition={"right"} />
            </div>
          ) : (
            <div className="max-w-[248px] w-full min-h-[calc(100vh-150px)] overflow-y-auto px-2">
              <SpeakerLayout participantsBarPosition={"top"} />
              <CallParticipantsList onClose={() => setShowParticipants(false)} />
            </div>
          )}

          {/* {showParticipants && (
          )} */}
        </div>
        <div
          className={`fixed bottom-0 h-[56px] bg-[#212131] flex flex-col items-center justify-center gap-2 p-4 w-full ${isGuest ? "" : "max-w-[248px]"}`}
        >
          {/* <>
            {copied && <p className="p-4">URL copied to clipboard!</p>}
            <button onClick={handleCopy} className="flex bg-[#19232d] rounded-md p-2 items-center justify-center gap-2">
              <FaCopy /> copy invitation link
            </button>
          </> */}
          <div className={`flex items-center justify-center w-full gap-2 video-menu-container`}>
            <ToggleAudioPublishingButton />
            <ToggleVideoPublishingButton />
            <ScreenShareButton />
            <ReactionsButton />
            <CancelCallButton onLeave={() => handleCallHang()} />
          </div>
        </div>
      </div>
  
  );
};

export default MeetingRoom;
