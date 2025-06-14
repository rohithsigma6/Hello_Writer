import React, { FormEvent, useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import { FaAngleDown } from "react-icons/fa6";
import { useLocation } from "react-router";

interface Collaborator {
  email: string | undefined;
  permissionType: "Edit" | "Suggest" | "View" | "Comment";
  name: string | undefined;
  profile: string | undefined;
  editable?: boolean;
  userId: string | undefined | null;
}

export function cleanObject(obj:any) {
  for (const key in obj) {
      if (obj[key] === "" || obj[key] === undefined || (Array.isArray(obj[key]) && obj[key].length === 0)) {
          delete obj[key];
      }
  }
  return obj;
}
interface PopupCreateFileProps {
  isOpen: boolean;
  onClose: () => void;
}

const creations = ["Feature Film", "Web Series", "Tv Show", "Short Film"]
const PopupCreateFileInFile = ({ isOpen, onClose }:any) => {
  if (!isOpen) return null;
  const location = useLocation();
  const folderId = location.pathname.startsWith("/folder/") ? location.pathname.split("/")[2] : null;

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [basedOn, setBasedOn] = useState("");
  const [writtenBy, setWrittenBy] = useState<string[]>([]);
  const [authorInput, setAuthorInput] = useState("");
  const [genre, setGenre] = useState<string[]>([]);
  const [subGenre, setSubGenre] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");

  const [selectedCategory, setSelectedCategory] = useState('');
  const [invitee, updateInvitee] = useState<{
    label: string;
    value: string;
    name: string | undefined;
    email: string;
    profile: string | undefined;
    id: string | null;
  } | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<MultiValue<{ label: string; value: string }>>([]);
  const [selectedSubGenres, setSelectedSubGenres] = useState<MultiValue<{ label: string; value: string }>>([]);
  const [logline, setLogline] = useState("");
  const [theme, setTheme] = useState("");
  const [pagetarget, setPagetarget] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAuthorInput(value);

    const authors = value
      .split(",")
      .map((author) => author.trim())
      .filter((author) => author !== "");
    setWrittenBy(authors);
  };

  const handleRemoveAuthor = (index: number) => {
    const updatedAuthors = writtenBy.filter((_, i) => i !== index);
    setWrittenBy(updatedAuthors);
    setAuthorInput(updatedAuthors.join(", "));
  };

  useEffect(() => {
    setGenre(selectedGenres.map((g) => g.value));
  }, [selectedGenres]);

  useEffect(() => {
    setSubGenre(selectedSubGenres.map((s) => s.value));
  }, [selectedSubGenres]);

  const handleGenreChange = (selected: MultiValue<{ label: string; value: string }>) => {
    setSelectedGenres(selected);
  };

  const handleSubGenreChange = (selected: MultiValue<{ label: string; value: string }>) => {
    setSelectedSubGenres(selected);
  };

  const handleTypeChange = (event:any) => {
    setSelectedCategory(event.target.value); // Update state with the selected option
  };
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const handleRemoveCollaborator = (index: number) => {
    const updatedCollaborators = collaborators.filter((_, i) => i !== index);
    setCollaborators(updatedCollaborators);
  };

  const handleActionChange = (index: number, newAction: "Edit" | "Suggest" | "View" | "Comment") => {
    const updatedCollaborators = collaborators.map((collab, i) =>
      i === index ? { ...collab, permissionType: newAction } : collab
    );
    setCollaborators(updatedCollaborators);
  };

  const handleCreateFile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const getCollaborator = collaborators.filter((collab) => collab.editable);
    const payload = {
      title: title,
      genre: genre,
      subTitle: subTitle,
      basedOn:basedOn,
      subgenre: subGenre,
      collaborators: getCollaborator,
      typeOfCreation:selectedCategory,
      logline: logline,
      theme: theme,
      pagetarget: pagetarget,
      ...(folderId ? { folderId } : {}),
    };
    const data = cleanObject(payload);
    // await createFileFn(data as any);
    // incrementFileCreated();
    
  };

  const handleAddCollaborator = () => {
    //check if email is already added
    const emailExists = collaborators.find((collab) => collab.email === invitee?.label);
    if (emailExists) {
      setNewEmail("");
      return;
    }

    setCollaborators([
      ...collaborators,
      {
        email: invitee?.label,
        name: invitee?.name,
        profile: invitee?.profile,
        permissionType: "Edit",
        editable: true,
        userId: invitee?.value,
      },
    ]);
    setNewEmail("");
    updateInvitee(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form className="bg-white p-8 rounded-lg shadow-md w-[900px]" onSubmit={handleCreateFile}>
        <div className="flex flex-row">
          <div className="flex-1 mr-6">
            <h2 className="text-xl font-bold mb-0">Create Script</h2>
            <p className="text-lg font-normal text-gray-400 mt-0">Please enter details for this script</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-1 mt-4 tracking-wider" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full px-3 py-4 border border-gray-300 rounded-[10px]"
                  placeholder="E.g. Suttabaaz"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="bg-[#212131] rounded-2xl py-2 px-3">
                <button className="text-white w-full flex justify-between items-center">
                  <span>Suggest screenplay titles based on logline</span>
                  <span>{">"}</span>
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-1 mt-4 tracking-wider" htmlFor="subTitle">
                  Sub Title
                </label>
                <input
                  id="subTitle"
                  type="text"
                  className="w-full px-3 py-4 border border-gray-300 rounded-[10px]"
                  placeholder="E.g. The Story of a  chain smoker"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1 mt-4 tracking-wider" htmlFor="subTitle">
                  Based On
                </label>
                <input
                  id="basedOn"
                  type="text"
                  className="w-full px-3 py-4 border border-gray-300 rounded-[10px]"
                  placeholder="E.g. The Story of a  chain smoker"
                  value={basedOn}
                  onChange={(e) => setBasedOn(e.target.value)}
                />
              </div>
              <label className="block text-sm font-bold mt-4 tracking-wider" htmlFor="subTitle">
                 Type of Creation
                </label>
              <div className=" flex flex-row items-center relative mb-4 w-full">
         
                <select
                  className="w-full px-3 py-4 border border-gray-300 rounded-[10px]  form-select appearance-none cursor-pointer select-arrow font-medium text-center flex flex-row gap-4 items-center  text-sm relative"
                  aria-label="Default select example"
                  name="gender"
                  value={selectedCategory}
                  onChange={handleTypeChange}
                >
                  <option value="" disabled selected className="text-start" >
                    Select a Category
                  </option>
                  {creations.map((gen, index) => (
                    <option key={index} className="text-start" value={gen}>
                      {gen}
                    </option>
                  ))}
                </select>
                <FaAngleDown className="absolute right-4 text-slate-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1 tracking-wider" htmlFor="authorInput">
                  Written by
                </label>
                {/* <input
                  id="authorInput"
                  type="text"
                  className="w-full px-3 py-4 border border-gray-300 rounded-[10px]"
                  placeholder="E.g. Rakesh"
                  value={authorInput}
                  onChange={handleInputChange}
                /> */}
                <div className="flex">
                  {/* {collaborators.map((collaborator=><div className="flex w-20  h-10 bg-slate-400">
                  <span></span>
                </div>))} */}

                  <div className="flex flex-wrap gap-2">
                    {collaborators.map((tag, index) => {
                      return (
                        tag.permissionType === "Edit" && (
                          <div key={tag.profile} className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                            <img src={tag.profile} alt={tag.name} className="w-6 h-6 rounded-full mr-2" />
                            <span className="text-sm text-gray-700 font-medium mr-2">{tag.name}</span>
                            {tag.editable && (
                              <button
                                onClick={() => handleRemoveCollaborator(index)}
                                className="text-gray-500 hover:text-gray-700 text-lg leading-none"
                              >
                                &times;
                              </button>
                            )}
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 tracking-wider">Invite collaborators</label>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="relative w-full">
                    {/* <EmailSuggest value={newEmail} setValue={setNewEmail}  /> */}
                    {/* <EmailSuggest value={invitee} setValue={updateInvitee} /> */}
                  </div>
                  <button
                    type="button"
                    className="px-12 py-4 text-[#9999A0] bg-transparent flex-1 whitespace-nowrap border border-[#9999A0] rounded-[10px]"
                    onClick={handleAddCollaborator}
                  >
                    Add
                  </button>
                </div>

                <div className="max-h-52 overflow-auto">
                  {collaborators.map((collab, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <div className="relative w-full">
                        <input
                          type="email"
                          value={collab.email}
                          className="w-full px-3 py-1 border border-gray-300 rounded-2xl pr-10"
                          readOnly
                        />
                        {collab.editable && (
                          <button
                            type="button"
                            className="absolute inset-y-0 right-2 text-sm px-1  "
                            onClick={() => handleRemoveCollaborator(index)}
                          >
                            x
                          </button>
                        )}
                      </div>

                      {collab.editable ? (
                        <select
                          className="px-4 py-1 border border-gray-300 rounded-2xl text-[#653EFF]
                ]"
                          value={collab.permissionType}
                          onChange={(e) =>
                            handleActionChange(index, e.target.value as "Edit" | "Suggest" | "View" | "Comment")
                          }
                          disabled={!collab.editable}
                        >
                          <option value="Edit">Edit</option>
                          <option value="Suggest">Suggest</option>
                          <option value="View">View</option>
                          <option value="Comment">Comment</option>
                        </select>
                      ) : (
                        <select
                          className="px-4 py-1 border border-gray-300 rounded-2xl text-[#653EFF]
                ]"
                          value={collab.permissionType}
                          onChange={(e) =>
                            handleActionChange(index, e.target.value as "Edit" | "Suggest" | "View" | "Comment")
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
          <div className="flex-1 ml-6">
            <div className="flex flex-col space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1 tracking-wider" htmlFor="title">
                    Logline
                  </label>
                  <textarea
                    id="logline"
                    // type={"text"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-[10px]"
                    placeholder="Describe about Suttabaaz"
                    value={logline}
                    rows={7}
                    onChange={(e) => setLogline(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 tracking-wider" htmlFor="title">
                    Theme
                  </label>
                  <input
                    id="theme"
                    type="text"
                    className="w-full px-3 py-4 border border-gray-300 rounded-[10px]"
                    placeholder="E.g. Hero's journey"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 tracking-wider">Genre</label>
                  <Select
                    isMulti
                    // options={genreOptions}
                    value={selectedGenres}
                    onChange={handleGenreChange}
                    placeholder="Select genres..."
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "10px",
                        padding: "8px 12px",
                      }),

                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                    }}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-bold mb-1 tracking-wider">Sub genre</label>
                  <Select
                    isMulti
                    // options={subGenreOptions}
                    value={selectedSubGenres}
                    onChange={handleSubGenreChange}
                    placeholder="Select subgenres..."
                    isDisabled={selectedGenres.length === 0}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "10px",
                        padding: "8px 12px",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 tracking-wider" htmlFor="title">
                    Page Target
                  </label>
                  <input
                    id="pagetarget"
                    type="text"
                    className="w-full px-3 py-4 border border-gray-300 rounded-[10px]"
                    placeholder="Enter numerical value"
                    value={pagetarget}
                    onChange={(e) => setPagetarget(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 py-6 ">
          <button
            onClick={onClose}
            className="px-6 py-3 w-48 text-[#9999A0] bg-transparent border-solid border-[1px] border-[#9999A0] rounded-[10px] text-lg"
          >
            Cancel
          </button>
          <button className="px-6 py-3 w-48 text-white bg-[#653EFF] rounded-[10px] text-lg">Create</button>
        </div>
      </form>
    </div>
  );
};

export default PopupCreateFileInFile;
