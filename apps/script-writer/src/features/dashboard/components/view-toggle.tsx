import { FaThList } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';

export const ViewToggle = ({
  viewMode,
  setViewMode,
}: {
  viewMode: string;
  setViewMode: (arg: string) => void;
}) => (
  <div className="flex gap-2">
    <button
      onClick={() => setViewMode('grid')}
      className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <IoGrid size={18} />
    </button>
    <button
      onClick={() => setViewMode('table')}
      className={`p-2 rounded-full ${viewMode === 'table' ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <FaThList size={18} />
    </button>
  </div>
);
