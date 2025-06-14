
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Call, StreamCall, StreamTheme, useStreamVideoClient } from "@stream-io/video-react-sdk";
import MeetingSetup from "./meeting-setup";
import MeetingRoom from "./meeting-room";
import { useGetCallById } from "./hooks/get-call-by-id";

const VideoCall = ({ isGuest }: { isGuest: boolean }) => {
  const [callDetails, setCallDetails] = useState<Call | null>(null);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const client = useStreamVideoClient();
  const [searchParams] = useSearchParams();
  const callId = searchParams.get("call_id");
  useEffect(() => {
    const fetchCallDetails = async () => {
      console.log(callId, client);
      
      if (callId && client) {
        try {
          const call = client.call("default", callId);
          await call.getOrCreate(); // Ensure the call exists
          setCallDetails(call);
        } catch (error) {
          console.error("Error fetching call details:", error);
        }
      }
    };

    fetchCallDetails();
  }, [callId, client]);

  return <>{callDetails && <MeetingLayout id={callDetails?.id} user={user} isGuest={isGuest} />}</>;
};

export default VideoCall;

const MeetingLayout = ({ id, isGuest }: { id: string; user: any; isGuest: boolean }) => {
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
console.log("---",isSetupComplete);

  if (isCallLoading) return <h1>Loading...</h1>;

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup setIsSetupComplete={setIsSetupComplete} isGuest={isGuest} />
        ) : (
          <MeetingRoom isGuest={isGuest} />
        )}
      </StreamTheme>
    </StreamCall>
  );
};
