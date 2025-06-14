import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DropDown from "../DropDown";
import { useAdminUsers } from "./api/fetchUser";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface User {
    colorCode: string;
    initials: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    email: string;
    subscription?: {
        plan: string;
        createdAt: Date | string;
        status: string;
        plan_expiration?: Date | string;
    };
    createdAt: string | Date;
    deviceName: string;
    notes: string;
}

interface Pagination {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}

const UserDetails = ({
    setShowDeactivateModal,
}: {
    setShowDeactivateModal: (value: string) => void;
}) => {
    const [searchName, setSearchName] = useState("");
    const [planType, setPlanType] = useState("All");
    const [subsType, setSubsType] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;

    const { data, isLoading, refetch } = useAdminUsers({
        search: searchName,
        plan: planType,
        subscriptionStatus: subsType,
        page: currentPage,
        limit,
    });

    const allUsers: User[] = data?.users ?? [];
    const pagination: Pagination = data?.pagination ?? {
        limit,
        page: currentPage,
        total: 0,
        totalPages: 1,
    };

    useEffect(() => {
        setCurrentPage(1); // reset to page 1 when filters change
    }, [planType, subsType, searchName]);

    useEffect(() => {
        refetch();
    }, [currentPage, planType, subsType, searchName]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pagination.totalPages) {
            setCurrentPage(page);
        }
    };

    const visiblePageCount = 10;
    const startPage = Math.floor((pagination.page - 1) / visiblePageCount) * visiblePageCount + 1;
    const endPage = Math.min(startPage + visiblePageCount - 1, pagination.totalPages);

    return (
        <div className="p-4 flex-1 w-full border-[1px] border-gray-300 rounded-xl">
            <div className="flex flex-row justify-between">
                <h1 className="font-semibold text-lg">User Details</h1>
                <button className="cursor-pointer hover:underline text-[#643EFF] font-medium">
                    View
                </button>
            </div>

            <section className="flex flex-row justify-between items-center mt-4">
                <div className="flex flex-row items-center relative w-[35%]">
                    <input
                        onChange={(e) => setSearchName(e.target.value)}
                        value={searchName}
                        type="text"
                        name="name"
                        placeholder="Search by Name"
                        className="w-full text-sm pr-10 border border-gray-300 rounded-xl p-3"
                    />
                    <span className="text-lg absolute right-3">
                        <FiSearch />
                    </span>
                </div>

                <div className="flex flex-row gap-x-4 w-fit">
                    <div className="flex flex-row gap-2 items-center">
                        <p className="font-medium text-nowrap">Plan Type:</p>
                        <DropDown
                            setValue={setPlanType}
                            ArrayObj={["All", "BETA", "Regular", "Life Time"]}
                        />
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <p className="font-medium text-nowrap">Subscription Type:</p>
                        <DropDown
                            setValue={setSubsType}
                            ArrayObj={["All", "Active", "In Active"]}
                        />
                    </div>
                </div>
            </section>

            <section className="mt-4">
                {!isLoading ? (
                    <>
                        <UserTable
                            users={allUsers}
                            setShowDeactivateModal={setShowDeactivateModal}
                        />

                        {/* Pagination */}
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
                    </>
                ) : (
                    <div className="bg-gray-200 rounded-xl w-full h-80" />
                )}
            </section>
        </div>
    );
};

const UserTable = ({
    users,
    setShowDeactivateModal,
}: {
    users: User[];
    setShowDeactivateModal: (val: string) => void;
}) => {
    const [showOptions, setShowOptions] = useState<string | null>(null);

    const handleShowOptionsDrop = (id: string) => {
        setShowOptions((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !target.closest(".options-dropdown") &&
                !target.closest(".options-button")
            ) {
                setShowOptions(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="overflow-x-auto w-full pb-4">
            <div className="bg-white w-fit border border-gray-300 shadow rounded-xl">
                <table className="min-w-full text-left">
                    <thead className="bg-gray-200 text-gray-700 border-b border-gray-300 text-sm font-semibold">
                        <tr>
                            {[
                                "ID",
                                "Name",
                                "Email",
                                "Phone",
                                "Plan",
                                "Status",
                                "Signup",
                                "Start",
                                "End",
                                "Device",
                                "Notes",
                                "",
                            ].map((title, idx) => (
                                <th
                                    key={idx}
                                    className={`py-3 px-4 text-nowrap font-medium ${idx === 0 ? "rounded-tl-xl" : idx === 11 ? "rounded-tr-xl" : ""
                                        }`}
                                >
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td className="py-3 px-4 text-sm">{user.colorCode}</td>
                                    <td className="py-3 px-4 text-sm flex items-center gap-2">
                                        <div className="flex items-center gap-3">
                                            <div
                                                style={{
                                                    backgroundColor: `${user.colorCode}20`,
                                                    color: user.colorCode,
                                                }}
                                                className="min-w-8 w-8 min-h-8 rounded-full font-bold flex items-center justify-center text-sm">
                                                {user.firstName[0]}
                                                {user.lastName[0]}
                                            </div>

                                            <span className="text-sm text-nowrap font-medium text-gray-800">
                                                {user.firstName} {user.lastName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm">{user.email}</td>
                                    <td className="py-3 px-4 text-sm">{user.phoneNo}</td>
                                    <td className="py-3 px-4 text-sm">
                                        {user.subscription?.plan || "Free"}
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        <span
                                            className={`text-xs text-nowrap font-semibold px-3 py-1 rounded-full ${user.subscription?.status === "success"
                                                ? "text-[#2D8557] bg-[#e0ffef]"
                                                : "text-[#CE405C] bg-[#F6C6CF]"
                                                }`}
                                        >
                                            {user.subscription?.status === "success"
                                                ? "Active"
                                                : "In Active"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        {user.subscription?.createdAt
                                            ? new Date(user.subscription.createdAt).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        {user.subscription?.plan_expiration
                                            ? new Date(
                                                user.subscription.plan_expiration
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                    <td className="py-3 px-4 text-sm">{user.deviceName || "—"}</td>
                                    <td className="py-3 px-4 text-sm">{user.notes || "—"}</td>
                                    <td className="py-3 px-2 text-sm text-gray-900 sticky right-0 bg-white z-10">
                                        <button
                                            onClick={() => handleShowOptionsDrop(user.colorCode)}
                                            className="cursor-pointer text-xl options-button"
                                        >
                                            <PiDotsThreeOutlineVerticalFill />
                                        </button>
                                        {showOptions === user.colorCode && (
                                            <div className={"absolute w-fit right-10 z-50 border border-gray-300 rounded-2xl flex flex-col items-start bg-white shadow options-dropdown" + ` ${users.length - 2 <= index ? "bottom-5 rounded-br-[0]" : "top-10 rounded-tr-[0]"}`}>
                                                <button onClick={() => setShowDeactivateModal(user.colorCode)} className={"text-sm text-nowrap p-3 px-4 pr-6 border-b border-gray-300 w-full text-left hover:bg-gray-100 cursor-pointer" + ` ${users.length - 2 <= index ? "rounded-t-2xl" : "rounded-tl-2xl"}`}>
                                                    Deactivate Account
                                                </button>
                                                <button className={"text-sm text-nowrap p-3 px-4 pr-6 w-full text-left hover:bg-gray-100 cursor-pointer" + ` ${users.length - 2 <= index ? "rounded-bl-2xl" : "rounded-b-2xl"}`}>
                                                    Reset Password
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="py-3 px-4 text-sm text-gray-600" colSpan={12}>
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetails;
