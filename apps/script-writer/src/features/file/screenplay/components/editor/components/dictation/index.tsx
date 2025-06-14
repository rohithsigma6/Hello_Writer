import { useState, useRef } from 'react';
import { useEditorStore } from '@/store/editor';
import { DictationLogo } from './dictation-logo';
import { RecordingIndicator } from './recording-indicator';

const Dictation = () => {
  const { editor } = useEditorStore((state) => state);
  const [isRecording, setIsRecording] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);

  // Start dictation
  const handleStartDictation = () => {
    if (!editor) return;

    // @ts-ignore
    editor.commands.startSpeechRecognition();
    setIsRecording(true);
    setTooltipVisible(true);
  };

  // Stop dictation
  const handleStopDictation = () => {
    if (!editor) return;

    // @ts-ignore
    editor.commands.stopSpeechRecognition();
    setIsRecording(false);
    setTooltipVisible(false);
  };

  return (
    <div className="relative">
      {/* Main dictation button */}
      <button
        ref={buttonRef}
        className="flex flex-col items-center justify-center"
        onClick={handleStartDictation}
        aria-label={isRecording ? 'Stop dictation' : 'Start dictation'}
      >
        <DictationLogo isRecording={isRecording} />
      </button>

      {/* Tooltip that appears when recording */}
      {tooltipVisible && isRecording && (
        <div
          ref={tooltipRef}
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-3 z-10 w-64 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RecordingIndicator />
              <span className="text-sm font-medium">
                Recording in progress...
              </span>
            </div>
            <button
              onClick={handleStopDictation}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
              aria-label="Stop recording"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="6" height="6" x="9" y="9"></rect>
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Speak clearly into your microphone. Click the stop button when
            finished.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dictation;
