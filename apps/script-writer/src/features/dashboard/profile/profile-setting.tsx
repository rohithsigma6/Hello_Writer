import React, { useEffect, useState, useContext } from "react";
import ProfessionalInfo from "./Compos/ProfessionalInfo";
import BasicInfo from "./Compos/BasicInfo";
import PersonalPerefences from "./Compos/PersonalPerefences";
import ScreennwritingStyle from "./Compos/ScreennwritingStyle";
import NetworkingGoals from "./Compos/NetworkingGoals";
import KYCVerification from "./Compos/KYCVerification";
import Billing from "./Compos/Billing";

import TwoFactorAuthPopUp from "./PopUps/TwoFactorAuthPopUp";
import { Subscriptions } from "./Compos/Subscriptions";
import TwoFactorAuthConformation from "./PopUps/TwoFactorAuthConformation";
import WritingGoal from "./Compos/WritingGoal/WritingGoal";

const ProfileSettings = ({
  profileSetting,
  setProfileSetting,
}: {
  profileSetting: boolean;
  setProfileSetting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const className = "ProfileSettings";
  const [activeTab, setActiveTab] = useState("Basic Information");
  const [setupNow, setSetupNow] = useState(false);
  const [setupConfirm, setSetupConfirm] = useState(false);

  const navigations = [
    "Basic Information",
    "Professional Information",
    "Personal Preferences",
    "Screennwriting Style & Type",
    "Writing Goals",
    "Networking Goals",
    "KYC Verification",
    "Subscriptions",
    "Billing History",
  ];

  useEffect(() => {
    if (profileSetting || setupNow) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    // Clean up to reset the overflow style when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [profileSetting, setupNow]);

  function OpenActiveTab(name: string) {
    switch (name) {
      case "Basic Information":
        return (

          <BasicInfo setProfileSetting={setProfileSetting} setSetupNow={setSetupNow} />

        );

      case "Professional Information":
        return (

          <ProfessionalInfo setProfileSetting={setProfileSetting} />

        );

      case "Personal Preferences":
        return (

          <PersonalPerefences setProfileSetting={setProfileSetting} />

        );

      case "Screennwriting Style & Type":
        return (

          <ScreennwritingStyle setProfileSetting={setProfileSetting} />

        );

      // case "Screenwriter Type":
      //   return (

      //       <ScreenwriterType setProfileSetting={setProfileSetting} />

      //   );

      case "Writing Goals":
        return <WritingGoal />

      case "Networking Goals":
        return (

          <NetworkingGoals setProfileSetting={setProfileSetting} />

        );

      case "KYC Verification":
        return (

          <KYCVerification setProfileSetting={setProfileSetting} />

        );

      case "Subscriptions":
        return (

          <Subscriptions />

        );

      case "Billing History":
        return (

          <Billing />

        );

      default:
        return (

          <BasicInfo setProfileSetting={setProfileSetting} setSetupNow={setSetupNow} />

        );
    }
  }

  return (
    <React.Fragment>
      <div
        className={
          className +
          " " +
          `${profileSetting ? "block " : "hidden "}` +
          "py-16 px-20 z-50 w-full h-full fixed top-0 bg-[#0000004f] overflow-auto font-poppins"
        }
        onClick={() => setProfileSetting(false)}
      >
        <div onClick={(e) => e.stopPropagation()} className="bg-white w-full rounded-2xl px-4 py-2">
          <nav className="flex flex-row items-center justify-between gap-3">
            {navigations.map((tabName, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tabName)}
                className={
                  `${tabName === activeTab ? "border-b-2 text-primary-blue border-primary-blue" : "text-black"}` +
                  " " +
                  "font-semibold py-3 text-sm"
                }
              >
                {tabName}
              </button>
            ))}
          </nav>

          {OpenActiveTab(activeTab)}
        </div>
      </div>

      {/**Outside of Profile settings */}

      {setupNow && <TwoFactorAuthPopUp setupNow={setupNow} setSetupNow={setSetupNow} setSetupConfirm={setSetupConfirm} />}
      {setupConfirm && <TwoFactorAuthConformation setupConfirm={setupConfirm} setSetupConfirm={setSetupConfirm} setProfileSetting={setProfileSetting} />}

    </React.Fragment>
  );
};

export default ProfileSettings;
