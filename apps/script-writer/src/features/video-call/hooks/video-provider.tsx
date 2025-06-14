import { ReactNode, useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import axios from "axios";
import { useUser } from '@/features/users/api/get-user';
import { env } from "process";
// import { getAuthTokenFromLocalStorage } from "utils/utils"; 
// import { useUser } from "hooks/useFetch";

const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);

  const { data: userData } = useUser();
  const user = userData?.user;
console.log("-=");

  useEffect(() => {
    const Authorization = `Bearer ${user?.token}`;
    if (!user || !user._id) return;

    const initializeVideoClient = async () => {
      try {
        if (!import.meta.env.VITE_APP_API_URL) {
          throw new Error("Backend server host is missing");
        }

        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/stream/token`, {
          headers: { Authorization },
        });

        const { token, apiKey, success } = response.data;

        if (!success) {
          throw new Error("Failed to fetch API key or token");
        }

        const client = new StreamVideoClient({
          apiKey,
          user: {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            image:
              user.profile_image ??
              `https://ui-avatars.com/api/?background=random&name=${user.firstName}+${user.lastName}`,
          },
          token,
        });
        setVideoClient(client); // Only set the client once
      } catch (error) {
        console.error("Error initializing video client:", error);
      }
    };

    initializeVideoClient();
  }, [user]);

  return <>{!videoClient ? <>{children}</> : <StreamVideo client={videoClient}>{children}</StreamVideo>}</>;
};
export default VideoProvider;
