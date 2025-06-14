import { Modal } from '@/components/ui/modal';
import { useEffect, useState } from 'react';
import deleteImage from '@/assets/delete-icon.svg';

interface DeleteModalProps {
  fileTitle: string;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  isDeleteModalOpen: boolean;
  handleDelete: () => void;
  type: string;
}

const DeleteModal = ({
  fileTitle,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
  handleDelete,
  type,
}: DeleteModalProps) => {
  const [confirmationInput, setConfirmationInput] = useState('');
  useEffect(() => {
    if (!isDeleteModalOpen) {
      setConfirmationInput('');
    }
  }, [isDeleteModalOpen]);
  return (
    <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen}>
      <div className='p-6 font-poppins'>
   
        <img src={deleteImage} alt="delete" className='mx-auto' />
       
      <h3 className="text-[20px] font-bold text-[#212131] my-5 text-center">
        Confirm {type} Deletion
      </h3>
      <p className="text-[#9999A0] mb-4 text-center">
        To confirm, type the {type} name{' '}
        <span className="font-bold text-gray-900">{fileTitle}</span> below. This
        action cannot be undone.
      </p>
      <input
        type="text"
        placeholder="Type file name"
        value={confirmationInput}
        onChange={(e) => setConfirmationInput(e.target.value)}
        className="w-full rounded-lg border border-solid border-[#BABABF] bg-white shadow-inner p-2"
      />
      <div className="flex justify-between gap-4 mt-5">
        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(false)}
          className="py-[18px] px-[45px] border border-solid flex-1 border-[#9999A0] rounded-2xl text-[#9999A0]"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={confirmationInput !== fileTitle}
          className={`py-[18px] px-[45px] rounded-2xl flex-1 border hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0] ${
            confirmationInput === fileTitle
              ? 'bg-primary-blue text-white'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          Delete
        </button>
      </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
