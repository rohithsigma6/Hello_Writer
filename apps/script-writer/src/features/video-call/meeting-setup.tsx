
import {
  useCall,
  VideoPreview,
  ScreenShareButton,
  ReactionsButton,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  DeviceSettings,
} from "@stream-io/video-react-sdk";
import { PhoneIcon } from "lucide-react";
import { useEffect, useState } from "react";

const MeetingSetup = ({
  setIsSetupComplete,
  isGuest,
}: {
  setIsSetupComplete: (value: boolean) => void;
  isGuest: boolean;
}) => {
  const call = useCall();
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  if (!call) throw new Error("useCall must be used within the Stream Call component");

  return (
    <div className="flex flex-col items-center justify-center gap-3 text-white w-full h-full">
      <div className=" h-[90vh] flex justify-center items-center">
        {isGuest ? (
          <VideoPreview className="flex max-h-[500px] max-w-[700px]" />
        ) : (
          <VideoPreview className="flex max-h-[175px] max-w-[248px]  border-t border-t-[#212131] bg-[#212131] rounded-none border-[#212131]" />
        )}
      </div>

      <div
        className={`fixed bottom-0 h-[56px] bg-[#212131] flex items-center justify-center gap-2 p-2 w-full ${isGuest ? "" : "max-w-[248px]"}`}
      >
        <div className={`flex items-center justify-center gap-4 w-full max-w-[248px]`}>
          {/* <ToggleAudioPublishingButton />
          <ToggleVideoPublishingButton />
          <ScreenShareButton />
          <ReactionsButton /> */}
          <div className="flex items-center justify-center gap-2  max-w-[200px] font-medium text-white">
            <input
              type="checkbox"
              name="checkbox"
              checked={isMicCamToggledOn}
              onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            />
            <span className="text-[10px]">Join with mic and camera off</span>
            <DeviceSettings />
          </div>
          <button
            className="rounded-md bg-green-500 px-4 py-2.5"
            onClick={() => {
              call.join();
              setIsSetupComplete(true);
            }}
          >
            <PhoneIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;
