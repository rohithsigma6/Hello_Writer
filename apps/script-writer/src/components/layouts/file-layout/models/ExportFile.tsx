import { Modal } from '@/components/ui/modal';
import finaldrafticon from '@/assets/final-draft-icon.svg';
import pdficon from '@/assets/pdf-icon.svg';
import fountainicon from '@/assets/fountain.svg';
import closeicon from '@/assets/close-icon.svg';
import { useEditorStore } from '@/store/editor';
import { exportToPDF } from '@/lib/converters/export-to-pdf';

function ExportFile({ isOpen, onClose }: any) {
  if (!isOpen) return null;
  const { editor } = useEditorStore(state => state);

  // Handle Export
  const handleExport = () => {
    // Return if editor not available
    if (!editor) return null;

    const screenplay = editor.getJSON();
    exportToPDF(screenplay);
    onClose();
  };
  return (
    <>
      <Modal
        className="bg-white rounded-[24px] shadow-md w-[560px]"
        isOpen={isOpen}
      >
        <form onSubmit={handleExport}>
          <div className="flex justify-between pl-[40px] pr-[24px] py-[24px] items-center] border-b border-b-[#00000036]">
            <h2 className="text-[19px] text-[#212131] font-poppins font-bold">
              Export screenplay
            </h2>
            <button
              className="border border-[#00000036] bg-white duration-500 text-[#2C3E50]"
              onClick={onClose}
            >
              <img src={closeicon} alt="" />
            </button>
          </div>
          <p className="text-[#212131] text-[16px] font-medium font-poppins pl-[40px] pr-[24px] pt-[24px] pb-0">
            Your export will open in a pop-up-window. Make sure these are not
            blocked
          </p>
          <div className="my-radio-btns pl-[40px] pr-[24px] pt-[24px] pb-[94px]">
            <div className="flex items-center mb-3">
              <input
                id="default-radio-1"
                type="radio"
                value="2"
                name="exportformat"
                className="w-5 h-5  bg-gray-100 border-gray-300"
                disabled // Disabled temporarily
              />
              <label
                htmlFor="default-radio-1"
                className="ms-2 text-[16px] font-normal text-[#4D4D5A] font-poppins flex items-center gap-[2px]"
              >
                <img src={finaldrafticon} alt="" /> Final Draft (.fdx) - Coming Soon
              </label>
            </div>
            <div className="flex items-center mb-3">
              <input
                id="default-radio-2"
                type="radio"
                value="1"
                name="exportformat"
                className="w-5 h-5  bg-gray-100 border-gray-300"
                disabled // Disabled temporarily
              />
              <label
                htmlFor="default-radio-2"
                className="ms-2 text-[16px] font-normal text-[#4D4D5A] font-poppins flex items-center gap-[2px]"
              >
                <img src={fountainicon} alt="" /> Fountain (.fountain) - Coming Soon
              </label>
            </div>
            <div className="flex items-center mb-3">
              <input
                checked
                id="default-radio-3"
                type="radio"
                value="0"
                name="exportformat"
                className="w-5 h-5  bg-gray-100 border-gray-300"
              />
              <label
                htmlFor="default-radio-3"
                className="ms-2 text-[16px] font-normal text-[#4D4D5A] font-poppins flex items-center gap-[2px]"
              >
                <img src={pdficon} alt="" /> PDF (.pdf)
              </label>
            </div>
          </div>
          <div className="flex justify-end py-[12px] border-t border-t-[#00000036] pr-[24px]">
            <button
              type="reset"
              className=" font-poppins rounded-[16px] min-w-[160px] text-[#6A6A75] font-medium py-[18px] px-[52px] text-[16px] border border-[#9999A0] max-w-[160px] mr-2 ' disabled:text-gray-500 disabled:hover:bg-none'"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" py-[18px] font-poppins text-[16px] rounded-[16px] min-w-[160px] max-w-[160px] bg-[#653EFF] text-white ' disabled:text-gray-500 disabled:hover:bg-none'"
            >
              Export
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ExportFile;
