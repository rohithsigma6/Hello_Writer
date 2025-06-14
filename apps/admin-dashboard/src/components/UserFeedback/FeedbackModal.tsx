import { useEffect, useState } from 'react'
import { HiOutlineChevronDown, HiOutlineDownload } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';
import StarRating from './StarRating';
import UserNameAndId from './UserNameAndId';
import formatDate from '@/utils/formatDate';

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
        currentPlan: string;
    }
    createdAt: Date | string;
    feedback_text: string;
}

const FeedbackModal = ({ onClose, feedback }: { onClose: () => void; feedback: Feedback }) => {
    const [changeStatus, setChangeStatus] = useState("");
    const [teamMember, setTeamMember] = useState("");
    const [replyTemplate, setReplyTemplate] = useState("");

    if (!feedback) {
        console.log("No Feedback found");
        return;
    }

    const { title, status, star_rating, feedback_type, user, feedback_text, createdAt }: Feedback = feedback;

    if (!user) {
        console.log("No user found in feedback modal");
        return;
    }

    useEffect(() => {
        setChangeStatus(status);
        // setTeamMember("");
        // setReplyTemplate("")
    }, [feedback])

    return (
        <div
            onClick={onClose}
            className='w-full h-screen bg-[#00000050] absolute top-0 left-0 right-0 z-50 p-10 overflow-y-auto flex justify-center items-start'
        >
            <div
                className="w-full max-w-5xl py-4 rounded-2xl bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <header className='px-6 flex flex-row justify-between items-start'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-semibold text-lg'>{user.colorCode}</h1>
                        <span className='text-gray-600 text-sm'>{feedback_type} by {user.firstName + " " + user.lastName}</span>
                    </div>

                    <button onClick={onClose} className="cursor-pointer rounded-full hover:bg-black hover:text-white transition-colors p-2 ">
                        <IoCloseSharp />
                    </button>
                </header>

                <hr className='text-gray-400 mt-4' />

                <div className='px-6 pt-6 flex flex-row gap-4'>
                    <section className='w-4/6'>
                        <span className={`${feedback_type == "Bug Report" ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-500"} py-2 px-3 rounded-lg font-semibold text-xs`}>
                            {feedback_type}
                        </span>
                        <p className='font-semibold text-lg mt-2'>{title}</p>
                        <p className='text-sm text-gray-500'>{formatDate(createdAt)}</p>

                        <p className='font-semibold text-sm mt-6 mb-2'>Issue feedback_text</p>
                        <p className='text-sm'>{feedback_text}</p>

                        {feedback.attached_file &&
                            <>
                                <p className='font-semibold text-sm mt-6 mb-2'>Screenshot</p>

                                <div className="relative w-full min-h-44 max-h-48 overflow-hidden rounded-xl">
                                    <img src={feedback.attached_file} alt="Screenshot" className='h-full object-cover w-full rounded-xl' />

                                    <div className='bg-[#00000050] w-full h-full rounded-xl flex justify-center items-center absolute top-0 left-0 right-0'>
                                        <button className='text-white border-[2px] bg-[#FFFFFF20] font-medium hover:bg-black transition-colors cursor-pointer border-white rounded-lg px-3 py-2 flex flex-row gap-2 items-center'>
                                            <HiOutlineDownload />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </>
                        }

                        <div className="mt-6 border border-gray-300 rounded-xl py-3">
                            <h1 className='font-semibold text-base px-3'>User Information</h1>

                            <hr className='text-gray-300 my-3' />

                            <div className="flex flex-row justify-between items-center w-full px-3">
                                <UserNameAndId user={user} />

                                <div className="flex flex-row items-center gap-3">
                                    <p className='text-gray-600 text-sm'>Rater by user:</p>
                                    <StarRating rating={star_rating} />
                                </div>
                            </div>

                            <div className='px-3 flex flex-row gap-x-4 mt-4'>
                                <div className='flex flex-col gap-1 min-w-1/3 max-w-full'>
                                    <p className='text-sm font-medium'>Mail</p>
                                    <p className='text-sm'>{user.email}</p>
                                </div>
                                <div className='flex flex-col gap-1 min-w-1/3 max-w-full'>
                                    <p className='text-sm font-medium'>Plan</p>
                                    <p className='text-sm'>{user.currentPlan}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='w-2/6 min-h-full border border-gray-300 rounded-xl p-3'>
                        <p className='text-sm font-semibold mb-1'>Assign to</p>
                        <div className='flex flex-row items-center relative'>
                            <select
                                name="team member"
                                id=""
                                value={teamMember}
                                className="text-sm border border-gray-300 rounded-lg cursor-pointer w-full px-3 py-2 appearance-none"
                                onChange={(e) => setTeamMember(e.target.value)}
                            >
                                <option value="Open" disabled>Select Team Member</option>
                                <option value="In Review">Abhishek</option>
                                <option value="In Review">Vatsal</option>
                                <option value="In Progress">Neha Kumari</option>
                            </select>

                            <HiOutlineChevronDown className='text-lg absolute right-4' />
                        </div>

                        <p className='text-sm font-semibold mb-1 mt-4'>Status</p>
                        <div className='flex flex-row items-center relative'>
                            <select
                                name="status"
                                id=""
                                value={changeStatus}
                                className="text-sm border border-gray-300 rounded-lg cursor-pointer w-full px-3 py-2 appearance-none"
                                onChange={(e) => setChangeStatus(e.target.value)}
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="In Review">In Review</option>
                            </select>

                            <HiOutlineChevronDown className='text-lg absolute right-4' />
                        </div>

                        <p className='text-sm font-semibold mb-1 mt-4'>Internal Notes</p>
                        <textarea
                            name="internal notes"
                            id=""
                            className="border border-gray-300 text-sm rounded-lg p-3 resize-none w-full min-h-32"
                            placeholder='Enter Notes'
                        />

                        <p className='text-sm font-semibold mb-1 mt-4'>Reply to User</p>
                        <div className='flex flex-row items-center relative'>
                            <select
                                name="template"
                                id=""
                                value={replyTemplate}
                                className="text-sm border border-gray-300 rounded-lg cursor-pointer w-full px-3 py-2 appearance-none"
                                onChange={(e) => setReplyTemplate(e.target.value)}
                            >
                                <option value="Select Template" disabled>Select Template</option>
                                <option value="Templae 1">Templae 1</option>
                                <option value="Template 2">Template 2</option>
                            </select>

                            <HiOutlineChevronDown className='text-lg absolute right-4' />
                        </div>
                        <textarea
                            name="response"
                            id=""
                            className="mt-2 border border-gray-300 text-sm rounded-lg p-3 resize-none w-full min-h-32"
                            placeholder='Type Response'
                        />

                        <button className='mt-4 cursor-pointer w-fit text-sm font-medium border border-[#643EFF] text-[#643EFF] hover:bg-[#643EFF] hover:text-white transition-colors px-3 py-2 rounded-xl'>
                            Send Reply
                        </button>
                    </section>
                </div>

                <hr className='text-gray-300 my-6' />

                <div className="flex flex-row justify-end items-center gap-4 px-6">
                    <button onClick={onClose} className="py-3 px-8 cursor-pointer border border-gray-400 hover:text-white hover:bg-gray-400 transition-colors rounded-xl text-gray-600">Cancel</button>
                    <button className="py-3 px-8 cursor-pointer bg-[#643EFF] hover:bg-[#661EFF] transition-colors rounded-xl text-white">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackModal