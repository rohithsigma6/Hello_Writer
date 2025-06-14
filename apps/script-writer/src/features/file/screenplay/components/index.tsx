import ScreenplayEditor from './editor';
import { useUser } from '@/features/users/api/get-user';
import { useParams, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useSocketStore } from '@/store/socket';
import InitialScreen from './screens/initial-screen';
import { useEditorStore } from '@/store/editor';

const ScreenPlay = () => {
  const [searchParams] = useSearchParams();
  const { fileId } = useParams();
  const versionName = searchParams?.get('versionName') || 'V1';
  const versionColor = searchParams?.get('versionColor') || 'White';
  const editStatus = searchParams?.get('editStatus') || 'PERSONAL DRAFT';
  const { data: userData } = useUser();
  const currentUser = userData?.user;
  const { socket, connectSocket, disconnectSocket } = useSocketStore();
  const { resetStore } = useEditorStore();
  const [isInitial, setIsInitial] = useState(true);

  const handleConnect = () => {
    connectSocket({
      token: currentUser?.token!,
      fileId: fileId!,
      versionDetails: {
        versionName: versionName,
        versionColor: versionColor,
        editStatus: editStatus,
      },
    });
  };

  useEffect(() => {
    handleConnect();

    return () => {
      // resetStore()
      disconnectSocket();
    };
  }, [fileId, versionName]);

  useEffect(() => {
    if (socket) {
      socket.emit('refreshSocket', versionName);
    }
  }, [versionName]);

  useEffect(() => {
    let isNotFirstTime = localStorage.getItem('screenplay-' + fileId);
    if (isNotFirstTime) {
      setIsInitial(false);
    }
  }, []);

  return (
    <>
      {isInitial ? (
        <InitialScreen setIsInitial={setIsInitial} />
      ) : (
        <ScreenplayEditor />
      )}
    </>
  );
};

export default ScreenPlay;
