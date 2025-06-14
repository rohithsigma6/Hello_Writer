import { Modal } from '@/components/ui/modal';
import React, { useEffect } from 'react';
interface RenameModalProps {
  setIsRenameModalOpen: (isOpen: boolean) => void;
  isRenameModalOpen: boolean;
  handleRenameSubmit: (e: React.FormEvent, updatedName: string) => void;
  type: string;
  initialName: string;
}

const RenameModal = ({
  setIsRenameModalOpen,
  isRenameModalOpen,
  handleRenameSubmit,
  type,
  initialName,
}: RenameModalProps) => {
  const [newName, setNewName] = React.useState(initialName || '');
  useEffect(() => {
    if (!isRenameModalOpen) {
      setNewName('');
    }
  }, [isRenameModalOpen]);
  return (
    <Modal isOpen={isRenameModalOpen} setIsOpen={setIsRenameModalOpen}>
      <div className='p-6 font-poppins'>
      <h3 className="text-[20px] font-bold text-[#212131] my-5 text-center">Rename {type}</h3>
      <form onSubmit={(e) => handleRenameSubmit(e, newName)}>
        <input
          required
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full mb-4"
        />
        <div className="flex justify-between gap-2">
          <button
            type="button"
            onClick={() => setIsRenameModalOpen(false)}
            className="py-[18px] px-[45px] border border-solid flex-1 border-[#9999A0] rounded-2xl text-[#9999A0]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-[18px] px-[45px] border border-solid flex-1 border-[#9999A0] rounded-2xl bg-primary-blue text-white"
          >
            Save
          </button>
        </div>
      </form>
      </div>
    </Modal>
  );
};

export default RenameModal;
