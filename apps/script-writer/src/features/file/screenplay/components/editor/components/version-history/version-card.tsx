import { User } from '@/types/api';
import { Trash2 } from 'lucide-react';
import stase1 from '@/assets/stase-icon-1.svg';
import stase2 from '@/assets/stase-icon-2.svg';

import { formatRelativeTime } from '@/utils/format';
import { MdOutlineMoreVert } from 'react-icons/md';
import { useEditorStore } from '@/store/editor';
import { useState } from 'react';
import { CustomDropdown } from '@/components/ui/dropdown';
import { useSearchParams } from 'react-router';
interface VersionCardI {
  user: {
    name: string;
    _id: string;
  };
  updatedAt: Date;
  index: number;
}
export const VersionCard = ({ updatedAt, user, index }: VersionCardI) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggle, setToggle] = useState(false);

  const handleOptionClick = (clickedOption: string) => {
    if (clickedOption == 'Preview') {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        versionIndex: index.toString(),
      });
    }
  };
  return (
    <div className="px-2 mb-[16px]" style={{ cursor: 'pointer' }}>
      <div className="w-full bg-transparent hover:bg-white rounded-lg border border-black shadow-md px-3 py-1 flex flex-row items-start justify-between">
        <section className="flex flex-row items-center gap-x-2">
          <div className="w-2 h-2 rounded-full bg-black"></div>

          <div>
            <h2 className="text-lg font-medium">
              {formatRelativeTime(updatedAt)}
            </h2>
            <p className="text-gray-500 text-xs">{user?.name}</p>
          </div>
        </section>

        <section>
          {/* <button onClick={() => setShowMore(true)}>
            <MdOutlineMoreVert />
          </button> */}

          <CustomDropdown
            handleOptionClick={handleOptionClick}
            options={['Preview']}
            positionClass="top-0 bg-black right-[12px] hover:bg-rounded-lg hover:text-black hover:bg-gray-800"
          />
        </section>
      </div>
    </div>
  );
};

export default VersionCard;
