import editImg from "@/assets/titlePage/edit.png";
import { useFiles } from "@/features/dashboard/api/get-files";
import { useUser } from "@/features/users/api/get-user";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./titleStyle.css";
type Props = {
  setCurruntModal: any;
};
const ScreenplayTitle = ({ setCurruntModal }: Props) => {
  const [titleImage, setTitleImage] = useState<string | null>(null);

  const { data: user } = useUser();

      
        const { fileId } = useParams();
        const { data: fileData } = useFiles({
          fileId: fileId!,
          queryConfig: {
            enabled: !!fileId,
          },
        });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTitleImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col justify-between h-[297mm] w-[210mm] mx-auto p-10  text-gray-800 font-courier">
      {/* Header */}
      <div className="text-right text-sm">
        <p>Rev. 08/25/09 (Yellow)</p>
        <p>Rev. 09/15/09 (Green)</p>
        <p>Rev. 11/25/09 (Goldenrod)</p>
        <p>Rev. 05/20/10 (Buff Reshoots)</p>
      </div>

      {/* Title Section */}

      <div
        className="text-center mt-20 relative group hover:bg-['#F0ECFF']  p-4 border-2 border-dashed border-white hover:border-primary-blue rounded-xl "
        // onClick={() => setCurruntModal("title")}
      >
        {/* Edit Button */}

        <img
          src={editImg}
          className="absolute top-4 right-4 hidden group-hover:block  rounded cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent click event
            setCurruntModal("title");
          }}
        />

        <h1 className="text-4xl font-bold">{fileData?.title ? fileData?.title : "UNTITLED"}</h1>
        <h2 className="text-xl mt-2">{fileData?.subTitle ? fileData?.subTitle : "Subtitle"}</h2>

        <p className="mt-8">{fileData?.prefix ? fileData?.prefix : "Written By"}...</p>

        <p className="text-lg font-semibold">
          {fileData?.collaborators?.map((coll: any) => {
            if (coll.permissionType === "ADMIN" || coll.permissionType === "Edit") {
              return <p key={coll._id}>{coll.name}</p>;
            }
            return null;
          })}
        </p>

        <p className="mt-8">based on</p>
        <p className="mt-2">{fileData?.basedOn ? fileData?.basedOn : "based on"}</p>

        {/* Revision Section */}
        <div className="text-center mt-10">
          <p>Previous revision by</p>
          <p className="font-semibold">Screenwriters</p>
          <p className="mt-4">Current revision by</p>
          <p className="font-semibold">Screenwriters</p>
        </div>

        {/* Footer Section */}
        <div className="mt-20 text-sm text-center">
          <div className="mb-4">
            <p>This script is the confidential and proprietary property of</p>
            <p className="underline ">
              {" "}
              {fileData?.collaborators?.map((coll:any,index:any) => {
                if (coll.permissionType === "ADMIN" || coll.permissionType === "Edit") {
                  return <span key={coll._id}>{`${coll.name} ${index != fileData?.collaborators.length-1 ? ",":"."}`}</span>;
                }
                return null;
              })}
            </p>
            <p>
              No portion of it may be performed, distributed, reproducer, used, quoted or published without prior
              written permission.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div className="text-start">
          {/* <p>Charlestown Production LLC</p>
            <p>4000 Warner Boulevard</p>
            <p>Burbank, California 91522</p> */}
        </div>

        <div
          className="text-start cursor-pointer"
          onClick={() => {
            setCurruntModal("address");
          }}
        >
          {!user?.profile?.basicInfo.address?<div className="flex items-center justify-center w-[210px] border-2 border-dashed bg-['#E9E9EA'] bg-opacity-50 border-gray-300 rounded-lg p-2">
            <div className="text-center">
              <p className=" text-gray-700 mb-1 font-sans" style={{ fontSize: "12px", lineHeight: "14px" }}>
                Click here to add screenwriter's contact details
              </p>
              <button
                className="bg-primary-cta  text-white font-sans font-semibold px-4 py-1 rounded-md shadow"
                style={{ fontSize: "12px", lineHeight: "14px" }}
              >
                Add Address
              </button>
            </div>
          </div>: <div className="text-start">
           <p>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>{user?.profile?.basicInfo.address} {user?.profile?.basicInfo.city}</p>
            <p>{user?.profile?.basicInfo.state} {user?.profile?.basicInfo.country} {user?.profile?.basicInfo.zip}</p> 
        </div>}
        </div>
      </div>
    </div>
  );
};

export default ScreenplayTitle;
