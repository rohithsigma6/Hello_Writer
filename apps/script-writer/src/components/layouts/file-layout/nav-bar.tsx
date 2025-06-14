import React, { useState, useEffect, useRef } from 'react';
import importicon from '@/assets/import-drop-icon.svg';
import exporticon from '@/assets/export-drop-icon.svg';
import laptopicon from '@/assets/laptop-icon.svg';
import cowritericon from '@/assets/ai-co-writer-img.svg';
import videocallicon from '@/assets/videocall-icon.svg';
import profileicon from '@/assets/profile-icon.svg';
import calendarIcon from '@/assets/calendar.svg';
import contactsIcon from '@/assets/contacts.svg';
import PopupCreateFileInFile from './models/CreateFile';
import OpenProjectModel from './models/OpenProjectModel';
import SaveProjectModel from './models/SaveProjectModel';
import SetExternalBackups from './models/SetExternalBackups';
import DeleteFile from './models/DeleteFile';
import ImportModel from './models/ImportModel';
import ExportFiles from './models/ExportFile';
import PrintProjectModel from './models/PrintProjectModel';
import NonSpeakingCharacter from './models/NonSpeakingCharacter';
import PinBookmarkmodel from './models/PinBookmarkmodel';
import SmartType from './models/SmartType';
import FormatAssistantmodel from './models/FormatAssistantmodel';
import SpellCheck from './models/SpellCheck';
import GrammarCheck from './models/GrammarCheck';
import NamesDatabase from './models/NamesDatabase';
import ShareFilePopup from './models/file-share-popup';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import UserProfileDropdown from '@/features/dashboard/components/user-profile-dropdown';
import ReferFriend from '@/features/dashboard/components/refer-friend-modal';
import { MdCloudDone, MdTextFields } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { useFile } from '@/features/file/screenplay/api/get-file-by-id';
import TextField from './rename-field';
import { useRenameFile } from '@/features/dashboard/api/rename-file';
import { enqueueSnackbar } from 'notistack';
import FindReplaceModal from './models/FindAndReplace';
import VideoCallModal from './models/VideoCallModal';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { IoChevronDown } from 'react-icons/io5';
import ProfileSettings from '@/features/dashboard/profile/profile-setting';

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: any }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div>{children}</div>
    </div>
  );
};

interface DropdownProps {
  title: string;
  items: any;
  onItemClick: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, items, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { fileId } = useParams<{ fileId: string }>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitchToggle = (label: string) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [label]: !prevStates[label],
    }));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border-r border-gray-300 font-semibold text-gray-800"
      >
        {title}
      </button>

      {isOpen && (
        <ul className="options-dropdown absolute top-0 left-0 rounded-2xl shadow-lg custome-drop-down custome-top-drop">
          {items.map((item: any, index: number) => {
            const isString = typeof item === "string";
            const label = isString ? item : item.label;

            return (
              <>
                {/* @ts-ignore */}
                <Link
                  key={index}
                  to={
                    label === "Script Lining" && fileId
                      ? `/${fileId}/script-lining`
                      : "#"
                  }
                >
                  <li
                    className={
                      "options-button px-3 py-2.5 cursor-pointer hover:bg-black text-xs cu-li flex gap-2 items-center" +
                      ` ${index === 0 ? "rounded-tl-lg" : index === items.length - 1 ? "rounded-b-lg" : ""}`
                    }
                    onClick={() => isString ? onItemClick(item) : onItemClick(item.label)}
                  >
                    {isString ? (
                      label
                    ) : (
                      <>
                        {label}
                        {item.icon && (
                          <img
                            src={item.icon}
                            alt={label}
                            className="w-4 h-4 ml-auto"
                          />
                        )}
                        {item.type === "switch" && (
                          <label className="ml-auto flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={switchStates[label] || false}
                              onChange={() => handleSwitchToggle(label)}
                            />
                            <span
                              className="w-10 h-5 bg-gray-300 rounded-full relative"
                              style={{
                                backgroundColor: switchStates[label]
                                  ? "#42BA7B"
                                  : "#ccc",
                              }}
                            >
                              <span
                                className="absolute w-4 h-4 bg-white rounded-full transition-transform -translate-y-1/2"
                                style={{
                                  transform: switchStates[label]
                                    ? "translate(24px,10%)"
                                    : "translate(0px,10%)",
                                }}
                              ></span>
                            </span>
                          </label>
                        )}
                      </>
                    )}
                  </li>
                </Link>
              </>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const Navbar = () => {
  const [editTitle, setEditTitle] = useState(false);
  const [profileSetting, setProfileSetting] = useState(false);
  const [displayReferFriend, setDisplayReferFriend] = useState(false);
  const [newFilePopup, setNewFilePopup] = useState(false);
  const [OpenProjectModelFile, setOpenProjectModelFile] = useState(false);
  const [SaveProjectModelFile, setSaveProjectModelFile] = useState(false);
  const [SetExternalBackupsFile, setSetExternalBackupsFile] = useState(false);
  const [SetDeleteFileFile, setDeleteFile] = useState(false);
  const [SetImportModelFiles, setImportModelFile] = useState(false);
  const [exportFile, setExportFile] = useState(false);
  const [SetPrintProjectModel, setPrintProjectModel] = useState(false);
  const [SetNonSpeakingCharacterModel, setNonSpeakingCharacterModel] =
    useState(false);
  const [SetPinBookmarkmodel, setPinBookmarkmodel] = useState(false);
  const [SetSmartTypemodel, setSmartTypemodel] = useState(false);
  const [SetFormatAssistantmodel, setFormatAssistantmodel] = useState(false);
  const [SetSpellCheckmodel, setSpellCheckmodel] = useState(false);
  const [SetGrammarCheckmodel, setGrammarCheckmodel] = useState(false);
  const [SetNamesDatabasemodel, setNamesDatabasemodel] = useState(false);
  const [shareFilePopupOpen, setShareFilePopupOpen] = useState(false);
  const [findAndReplaceModal, setFindAndReplaceModal] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [title, setTitle] = useState('');
  const navigate = useNavigate()
  const { fileId } = useParams();
  const { data: fileData } = useFile({
    fileId: fileId!,
    queryConfig: {
      enabled: !!fileId,
    },
  });
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  useEffect(() => {
    setTitle(fileData?.file?.title || '');
  }, [fileData?.file?.title]);
  const { mutate: handleRenameFile } = useRenameFile({
    mutationConfig: {
      onSuccess: () => {
        enqueueSnackbar('File Rename successful', { variant: 'success' });
      },
      onError: () => {
        //   setIsRenameModalOpen(false);
      },
    },
  });

  const onRename = () => {
    handleRenameFile({ updatedName: title, fileId: fileData?.file?._id! });
  };
  const fileMenuItems = [
    'New Project',
    'Open Project',
    'Open Recent',
    'Save Project',
    'Set External Backups',
    'Delete Project',
    { label: 'Import', icon: importicon },
    { label: 'Export', icon: exporticon },
    'Print & Preview',
    'Close Tab',
    'Close All Tabs Except Current',
  ];

  const insertMenuItems = [
    'Page Break',
    'Non Speaking Character',
    'Pin/Bookmark',
    'Script Note',
  ];

  const toolsMenuItems = [
    'Find and Replace',
    'Smart Type',
    'Format Assistant',
    'Spell Check',
    'Grammar Check',
    'Script Coverage',
    'Names Databases',
  ];

  const scriptmodeMenuItems = [
    { label: 'View', type: 'switch' },
    { label: 'Editing', type: 'switch' },
    { label: 'Suggesting', type: 'switch' },
    { label: 'Page Numbers', type: 'switch' },
    { label: 'Table Read', type: 'switch' },
    { label: 'Plot Diagnostics', type: 'switch' },
    'Presentation',
    'Whiteboard',
  ];

  const productionMenuItems = [
    'Script Breakdown',
    'Breakdown Reports',
    'Script Lining',
    { label: 'Eight of a Page', type: 'switch' },
    { label: 'Time Estimation', type: 'switch' },
    { label: 'Page Numbers', type: 'switch' },
    { label: 'Scene Numbers', type: 'switch' },
    { label: 'Revision Mode', type: 'switch' },
    'Revisions',
    'Mark Revised',
    'Clear Revised',

    { label: 'Lock Pages', type: 'switch' },
    'Reports',
  ];

  const handleMenuClick = (item: string) => {
    console.log('item', item);

    if (item == "Script Breakdown") {
      navigate(`/${fileId}/script-breakdown`)
    }
    if (item === 'New Project') {
      setNewFilePopup(true);
    }
    if (item === 'Open Project') {
      setOpenProjectModelFile(true);
    }
    if (item === 'Save Project') {
      setSaveProjectModelFile(true);
    }
    if (item === 'Set External Backups') {
      setSetExternalBackupsFile(true);
    }
    if (item === 'Delete Project') {
      setDeleteFile(true);
    }
    if (item === 'Import') {
      setImportModelFile(true);
    }
    if (item === 'Export') {
      setExportFile(true);
    }
    if (item === 'Print & Preview') {
      setPrintProjectModel(true);
    }
    if (item === 'Non Speaking Character') {
      setNonSpeakingCharacterModel(true);
    }
    if (item === 'Pin/Bookmark') {
      setPinBookmarkmodel(true);
    }
    if (item === 'Smart Type') {
      setSmartTypemodel(true);
    }
    if (item === 'Format Assistant') {
      setFormatAssistantmodel(true);
    }
    if (item === 'Spell Check') {
      setSpellCheckmodel(true);
    }
    if (item === 'Grammar Check') {
      setGrammarCheckmodel(true);
    }
    if (item === 'Names Databases') {
      setNamesDatabasemodel(true);
    }
    if (item === 'Find and Replace') {
      setFindAndReplaceModal(true);
    }
  };

  const handleClosePopup1 = () => {
    setNewFilePopup(false);
  };
  const handleClosePopup2 = () => {
    setOpenProjectModelFile(false);
  };
  const handleClosePopup3 = () => {
    setSaveProjectModelFile(false);
  };
  const handleClosePopup4 = () => {
    setSetExternalBackupsFile(false);
  };
  const handleClosePopup5 = () => {
    setDeleteFile(false);
  };
  const handleClosePopup6 = () => {
    setImportModelFile(false);
  };
  const handleClosePopup7 = () => {
    setExportFile(false);
  };
  const handleClosePopup8 = () => {
    setPrintProjectModel(false);
  };

  const handleClosePopup9 = () => {
    setNonSpeakingCharacterModel(false);
  };

  const handleClosePopup10 = () => {
    setPinBookmarkmodel(false);
  };

  const handleClosePopup11 = () => {
    setSmartTypemodel(false);
  };
  const handleClosePopup12 = () => {
    setFormatAssistantmodel(false);
  };
  const handleClosePopup13 = () => {
    setSpellCheckmodel(false);
  };
  const handleClosePopup14 = () => {
    setGrammarCheckmodel(false);
  };

  const handleClosePopup15 = () => {
    setNamesDatabasemodel(false);
  };

  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client) return;
    console.log("hello-------------------------");
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      // setCallDetails(call);
      console.log(call);
      // Add the call_id to the URL query parameters
      // navigate({
      //   pathname: `/file/${fileId}/screenplay`,
      //   search: `?call_id=${id}`,
      // });
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const [scriptLiningActive, setScriptLiningActive] = useState(false)
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname.includes("script-lining")) {
      setScriptLiningActive(true);
    } else {
      setScriptLiningActive(false)
    }
  }, [location]);

  return (
    <>
    <nav className="w-full h-[10vh] bg-white font-poppins px-8 py-4 flex flex-row items-center justify-between border-b text-sm">
      <div className="__title flex flex-col items-start">
        <h2 className="text-[#BABABF] font-semibold text-[14px] mb-[8px]">
          Project Title
        </h2>
        <span className="flex flex-row gap-1 items-center">
          {editTitle ? (
            <TextField title={title} setTitle={setTitle} />
          ) : (
            <h1 className="text-lg text-[#212131] font-semibold m-0">
              {fileData?.file?.title}
            </h1>
          )}
          {!editTitle ? (
            <>
              {/* @ts-ignore */}
              < FiEdit3
                className="text-lg text-[#9999A0] cursor-pointer hover:text-black"
                onClick={() => setEditTitle(true)}
              />
            </>
          ) : (
            <>
              {/* @ts-ignore */}
              <MdCloudDone
                className="text-2xl text-[#9999A0] cursor-pointer hover:text-black"
                onClick={() => {
                  setEditTitle(false);
                  onRename();
                }}
              />
            </>
          )}
        </span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="__navsButtons flex flex-row items-center">
          <button className="flex flex-row items-center pr-[16px] py-[3px] gap-2 border-r-[1px] border-[#E9E9EA]">
            <img src={laptopicon} alt="" />
            {/* @ts-ignore */}
            <Link
              to="/dashboard"
              className="font-semibold text-[#212131] text-[14px] leading-4 font-poppins"
            >
              Dashboard
            </Link>
          </button>

          {!scriptLiningActive ?
            <>
              <Dropdown
                title="File"
                items={fileMenuItems}
                onItemClick={handleMenuClick}
              />
              <Dropdown
                title="Insert"
                items={insertMenuItems}
                onItemClick={handleMenuClick}
              />
              <Dropdown
                title="Tools"
                items={toolsMenuItems}
                onItemClick={handleMenuClick}
              />
              <Dropdown title="Script Mode" items={scriptmodeMenuItems} onItemClick={() => { }} />
              <Dropdown title="Production" items={productionMenuItems} onItemClick={() => { }} />
            </> :
            <>
              <button className="flex flex-row items-center px-[16px] py-[3px] gap-2 border-r-[1px] border-[#E9E9EA]">
                <img src={calendarIcon} alt="" />
                {/* @ts-ignore */}
                <Link
                  to="#"
                  className="font-semibold text-[#212131] text-[14px] leading-4 font-poppins"
                >
                  Calendar
                </Link>
              </button>
              <button className="flex flex-row items-center px-[16px] py-[3px] gap-2 border-r-[1px] border-[#E9E9EA]">
                <img src={contactsIcon} alt="" />
                {/* @ts-ignore */}
                <Link
                  to="#"
                  className="font-semibold text-[#212131] text-[14px] leading-4 font-poppins"
                >
                  Contacts
                </Link>
              </button>
            </>
          }
        </div>

        <div className="__moreOptions flex flex-row items-center gap-2">
          {!scriptLiningActive ?
            <button className="flex flex-row items-center gap-1 p-[8px] rounded-full bg-[#42BA7B]">
              <span className="text-white text-lg">
                <img src={cowritericon} alt="" />
              </span>
              <p className="text-white text-xs font-medium">Ai Co-writer</p>
            </button>
            :
            <>
              <button className="flex flex-row items-center gap-1 p-[8px] rounded-full bg-[#42BA7B]">
                <span className="text-white text-lg">
                  <img src={cowritericon} alt="" />
                </span>
                <p className="text-white text-xs font-medium">Ai Production Assistant</p>
              </button>
            </>
          }

          <button className="bg-[#E7EDF3] py-2 px-4 gap-2 flex flex-row items-center rounded-full">
            <CallButton />
          </button>
          {/* <button
             onClick={() => createMeeting()}
            className="p-[8px] gap-2 flex flex-row items-center rounded-[24px] navbar-top-left-icon"
          >
            <span className="text-sm border-indigo-300 h-full">
              <img src={videocallicon} alt="video call" />
            </span>
          </button> */}
          <button
            onClick={() => setShareFilePopupOpen(true)}
            className="p-[8px] gap-2 flex flex-row items-center rounded-[24px] navbar-top-left-icon"
          >
            <p className="text-sm font-semibold">Share</p>
          </button>
        </div>

        <UserProfileDropdown
          setProfileSetting={setProfileSetting}
          setDisplayReferFriend={setDisplayReferFriend}
        />
      </div>

      <PopupCreateFileInFile
        isOpen={newFilePopup}
        onClose={handleClosePopup1}
      />
      <OpenProjectModel
        isOpen={OpenProjectModelFile}
        onClose={handleClosePopup2}
      />
      <SaveProjectModel
        isOpen={SaveProjectModelFile}
        onClose={handleClosePopup3}
      />
      <SetExternalBackups
        isOpen={SetExternalBackupsFile}
        onClose={handleClosePopup4}
      />
      <DeleteFile isOpen={SetDeleteFileFile} onClose={handleClosePopup5} />
      <ImportModel isOpen={SetImportModelFiles} onClose={handleClosePopup6} />
      <ExportFiles isOpen={exportFile} onClose={handleClosePopup7} />
      <PrintProjectModel
        isOpen={SetPrintProjectModel}
        onClose={handleClosePopup8}
      />
      <NonSpeakingCharacter
        isOpen={SetNonSpeakingCharacterModel}
        onClose={handleClosePopup9}
      />
      <PinBookmarkmodel
        isOpen={SetPinBookmarkmodel}
        onClose={handleClosePopup10}
      />
      <FindReplaceModal
        isOpen={findAndReplaceModal}
        setIsOpen={setFindAndReplaceModal}
      />
      <SmartType isOpen={SetSmartTypemodel} onClose={handleClosePopup11} />
      <FormatAssistantmodel
        isOpen={SetFormatAssistantmodel}
        onClose={handleClosePopup12}
      />
      <SpellCheck isOpen={SetSpellCheckmodel} onClose={handleClosePopup13} />
      <GrammarCheck
        isOpen={SetGrammarCheckmodel}
        onClose={handleClosePopup14}
      />
      <NamesDatabase
        isOpen={SetNamesDatabasemodel}
        onClose={handleClosePopup15}
      />
      <ShareFilePopup
        open={shareFilePopupOpen}
        setOpen={setShareFilePopupOpen}
      />
      <GrammarCheck
        isOpen={SetGrammarCheckmodel}
        onClose={handleClosePopup14}
      />
      <NamesDatabase
        isOpen={SetNamesDatabasemodel}
        onClose={handleClosePopup15}
      />
      <VideoCallModal
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
      />
      {displayReferFriend && (
        <ReferFriend
          displayReferFriend={displayReferFriend}
          setDisplayReferFriend={setDisplayReferFriend}
        />
      )}
      
    </nav>
      <ProfileSettings profileSetting={profileSetting} setProfileSetting={setProfileSetting} />
      </>
  );
};
function CallButton() {
  const [callDetails, setCallDetails] = useState<any | null>(null);
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const navigate = useNavigate();
  // const { user } = useUser();
  const { fileId } = useParams();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    // if (!client || !user) return;

    console.log("hello-------------------------");
    try {
      const id = crypto.randomUUID();
      const call = client?.call("default", id);
      console.log("sasa", client);

      if (!call) throw new Error("Failed to create call");

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);
      console.log(call);
      // Add the call_id to the URL query parameters
      navigate({
        pathname: `/file/${fileId}/screenplay`,
        search: `?call_id=${id}`,
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };
  return (
    <span className={"text-sm  flex flex-row items-center gap-2 border-indigo-300 h-full"} onClick={() => createMeeting()}>
      <img src={videocallicon} alt="video call" />
      {/* @ts-ignore */}
      <IoChevronDown />
    </span>
  );
}
export default Navbar;
