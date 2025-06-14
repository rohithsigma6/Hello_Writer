import { User } from '@/types/api';
import { Trash2 } from 'lucide-react';
import StashInput from './stash-input';
import stase1 from '@/assets/stase-icon-1.svg';
import stase2 from '@/assets/stase-icon-2.svg';

import { formatRelativeTime } from '@/utils/format';
interface StashCardI {
  user: Partial<User>;
  handleDeleteStash: any;
  handleDragStart: any;
  handleDrop: any;
  text: string;
  id: string;
  title: string;
  createdAt: Date;
}
export const StashCard = ({
  user,
  handleDeleteStash,
  handleDragStart,
  handleDrop,
  text,
  id,
  title,
  createdAt,
}: StashCardI) => {
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, id, text)}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full bg-white rounded-lg border border-[#BABABF] p-[12px] mb-[18px] relative max-h-[220px] max-w-[300px] overflow-hidden"
    >
      <div className="space-y-4">
        <div>
          <StashInput initialTitle={title} id={id} />
          <div className="flex items-center mt-1">
            <span className="text-[#9999A0] text-[12px] block">
              By {user?.firstName} {user?.lastName}
            </span>
            <span className="text-gray-400 ml-2 text-sm">
              {formatRelativeTime(createdAt)}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div
            className="text-sm cursor-move text-wrap max-w-[95%] font-[courier-regular] prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none text-black"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
      <div className="flex justify-between mt-[16px] gap-3">
        <button className="flex justify-center items-center flex-auto gap-1 py-[5px] px-[12px] text-[#9999A0] bg-[#E9E9EA] rounded-[16px] text-[12px]">
          Preview <img src={stase1} alt="" className="h-[16px] w-[16px]" />
        </button>
        <button
          onClick={() => handleDeleteStash(id)}
          className="flex justify-center items-center flex-auto gap-1 py-[5px] px-[12px] text-[#9999A0] bg-[#E9E9EA] rounded-[16px] text-[12px]"
          aria-label="Delete"
        >
          Delete <img src={stase2} alt="" className="h-[16px] w-[16px]" />
        </button>
      </div>
    </div>
  );
};

export default StashCard;
