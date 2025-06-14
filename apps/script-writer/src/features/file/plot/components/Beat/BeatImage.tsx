import React, {useState} from 'react';
import { IoClose } from "react-icons/io5";

interface ImageProps {
    setIsImage: (value: boolean) => void;
  }
  
const ImageUploadModal: React.FC<ImageProps> = ({ setIsImage }) => {
    const [images, setImages] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
  
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };
  
    const handleDragLeave = () => {
      setIsDragging(false);
    };
  
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    };
  
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        handleFiles(files);
      }
    };
  
    const handleFiles = (files: File[]) => {
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result;
                if (result && typeof result === 'string') {
                  setImages(prev => [...prev, result]);
                }
              };
              reader.readAsDataURL(file);
            }
          });
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[1000px] h-[500px] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 mt-2 ">
          <div>
            <h2 className="text-lg font-semibold">Import Image</h2>
            <p className="text-sm text-gray-500">Please upload file images</p>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <IoClose onClick={()=>setIsImage(false)} className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {images.length > 0 ? (
            // Image Grid
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                  <img 
                    src={image} 
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {/* Upload More Button */}
              <label 
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileInput}
                />
                <svg 
                  className="w-8 h-8 text-gray-400" 
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-sm text-gray-500 mt-2">Add more</span>
              </label>
            </div>
          ) : (
            // Upload Area
            <div 
              className={`border-2 border-dashed border-gray-300 h-[350px] rounded-lg p-8 transition-colors
                ${isDragging ? 'border-purple-500 bg-purple-50' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label className="flex flex-col items-center justify-center gap-4 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileInput}
                />
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-purple-600" 
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <div className="text-center">
                  <span className="text-purple-600 hover:text-purple-700 font-medium">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                </div>
                
                <p className="text-sm text-gray-500">
                  PDF or JPEG file (Max 4MB)
                </p>
              </label>
            </div>
          )}
          </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;