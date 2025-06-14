import React, { useEffect, useRef, useState } from 'react';
import Logo from '@/assets/navbar/logo.svg';
import { FiBell, FiSearch } from 'react-icons/fi';
import folderIcon from '@/assets/dashboard/side-bar-icon/new-folder-icon.svg';
import fileIcon from '@/assets/dashboard/side-bar-icon/new-file-icon.svg';
import UserProfileDropdown from '../user-profile-dropdown';
import ReferFriend from '../refer-friend-modal';
import CreateFileModal from '../files/create-file-modal';
import CreateFolderModal from '../folders/create-folder-modal';
import ProfileSettings from '../../profile/profile-setting';

const DashboardNavbar = () => {
  const [profileSetting, setProfileSetting] = useState(false);
  const [displayReferFriend, setDisplayReferFriend] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [create, setCreate] = useState(false);
  const [type, setType] = useState<'import' | ''>('');
  const [createFolder, setCreateFolder] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCreate = (type: 'import' | '') => {
    if (type === 'import') {
      setCreate(true);
      setType('import');
    } else {
      setCreate(true);
      setType('');
    }
  };

  return (
    <React.Fragment>
      <div
        className={
          'w-full h-[10vh] bg-white font-poppins px-8 py-3 flex flex-row items-center justify-between border-b'
        }
        ref={dropdownRef}
      >
        <section className={'flex flex-row gap-6 items-start'}>
          <img src={Logo} alt="ScreePlay.INK" className="object-contain" />
        </section>

        <section className={'flex flex-row items-center gap-2'}>
          <div className="flex flex-row items-center relative">
            <input
              type="text"
              name="search"
              className="w-[260px] pl-4 py-2 rounded-2xl bg-[#E9E9EA]"
              placeholder="Search"
            />
            <FiSearch className="absolute right-0 mr-3 text-lg" />
          </div>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="bg-black text-white px-6 py-2 rounded-full font-medium"
            >
              New +
            </button>

            {isDropdownOpen && (
              <div className="absolute -left-2 mt-2 w-60 bg-white shadow-lg z-10 px-[12px] py-[20px] border border-[#C8C6D3] rounded-[16px]">
                <div className="absolute top-[-6px] left-[20%] transform -translate-x-1/3">
                  <div className="w-3 h-3 bg-white border-l border-t border-[#C8C6D3] transform rotate-45"></div>
                </div>

                <p className="text-[19px] font-semibold mb-2">Select Type</p>
                <button
                  className="w-full px-4 py-3 mb-2 flex items-center justify-center gap-2 text-center text-white bg-primary-blue hover:bg-blue-700 transition-colors duration-300 rounded-lg"
                  onClick={() => handleCreate('')}
                >
                  <img src={fileIcon} className="h-[22px] w-[22px]" />
                  <span className="text-[16px] font-medium">New File</span>
                </button>
                <button
                  className="w-full px-4 py-3 flex items-center justify-center gap-2 text-center text-sm font-semibold text-white bg-custom-pink hover:bg-blue-700 transition-colors duration-300 rounded-lg"
                  onClick={() => setCreateFolder(true)}
                >
                  <img src={folderIcon} className="h-[22px] w-[22px]" />
                  <span className="text-[16px] font-medium">New Folder</span>
                </button>
              </div>
            )}
          </div>
          <button
            className="bg-white text-black px-6 p py-2 rounded-full font-medium border border-black"
            onClick={() => handleCreate("import")}
          >
            Import
          </button>
          <button className="rounded-full border border-black p-3">
            <FiBell />
          </button>

          <UserProfileDropdown
            setProfileSetting={setProfileSetting}
            setDisplayReferFriend={setDisplayReferFriend}
          />
        </section>
      </div>

      {displayReferFriend && (
        <ReferFriend
          displayReferFriend={displayReferFriend}
          setDisplayReferFriend={setDisplayReferFriend}
        />
      )}
      {create && type === '' && (
        <CreateFileModal isOpen={create} setIsOpen={setCreate} />
      )}
      {create && type === 'import' && (
        <CreateFileModal type="import" isOpen={create} setIsOpen={setCreate} />
      )}
      {createFolder && (
        <CreateFolderModal isOpen={createFolder} setIsOpen={setCreateFolder} />
      )}
      
      <ProfileSettings profileSetting={profileSetting} setProfileSetting={setProfileSetting} />
    </React.Fragment>
  );
};

export default DashboardNavbar;
