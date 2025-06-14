import { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import StarRating from "./StarRating";
import UserNameAndId from "./UserNameAndId";
import formatDate from "@/utils/formatDate";

interface Feedback {
    feedback_type: string;
    title: string;
    status: string;
    star_rating: number;
    attached_file: string;
    _id: string;
    user: {
        lastName: string;
        firstName: string;
        colorCode: string;
        email: string;
        currentPlan: string
    }
    createdAt: Date | string;
    feedback_text: string;
}

const FeedbackCard = ({ feedback }: { feedback: Feedback }) => {
    if (!feedback) {
        console.log("No feedback found");
        return;
    }

    const { feedback_type, title, status, star_rating, _id, user, createdAt, feedback_text } = feedback;

    const [clickedFeedback, setClickedFeedback] = useState("");
    const [showModal, setShowModal] = useState(false);

    function handleFeedbackClick() {
        setClickedFeedback(_id);
        setShowModal(true);
    }

    function closeModel() {
        setClickedFeedback("");
        setShowModal(false);
    }

    return (
        <>
            <div onClick={handleFeedbackClick} className='border border-gray-300 rounded-xl py-4 cursor-pointer hover:shadow-xl transition-shadow'>
                <div className='flex flex-row items-center justify-between px-4'>
                    <div className='flex flex-row items-center gap-4'>
                        <span className={`${feedback_type == "Bug Report" ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-500"} py-2 px-3 rounded-lg font-semibold text-xs`}>{feedback_type}</span>
                        <span className='text-xs text-gray-500 font-medium'>{formatDate(createdAt)}</span>
                    </div>

                    <span className={`border ${status == "Open" ? "border-orange-400 text-orange-400" : status === "In Progress" ? "border-green-600 text-green-500" : ""} text-xs rounded-md font-medium px-2 py-1.5`}>{status}</span>
                </div>

                <p className='font-semibold text-sm mt-4 px-4'>{title}</p>
                <p className='mt-2 text-sm px-4'>{feedback_text}</p>

                <hr className='text-gray-300 my-4' />

                <div className="flex flex-row justify-between items-center w-full px-3">
                    <UserNameAndId user={user} />

                    <div className="flex flex-row items-center gap-3">
                        <p className='text-gray-600 text-sm'>Rater by user:</p>
                        <StarRating rating={star_rating} />
                    </div>
                </div>
            </div>

            {showModal && clickedFeedback !== "" &&
                <FeedbackModal
                    feedback={feedback}
                    onClose={closeModel}
                />}
        </>
    )
}

export default FeedbackCard