import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import SnapshotDropdown from './dropdown';
import { useParams, useSearchParams } from 'react-router';
import { useVersionHistory } from '@/features/file/screenplay/api/get-snapshot-versions';

const SnapshotVersion = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { fileId } = useParams();
  const [searchParams] = useSearchParams();
  const version = searchParams.get('versionName') || 'V1';
  const { data: versionData } = useVersionHistory({ fileId: fileId! });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setToggle(!toggle)}
        className="flex flex-row items-center gap-x-2 bg-[#212131] px-[10px] py-[4px] rounded-[16px] text-white text-xs "
      >
        {version} <FaAngleDown className="text-xs" />
      </button>

      {/* SnapshotVersion drop down content */}
      {toggle && (
        <SnapshotDropdown versionData={versionData!} setToggle={setToggle} />
      )}
    </div>
  );
};

export default SnapshotVersion;
