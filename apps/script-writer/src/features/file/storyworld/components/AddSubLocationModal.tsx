import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiUploadCloud } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { useParams } from 'react-router';
import { enqueueSnackbar } from 'notistack';
import Select from 'react-select'; // Import react-select
import { useAddSubLocation } from '../api/sub-location-data';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { useDeleteSubLocationImage } from '../api/delete-sub-location-image';

const settingsOptions = {
  'Urban Settings': [
    'Metropolitan City',
    'Downtown',
    'Inner City',
    'Suburb',
    'Industrial Park',
    'Seaport',
    'Airport',
    'University Town',
    'Shopping Mall',
    'Business District',
    'Skyscraper',
    'Underground Subway System',
    'Slum/Shantytown',
  ],
  'Rural Settings': [
    'Village',
    'Farmstead',
    'Wilderness',
    'National Park',
    'Mountain Range',
    'Forest',
    'Fishing Village',
    'Hunting Grounds',
  ],
  'Suburban Settings': [
    'Suburban Community',
    'Family Home',
    'Local Park',
    'Shopping Mall',
  ],
  'Historical Settings': [
    'Medieval Town',
    'Victorian City',
    'Ancient Civilization',
    'Renaissance Era',
  ],
  'Future Settings': [
    'Space Colony',
    'High-Tech Metropolis',
    'Alien Planet',
    'Futuristic Starship',
  ],
  'Fantasy Settings': [
    'Enchanted Forest',
    'Magical Kingdom',
    'Mythical Island',
  ],
  'Political Settings': ['Embassy', 'Secret Base'],
  'Workplace Settings': ['Corporate Office', 'Tech Startup'],
  'Scientific Settings': ['Research Lab', 'Genetics Lab'],
  'Spiritual Settings': ['Ancient Temple', 'Holy Sanctuary'],
  'Uncommon Settings': ['Space Station', 'Deep Ocean'],
  'Other Settings': ['Jungle', 'Theme Park'],
};

interface AddLocationModalProps {
  setOpenDeleteTagPopp: (value: boolean) => void;
  data: any;
}

const AddSubLocationModal: React.FC<AddLocationModalProps> = ({
  data,
  setOpenDeleteTagPopp,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null as File | null,
    type: '',
    importance: '',
    dramaticFunction: '',
    feel: '',
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number | null>(null);
  const [removeId, setRemoveId] = useState([])

  const [file, setFile] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [id, setId] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const { mutate } = useDeleteSubLocationImage();
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const { fileId,locationId } = useParams<{ fileId: any ,locationId:any}>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  useEffect(() => {
    if (data) {
      setIsEditing(true);
      setFormData(data);
      setPreviewURL(data?.image);
      setPreviewURLs(data?.images);
      setPrimaryImageIndex(data?.images?.findIndex(item => item.isPrimary));
    }
  }, [data]);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const addLocationMutation = useAddSubLocation();

  const handleCreate = () => {
    const formDataToSend = new FormData();

    // Append each key-value pair to the FormData object
    Object.entries(formData).forEach(([key, value]: any) => {
      if (value !== null) {
        formDataToSend.append(key, value as string | Blob);
      }
    });
    files.forEach((file, i) => {
      formDataToSend.append('images', file); // Backend must accept multiple "images"
    });
    formDataToSend.append('primaryImageIndex', String(primaryImageIndex ?? -1));
    
    // Add the fileId
    formDataToSend.append('type', selectedOption || '');
    formDataToSend.append('fileId', fileId);
    formDataToSend.forEach((value, key) => {});
    if(data?._id && removeId.length){
      mutate({ locationId:locationId, id:data?._id, payload:{imageIds:removeId}}, {
        onSuccess: (response) => {
          console.log('Image deleted:', response);
        },
        onError: (err) => {
          console.error('Failed to delete image:', err);
        },
      });
    }
    addLocationMutation.mutate(
      {
        payload: formDataToSend, // Pass the FormData directly
        id: data?._id,
        isEditing: isEditing,
        locationId:locationId
      },
      {
        onSuccess: () => {
          enqueueSnackbar(isEditing ? 'Location updated successfully!' : 'Location added successfully!');
        },
        onError: (error) => {
          enqueueSnackbar('Error adding/updating location:', error);
        },
      },
    );
    setOpenDeleteTagPopp(false);
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
    setSelectedOption(''); // Reset option when category changes
  };

  const handleOptionChange = (selected: any) => {
    setSelectedOption(selected ? selected.value : '');
  };

  return (
    <div className="fixed inset-0 z-[999999]">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative z-50 transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 w-[800px]">
            <div className="w-full p-[24px] rounded-[24px] shadow-2xl">
              <div className="flex justify-between items-center pb-[24px] border-b border-solid border-[#E9E9EA] mb-[24px]">
                <p className="text-[#212131] text-[19px] font-poppins font-bold">
                  Add sub Location
                </p>
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => setOpenDeleteTagPopp(false)}
                >
                  <IoMdClose />
                </div>
              </div>
              <div>
                <label className="text-[#9999A0] mb-[8px] font-poppins text-[16px] block font-semibold">
                  Location Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  style={{
                    borderRadius: '16px',
                    padding: '14px 18px',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    color: '#000',
                    fontSize: '16px',
                    borderWidth: '1px',
                    width: '100%',
                  }}
                  placeholder="Write your Location here..."
                  className=" outline-none mb-4"
                />
              </div>

              <label className="text-[#9999A0] mb-[8px] font-poppins text-[16px] block font-semibold">
                Location Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write your Location here..."
                style={{
                  borderRadius: '16px',
                  padding: '14px 18px',
                  borderColor: '#BABABF',
                  color: '#000',
                  fontSize: '16px',
                  borderWidth: '1px',
                  width: '100%',
                }}
                className="h-40 mb-4"
              />

              <label className="text-[#9999A0] mb-[8px] font-poppins text-[16px] block font-semibold">
                Location Image
              </label>

              <PhotoUpload
  files={files}
  setFiles={setFiles}
  previewURLs={previewURLs}
  setPreviewURLs={setPreviewURLs}
  primaryImageIndex={primaryImageIndex}
  setPrimaryImageIndex={setPrimaryImageIndex}
  setRemoveId={setRemoveId}
/>


              <div className="flex gap-[24px] mb-[16px]">
                {/* <div className="w-1/2 items-center relative">
                  <label className="text-[#9999A0] mb-[8px] font-poppins text-[16px] block font-semibold">
                    Select Type
                  </label>
                  <Select
                    options={Object.entries(settingsOptions).map(([category, options]) => ({
                      label: category,
                      options: options.map(option => ({
                        value: option,
                        label: option,
                      })),
                    }))}
                    onChange={handleOptionChange}
                    value={selectedOption ? { value: selectedOption, label: selectedOption } : null}
                    placeholder="Choose a Setting"
                    className="custom-arrow-down"
                  // components={{ DropdownIndicator }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "16px",
                      padding: "14px 18px",
                      borderColor: "#0000005c",
                      color: "#D9D9D9",
                      fontSize: "16px",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                     
                  }}
                  />
                </div> */}
                <div className="w-1/2 items-center relative">
                  <label className="text-[#9999A0] mb-[8px] font-poppins text-[16px] block font-semibold">
                    Select Importance
                  </label>
                  <Select
                    options={[
                      { value: 'Primary', label: 'Primary' },
                      { value: 'Secondary', label: 'Secondary' },
                      { value: 'Tertiary', label: 'Tertiary' },
                    ]}
                    onChange={(selected) => setFormData((prev) => ({ ...prev, importance: selected?.value }))}
                    value={formData.importance ? { value: formData.importance, label: formData.importance } : null}
                    placeholder="Choose a Category"
                    className="custom-arrow-down"
                  // components={{ DropdownIndicator }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "16px",
                      padding: "14px 18px",
                      borderColor: "#0000005c",
                      color: "#D9D9D9",
                      fontSize: "16px",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                     
                  }}
                  />
                </div>
              </div>

              <label className="text-[#9999A0] mb-[8px] font-poppins text-[16px] block font-semibold">
                Dramatic Function
              </label>
              <input
                name="dramaticFunction"
                value={formData.dramaticFunction}
                onChange={handleChange}
                type="text"
                placeholder="Write your Dramatic Function..."
                style={{
                  borderRadius: '16px',
                  padding: '14px 18px',
                  borderColor: '#BABABF',
                  color: '#000',
                  fontSize: '16px',
                  borderWidth: '1px',
                  width: '100%',
                }}
                className="w-full outline-none mb-[16px]"
              />

              <label className="text-[#9999A0] mb-[8px] font-poppins text-[16px] block font-semibold">
                Feel
              </label>
              <input
                name="feel"
                value={formData.feel}
                onChange={handleChange}
                type="text"
                placeholder="Write your Feel of location..."
                style={{
                  borderRadius: '16px',
                  padding: '14px 18px',
                  borderColor: '#BABABF',
                  color: '#000',
                  fontSize: '16px',
                  borderWidth: '1px',
                  width: '100%',
                }}
                className="w-full  outline-none"
              />

              <div className="flex mt-10">
                <button
                  type="button"
                  onClick={() => setOpenDeleteTagPopp(false)}
                  className="hover:bg-slate-100 w-full  transition-colors duration-300  disabled:text-gray-500 disabled:hover:bg-none text-[#9999A0] font-medium text-[16px] py-[19px] border border-solid border-[#9999A0] block h-auto rounded-[16px] font-poppins"
                >
                  Cancel
                </button>
                <button
                  className="w-full transition-colors duration-300 font-medium text-[16px] py-[19px] border border-solid border-[653EFF] block h-auto bg-[#653EFF] text-white rounded-[16px] font-poppins ml-[16px]"
                  onClick={handleCreate}
                  type="button"
                >
                  {!data ? 'Create' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubLocationModal;

const PhotoUpload = ({
  files,
  setFiles,
  previewURLs,
  setPreviewURLs,
  primaryImageIndex,
  setPrimaryImageIndex,setRemoveId 
}: {
  files: File[];
  setFiles: (f: File[]) => void;
  previewURLs: string[];
  setPreviewURLs: (p: string[]) => void;
  primaryImageIndex: number | null;
  setPrimaryImageIndex: (index: number) => void;
  setRemoveId:any
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const validFiles = Array.from(newFiles).filter(
      (file) => file.type.startsWith('image/') && file.size <= 4 * 1024 * 1024
    );

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewURLs((prev) => [...prev, reader.result as string]);
        setFiles((prev) => [...prev, file]);
        if (primaryImageIndex === null && previewURLs.length === 0) {
          setPrimaryImageIndex(0); // Default the first image to primary if none selected
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number,url) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previewURLs.filter((_, i) => i !== index);
    if(url?.url){

      setRemoveId((prev:any)=>[...prev,url?._id])
    }
    setFiles(newFiles);
    setPreviewURLs(newPreviews);

    // Adjust primary index if needed
    if (primaryImageIndex === index) {
      setPrimaryImageIndex(null);
    } else if (primaryImageIndex !== null && primaryImageIndex > index) {
      setPrimaryImageIndex(primaryImageIndex - 1);
    }
  };

  const handleSetPrimary = (index: number) => {
    setPrimaryImageIndex(index);
  };
console.log(previewURLs);

  return (
    <div className="w-full mb-4">
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={onFileChange}
      />

      <div
        className="border-2 border-dashed border-[#E9E9EA] rounded-2xl p-4 cursor-pointer flex justify-center items-center mb-4"
        onClick={() => fileInputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="text-center">
          <FiUploadCloud className="text-2xl mx-auto text-[#675F47]" />
          <p className="text-[#653EFF] font-bold">Click to upload</p>
          <p className="text-sm text-[#857E66]">or drag & drop PNG or JPEG (Max 4MB)</p>
        </div>
      </div>

      {previewURLs.length > 0 && (
        <div className="relative">
          <Swiper spaceBetween={10} slidesPerView={1} centeredSlides>
            {previewURLs.map((url, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[300px]">
                  <img
                    src={url?.url ? url?.url :url}
                    alt={`preview-${index}`}
                    className="object-cover w-full h-full rounded-xl"
                  />
                  <button
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                    onClick={() => removeImage(index,url)}
                  >
                    ×
                  </button>
                  <button
                    className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 py-1 px-3 rounded-md ${
                      primaryImageIndex === index ? 'bg-green-600' : 'bg-[#653EFF]'
                    } text-white`}
                    onClick={() => handleSetPrimary(index)}
                  >
                    {primaryImageIndex === index ? 'Primary' : 'Set as Primary'}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}