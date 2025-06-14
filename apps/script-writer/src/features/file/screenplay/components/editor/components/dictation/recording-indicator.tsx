// Animated microphone icon that pulses when recording
const RecordingIndicator = () => {
  return (
    <div className="relative">
      <div className="absolute -inset-1 rounded-full bg-red-500 opacity-75 animate-ping"></div>
      <div className="relative rounded-full bg-red-600 p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" x2="12" y1="19" y2="22"></line>
        </svg>
      </div>
    </div>
  );
};

export { RecordingIndicator };