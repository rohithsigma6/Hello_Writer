import { File } from '@/types/api';
import { Link } from 'react-router';
import FileInfo from './file-info';
import { MdVerifiedUser } from 'react-icons/md';
import AvatarGroup from '@/components/ui/avatar/avatar-group';
import { RangeBar } from '@/components/ui/rangebar';
import { CustomDropdown } from '@/components/ui/dropdown';
import projectTitle from '@/assets/dashboard/projectTitle.svg';

import {
  calculatePercentage,
  getTextColorClass,
} from '@/components/ui/rangebar/helper';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  file: File;
  handleOptionClick: (option: string) => void;
  fileDropdownOptions: string[];
  setFile: Dispatch<SetStateAction<File | null>>;
};

export const FileTableChild = ({
  file,
  handleOptionClick,
  fileDropdownOptions,
  setFile,
}: Props) => {
  const percentage = calculatePercentage(
    file?.currentPage || 0,
    file?.pagetarget || 120,
  );
  const [avatar, setAvatar] = useState<{ imgLink: string; username: string }[]>(
    [],
  );
  

  const { title, genre, writtenBy, logline, theme, updatedAt } = file;
    useEffect(() => {
      setAvatar(
        file?.collaborators?.map((item) => ({
          imgLink: item?.userId?.profile_image,
          username: item?.userId?.firstName + ' ' + item?.userId?.lastName,
        })),
      );
    }, [file]);
  return (
    <tr key={file._id} className="hover:bg-gray-100 cursor-pointer">
      <td className="p-4 align-top">
        <Link to={`/file/${file._id}/screenplay`}>
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center rounded-lg w-[32px] h-[32px]">
              <img src={projectTitle} className="w-full h-full rounded-[8px]" />
            </div>
            <p className="font-bold text-lg text-light-black">{file.title}</p>
          </div>
        </Link>
      </td>

      <td className="p-4 align-top max-w-[236px] min-w-[236px]">
        <FileInfo {...{file , genre, writtenBy, logline, theme ,avatar}} />
      </td>

      <td className="p-4 align-top max-w-[195px]">
        <div>
          <div className="flex gap-2">
            {['v1', 'Final', 'White'].map((sp, index) => (
              <div
                key={index}
                className="border border-[#252C34] px-2 rounded-full font-medium text-[12px]"
              >
                • {sp}
              </div>
            ))}
          </div>

          <div className="inline-flex items-center px-[8px] py-[6px] gap-1 bg-primary-green text-white rounded-full w-auto mt-[16px]">
            <MdVerifiedUser className="text-white" />
            <p className="text-[12px]">Secured</p>
          </div>
        </div>
      </td>

      <td className="p-4 align-top max-w-[160px]">
        <AvatarGroup avatars={avatar} />
      </td>

      <td className="p-4 align-top min-w-[220px]">
        <div className="flex items-center gap-2">
          <RangeBar percentage={percentage} />
          <p className={`font-bold text-xl ${getTextColorClass(percentage)}`}>
            {percentage}%
          </p>
        </div>
      </td>
      <td className="p-4 align-top " onClick={() => setFile(file)}>
        <CustomDropdown
          handleOptionClick={handleOptionClick}
          options={fileDropdownOptions}
        />
      </td>
      <hr />
    </tr>
  );
};
