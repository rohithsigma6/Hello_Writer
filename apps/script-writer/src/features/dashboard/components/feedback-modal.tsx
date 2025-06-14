import { useEffect, useRef, useState } from 'react';
import icon from '@/assets/dashboard/feedback/icon.png';
import tick from '@/assets/dashboard/feedback/tick.svg';
import { Modal } from '@/components/ui/modal';
import Select from '@/components/ui/select/custom-select';
import { StarRating } from '@/components/ui/rating/star-rating';
import FileDropzone from '@/components/ui/file-upload/file-dropzone';
import { useCreateFeedback } from '../api/create-feedback';
import RoadMapModel from './roadmap-model';

const types = ['General Feedback', 'Bug Report', 'Feature Suggestion'];

const ThanksGiving = ({
  setIsFeedbackDone,
  setShowFeedback,
  setShowRoadMap,
}: {
  setIsFeedbackDone: any;
  setShowFeedback: any;
  setShowRoadMap: any;
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-full m-auto max-w-xl flex flex-col gap-4 items-center rounded-2xl p-6"
    >
      <img src={tick} alt="Done" className="w-20 h-20 rounded-full" />

      <h1 className="font-bold text-xl">Thank You for Your Feedback!</h1>
      <p className="text-sm">
        We appreciate your input and will use it to make Screenplay.ink better.
      </p>

      <div className="w-full mt-4 flex flex-row gap-x-2 items-center justify-between">
        <button
          onClick={() => {
            setShowRoadMap(true);
            setIsFeedbackDone(false);
          }}
          className="border border-gray-500 p-3 hover:bg-gray-700 hover:text-white transition-colors text-sm w-[50%] font-medium rounded-2xl bg-white text-gray-600"
        >
          View Community Roadmap
        </button>
        <button
          onClick={() => setShowFeedback(false)}
          className="p-3 text-sm w-[50%] font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

const FeedbackModal = ({
  showFeedback,
  setShowFeedback,
}: {
  showFeedback: boolean;
  setShowFeedback: (showFeedback: boolean) => void;
}) => {
  const [file, setFile] = useState<File | null>();
  const [type, setType] = useState(types[0]);
  const [stars, setStars] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const [isFeedbackDone, setIsFeedbackDone] = useState(false);
  const [showRoadMap, setShowRoadMap] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: createFeedback, isError } = useCreateFeedback(); // Use the mutation hook

  const handleFileChange = (file: File | null) => {
    if (file) {
      //   const reader = new FileReader();
      //   reader.onloadend = () => setFile(reader.result as string);
      //   reader.readAsDataURL(file);
      setFile(file)
    }
  };

  const handleIconClick = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.click();
    }
  };

  const handleSubmit = async () => {
    if (feedbackText === '') {
      setShowErrorText(true);
      return;
    } else {
      setShowErrorText(false);
    }

    const feedbackData = { attached_file: file, feedback_type: type, star_rating: stars, feedback_text: feedbackText };

    try {
      await createFeedback({ data: feedbackData }); // Submit the feedback data using the mutation

      // If successful, show "Thank You" screen
      setTimeout(() => {
        setIsFeedbackDone(true);
      }, 500);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  useEffect(() => {
    feedbackText !== '' ? setShowErrorText(false) : '';
  }, [feedbackText]);

  function handleCloseRoadmapModal() {
    handleCloseFeedbackModal();
    setIsFeedbackDone(false);
    setShowFeedback(false);
    setShowRoadMap(false);
  }

  function handleCloseFeedbackModal() {
    setShowFeedback(false);
  }

  useEffect(() => {
    if (!showFeedback) {
      // Reset state when modal is fully closed
      setStars(0);
      setType(types[0]);
      setFile(null);
      setFeedbackText('');
      setIsFeedbackDone(false);
      setShowRoadMap(false);
      setShowErrorText(false);
    }
  }, [showFeedback]);


  return (
    <Modal
      className={`${!isFeedbackDone && showRoadMap ? "max-w-4xl" : "max-w-xl"} bg-white w-full m-auto flex flex-col gap-2 rounded-2xl p-6`}
      isOpen={showFeedback}
      setIsOpen={() => {
        if (!isFeedbackDone && !showRoadMap) {
          handleCloseFeedbackModal();
        }
      }}
    >
      {!isFeedbackDone && !showRoadMap && (
        <>
          <header className="flex flex-row w-full justify-start items-center gap-2">
            <img src={icon} alt="Icon" className="w-16 h-16 rounded-full" />
            <div>
              <h1 className="font-bold text-lg">We Value Your Feedback!</h1>
              <p className="text-sm">
                Select a category and share your thoughts.
              </p>
            </div>
          </header>

          <section className="flex flex-col gap-2">
            <label htmlFor="type" className="text-gray-700 w-full text-sm">
              Feedback Type*
            </label>
            <Select
              extraClass="rounded-lg border-gray-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={types.map((item) => ({ label: item, value: item }))}
            ></Select>
          </section>

          <section className="flex flex-col gap-2">
            <label
              htmlFor="feedbackText"
              className="text-gray-700 w-full text-sm"
            >
              Feedback Text*
            </label>
            <textarea
              name="feedbackText"
              rows={4}
              required
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="p-3 w-full border text-sm rounded-xl placeholder-gray-600 border-gray-500"
              placeholder={
                type === types[0]
                  ? 'Describe your feedback here...'
                  : type === types[1]
                    ? 'Describe the issue you are facing here...'
                    : 'Describe your new feature idea here...'
              }
            />
            {showErrorText && (
              <p className="text-rose-600 font-medium text-sm">
                Please fill required field
              </p>
            )}
          </section>

          <div className="p-4">
            <FileDropzone
              label="Attachment (Optional)"
              accept=".png, .jpg"
              maxSizeMB={4}
              instructionText="JPG or PNG file (max. 4MB)"
              onFileChange={handleFileChange}
            />
          </div>

          <section className="flex flex-col gap-2">
            <label htmlFor="stars" className="text-gray-700 w-full text-sm">
              Rating (Optional)
            </label>
            <StarRating maxStars={5} rating={stars} onRatingChange={setStars} />
          </section>

          <div className="flex flex-row gap-x-2 items-center justify-end">
            <button
              onClick={handleCloseFeedbackModal}
              className="border border-gray-500 hover:bg-gray-600 hover:text-white transition-colors px-10 py-3 font-medium rounded-2xl bg-white text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-10 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
            // disabled={isLoading} // Disable button while loading
            >
              Send
              {/* {isLoading ? 'Submitting...' : 'Send'} */}
            </button>
          </div>
        </>
      )}

      {isFeedbackDone && (
        <ThanksGiving
          setIsFeedbackDone={setIsFeedbackDone}
          setShowFeedback={setShowFeedback}
          setShowRoadMap={setShowRoadMap}
        />
      )}

      {!isFeedbackDone && showRoadMap &&
        <RoadMapModel
          closeRoadMap={handleCloseRoadmapModal}
        />
      }
    </Modal>
  );
};

export default FeedbackModal;
