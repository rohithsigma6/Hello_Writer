import React, { useEffect, useRef, useState } from 'react'
import { BsCamera } from 'react-icons/bs';
import { FiUploadCloud } from 'react-icons/fi';
import { HiOutlinePaintBrush } from 'react-icons/hi2';
import ShootingInformation from './ShootingInformation';

const NewShot = ({ showAddNewShot, setShowAddNewShot }: { showAddNewShot: boolean, setShowAddNewShot: (value: boolean) => void }) => {

    const [addShootingInfo, setAddShootingInfo] = useState(false);

    return (
        <>
            <div
                className={
                    `${showAddNewShot ? "block " : "hidden "}` +
                    "py-16 px-20 z-10 w-full h-full fixed left-0 right-0 top-0 bg-[#0000004f] overflow-auto font-poppins flex items-start justify-center"
                }
                onClick={() => setShowAddNewShot(false)}
            >
                <div
                    className="w-full max-w-2xl p-6 rounded-2xl bg-white flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h1 className="text-lg font-semibold">Create shot</h1>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="shot id" className="font-medium">Shot ID (required)</label>

                        <input
                            type="text"
                            className="text-sm p-3 rounded-xl border border-gray-300"
                            placeholder="Enter shot id" name="shot id" id=""
                        />
                    </section>
                    <section className="flex flex-col gap-2">
                        <label htmlFor="shot id" className="font-medium">Subject</label>

                        <input
                            type="text"
                            className="text-sm p-3 rounded-xl border border-gray-300"
                            placeholder="Write about subject" name="shot id" id=""
                        />
                    </section>
                    <section className="flex flex-col gap-2">
                        <label htmlFor="shot id" className="font-medium">Visual</label>

                        <input
                            type="text"
                            className="text-sm p-3 rounded-xl border border-gray-300"
                            placeholder="Write about visual" name="shot id" id=""
                        />
                    </section>
                    <section className="flex flex-col gap-2">
                        <label htmlFor="shot id" className="font-medium">Audio</label>

                        <input
                            type="text"
                            className="text-sm p-3 rounded-xl border border-gray-300"
                            placeholder="Write about audio" name="shot id" id=""
                        />
                    </section>
                    <section className="flex flex-col gap-2">
                        <label htmlFor="shot id" className="font-medium">Images and files</label>

                        <FileUploader />
                    </section>

                    <section className="flex flex-col gap-2">
                        <label htmlFor="shot id" className="font-medium">Do you want to add more?</label>

                        <div className="flex flex-row gap-3">
                            <button onClick={() => setAddShootingInfo(true)} className="text-sm border border-black rounded-full px-7 py-2.5 w-fit flex flex-row items-center gap-2 hover:bg-black hover:text-white transition-colors">
                                {/* @ts-ignore */} Shooting information
                                <BsCamera className="text-lg" />
                            </button>

                            <button className="text-sm border border-black rounded-full px-7 py-2.5 w-fit flex flex-row items-center gap-2 hover:bg-black hover:text-white transition-colors">
                                {/* @ts-ignore */} Colors
                                <HiOutlinePaintBrush className="text-lg" />
                            </button>
                        </div>
                    </section>

                    <section className="flex flex-row justify-between mt-6">
                        <div className="flex flex-row items-center gap-3">
                            <input type="checkbox" name="create another" className="custom-primary-checkbox" id="" />
                            <span>Create another</span>
                        </div>

                        <div className="flex flex-row gap-x-2 items-center">
                            <button
                                onClick={() => setShowAddNewShot(false)}
                                className="border border-gray-500 hover:bg-gray-600 hover:text-white transition-colors px-10 py-3 font-medium rounded-2xl bg-white text-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                // onClick={handleSubmit}
                                className="px-10 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
                            // disabled={isLoading} // Disable button while loading
                            >
                                Send
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            {addShootingInfo &&
                <ShootingInformation
                    showShootingInfoModal={addShootingInfo}
                    setShowShootingInfoModal={setAddShootingInfo}
                />}
        </>
    )
};

const FileUploader = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={`w-full border border-dashed rounded-xl border-gray-500 p-4 flex flex-col items-center gap-4 
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

            <button className="bg-gray-900 hover:bg-black transition-colors px-6 py-2 rounded-full text-white text-sm">Add File +</button>
        </div>
    )
}


export default NewShot