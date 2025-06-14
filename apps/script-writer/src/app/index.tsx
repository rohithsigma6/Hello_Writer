import VideoProvider from '@/features/video-call/hooks/video-provider';
import { AppProvider } from './provider';
import { AppRouter } from './router';
import "@stream-io/video-react-sdk/dist/css/styles.css";

export const App = () => {
  return (
    <AppProvider>
      <VideoProvider>
        <AppRouter />
      </VideoProvider>
    </AppProvider>
  );
};
