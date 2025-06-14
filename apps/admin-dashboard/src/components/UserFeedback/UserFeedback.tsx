import { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { HiOutlineDownload } from "react-icons/hi";
import DropDown from '../DropDown';
import FeedbackCard from './FeedbackCard';
import { useAdminFeedbacks } from './api/getFeedbacks';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Pagination {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}

const UserFeedback = () => {
    const [type, setType] = useState<string>("All");
    const [status, setStatus] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("Latest");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 3;

    const { data, isLoading, refetch } = useAdminFeedbacks({
        type,
        status,
        sortBy,
        page: currentPage,
        limit,
    })

    const feedbacksList = data?.feedbacks ?? [];
    const pagination: Pagination = data?.pagination ?? {
        limit,
        page: currentPage,
        total: 0,
        totalPages: 1,
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [type, status, sortBy]);

    useEffect(() => {
        refetch();
    }, [currentPage, type, status, sortBy]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pagination.totalPages) {
            setCurrentPage(page);
        }
    };

    const visiblePageCount = 10;
    const startPage = Math.floor((pagination.page - 1) / visiblePageCount) * visiblePageCount + 1;
    const endPage = Math.min(startPage + visiblePageCount - 1, pagination.totalPages);


    return (
        <div className="p-6 bg-white rounded-2xl font-['Poppins']">
            <h1 className="font-semibold text-xl">User Feedback</h1>

            <section className='flex flex-row justify-between w-full items-start mt-6'>
                <div className="min-w-96 flex flex-row items-center relative">
                    <input type="text" placeholder='Search by keyword' name="search" id="" className='border text-sm w-full border-gray-300 rounded-xl p-2.5 pr-10' />
                    <FiSearch className="absolute right-4 text-lg" />
                </div>

                <button className='flex flex-row items-center gap-2 border border-gray-300 rounded-xl py-2 px-3 cursor-pointer hover:bg-gray-800 hover:text-white transition-colors'>
                    Export
                    <HiOutlineDownload />
                </button>
            </section>

            <section className="mt-6 flex flex-row gap-4 w-full items-center">
                <div className='flex flex-row gap-3 items-center font-medium text-nowrap'>
                    Type:
                    <DropDown setValue={setType} ArrayObj={["All", "Bug Report", "General Feedback","Feature Suggestion"]} />
                </div>
                <div className='flex flex-row gap-3 items-center font-medium text-nowrap'>
                    Status:
                    <DropDown setValue={setStatus} ArrayObj={["All", "In Progress", "In Review", "Open"]} />
                </div>
                <div className='flex flex-row gap-3 items-center font-medium text-nowrap'>
                    Sort By:
                    <DropDown setValue={setSortBy} ArrayObj={["Latest", "Oldest",]} />
                </div>
            </section>

            <section className="mt-6 flex flex-col gap-4">
                {isLoading ?
                    <div className='flex flex-col gap-4'>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className='bg-gray-200 h-40 w-full rounded-xl' />
                        ))}
                    </div>
                    :
                    feedbacksList.map((feedback: any) => (
                        <FeedbackCard feedback={feedback} key={feedback._id} />
                    ))}
            </section>

            {!isLoading &&
                <div className="flex flex-row justify-between items-center mt-4">
                    <p className="text-xs text-gray-700">
                        Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                        {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                        of {pagination.total} entries
                    </p>
                    <div className="flex items-center space-x-0.5 border border-gray-300 rounded-lg">
                        <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className="px-2 py-2 text-sm text-gray-600 hover:text-black disabled:text-gray-400 cursor-pointer"
                        >
                            <FaChevronLeft />
                        </button>
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((num) => (
                            <button
                                key={num}
                                onClick={() => handlePageChange(num)}
                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 hover:font-medium transition-colors ${pagination.page === num ? "bg-gray-100 font-medium" : ""
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page === pagination.totalPages}
                            className="px-2 py-2 text-sm text-gray-600 hover:text-black disabled:text-gray-400 cursor-pointer"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            }
        </div>
    )
};

export default UserFeedback