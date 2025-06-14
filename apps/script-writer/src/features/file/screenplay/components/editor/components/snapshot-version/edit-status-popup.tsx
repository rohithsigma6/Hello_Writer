import { useState } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
// import './Animation.css';
import { useSearchParams } from 'react-router';
import { Modal } from '@/components/ui/modal';
import { XIcon } from 'lucide-react';

const statusList = [
  {
    name: 'Personal draft',
    i: 'Only you can see a personal draft',
    value: 'PERSONAL DRAFT',
  },
  {
    name: 'Draft',
    i: 'The version is visible for all users but has not been marked as final yet.',
    value: 'DRAFT',
  },
  {
    name: 'In progress',
    i: 'A draft is visible only to users with a write permission for the script',
    value: 'IN PROGRESS',
  },
  {
    name: 'Final',
    i: 'The version is visible to all users and has been marked as final.',
    value: 'FINAL',
  },
];

const EditStatusPopup = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeStatus, setActiveStatus] = useState(
    searchParams.get('editStatus') || 'PERSONAL DRAFT',
  );
  const [open, setOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(
    undefined,
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="capitalize flex flex-row items-center gap-x-2 bg-[#212131] px-[10px] py-[4px] rounded-[16px] text-white text-xs"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 16 16"
          className="w-3 h-3"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"></path>
        </svg>{' '}
        {activeStatus.toLocaleLowerCase()}
      </button>
      <Modal
        className="rounded-2xl bg-white w-[40vw] font-poppins"
        isOpen={open}
        setIsOpen={setOpen}
      >
        <div
          className={'rounded-2xl bg-white'}
          onClick={(e) => e.stopPropagation()}
        >
          <header className="p-4 flex flex-row w-full justify-between items-center">
            <p className="font-bold">Edit Status</p>

            <button
              className="hover:text-red-600 rounded-full px-2"
              onClick={() => setOpen(false)}
            >
              <XIcon />
            </button>
          </header>

          <section
            className={'flex flex-row flex-wrap gap-3 p-4 my-4 relative'}
          >
            {statusList.map((status, index) => (
              <button
                key={index}
                onClick={() => setActiveStatus(status.value)}
                className={`${activeStatus === status.value ? 'bg-black text-white' : 'text-black bg-white'} px-3 py-2 text-sm flex flex-row items-center border border-gray-300 rounded-xl gap-2 transition-colors`}
              >
                {status.name}
                <HiOutlineInformationCircle
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(undefined)}
                  className="text-lg hover:bg-black hover:text-white rounded-full transition-colors"
                />

                <p
                  className={
                    `${hoveredIndex == index ? ' flex' : ' hidden'}` +
                    ' absolute text-white bg-black p-2 bottom-16 whitespace-nowrap rounded-md'
                  }
                >
                  {status.i}
                </p>
              </button>
            ))}
          </section>

          <section
            className={'p-4 flex flex-row items-center justify-end gap-3'}
          >
            <button
              onClick={() => setOpen(false)}
              className="px-10 py-3 font-medium text-primary-blue hover:bg-[#9d85ff] hover:text-white ml-5 rounded-xl bg-[#c1b2ff]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setSearchParams({
                  ...Object.fromEntries(searchParams.entries()),
                  editStatus: activeStatus,
                });
                setOpen(false);
              }}
              className="px-10 py-3 text-white rounded-xl bg-primary-blue hover:bg-[#4e28e7]"
            >
              Save
            </button>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default EditStatusPopup;
