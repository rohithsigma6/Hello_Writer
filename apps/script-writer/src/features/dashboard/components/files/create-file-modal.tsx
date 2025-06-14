import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Select, { MultiValue } from 'react-select';
import { FaAngleDown } from 'react-icons/fa6';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUser } from '@/features/users/api/get-user';
import { EmailSuggest } from './email-suggestions';
import { SearchUser } from '@/types/api';
import { useCreateFile } from '../../api/create-file';
import FileDropzone from '@/components/ui/file-upload/file-dropzone';
import { useSnackbar } from 'notistack';
import { useFileStore } from '@/store/editor';
import { parseFile } from '@/features/file/screenplay/converter/parse-file';
import { useAddStoryWorld } from '@/features/file/storyworld/api/fetch-data';
import { useAddFreedomLogline } from '@/features/file/logline/api/save-draft';
import { useAddFreedomTheme } from '@/features/file/theme/api/save-draft';

export const genres: Record<string, string[]> = {
  Action: [
    'Disaster film',
    'Heroic bloodshed',
    'Martial arts film',
    'Spy film',
    'Super Hero',
    'War film',
    'Action Comedy',
    'Action Thriller',
    'Action Horror',
    'Action Adventure',
    'Arthouse Action',
    'Vigilante film',
  ],
  Adventure: [
    'Pirate film',
    'Swashbuckler film',
    'Samurai film',
    'Treasure Hunt',
    'Survival',
    'Sea Adventure',
    'Space Exploration',
  ],
  Comedy: [
    'Action comedy film',
    'Buddy comedy',
    'Dark/black comedy film',
    'Mockumentary',
    'Parody film',
    'Romantic comedy',
    'Screwball comedy',
    'Slapstick film',
    'Satire',
    'Situational Comedy',
    'Comedy Thriller',
    'Anarchic comedy',
    'Bathroom comedy',
    'Comedy of ideas',
    'Comedy of manners',
    'Observational humor',
    'Sex comedy',
    'Straight comedy',
    'Surreal comedy',
    'Comedy horror',
    'Fantasy comedy',
    'Crime Comedy',
    'Day-in-the-life comedy',
    'Science fiction comedy',
    'Sports comedy',
    'War comedy',
    'Comedy mystery',
  ],
  Drama: [
    'Docudrama',
    'Legal drama',
    'Medical drama',
    'Melodrama',
    'Political drama',
    'Psychological drama',
    'Teen drama',
    'Comedy drama',
    'Hyperdrama',
    'Light drama',
    'Psychological drama',
    'Satirical drama',
    'Straight drama',
    'Crime Drama',
    'Action drama',
    'Drama thriller',
    'Fantasy drama',
    'Horror drama',
    'Life drama',
    'Romantic drama',
    'Science fiction drama',
    'Sports drama',
    'War drama',
    'Western drama',
    'Family drama',
    'Religious drama',
    'Police procedural',
    'Historical drama',
  ],
  Fantasy: [
    'Contemporary fantasy',
    'Dark fantasy',
    'High/epic fantasy',
    'Urban fantasy',
    'Heroic fantasy',
    'Mythological Fantasy',
    'Fairy Tale',
  ],
  Historical: [
    'Alternate history',
    'Biopic',
    'Historical epic',
    'Historical event',
    'Historical fiction',
    'Period piece',
  ],
  Horror: [
    'Found footage',
    'Ghost films',
    'Monster movie',
    'Vampire films',
    'Werewolf films',
    'Slasher film',
    'Splatter film',
    'Zombie film',
    'Supernatural horror',
    'Body horror',
    'Erotic horror',
    'Folk horror',
    'Gothic horror',
    'Natural horror',
    'Religious horror',
    'Psychological horror',
    'Teen horror',
  ],
  Musical: [
    'Traditional Musical',
    'Musical Comedy',
    'Musical Drama',
    'Animated Musical',
    'Rock Musical',
    'Jukebox Musical',
    'Fantasy Musical',
    'Biographical Musical',
  ],
  Romance: [
    'Historical romance',
    'Paranormal romance',
    'Romantic comedy',
    'Romantic fantasy',
    'Romantic thriller',
    'Romantic Drama',
    'Chick Flick',
  ],
  'Science Fiction': [
    'Dystopian film',
    'Post-apocalyptic film',
    'Military science fiction',
    'Steampunk film',
    'Tech noir',
    'Utopian film',
    'Space opera',
    'Hard Science Fiction',
    'Soft Science Fiction',
    'Cyberpunk',
    'Time Travel',
    'Alien Film',
    'Superhero',
    'Steampunk',
  ],
  Thriller: [
    'Psychological thriller',
    'Mystery film',
    'Techno-thriller',
    'Political thriller',
    'Crime Thriller',
    'Spy Thriller',
    'Legal Thriller',
    'Action Thriller',
    'Horror Thriller',
    'Erotic Thriller',
  ],
};

enum PermissionType {
  Edit = 'Edit',
  Suggest = 'Suggest',
  View = 'View',
  Comment = 'Comment',
  Admin = 'Admin',
}
export interface Collaborator {
  email: string | undefined;
  permissionType?:
    | PermissionType.Edit
    | PermissionType.Suggest
    | PermissionType.View
    | PermissionType.Comment
    | PermissionType.Admin;
  name: string | undefined;
  profile?: string | undefined;
  editable?: boolean;
  userId: string | undefined | null;
}

// Utility to remove empty values from an object
function cleanObject(obj: any) {
  for (const key in obj) {
    if (
      obj[key] === '' ||
      obj[key] === undefined ||
      (Array.isArray(obj[key]) && obj[key].length === 0)
    ) {
      delete obj[key];
    }
  }
  return obj;
}

// Props for the modal
interface PopupCreateFileProps {
  closePopup: () => void;
}

const creations = ['Feature Film', 'Web Series', 'Tv Show', 'Short Film'];
const permissionTypes = ['Edit', 'Suggest', 'View', 'Comment', 'Admin'];

const CreateFileModal = ({ type, isOpen, setIsOpen }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  // const [isOpen, setIsOpen] = useState(false);
  const { data: userData } = useUser();
  const user = userData?.user;
  const { folderId } = useParams();
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [basedOn, setBasedOn] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [invitee, setInvitee] = useState<SearchUser | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<
    MultiValue<{ label: string; value: string }>
  >([]);
  const [selectedSubGenres, setSelectedSubGenres] = useState<
    MultiValue<{ label: string; value: string }>
  >([]);
  const [logline, setLogline] = useState('');
  const [theme, setTheme] = useState('');
  const [pagetarget, setPagetarget] = useState('');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { updateImportData } = useFileStore((state) => state);

const addStoryWorldMutation = useAddStoryWorld();
      const freedomMutation = useAddFreedomLogline();
              const freedomMutationTheme = useAddFreedomTheme();
  const { mutate: createFile, isPending } = useCreateFile({
    mutationConfig: {
      onSuccess: (res) => {
        // @ts-ignore
        updateImportData(res.parced_data);
        navigate(`/file/${res._id}/screenplay`);
        enqueueSnackbar('File created successfully.', { variant: 'success' });
        if(selectedGenres.length||selectedSubGenres.length){
          
      const genreValues = selectedGenres?.map((item: any) => item?.value);
      const subGenreValues = selectedSubGenres?.map((item: any) => item?.value);
           addStoryWorldMutation.mutate({
              fileId: res._id,
              genre:genreValues,subGenre:subGenreValues
            }, {
              onSuccess: () => {
                // enqueueSnackbar('Story World added successfully!');
                // setName('');
                // setDescription('');
                
              },
              onError: (error) => {
                enqueueSnackbar('Error adding Story World');
              },
            });
        }

        if(logline){
          freedomMutation.mutate({
                      fileId: res._id,
                      freeformLogline: logline,
                      isFinalized: false,
                      draftTitle:'draft'
                    }, {
                      // onSuccess: (data) => enqueueSnackbar('Draft save successfully'),
                      // onError: (error) => console.error("Error Saving Freeform:", error),
                    });
        }
        if(theme){
          freedomMutationTheme.mutate({
            fileId: res._id,
            freeformTheme: theme,
            isFinalized: false,
            draftTitle:'draft'
          }, {
            // onSuccess: (data) => console.log("Freedom Theme Saved:", data),
            // onError: (error) => console.error("Error Saving Freeform:", error),
          });
        }
      },
      onError: () => {
        enqueueSnackbar('Failed to create the file.', { variant: 'error' });
      },
    },
    ...(folderId && { folderId }),
  });

  useEffect(() => {
    if (user) {
      const userExists = collaborators.find(
        (collab) => collab.email === user.email,
      );
      if (!userExists) {
        setCollaborators((prev) => [
          {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            userId: user._id,
            profile: user.profile_image,
            permissionType: PermissionType.Admin,
            editable: false,
          } as Collaborator,
        ]);
      }
    }
  }, [user]);

  const genreOptions = Object.keys(genres).map((genre) => ({
    label: genre,
    value: genre,
  }));

  const subGenreOptions = selectedGenres
    .flatMap((genre) => genres[genre.value] || [])
    .map((subGenre) => ({
      label: subGenre,
      value: subGenre,
    }));

  //   Ensure selected subgenres are valid when genres change
  useEffect(() => {
    const validSubGenres = new Set(
      subGenreOptions.map((option) => option.value),
    );
    setSelectedSubGenres((prev) =>
      prev.filter((sub) => validSubGenres.has(sub.value)),
    );
  }, [selectedGenres]);

  const handleGenreChange = (
    selected: MultiValue<{ label: string; value: string }>,
  ) => {
    setSelectedGenres(selected);
  };

  const handleSubGenreChange = (
    selected: MultiValue<{ label: string; value: string }>,
  ) => {
    setSelectedSubGenres(selected);
  };

  const handleTypeChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption?.value || '');
  };


  const handleRemoveCollaborator = (index: number) => {
    const updatedCollaborators = collaborators.filter((_, i) => i !== index);
    setCollaborators(updatedCollaborators);
  };

  const handleActionChange = (index: number, newAction: PermissionType) => {
    const updatedCollaborators = collaborators.map((collab, i) =>
      i === index ? { ...collab, permissionType: newAction } : collab,
    );
    setCollaborators(updatedCollaborators);
  };

  const handleAddCollaborator = () => {
    // Check if the email is already added
    const emailExists = collaborators.find(
      (collab) => collab.email === invitee?.email,
    );
    if (emailExists) {
      setInvitee(null);
      return;
    }
    if (invitee) {
      setCollaborators([
        ...collaborators,
        {
          email: invitee.email,
          name: invitee.name,
          profile: invitee?.profile_image,
          permissionType: PermissionType.Edit,
          editable: true,
          userId: invitee._id,
        },
      ]);
      setInvitee(null);
    }
    setInvitee(null);
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const convertToFormData = (payload: any): FormData => {
    const formData = new FormData();

    if (payload.title) formData.append('title', payload.title);
    if (payload.subTitle) formData.append('subTitle', payload.subTitle);
    if (payload.basedOn) formData.append('basedOn', payload.basedOn);
    if (payload.typeOfCreation)
      formData.append('typeOfCreation', payload.typeOfCreation);
    if (payload.logline) formData.append('logline', payload.logline);
    if (payload.theme) formData.append('theme', payload.theme);
    if (payload.genre) {
      payload.genre.forEach((genreItem: any) => {
        formData.append('genre[]', genreItem);
      });
    }

    // Add subgenre[] as an array
    if (payload.subgenre) {
      payload.subgenre.forEach((subgenreItem: any) => {
        formData.append('subgenre[]', subgenreItem);
      });
    }
    // Add collaborators[] as an array of objects
    if (payload.collaborators) {
      payload.collaborators.forEach((collaborator: any, index: any) => {
        formData.append(`collaborators[${index}][userId]`, collaborator.userId);
        formData.append(
          `collaborators[${index}][permissionType]`,
          collaborator.permissionType,
        );
      });
    }

    if (payload.file) {
      formData.append('file', payload.file);
    }

    if (payload.pagetarget) {
      formData.append('pagetarget', payload.pagetarget);
    }

    if (payload.folderId) {
      formData.append('folderId', payload.folderId);
    }

    return formData;
  };
  const options = creations.map((gen) => ({
    value: gen,
    label: gen,
  }))
  const handleCreateFile = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const getCollaborator = collaborators.filter((collab) => collab.editable);
    const payload = {
      title,
      genre: selectedGenres.map((g) => g.value),
      subTitle,
      basedOn,
      subgenre: selectedSubGenres.map((s) => s.value),
      collaborators: getCollaborator,
      typeOfCreation: selectedCategory,
      logline,
      theme,
      ...(type !== 'import' && { pagetarget }),
      ...(folderId ? { folderId } : {}),
      ...(file && { file }),
    };

    if (type == 'import' && !file) {
      return enqueueSnackbar('Please select a file', { variant: 'error' });
    }

    const data = cleanObject(payload);
    const formData = convertToFormData(data);

    createFile({ data: formData });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle hidden></DialogTitle>
      <DialogContent className="bg-white no-scrollbar w-full min-w-[924px] shadow-md max-h-[97dvh] overflow-auto rounded-[24px] my-from pt-10">
        <form
          className="bg-white my-from font-poppins"
          onSubmit={handleCreateFile}
        >
          <div className="flex flex-row gap-12">
            <div className="flex-1 w-[414px]">
              <h2 className="text-[19px] font-bold text-[#212131] text-left mb-3 font-poppins">
                {type == 'import' ? 'Import Script' : 'Create Script'}
              </h2>
              <p className="text-[16px] text-[#9999A0] m-0 font-normal">
                Please enter details for this script
              </p>

              <div className="space-y-6">
                <div>
                  <label
                    className="block text-[16px] font-medium mb-[6px] mt-6 tracking-wider text-[#212131]"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="w-full px-[14px] py-[18.5px] border border-[#00000011] rounded-[16px] text-[16px] c-form-input"
                    placeholder="E.g. The Man Who Forgot His Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
        
                <div className="mb-4">
                  <label
                    className="block text-[16px] font-medium mb-[6px] tracking-wider text-[#212131]"
                    htmlFor="subTitle"
                  >
                   Subtilte
                  </label>
                  <input
                    id="subTitle"
                    type="text"
                    className="w-full px-[14px] py-[18.5px] border border-[#00000011] rounded-[16px] text-[16px] c-form-input"
                    placeholder="E.g. A story of memory, meaning, and silence."
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-[16px] font-medium mb-[6px] tracking-wider text-[#212131]"
                    htmlFor="basedOn"
                  >
                    Based On
                  </label>
                  <input
                    id="basedOn"
                    type="text"
                    className="w-full px-[14px] py-[18.5px] border border-[#00000011] rounded-[16px] text-[16px] c-form-input"
                    placeholder="E.g. An unwritten chapter in everyone's life"
                    value={basedOn}
                    onChange={(e) => setBasedOn(e.target.value)}
                  />
                </div>

              
                <div className='custome-select-option'>
                    <label className="block text-[16px] font-medium mb-[6px] tracking-wider text-[#212131]">
                    Type of Creation
                    </label>
                    <Select
        options={options}
        value={options.find((option) => option.value === selectedCategory)}
        onChange={handleTypeChange}
                     placeholder="Select type"
                      styles={{
                        
                        control: (base) => ({
                          ...base,
                          borderRadius: '10px',
                          padding: '8px 12px',                        
                        }),
                        indicatorSeparator: () => ({
                          display: 'none',
                        }),
                      }}
                    />
                  </div>
                <div className="flex flex-col items-start gap-1 relative w-full flex-wrap font-poppins">
                  <label
                    className="block text-[16px] font-medium mb-[6px] tracking-wider text-[#212131]"
                    htmlFor="writtenBy"
                  >
                    Written by
                  </label>
                  <div className="flex">
                    <div className="flex flex-wrap gap-2">
                      {collaborators.map(
                        (tag, index) =>
                          (tag.permissionType === 'Admin' ||
                            tag.permissionType === 'Edit') && (
                            <div
                              key={tag.email!}
                              className="flex items-center bg-[#40BB7B] rounded-full p-[4px]"
                            >
                              <img
                                src={tag.profile}
                                alt={tag.name}
                                className="min-w-6 w-6 h-6 min-h-6 rounded-full mr-2 object-cover"
                              />
                              <span className="text-[10px] text-white font-medium mr-2">
                                {tag.name}
                              </span>
                              {tag.editable && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveCollaborator(index)
                                  }
                                  className="text-gray-500 hover:text-gray-700 text-lg leading-none"
                                >
                                  &times;
                                </button>
                              )}
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                </div>

                <div className='font-poppins'>
                  <label className="block text-[16px] font-medium mb-[6px] tracking-wider text-[#212131]">
                    Invite collaborators
                  </label>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="relative w-full">
                      <EmailSuggest value={invitee} setValue={setInvitee} />
                    </div>
                    <button
                      type="button"
                      className="px-11 py-4 text-[#9999A0] bg-transparent whitespace-nowrap border border-[#9999A0] rounded-[16px]"
                      onClick={handleAddCollaborator}
                    >
                      Add
                    </button>
                  </div>

                  <div className="max-h-52 overflow-auto">
                    {collaborators.map((collab, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <div className="relative w-full">
                          <input
                            type="email"
                            value={collab.email}
                            className="w-full py-1 px-3 border border-[#C8C6D3] rounded-[16px] text-[14px] font-medium text-[#212131]"
                            readOnly
                          />
                          {collab.editable && (
                            <button
                              type="button"
                              className="absolute inset-y-0 right-2 text-sm px-1"
                              onClick={() => handleRemoveCollaborator(index)}
                            >
                              x
                            </button>
                          )}
                        </div>

                        {collab.editable ? (
                          <select
                            className="py-1 px-3 border border-[#C8C6D3] rounded-[16px] text-[14px] font-medium text-[#653EFF]"
                            value={collab.permissionType}
                            onChange={(e) =>
                              handleActionChange(
                                index,
                                e.target.value as PermissionType,
                              )
                            }
                            disabled={!collab.editable}
                          >
                            {permissionTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select
                            className="px-4 py-1 border border-gray-300 rounded-2xl text-[#653EFF]"
                            value={collab.permissionType}
                            onChange={(e) =>
                              handleActionChange(
                                index,
                                e.target.value as PermissionType.Admin,
                              )
                            }
                            disabled={!collab.editable}
                          >
                            <option value="Admin">Admin</option>
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-[414px] font-poppins">
              <div className="flex flex-col space-y-4">
                <div className="space-y-6">
                  <div>
                    <label
                      className="block text-[16px] font-medium mb-[6px] tracking-wider text-[#212131]"
                      htmlFor="logline"
                    >
                      Logline
                    </label>
                    <textarea
                      id="logline"
                      className="w-full px-[14px] py-[16px] border border-[#00000011] rounded-[16px] text-[16px] font-poppins c-form-input"
                      placeholder="E.g. After waking up in an unfamiliar city with no memory of who he is, a gentle yet haunted man must retrace the steps of a life he doesn’t remember — only to discover he may have chosen to forget it for a reason."
                      value={logline}
                      rows={7}
                      onChange={(e) => setLogline(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-[16px] font-medium mb-[6px] tracking-wider text-[#212131]"
                      htmlFor="theme"
                    >
                      Theme
                    </label>
                    <input
                      id="theme"
                      type="text"
                      className="w-full px-[14px] py-[18.5px] border border-[#00000011] rounded-[16px] text-[16px] c-form-input"
                      placeholder="E.g. Identity and the freedom to redefine oneself."
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    />
                  </div>

                  <div className='custome-select-option'>
                    <label className="block text-[16px] font-medium mb-[6px] tracking-wider text-[#212131]">
                      Genre
                    </label>
                    <Select
                      isMulti
                      options={genreOptions}
                      value={selectedGenres}
                      onChange={handleGenreChange}
                      placeholder="Select genres..."
                      styles={{
                        
                        control: (base) => ({
                          ...base,
                          borderRadius: '10px',
                          padding: '8px 12px',                        
                        }),
                        indicatorSeparator: () => ({
                          display: 'none',
                        }),
                      }}
                    />
                  </div>

                  <div className="mt-4 custome-select-option">
                    <label className="block text-[16px] font-medium mb-[6px] tracking-wider text-[#212131]">
                      Sub genre
                    </label>
                    <Select
                      isMulti
                      options={subGenreOptions}
                      value={selectedSubGenres}
                      onChange={handleSubGenreChange}
                      placeholder="Select subgenres..."
                      isDisabled={selectedGenres.length === 0}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: '10px',
                          padding: '8px 12px',
                        }),
                        indicatorSeparator: () => ({
                          display: 'none',
                        }),
                      }}
                    />
                  </div>

                  {type == 'import' ? (
                    <div className="p-2 flex flex-col gap-2">
                      <FileDropzone
                        buttonClass="text-[#3fbb7b]"
                        instructionText="PDF or FDX file (Max 4MB)"
                        label="Attach PDF/FDX*"
                        accept=".pdf,.fdx"
                        onFileChange={handleFileChange}
                      />
                      <div className="bg-[#E9E9EA] rounded-2xl p-4 gap-2">
                        <p className="text-xs">
                          When uploading a PDF file, please ensure that the
                          screenplays is in the industry-standard format.
                          Otherwise, it might be parsed incorrectly.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label
                        className="block text-[16px] font-medium mb-[6px] tracking-wider text-[#212131]"
                        htmlFor="pagetarget"
                      >
                        Page Target
                      </label>
                      <input
                        id="pagetarget"
                        type="number"
                        className="w-full px-[14px] py-[18.5px] border border-[#00000011] rounded-[16px] text-[16px] c-form-input"
                        placeholder="How many pages do you aim to write? (e.g., 120)"
                        value={pagetarget}
                        onChange={(e) => setPagetarget(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <DialogFooter className="">
              <DialogClose asChild>
                <button
                  className='className=" block px-[73px] py-[18px] text-[#9999A0] bg-transparent border-solid border-[1px] border-[#9999A0] rounded-[16px] text-[16px]"'
                  type="button"
                  disabled={isPending}
                >
                 Cancel
                </button>
              </DialogClose>
            </DialogFooter>
            <button
              type="submit"
              className=" block px-[73px] py-[18px] text-white bg-[#653EFF] rounded-[16px] text-[16px]"
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFileModal;
