import React from 'react'

interface Props {
    title: string;
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
}

const InputField = ({ title, placeholder, setValue, value }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <p className='text-sm font-medium'>{title}</p>

            <input className="p-3 text-sm placeholder-gray-600 border border-gray-400 rounded-xl" placeholder={placeholder} type="text" onChange={(e) => setValue(e.target.value)} value={value} name="input" id="" />
        </div>
    )
}

export default InputField