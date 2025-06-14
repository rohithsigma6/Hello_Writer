// import React from 'react'

import Aside from "@/components/Aside";
import NavBar from "../components/NavBar"
import { useState } from "react";
import DashboardOverview from "@/components/DashboardOverview/DashboardOverview";
import UserManagement from "@/components/UserManagement/UserManagement";
import DeActivateUser from "@/components/UserManagement/DeActivateAccount";
import UserFeedback from "@/components/UserFeedback/UserFeedback";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard Overview");
  const [showDeactivateModal, setShowDeactivateModal] = useState("");

  function closeDeactivateModal() {
    setShowDeactivateModal("")
  }

  return (
    <div className="w-full min-h-screen bg-[#F2F1F5]">
      <NavBar />

      <div className="flex flex-row overflow-hidden max-h-[90vh]">
        <Aside activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-6 flex-1 overflow-y-scroll">
          {activeTab === "Dashboard Overview" ?
            <DashboardOverview /> :
            activeTab === "User Management" ?
              <UserManagement setShowDeactivateModal={setShowDeactivateModal} /> :
              activeTab === "User Feedback" ?
                <UserFeedback /> :
                ""
          }
        </div>
      </div>

      {showDeactivateModal !== "" &&
        <div
          // onClick={() => setShowDeactivateModal("")}
          className="fixed bg-[#0000004f] z-50 top-0 w-screen min-h-screen flex items-center justify-center overflow-auto p-8"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <DeActivateUser showDeactivateModal={showDeactivateModal} closeDeactivateModal={closeDeactivateModal} />
          </div>
        </div>}
    </div>
  )
}

export default Dashboard;