// import React from 'react'

import OnboardNewUser from "./OnboardNewUser";
import UserDetails from "./UserDetails";

const UserManagement = ({ setShowDeactivateModal }: { setShowDeactivateModal: (value: string) => void; }) => {

    return (
        <div className="p-6 bg-white rounded-2xl font-['Poppins']">
            <h1 className="font-semibold text-xl">User Management</h1>

            <div className="mt-4 flex flex-col gap-4">
                <UserDetails setShowDeactivateModal={setShowDeactivateModal} />
                <OnboardNewUser />
            </div>
        </div>
    );
}
export default UserManagement;