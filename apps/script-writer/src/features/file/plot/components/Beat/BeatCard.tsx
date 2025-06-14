import React, { useState } from "react";
import { FiMessageCircle, FiImage, FiFileText, FiStar } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { BsChatLeftDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";
import { LuHash } from "react-icons/lu";
import BeatTaskStatus from "./BeatTaskStatus";
import BeatCollaborators from "./BeatCollaborators";
import BeatMenu from "./BeatMenu";
import BeatHashtag from "./BeatHashtag";
import PlotComment from "./BeatComment";
import BeatNote from './BeatNote'
import BeatImage from './BeatImage';

const BeatCard: React.FC = () => {
  const [isTask, setIsTask] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [isOption, setIsOption] = useState(false);
  const [isHashtag, setIsHashtag] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("Untitled beat");
  const [isComment, setIsComment] = useState(false);
  const [isNote, setIsNote] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleBlurOrEnter = (e: any) => {
    if (e.type === "blur" || (e.type === "keydown" && e.key === "Enter")) {
      setIsEditingTitle(false);
    }
  };

  return (
    <div>
      <div className="w-[310] relative h-[175px] p-4 rounded-lg shadow-md bg-white border border-gray-300">
        {/* Title */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700 flex  gap-2">
            <span className="text-gray-500 text-lg ">
              <IoIosArrowDown />
            </span>
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                onBlur={handleBlurOrEnter}
                onKeyDown={handleBlurOrEnter}
                autoFocus
                className="text-sm font-medium text-gray-700   px-1 outline-none"
              />
            ) : (
              <h3 className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => setIsEditingTitle(true)}>
                {title}
              </h3>
            )}{" "}
          </h3>
          <div className="text-gray-500 cursor-pointer flex  gap-2 relative">
            <span style={{ backgroundColor: "#eaeaea", padding: "4px", borderRadius: "6px" }} className="flex ">
              {" "}
              <LuHash style={{ margin: "2px" }} onClick={() => setIsHashtag(!isHashtag)} />
              <FiUsers style={{ margin: "2px" }} onClick={() => setIsCollaborator(!isCollaborator)} />
              <FiLoader style={{ margin: "2px" }} onClick={() => setIsTask(!isTask)} />
              <SlOptions style={{ margin: "2px" }} onClick={() => setIsOption(!isOption)} />
              {isCollaborator && (
                <div className="absolute top-full left-[40px] mt-1 z-20">
                  <BeatCollaborators />
                </div>
              )}
              {isTask && (
                <div className="absolute top-full left-[55px] mt-1 z-20">
                  <BeatTaskStatus />
                </div>
              )}
              {isOption && (
                <div className="absolute top-full left-[55px] mt-1 z-20">
                  <BeatMenu />
                </div>
              )}
              {isHashtag && (
                <div className="absolute top-full left-[30px] mt-1 z-20">
                  <BeatHashtag />
                </div>
              )}
            </span>
            <span className="pt-[5px]">
              {" "}
              <RiDeleteBinLine />
            </span>
          </div>
        </div>

        {/* Synopsis */}
        <textarea
          placeholder="Synopsis...."
          className="w-full mt-2 text-sm text-gray-500 bg-transparent border rounded-lg p-2 focus:ring-0 resize-none"
          rows={3}
        ></textarea>

        {/* Icons */}
        <div className="flex relative justify-between items-center mt-2">
          <div className="flex gap-3 text-gray-500 text-xl">
            <BsChatLeftDots onClick={() => setIsComment(!isComment)} className="cursor-pointer" />
            <FiImage  onClick={() => setIsImage(!isImage)} className="cursor-pointer" />
            <FiFileText onClick={() => setIsNote(!isNote)}   className="cursor-pointer" />
          </div>
          {isComment && (
            <div className="absolute top-full left-[30px] mt-1 z-20">
              <PlotComment />
            </div>
          )}
          <div className="flex gap-2 items-center">
            <IoIosAddCircleOutline className="text-gray-500 text-xl cursor-pointer" />
            <FiStar className="text-gray-500 text-xl cursor-pointer" />
          </div>
        </div>
      </div>
     
      {
        isNote && <BeatNote />
      }
      {
        isImage && <BeatImage setIsImage={setIsImage} />
      }
    </div>
  );
};

export default BeatCard;
