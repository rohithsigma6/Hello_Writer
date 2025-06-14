import { useEffect, useRef, useState } from 'react';
import { GoPersonFill } from 'react-icons/go';
import { RiLinkM } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import comingSoon from '@/assets/dashboard/comingSoon.svg';
import { useUser } from '@/features/users/api/get-user';
import { useLogout } from '@/lib/auth';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePostMfaSetup } from '@/features/auth/api/auth-mfa';
import { usePostLogout } from '@/features/auth/api/auth-logout';

const UserProfileDropdown = ({
  setProfileSetting,
  setDisplayReferFriend,
}: {
  setProfileSetting: (value: boolean) => void;
  setDisplayReferFriend: (value: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const logout = useLogout({
    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      queryClient.invalidateQueries();
    },
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef?.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const { mutate: postLogout } = usePostLogout();
  const handleLogout = () => {
    postLogout(
      {},
      {
        onSuccess: (response) => {
          navigate('/auth/login');
        },
        onError: (error) => {
          console.error( error);
        },
      },
    );
    logout.mutate(undefined);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={
          '__profileButton rounded-full ' +
          ` ${userData?.user?.profile_image ? 'bg-white' : 'bg-black p-2'}`
        }
      >
        {userData?.user?.profile_image ? <img src={userData?.user?.profile_image} alt='user' className='h-11  w-11 rounded-full object-cover'/> :
        <GoPersonFill className="text-white text-2xl" />
        }
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="bg-white text-black absolute right-0 mt-2 w-72 rounded-2xl rounded-tr-[0] shadow-lg ring-1 z-10 ring-black ring-opacity-5">
          <div className="py-2 flex flex-col items-start">
            <h1 className="px-4 py-2 font-semibold">
              Hi {userData?.user?.firstName + ' ' + userData?.user?.lastName}!
            </h1>

            {/**Credits */}
            <div className="text-sm px-4 py-2 bg-[#ECF8F2] flex flex-row items-center justify-between w-full">
              <div className="flex flex-col">
                <img src={comingSoon} />
                <p className="text-green-700 font-medium">{0} Credits left</p>
              </div>
              <button className="rounded-full bg-green-600 text-white p-2 text-xs">
                Get more credits
              </button>
            </div>

            <button
              className="w-full px-4 py-3 text-sm text-start border-b border-slate-300 hover:underline"
              onClick={() => {
                setProfileSetting(true);
                setIsOpen(false);
                // handleRemoveChat();
              }}
            >
              Profile Settings
            </button>

            {/**File settings */}
            <button className="w-full px-4 py-3 text-sm text-start border-b border-slate-300 hover:underline">
              File Settings
            </button>

            {/**Refer friend */}
            <button
              onClick={() => {
                setDisplayReferFriend(true);
                setIsOpen(false);
                // handleRemoveChat();
              }}
              className="w-full px-4 py-3 text-sm text-start border-b border-slate-300 font-medium text-blue-700 underline flex flex-row items-center gap-x-1"
            >
              <RiLinkM className="text-blue-700 text-lg" />
              Refer a friend
            </button>
            <div className="w-full px-4 py-2 flex flex-row justify-end items-center gap-x-2">
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-lg bg-slate-200 text-slate-600 hover:bg-black hover:text-white"
              >
                Signout
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm px-4 py-2 rounded-lg bg-primary-blue hover:bg-[#4e28e7] text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
