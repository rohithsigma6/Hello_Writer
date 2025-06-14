import React, { useRef } from 'react'
import { FiUploadCloud } from 'react-icons/fi';

const MediaUpload = () => {
    return (
        <div className='mt-6 border border-gray-400 rounded-2xl p-4'>
            <label className="text-sm font-semibold block mb-2">Media</label>

            <FileUploader />
        </div>
    )
}

const FileUploader = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={`w-full py-8 border border-dashed rounded-xl border-gray-500 p-4 flex flex-col items-center gap-4 
                }`}
        // onDragOver={onDragOver}
        // onDragLeave={onDragLeave}
        // onDrop={onDrop}
        >
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
            // accept={accept}
            // onChange={onChange}
            />

            <div
                onClick={handleIconClick}
                className="p-2 rounded-full cursor-pointer bg-primary-blue"
            > {/* @ts-ignore */}
                <FiUploadCloud className="text-2xl text-white" />
            </div>

            <p className="text-sm text-gray-500 text-center whitespace-pre-line">
                <span
                    onClick={handleIconClick}
                    className={`hover:underline font-semibold cursor-pointer text-primary-blue`}
                >
                    Click to upload
                </span>
                {' or drag and drop\n'}
                You can drop files into the folder
            </p>

            <div className="flex flex-row gap-3">
                <button className="bg-gray-900 hover:bg-black transition-colors px-6 py-2 rounded-full text-white text-sm">
                    Add File +
                </button>
                <button className="bg-gray-900 hover:bg-black transition-colors px-6 py-2 rounded-full text-white text-sm">
                    Add Link +
                </button>
            </div>
        </div>
    )
}

export default MediaUpload