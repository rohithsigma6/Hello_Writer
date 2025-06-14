import { EmailSuggest } from "@/features/dashboard/components/files/email-suggestions";
import { useFile } from "@/features/file/screenplay/api/get-file-by-id";
import { usePostToFile } from "@/features/file/screenplay/api/update-file";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useParams } from "react-router";
import Select, { SingleValue } from "react-select";
function cleanObject(obj: any) {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === undefined || (Array.isArray(obj[key]) && obj[key].length === 0)) {
      delete obj[key];
    }
  }
  return obj;
}
const customStyles = {
  control: (base: any) => ({
    ...base,
    textAlign: "start",
    borderColor: "#d1d5db", // light gray border
    boxShadow: "none",
    borderRadius: "16px",
    "&:hover": { borderColor: "#653EFF" }, // hover color
  }),
  menu: (base: any) => ({
    ...base,
    margin: 0,
    textAlign: "start",
  }),
  menuList: (base: any) => ({
    ...base,
    padding: 0,
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};
interface Payload {
  interest: {
    interests: string[]; // Array of interests
    interested_format: string[]; // Array of formats
    other_interest: string; // Custom interest
  };
  favourite_genres: string[]; // Array of genres
  profile_bio: string; // User bio
  profile_image: File | null; // Profile image (File object)
}
type Props = {
  setCurruntModal: any;
};

interface Collaborator {
  _id: string | undefined;
  email: string | undefined;
  permissionType: "ADMIN" | "EDIT" | "Suggest" | "View" | "Comment";
  name: string | undefined;
  profile_image: string | undefined;
  editable?: boolean;
}

const prefixOptions = [
  { label: "Written by", value: "Written by" },
  { label: "Screenplay by", value: "Screenplay by" },
];

const EditedByModal = ({ setCurruntModal }: Props) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const [selectedPrifix, setSelectedPrifix] = useState<SingleValue<{ label: string; value: string }>>(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [basedOn, setBasedOn] = useState("");
  const { fileId } = useParams();
  const { data: fileData } = useFile({
    fileId: fileId!,
    queryConfig: {
      enabled: !!fileId,
    },
  });
  const [invitee, updateInvitee] = useState<{
    label: string;
    value: string;
    name: string | undefined;
    email: string;
    profile: string | undefined;
    id: string | null;
  } | null>(null);

  useEffect(() => {
    if (fileData) {
      
      setCollaborators([...(fileData?.file?.collaborators ?? [])]);
    }
  }, [fileData]);

  const postMutation = usePostToFile();
  useEffect(() => {
    setTitle(fileData?.file?.title ?? "");
    setSubTitle(fileData?.file?.subTitle ?? "");
    setBasedOn(fileData?.file?.basedOn ?? "");
    setSelectedPrifix({ label: "Written by", value: "Written by" });
  }, []);

  const handleUpdateFile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //print all fields


    // const getWritternby = collaborators.filter((user) => user.permissionType === "EDIT").map((user) => user.userId);
    const getCollaborator = collaborators
      .filter((user) => user.permissionType !== "ADMIN")
      .map((user) => ({
        userId: user._id,
        permissionType: user.permissionType,
      }));
    const payload = {
      title: title,
      subTitle: subTitle,
      basedOn: basedOn,
      collaborators: getCollaborator,
      prefix: selectedPrifix?.value,
    };
    const data = cleanObject(payload);

    await postMutation.mutate({ fileId: fileData?.file?._id, payload:data });
    setCurruntModal(null)
  };

  const handleRemoveCollaborator = (index: number) => {
    const updatedCollaborators = collaborators.filter((_, i) => i !== index);
    setCollaborators(updatedCollaborators);
  };

  const handleActionChange = (index: number, newAction: "EDIT" | "Suggest" | "View" | "Comment") => {
    const updatedCollaborators = collaborators.map((collab, i) =>
      i === index ? { ...collab, permissionType: newAction } : collab
    );
    setCollaborators(updatedCollaborators);
  };
  const handleprifix = (selected: SingleValue<{ label: string; value: string }>) => {
    setSelectedPrifix(selected);
  };
  const handleAddCollaborator = () => {
    //check if email is already added
    const emailExists = collaborators.find((collab) => collab.email === invitee?.label);
    if (emailExists) {
      // setNewEmail("");
      return;
    }
    console.log(invitee);

    setCollaborators([
      ...collaborators,
      {
        email: invitee?.label,
        name: invitee?.name,
        profile_image: invitee?.profile,
        permissionType: "EDIT",
        editable: true,
        _id: invitee?.value,
      },
    ]);
    // setNewEmail("");
    updateInvitee(null);
  };
  const modalStyles =
    "relative bg-[#FFFFFF] xs:rounded-lg shadow-xl xs:max-w-2xl max-w-full xs:h-auto h-screen w-full  flex flex-col ";

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        {/* Modal Content */}
        <div className={modalStyles}>
          <form onSubmit={handleUpdateFile}>
            {/* Close Button */}
            <div className="flex justify-between px-5 py-2">
              <h2 className="text-lg font-semibold text-black mb-5 text-left">Copyright Information</h2>
              <button onClick={() => setCurruntModal(null)} className=" text-black hover:text-black">
                <FaTimes size={20} />
              </button>
            </div>
            <hr />
            {/* Input Fields */}
            <div className="flex flex-col gap-6  px-5 py-5 max-h-[60vh] overflow-y-scroll">
              {/* Production House Name */}
              <div className="flex flex-col">
                <label htmlFor="title" className="text-sm font-medium text-black mb-2 text-start">
                  Title:
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder=""
                  className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:ring-2 focus:ring-[#653EFF] outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Screenwriter Name */}
              <div className="flex flex-col">
                <label htmlFor="subTitle" className="text-sm font-medium text-black mb-2 text-start">
                  Sub Title:
                </label>
                <input
                  id="subTitle"
                  type="text"
                  placeholder=""
                  className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:ring-2 focus:ring-[#653EFF] outline-none"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
              </div>
              {/* Screenwriter Name */}
              <div className="flex flex-col">
                <label htmlFor="basedOn" className="text-sm font-medium text-black mb-2 text-start">
                  Based On:
                </label>
                <input
                  id="basedOn"
                  type="text"
                  placeholder=""
                  className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:ring-2 focus:ring-[#653EFF] outline-none"
                  value={basedOn}
                  onChange={(e) => setBasedOn(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="basedOn" className="text-sm font-medium text-black mb-2 text-start">
                  Pre-fix
                </label>
                <Select
                  options={prefixOptions}
                  value={selectedPrifix}
                  onChange={handleprifix}
                  placeholder="Select Prifix..."
                  styles={customStyles}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1 tracking-wider text-start" htmlFor="authorInput">
                  Written by
                </label>
                <div className="flex">

                  <div className="flex flex-wrap gap-2">
                    {collaborators.map((tag, index) => {
                      return tag.permissionType === "EDIT" || tag.permissionType === "ADMIN" ? (
                        <div
                          key={tag.profile_image}
                          className={`flex items-center ${tag.permissionType === "ADMIN" ? "bg-green-500" : "bg-[#C8C6D3]"}  rounded-full px-3 py-1 text-white`}
                          style={{ fontSize: "10px" }}
                        >
                          <img src={tag.profile_image} alt={tag.name} className="w-6 h-6 rounded-full mr-2" />
                          <span className="text-sm text-white font-medium mr-2">{tag.name}</span>
                          {tag.permissionType === "EDIT" && (
                            <button
                              onClick={() => handleRemoveCollaborator(index)}
                              className="text-gray-500 hover:text-gray-700 text-lg leading-none"
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      ) : (
                        <></>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 tracking-wider text-start">Invite collaborators</label>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="relative w-full">
                    {/* <EmailSuggest value={newEmail} setValue={setNewEmail}  /> */}
                    <EmailSuggest value={invitee} setValue={updateInvitee} />
                  </div>
                  <button
                    type="button"
                    className="px-12 py-4 text-[#9999A0] bg-transparent flex-1 whitespace-nowrap border border-[#9999A0] rounded-[10px]"
                    onClick={handleAddCollaborator}
                  >
                    Add
                  </button>
                </div>

                <div className="max-h-52 overflow-auto w-2/3">
                  {collaborators.map((collab, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <div className="relative w-full">
                        <input
                          type="email"
                          value={collab.email}
                          className="w-full px-3 py-1 border border-gray-300 rounded-2xl pr-10"
                          readOnly
                        />
                        {collab.permissionType !== "ADMIN"  && (
                          <button
                            type="button"
                            className="absolute inset-y-0 right-2 text-sm px-1  "
                            onClick={() => handleRemoveCollaborator(index)}
                          >
                            x
                          </button>
                        )}
                      </div>

                      {collab.permissionType === "ADMIN" ? (
                        <select
                          className="px-4 py-1 border border-gray-300 rounded-2xl text-[#653EFF]
                        ]"
                          value={collab.permissionType}
                          onChange={(e) =>
                            handleActionChange(index, e.target.value as "EDIT" | "Suggest" | "View" | "Comment")
                          }
                          disabled={!collab.editable}
                        >
                          <option value="Admin">Admin</option>
                        </select>
                      ) : (
                        <select
                          className="px-4 py-1 border border-gray-300 rounded-2xl text-[#653EFF]
                          ]"
                          value={collab.permissionType}
                          onChange={(e) =>
                            handleActionChange(index, e.target.value as "EDIT" | "Suggest" | "View" | "Comment")
                          }
                          // disabled={!collab.editable}
                        >
                          <option value="EDIT">Edit</option>
                          <option value="Suggest">Suggest</option>
                          <option value="View">View</option>
                          <option value="Comment">Comment</option>
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr />
            {/* Buttons */}
            <div className="flex justify-end   px-5 py-2">
              <button
                onClick={() => setCurruntModal(null)}
                className="px-6 py-2 text-[#653EFF] rounded-2xl hover:bg-[#E6E4FF] transition w-20"
              >
                Cancel
              </button>
              <button
                className="ml-4 px-6 py-2 bg-[#653EFF] text-white rounded-2xl hover:bg-[#512ED7] transition w-20"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditedByModal;
