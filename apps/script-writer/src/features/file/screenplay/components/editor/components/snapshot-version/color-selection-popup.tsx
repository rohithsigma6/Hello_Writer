import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Modal } from '@/components/ui/modal';
import { useCreateFileRevision } from '@/features/file/screenplay/api/create-file-revision';
import { useSnackbar } from 'notistack';

export const colorsList = [
  { name: 'White', hex: '#ffff' },
  { name: 'Blue', hex: '#CBD8E4' },
  { name: 'Pink', hex: '#EAD1CB' },
  { name: 'Yellow', hex: '#F8F1AB' },
  { name: 'Green', hex: '#C4DDC4' },
  { name: 'Goldenrod', hex: '#EACD7D' },
  { name: 'Buff', hex: '#E1DFBF' },
  { name: 'Salmon', hex: '#DEAF9C' },
  { name: 'Cherry', hex: '#A26784' },
  { name: 'Tan', hex: '#CCBA9A' },
  { name: 'Lavender', hex: '#B3A6B8' },
  { name: '2nd white', hex: '#D9D9D9' },
  { name: '2nd Blue', hex: '#CBD8E4' },
  { name: '2nd Pink', hex: '#EAD1CB' },
  { name: '2nd Yellow', hex: '#F8F1AB' },
  { name: '2nd Green', hex: '#C4DDC4' },
  { name: '2nd Goldenrod', hex: '#EACD7D' },
  { name: '2nd Buff', hex: '#E1DFBF' },
  { name: '2nd Salmon', hex: '#DEAF9C' },
  { name: '2nd Cherry', hex: '#A26784' },
  { name: '2nd Tan', hex: '#CCBA9A' },
  { name: '2nd Lavender', hex: '#B3A6B8' },
];

const ColorSelectionPopup = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { fileId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const color = searchParams.get('versionColor') || colorsList[0].name;
  const [currentColor, setcurrentColor] = useState({
    activeColor: color,
    hex: colorsList.find((val) => val.name == color)?.hex,
  });
  const [hide, setHide] = useState(false);
  const { mutate: createFileRevision } = useCreateFileRevision({
    fileId: fileId!,
    mutationConfig: {
      onSuccess: () => {
        enqueueSnackbar('Your file revision has been created');
      },
    },
  });

  const handleCreateFileRevision = async () => {
    const data = {
      color: currentColor.activeColor,
    };
    createFileRevision({ fileId: fileId!, data });
    setOpen(false);
  };

  const changeColor = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      versionColor: currentColor.activeColor,
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex flex-row items-center gap-x-2 bg-[#212131] px-[10px] py-[4px] rounded-[16px] text-white text-xs "
      >
        <div
          style={{ backgroundColor: currentColor.hex }}
          className={`rounded-full w-3 h-3`}
        ></div>{' '}
        {currentColor.activeColor}
      </button>
      <Modal
        isOpen={open}
        setIsOpen={setOpen}
        className="rounded-2xl bg-white w-[45vw]"
      >
        <div onClick={(e) => e.stopPropagation()}>
          <header className="p-4 flex flex-row w-full justify-between items-center border-b border-gray-500">
            <p className="font-bold">Select color of script revision</p>

            <button
              className="hover:bg-black hover:text-white rounded-full px-2"
              onClick={() => setOpen(false)}
            >
              X
            </button>
          </header>

          <section className={'flex flex-row flex-wrap gap-3 p-4'}>
            {colorsList.map((color, index) => (
              <button
                key={index}
                onClick={() =>
                  setcurrentColor({ activeColor: color.name, hex: color.hex })
                }
                className={`${currentColor.activeColor === color.name ? 'bg-black text-white' : 'text-black bg-white'} px-3 py-2 text-sm flex flex-row items-center border border-gray-300 rounded-xl gap-2 transition-colors`}
              >
                {color.name}
                <div
                  className={`w-3 h-3 rounded-full`}
                  style={{ backgroundColor: `${color.hex}` }}
                ></div>
              </button>
            ))}
          </section>

          <section
            className={
              'p-4 flex flex-row items-center justify-end gap-3 border-t border-gray-500'
            }
          >
            <button
              onClick={() => setOpen(false)}
              className="px-10 py-3 font-medium text-primary-blue hover:bg-[#9d85ff] hover:text-white ml-5 rounded-xl bg-[#c1b2ff]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                //handle
                handleCreateFileRevision();
                //then close
                setHide(true);
                changeColor();
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

export default ColorSelectionPopup;
