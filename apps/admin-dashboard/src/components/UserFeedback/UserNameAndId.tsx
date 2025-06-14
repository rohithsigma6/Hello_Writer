/* eslint-disable no-constant-binary-expression */
// import React from 'react'

interface User {
    firstName: string;
    lastName: string;
    colorCode: string;
    email: string;
    currentPlan: string
}

const UserNameAndId = ({ user }: { user: User }) => {
    if (!user) {
        console.log("No user found in user name and Id compo");
        return;
    }

    const { firstName, lastName, colorCode } = user;

    return (
        <div className="flex flex-row gap-3 items-center">
            <div
                style={{ backgroundColor: `${colorCode}20`, color: colorCode }}
                className={`px-2 py-1.5 font-medium text-xs rounded-full`}>
                {firstName?.slice(0, 1) + lastName?.slice(0, 1)}
            </div>

            <span className='font-medium text-sm'>{firstName ?? "" + "" + lastName ?? ""}</span>
            <span className='bg-gray-300 text-gray-700 rounded-md px-2 py-1 text-xs'>{colorCode}</span>
        </div>
    )
}

export default UserNameAndId