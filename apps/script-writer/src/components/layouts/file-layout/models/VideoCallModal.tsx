import React, { useEffect, useRef, useState } from 'react';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose }) => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      startVideoCall();
    }
    return () => {
      stopVideoCall();
    };
  }, [isOpen]);

  const startVideoCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopVideoCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        setScreenStream(screenStream);
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = screenStream;
        }
        setIsScreenSharing(true);
      } else {
        if (screenStream) {
          screenStream.getTracks().forEach((track) => track.stop());
          setScreenStream(null);
        }
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const toggleMute = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleMirror = () => {
    setIsMirrored(!isMirrored);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[800px] h-[800px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Video Call</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 relative">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover rounded-lg ${isMirrored ? 'scale-x-[-1]' : ''}`}
          />
          {isScreenSharing && (
            <video
              ref={screenShareRef}
              autoPlay
              playsInline
              className="absolute bottom-4 right-4 w-64 h-48 object-cover rounded-lg"
            />
          )}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={toggleMute}
            className={`p-3 rounded-full ${
              isMuted ? 'bg-red-500' : 'bg-gray-200'
            }`}
          >
            {isMuted ? '🔇' : '🎤'}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full ${
              isVideoOff ? 'bg-red-500' : 'bg-gray-200'
            }`}
          >
            {isVideoOff ? '📵' : '📹'}
          </button>
          <button
            onClick={toggleScreenShare}
            className={`p-3 rounded-full ${
              isScreenSharing ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            {isScreenSharing ? '🖥️' : '💻'}
          </button>
          <button
            onClick={toggleMirror}
            className={`p-3 rounded-full ${
              isMirrored ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            {isMirrored ? '🪞' : '🔍'}
          </button>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-red-500 text-white"
          >
            📞
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
