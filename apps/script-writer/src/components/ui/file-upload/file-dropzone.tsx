import React, { useRef, useState, DragEvent } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import {
  FaFilePdf,
  FaFileImage,
  FaFileVideo,
  FaFile,
  FaFileAlt,
  FaTrash,
} from 'react-icons/fa';
import DeleteIcon from '@/assets/Icons/delete.svg';

interface FileDropzoneProps {
  /** Label shown above the dropzone */
  label?: string;
  /** Accepted file types, e.g., ".pdf, .png, .jpg" */
  accept?: string;
  /** Callback fired when a file is selected or removed */
  onFileChange?: (file: File | null) => void;
  /** Instructional text displayed inside the dropzone */
  instructionText?: string;
  /** Maximum allowed file size in MB */
  maxSizeMB?: number;
  buttonClass?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  label = 'Attachment (Optional)',
  accept = '.pdf, .fdx, .png, .jpg',
  onFileChange,
  instructionText = 'JPG or PNG file (max. 4MB)',
  maxSizeMB = 4,
  buttonClass = 'text-primary-blue ',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const resetFile = () => {
    setSelectedFile(null);
    onFileChange?.(null);
  };

  const handleFile = (file: File | null) => {
    if (!file) return;

    // Validate file size
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds the limit of ${maxSizeMB} MB.`);
      resetFile();
      return;
    }

    // Validate file type if 'accept' is provided
    if (accept) {
      const allowedExtensions = accept
        .split(',')
        .map((ext) => ext.trim().toLowerCase());
      const fileExtension =
        '.' + (file.name.split('.').pop() || '').toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        setError(`Invalid file type. Allowed: ${allowedExtensions.join(', ')}`);
        resetFile();
        return;
      }
    }

    // Clear errors and update state
    setError(null);
    setSelectedFile(file);
    onFileChange?.(file);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleFile(file);
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="flex flex-col gap-2">
      <label className="text-gray-700 w-full text-sm">{label}</label>
      <div
        className={`w-full border border-dashed rounded-lg border-gray-500 p-4 flex flex-col items-center gap-4 ${
          isDragOver ? 'bg-gray-100' : ''
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={onChange}
        />

        <div
          onClick={handleIconClick}
          className="p-2 bg-gray-300 rounded-full cursor-pointer"
        >
          <FiUploadCloud className="text-2xl" />
        </div>

        {selectedFile ? (
          // <div className="text-sm text-center">
          //   <p>Selected File:</p>
          //   <p className="font-medium">{selectedFile.name}</p>
          //   <button
          //     onClick={resetFile}
          //     className="mt-2 text-primary-blue hover:underline text-xs"
          //   >
          //     Remove file
          //   </button>
          // </div>
          <SelectedFileLayout
            file={selectedFile}
            handleDeleteFile={resetFile}
          />
        ) : (
          <p className="text-sm text-gray-500 text-center whitespace-pre-line">
            <span
              onClick={handleIconClick}
              className={`hover:underline font-semibold cursor-pointer ${buttonClass ?? ''}`}
            >
              Click to upload
            </span>
            {' or drag and drop\n'}
            {instructionText}
          </p>
        )}

        {error && <p className="text-xs text-red-500 text-center">{error}</p>}
      </div>
    </section>
  );
};

export default FileDropzone;

const SelectedFileLayout = ({
  file,
  handleDeleteFile,
}: {
  file: any;
  handleDeleteFile: () => void;
}) => {
  const getFileIcon = (file: any) => {
    const extension = file.name.split('.').pop().toLowerCase(); // Extract file extension
    const iconClass = 'mr-4 text-gray-600 text-red'; // Consistent styling: margin-right and color

    if (file.type.startsWith('image/')) {
      // Handles image MIME types like "image/jpeg", "image/png", etc.
      return <FaFileImage size={32} className={iconClass} />;
    } else if (file.type.startsWith('video/')) {
      // Handles video MIME types like "video/mp4", "video/avi", etc.
      return <FaFileVideo size={32} className={iconClass} />;
    } else if (file.type === 'application/pdf') {
      // Specifically for PDF files
      return <FaFilePdf size={32} className={iconClass} />;
    } else if (extension === 'fdx') {
      // For FDX files, identified by extension since it may not have a standard MIME type
      return <FaFileAlt size={32} className={iconClass} />;
    } else {
      // Fallback for unrecognized types
      return <FaFile size={32} className={iconClass} />;
    }
  };
  const formatFileSize = (size: number): string => {
    const kb = size / 1024;
    const mb = kb / 1024;
    return mb > 1 ? `${mb.toFixed(2)} MB` : `${kb.toFixed(2)} KB`;
  };
  return (
    <>
      {file && (
        <div className="w-full flex items-center relative border p-2 border-[#3CA970] h-14 rounded-[16px] shadow-md">
          {getFileIcon(file)}
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-800 truncate">
              {file.name.slice(0, 35)}...
            </p>
            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
          </div>

          <button
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            onClick={handleDeleteFile}
          >
            {' '}
            <img height={'100%'} src={DeleteIcon} />{' '}
          </button>
        </div>
      )}
    </>
  );
};
