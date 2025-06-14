import React from 'react'

const TextArea = ({ label, placeholder, value, setValue }: { label: string; placeholder: string; value: string; setValue: (value: string) => void; }) => {
    return (
        <div className="p-4 border border-gray-400 rounded-2xl">
            <label className="text-sm font-semibold block mb-4">{label}</label>
            <textarea
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-2 border border-gray-400 text-sm rounded-xl outline-none focus:ring-2 focus:ring-black resize-none"
            />
        </div>
    );
};


export default TextArea