import { enqueueSnackbar } from 'notistack';
import React, {
  useEffect,
  useRef,
  useState
} from 'react';
// import { FileContext } from '../../context/filecontext';
// import { post } from '../../utils/utils';
import { User2Icon } from 'lucide-react';
// import LinkImg from '../../assets/texteditor/Link.svg';
// import copyLinkImg from '../../assets/texteditor/copyLink.svg';
import { Modal } from '@/components/ui/modal';
import { EmailSuggest } from '@/features/dashboard/components/files/email-suggestions';
import { useAddCollaborator } from '@/features/file/screenplay/api/add-colobrator-folder';
import { useFile } from '@/features/file/screenplay/api/get-file-by-id';
import { useDeleteFileCollobrator } from '@/features/file/screenplay/api/remove-file-collobator';
import { useUser } from '@/features/users/api/get-user';
import { SearchUser } from '@/types/api';
import { Popover } from '@headlessui/react';
import { FaAnglesDown } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { useParams } from 'react-router';
import { Tooltip } from "react-tooltip";

const PERMISSIONS_MAP = {
  'Can edit': 'EDIT',
  'Can suggest': 'SUGGEST',
  'Can comment': 'COMMENT',
  'Read only': 'READ',
};



export function SuggestEmailtoCreateLink({
  onChange,
  value,
  setValue,
  onFocusInput,
}: {
  onChange: (newValue: any) => void;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  onFocusInput: () => void;
}) {
  const anchorRef = useRef(null);

  return (
    <div className="w-full relative">
      <div ref={anchorRef}>
        
        <input
          // {...getInputProps()}
          onFocus={onFocusInput}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="py-[8px] pl-3 pr-10 border border-[#E9E9EA] rounded-[8px] text-[12px] font-regular font-poppins text-[#6A6A75] w-[370px]"
          placeholder="Create a link"
        />
      </div>
    </div>
  );
}

function AutoSuggestComponenttoCreateLink({
  onSelectionUpdate,
  value,
  setValue,
  onFocusInput,
}: {
  onSelectionUpdate: () => void;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  onFocusInput: () => void;
}) {
  return (
    <div className="flex-1 m-0">
      <SuggestEmailtoCreateLink
        onChange={onSelectionUpdate}
        value={value}
        setValue={setValue}
        onFocusInput={onFocusInput}
      />
    </div>
  );
}

export function UserEmailSuggest({
  onChange,
  value,
  setValue,
  onFocusInput,
}: {
  onChange: (newValue: any) => void;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  onFocusInput: () => void;
}) {
  const [invitee, setInvitee] = useState<SearchUser | null>(null);
  console.log(value);
  
  // const { file } = useContext(FileContext);
  const { folderId } = useParams();
  const { data: file } = useFile({
    folderId: folderId!,
    queryConfig: { enabled: !!folderId },
  });
  const [options, updateOptions] = useState([]);
  const anchorRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="w-full relative">
      <div
        // {...getRootProps()}
        // className={focused ? 'Mui-focused' : ''}
        onClick={()=>onFocusInput(true)}
        ref={anchorRef}
      >
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
          <User2Icon width="20px" color="gray" />
        </span>
          <EmailSuggest value={value} setValue={setValue} />
      </div>

      
    </div>
  );
}

function AutoSuggestComponent({
  onSelectionUpdate,
  value,
  setValue,
  onFocusInput,
}: {
  onSelectionUpdate: () => void;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  onFocusInput: () => void;
}) {
  return (
    <div className="w-[370px]">
      <UserEmailSuggest
        onChange={onSelectionUpdate}
        value={value}
        setValue={setValue}
        onFocusInput={onFocusInput}
      />
    </div>
  );
}

interface PopupShareFileProps {
  open: boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const ShareFolderPopup = ({ open, setOpen ,folderId,folder}: PopupShareFileProps) => {
  const [invitee, setInvitee] = useState<SearchUser | null>(null);

  const { data: user } = useUser();
  const [emails, setEmails] = useState<
    { name: string; permission: string; id: string }[]
  >([]);
  console.log("emails--",emails);
  
  const [showLinkOptions, setShowLinkOptions] = useState(false);
  const [linkPermission, setLinkPermission] = useState<string>('Can edit');
  // const { inviteUserFn, isLoading, isSuccess }: any = useInviteUser();

  // State for the first AutoSuggestComponent
  const [invitee1, setInvitee1] = useState<string | null>(null);
  const [inviteePermission1, setInviteePermission1] =
    useState<string>('Can edit');
  const [showEmailOptions1, setShowEmailOptions1] = useState(false);

  // State for the second AutoSuggestComponent
  const [invitee2, setInvitee2] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [inviteePermission2, setInviteePermission2] =
    useState<string>('Can edit');
  const [showEmailOptions2, setShowEmailOptions2] = useState(false);
  const [linkName, setLinkName] = useState<
    { name: string; permission: string }[]
  >([]);

  const addCollaboratorMutation = useAddCollaborator();
  
  useEffect(() => {
    // if (!file || !user || !file.collaborators) return;

    // setEmails((emails) => [
      
    //   ...file.collaborators.map((collaborator: any) => {
    //     if (collaborator._id === file.userId) {
    //       return {
    //         name: collaborator?.name,
    //         id: collaborator._id,
    //         permission: 'Owner',
    //       };
    //     }
    //     return {
    //       name: collaborator?.name,
    //       permission: collaborator.permissionType,
    //       id: collaborator._id,
    //     };
    //   }),
    // ]);
    console.log("fffffffffff",folder);
    
  }, [folder, user]);
const { mutate:deleteCollobrator } = useDeleteFileCollobrator();

  const handleAddEmail = (
    invitee: { label: string; value: string } | null,
    inviteePermission: string,
    setInvitee: React.Dispatch<
      React.SetStateAction<{ label: string; value: string } | null>
    >,
    setShowEmailOptions: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (invitee) {
      const permission =
      PERMISSIONS_MAP[inviteePermission as keyof typeof PERMISSIONS_MAP];
      const newUserId = invitee?._id;
      
      // Call the API to add the user as a collaborator (replace with actual mutation call)
      console.log({
        folderId, // Assuming folderId is passed as a prop or from the state
        collaborators: [{ userId: newUserId, permissionType: permission }],
        
      });
        console.log();
        
        
        addCollaboratorMutation.mutate({
          folderId, // Assuming folderId is passed as a prop or from the state
          collaborators: [{ userId: newUserId, permissionType: permission }],
        }, {
          onSuccess: () => {
            enqueueSnackbar('Collaborator added successfully!');
          },
          onError: (error) => {
            console.error('Error adding collaborator:', error);
          },
        });
      setEmails([
        ...emails,
        {
          name: invitee?.name,
          permission: inviteePermission,
          id: invitee.value,
        },
      ]);
      setInvitee(null);
      setShowEmailOptions(false);
    } else {
      enqueueSnackbar('Please select an invitee from the list', {
        variant: 'warning',
      });
    }
  };
  const handleAddCopyLink = (
    invitee: string | null,
    inviteePermission: string,
    setInvitee: React.Dispatch<React.SetStateAction<string | null>>,
    setShowEmailOptions: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (invitee) {
      const permission =
      PERMISSIONS_MAP[inviteePermission as keyof typeof PERMISSIONS_MAP];
      // const newUserId = invitee?.value;
      // inviteUserFn({ folderId: file?._id, collaborators: [{ userId: newUserId, permissionType: permission }] });
      console.log("Adding",permission)
      setLinkName([
        ...linkName,
        { name: invitee, permission: inviteePermission },
      ]);
      setInvitee(null);
      setShowEmailOptions(false);
    } else {
      enqueueSnackbar('Please select an invitee from the list', {
        variant: 'warning',
      });
    }
  };

  const handleCreateLink = () => {
    const permission =
      PERMISSIONS_MAP[linkPermission as keyof typeof PERMISSIONS_MAP];
    setShowLinkOptions(false);
  };

  const handleDeleteEmail = (index: number,id:string) => {
    setEmails(emails.filter((_, emailIndex) => emailIndex !== index));
      deleteCollobrator({
    folderId: folderId,
    body: { userIds: [id] },
  });
  };
  function handleCopyUrl(permissionType: any): void {
    let currentUrl = window.location.href;
    let user: any = localStorage.getItem('user');
    user = user ? JSON.parse(user) : null;
      // const shareToken=encryptText(`token=${user?.token}&permissionType=${permissionType}`,'aa')
      // console.log(shareToken);
      
    // currentUrl = `${currentUrl}?shareToken=${shareToken}`;
    currentUrl = `${currentUrl}?token=${user?.token}&permissionType=${permissionType}`;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        enqueueSnackbar('URL copied to clipboard', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Failed to copy URL', { variant: 'error' });
      });
  }

  const changePermission = (copy, value) => {
    // Log the current state and the new value
    console.log(linkName, copy, value);

    // Update the permission in the copy array
    const updatedCopy = linkName.map(item => 
        item.name === copy.name ? { ...item, permission:value  } : item
    );

    // Assuming you have a state setter function to update the state
    setLinkName(updatedCopy);

    // Log the updated state
    console.log(updatedCopy);
}

// console.log(emails);

  const [canEdit, setCanEdit] = useState(true);
  return (
    <Modal isOpen={open} setIsOpen={setOpen}>

      <div className="p-6 min-w-[560px]">
        <div className="flex justify-between items-center">
          <h3 className="text-[19px] p-0 m-0 font-bold text-[#212131]">Share Script</h3>
          <button
            className="text-xl cursor-pointer"
            onClick={()=>setOpen(false)}
          >
             <IoMdClose />
          </button>
        </div>

        <div className="pt-4">
          <div>
            {/* Add Users Email AutoSuggest  Component */}
            <div className="flex items-center space-x-2 relative">             
              <AutoSuggestComponent
                onSelectionUpdate={() => {
                  console.log('suggestion');
                }}
                  value={invitee2}
                setValue={setInvitee2}
                onFocusInput={() => setShowEmailOptions2(true)}
              />
              {showEmailOptions2 && (
                <select
                  className="py-[8px] pl-3 pr-10 border border-[#E9E9EA] rounded-[8px] text-[12px] font-regular font-poppins text-[#6A6A75] w-[133px] custom-arrow-down"
                  value={inviteePermission2}
                  onChange={(e) => setInviteePermission2(e.target.value)}
                >
                  <option value="Can edit">Can edit</option>
                  <option value="Can suggest">Can suggest</option>
                  <option value="Can comment">Can comment</option>
                  <option value="Read only">Read only</option>
                </select>
              )}
            </div>
            {showEmailOptions2 && (
              <div className="flex justify-end gap-3 mt-2">
                <button
                  className="bg-primary-light-blue text-primary-blue px-5 py-3 rounded-[12px] text-semibold text-[14px] font-poppins"
                  onClick={() => setShowEmailOptions2(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary-blue text-white px-5 py-3 rounded-[12px] text-semibold text-[14px] font-poppins"
                  onClick={() =>
                    handleAddEmail(
                      invitee2,
                      inviteePermission2,
                      setInvitee2,
                      setShowEmailOptions2,
                    )
                  }
                >
                  Add Email
                </button>
              </div>
            )}

            {/* Existing collaborators with permissions */}

            <div className="mt-8">

            <h3 className="text-[14px] text-[#212131] font-poppins font-semibold mb-4">People with Access</h3>
            <div className='border   rounded-lg p-4'>
              
              {emails &&
                emails.map((email, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 relative"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-[420px] w-[420px] max-w-[420px]">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
                        {email.name}
                      </div>
                      <p
                        className="flex-1 text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ maxWidth: '150px' }}
                      >
                        {email.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-[100px] min-w-[100px] max-w-[100px]">
                    <div
                      className=" text-[12px] font-regular font-poppins text-[#212131] whitespace-nowrap overflow-hidden text-ellipsis "
              
                    >
                      {email.permission}
                    </div>

                    {email.permission !== 'Owner' && email.id !== user?._id && (
                      <>
                        <button className="text-gray-400" id={`menu-${index}`}>
                          ...
                        </button>
                        <Tooltip
                          anchorSelect={`#menu-${index}`}
                          place="right"
                          clickable
                          className="bg-white"
                        >
                          <button
                            className="text-red-500 w-full text-left"
                            onClick={() => handleDeleteEmail(index,email?.id)}
                          >
                            Delete
                          </button>
                        </Tooltip> 
                      </>
                    )}
                  </div>
                  </div>
                ))}
            </div>
            </div>
          </div>
        </div>
        {/* Create Link Component */}
        <div className=" py-3 rounded-2xl mb-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 relative">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2"></span>
              <AutoSuggestComponenttoCreateLink
                onSelectionUpdate={() => {
                  console.log('suggestion');
                }}
                value={invitee1}
                setValue={setInvitee1}
                onFocusInput={() => setShowEmailOptions1(true)}
              />

              {showEmailOptions1 && (
                <select
                  className="py-[8px] pl-3 pr-10 border border-[#E9E9EA] rounded-[8px] text-[12px] font-regular font-poppins text-[#6A6A75] w-[133px] custom-arrow-down"
                  value={inviteePermission1}
                  onChange={(e) => setInviteePermission1(e.target.value)}
                >
                  <option value="Can edit">Can edit</option>
                  <option value="Can suggest">Can suggest</option>
                  <option value="Can comment">Can comment</option>
                  <option value="Read only">Read only</option>
                </select>
              )}
            </div>
            {showEmailOptions1 && (
              <div className="flex justify-end gap-3 mt-2">
                <button
                  className="bg-primary-light-blue text-primary-blue px-5 py-3 rounded-[12px] text-semibold text-[14px] font-poppins"
                  onClick={() => setShowEmailOptions1(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-primary-blue text-white px-5 py-3 rounded-[12px] text-semibold text-[14px] font-poppins"
                  onClick={() => {
                    handleAddCopyLink(
                      invitee1,
                      inviteePermission1,
                      setInvitee1,
                      setShowEmailOptions1,
                    );
                    setShowLinkOptions(true);
                  }}
                >
                  Create link
                </button>
              </div>
            )}
            {showLinkOptions && (
              <>
                {linkName?.map((copyLink) => (
                  <div className="flex items-center justify-between gap-2 mt-4 w-full">
                    <div className="flex items-center  gap-2 bg-secondary/50 px-3 py-2 rounded-lg ">
                      {/* <Link className="h-4 w-4 text-muted-foreground" /> */}
                      {/* <img src={LinkImg} alt="Link" /> */}
                      <div className="flex flex-col">
                        <span className="text-base font-medium">
                          {copyLink?.name}
                        </span>
                        <span
                          className="text-xs  font-medium text-primary-blue cursor-pointer"
                          onClick={() =>
                            handleCopyUrl(
                              PERMISSIONS_MAP[
                                copyLink.permission as keyof typeof PERMISSIONS_MAP
                              ],
                            )
                          }
                        >
                          Copy Link
                        </span>
                      </div>
                    </div>
                    <div className="text-[#9999A0] ">file</div>

                    <div className="text-[#9999A0]  flex gap-1 items-center">
                    <Popover className="relative">
  {({ open, close }) => (
    <>
      <Popover.Button className="text-[#9999A0] flex gap-1 items-center">
        {copyLink?.permission} <FaAnglesDown />
      </Popover.Button>

      <Popover.Panel className="absolute left-1/2 z-[1000] mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
        <div className="absolute -top-4 left-36 bg-slate-800 rounded-3xl rounded-tr-none shadow-lg z-[1000] w-60">
          <ul className="text-sm text-gray-300">
            {Object.entries(PERMISSIONS_MAP).map(([key, value]) => (
              <li
                key={key}
                className="px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-white hover:text-slate-800"
                onClick={() => {
                  changePermission(copyLink, key);
                  close(); // This will close the popover after clicking
                }}
              >
                {key}
              </li>
            ))}
          </ul>
        </div>
      </Popover.Panel>
    </>
  )}
</Popover>
                    </div>
                    <div>...</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <hr />
        <div className="flex justify-between px-3 mt-5 items-center">
          <div className="flex gap-2 text-primary-cta font-medium ">
            {' '}
            {/* <img src={copyLinkImg} alt="copy" /> copy Link */}
          </div>
          <button
            className="bg-primary-blue text-white px-5 py-3 rounded-[12px] text-semibold text-[14px] font-poppins"
            onClick={()=>setOpen(false)}
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareFolderPopup ;
