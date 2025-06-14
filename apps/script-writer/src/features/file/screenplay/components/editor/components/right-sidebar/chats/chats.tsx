import type React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';
import '@/styles/chats.css';
import { useParams } from 'react-router';
import { useEditorChatStore } from '@/store/editor';
import {
  getAllContacts,
  getFileCollaborators,
} from '@/features/file/screenplay/api/chats';
import { WindowStackType } from '@/store/editor/slices/chat';

type Collaborator = {
  createdAt: string;
  updatedAt: string;
  permissionType: string;
  resourceId: string;
  resourceType: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    colorCode: string;
    createdAt: string;
    updatedAt: string;
    isAdmin: boolean;
    isVerified: boolean;
    role: string;
    googleId: string;
    phoneNo: string;
    userProfileId: string;
    __v: number;
  };
};

interface User {
  _id: string;
  name: string;
}

interface Message {
  senderId: User;
  receiverId?: User;
  content: string;
  roomId: string;
  createdAt: string;
}

interface Contact {
  colorCode: string;
  createdAt: string;
  email: string;
  firstName: string;
  googleId: string;
  isAdmin: boolean;
  isVerified: boolean;
  lastName: string;
  phoneNo: string;
  role: string;
  updatedAt: string;
  _id: string;
}

// Tooltip component (improved version)
function TooltipContent({
  buttonRef,
  onClose,
}: {
  buttonRef?: HTMLButtonElement;
  onClose: () => void;
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom');

  // Calculate position based on button reference and viewport boundaries
  useEffect(() => {
    if (!buttonRef) return;

    const buttonRect = buttonRef.getBoundingClientRect();
    const tooltipHeight = 130; // Approximate height of tooltip
    const tooltipWidth = 180; // Width of tooltip
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Check if tooltip would go outside bottom of viewport
    const bottomOverflow = buttonRect.bottom + tooltipHeight > viewportHeight;
    // Check if tooltip would go outside right of viewport
    const rightOverflow = buttonRect.right - tooltipWidth < 0;

    let newPlacement: 'bottom' | 'top' = 'bottom';
    let newTop = 0;
    let newLeft = 0;

    if (bottomOverflow) {
      // Position above the button if it would overflow bottom
      newPlacement = 'top';
      newTop = buttonRect.top - tooltipHeight + window.scrollY;
    } else {
      // Position below the button
      newPlacement = 'bottom';
      newTop = buttonRect.bottom + window.scrollY;
    }

    // Position horizontally
    newLeft = Math.max(0, buttonRect.right - tooltipWidth + window.scrollX);

    // Ensure tooltip doesn't go off the right edge
    if (buttonRect.right + window.scrollX > viewportWidth) {
      newLeft = Math.max(0, viewportWidth - tooltipWidth + window.scrollX);
    }

    setPosition({ top: newTop, left: newLeft });
    setPlacement(newPlacement);
  }, [buttonRef]);

  // Handle click inside tooltip
  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 w-[180px] bg-[#212131] text-white rounded-xl shadow-lg p-4 flex flex-col space-y-2"
      style={{
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px',
        borderTopRightRadius: placement === 'bottom' ? '0' : '12px',
        borderBottomRightRadius: placement === 'bottom' ? '12px' : '0',
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onClick={handleTooltipClick}
    >
      <button className="text-left text-xs hover:text-gray-400 text-nowrap">
        Go to user location
      </button>
      <button className="text-left text-xs hover:text-gray-400 text-nowrap">
        View collaborator changes
      </button>
      <button className="text-left text-xs hover:text-gray-400 text-nowrap">
        Mirror scroll position
      </button>
      <button className="text-left text-xs hover:text-gray-400 text-nowrap">
        Remove from project
      </button>
    </div>
  );
}

export const Chats: React.FC = () => {
  const [allCollab, setAllCollab] = useState<Collaborator[]>([]);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const { fileId } = useParams();
  const {
    windowStack,
    setWindowStack,
  } = useEditorChatStore((state) => state);

  const [userId, setUserId] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user?._id || null;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    return user || null;
  });

  // State for active tooltip and button references
  const [activeTooltip, setActiveTooltip] = useState<{
    section: string;
    index: number;
  } | null>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Save button reference with a unique key
  const setButtonRef = (
    section: string,
    index: number,
    ref: HTMLButtonElement | null,
  ) => {
    const key = `${section}-${index}`;
    if (ref) {
      buttonRefs.current.set(key, ref);
    }
  };

  // Toggle tooltip function
  const toggleTooltip = (
    section: string,
    index: number,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();

    const currentTooltip =
      activeTooltip &&
      activeTooltip.section === section &&
      activeTooltip.index === index
        ? null
        : { section, index };

    setActiveTooltip(currentTooltip);
  };

  // Close tooltip when clicking outside
  const handleClickOutside = () => {
    setActiveTooltip(null);
  };

  const handleAllContacts = async () => {
    try {
      const res: any = await getAllContacts();
      if (res?.contacts) {
        const allContacts: Contact[] = res?.contacts;

        const users = allContacts.filter((user) => {
          return user._id !== userId;
        });

        setAllContacts(users);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  useEffect(() => {
    handleAllContacts();
  }, [fileId]);

  const handleCollaborators = (userId: Collaborator['userId'] | Contact) => {
    if (userId) {
      const isInWindowStack = windowStack.some(
        (stack) => stack.toUserId === userId._id,
      );
      if (isInWindowStack) return;
      const obj: WindowStackType = {
        userName: userId.firstName || 'Unknown User',
        toUserId: userId._id,
        type: 'user',
      };
      if (windowStack.length === 2) {
        let old = windowStack[0];
        setWindowStack([old, obj]);
      } else {
        setWindowStack([...windowStack, obj]);
      }
    }
  };

  const handeGroup = () => {
    const obj: WindowStackType = {
      userName: 'Group',
      toUserId: '',
      type: 'group',
    };
    if (windowStack.length === 2) {
      let old = windowStack[0];
      setWindowStack([old, obj]);
    } else {
      setWindowStack([...windowStack, obj]);
    }
  };

  useEffect(() => {
    const getAllCollab = async (fileId: string) => {
      try {
        const res: any = await getFileCollaborators(fileId);
        setAllCollab(res?.collab || []);
      } catch (err) {
        console.error('Error fetching collaborators:', err);
      }
    };
    if (fileId) {
      getAllCollab(fileId);
    }
  }, [fileId]);

  // Get the current active tooltip button reference
  const getActiveButtonRef = () => {
    if (!activeTooltip) return undefined;
    const key = `${activeTooltip.section}-${activeTooltip.index}`;
    return buttonRefs.current.get(key);
  };

  return (
    <>
      <div
        className="w-[29%] max-w-[341px] pl-2 pt-6"
        style={{ height: 'calc(-50px + 80vh)' }}
        onClick={handleClickOutside}
      >
        {/* Sidebar */}
        <div className="h-full flex flex-col gap-3">
          {/* Chat Section */}
          <div className="border border-[#BABABF] rounded-lg h-full overflow-y-hidden">
            <div className="bg-[#6A6A75] rounded-t-lg text-xs p-4 text-white font-semibold">
              Chat
            </div>
            <div className="bg-white rounded-b-lg flex flex-col p-2 space-y-2 h-full overflow-y-auto">
              <div className="flex justify-between items-center space-x-3 cursor-pointer p-2 rounded-lg">
                <div onClick={handeGroup} className="flex items-center">
                  <div className="w-8 h-8 flex text-sm items-center justify-center bg-green-100 rounded-full text-green-900 font-bold">
                    G
                  </div>
                  <span className="text-black ml-2 text-sm font-medium">
                    Group
                  </span>
                </div>
                <button
                  ref={(ref) => setButtonRef('chat', 0, ref)}
                  onClick={(e) => toggleTooltip('chat', 0, e)}
                  className="ml-auto text-gray-400 hover:text-gray-600"
                  disabled
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-between items-center space-x-3 cursor-pointer p-2 rounded-lg">
                <div
                  onClick={() => handleCollaborators(user)}
                  className="flex items-center"
                >
                  <div className="w-8 h-8 flex text-sm items-center justify-center bg-green-100 rounded-full text-green-900 font-bold">
                    {user?.firstName?.[0] || 'U'}
                  </div>
                  <span className="text-black ml-2 text-sm font-medium">
                    {user?.firstName || 'Unknown User'}
                  </span>
                </div>
                <button
                  ref={(ref) => setButtonRef('chat', 1, ref)}
                  onClick={(e) => toggleTooltip('chat', 1, e)}
                  className="ml-auto text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Project Collaborators Section */}
          <div className="border border-[#BABABF] rounded-lg h-full overflow-y-hidden">
            <div className="bg-[#6A6A75] text-xs rounded-t-lg p-4 text-white font-semibold">
              Project Collaborators
            </div>
            <div className="flex flex-col rounded-b-lg bg-[#E9E9EA] p-2 space-y-2 h-full overflow-y-auto">
              {allCollab.length !== 0 &&
              allCollab.some((collab) => {
                const storedUser = localStorage.getItem('user');
                const user = storedUser ? JSON.parse(storedUser) : null;
                return collab.userId != null && collab.userId._id !== user?._id;
              }) ? (
                allCollab.map((collab, index) => {
                  if (collab.userId != null) {
                    const userId = collab.userId;
                    const storedUser = localStorage.getItem('user');
                    const user = storedUser ? JSON.parse(storedUser) : null;

                    if (user?._id !== userId?._id) {
                      return (
                        <div
                          key={index}
                          className="relative flex items-center justify-between space-x-3 p-2 rounded-lg"
                        >
                          <div
                            onClick={() => handleCollaborators(userId)}
                            className="flex items-center cursor-pointer"
                          >
                            <div className="w-8 h-8 text-sm flex items-center justify-center bg-purple-300 rounded-full text-black font-bold">
                              {collab.userId.firstName?.[0] || '?'}
                            </div>
                            <span className="text-black text-sm ml-2 font-medium">
                              {collab.userId.firstName || 'Unknown'}
                            </span>
                          </div>

                          <button
                            ref={(ref) => setButtonRef('collab', index, ref)}
                            onClick={(e) => toggleTooltip('collab', index, e)}
                            className="ml-auto text-gray-400 hover:text-white"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    }
                    return null;
                  }
                  return null;
                })
              ) : (
                <div className="">
                  <span className="text-black text-sm ml-2 font-medium">
                    No collaborators
                  </span>{' '}
                </div>
              )}
            </div>
          </div>

          {/* All Contacts Section */}
          <div className="border border-[#BABABF] rounded-lg h-full overflow-y-hidden">
            <div className="bg-[#6A6A75] text-xs rounded-t-lg p-4 text-white font-semibold">
              All Contacts
            </div>
            <div className="flex flex-col rounded-b-lg bg-[#E9E9EA] p-2 space-y-2 h-full overflow-y-auto">
              {allContacts.length > 0 ? (
                allContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-between space-x-3 p-2 rounded-lg"
                  >
                    <div
                      onClick={() => handleCollaborators(contact)}
                      className="cursor-pointer flex items-center"
                    >
                      <div className="w-8 h-8 text-sm flex items-center justify-center bg-purple-300 rounded-full text-black font-bold">
                        {contact?.firstName[0]}
                      </div>
                      <span className="text-black text-sm ml-2 font-medium">
                        {contact?.firstName}
                      </span>
                    </div>

                    <button
                      ref={(ref) => setButtonRef('contact', index, ref)}
                      onClick={(e) => toggleTooltip('contact', index, e)}
                      className="ml-auto cursor-pointer text-gray-400 hover:text-white"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="">
                  <span className="text-black text-sm ml-2 font-medium">
                    No contacts
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render tooltip with portal */}
      {activeTooltip !== null &&
        typeof window !== 'undefined' &&
        createPortal(
          <TooltipContent
            buttonRef={getActiveButtonRef()}
            onClose={() => setActiveTooltip(null)}
          />,
          document.body,
        )}
    </>
  );
};
