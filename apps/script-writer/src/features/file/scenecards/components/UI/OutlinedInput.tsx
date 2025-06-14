import React, { useState, useEffect, useRef } from 'react';
import './OutlinedInput.css'


type TOutlinedInputProps = {
    label: string;
    defaultValue: string;
    onChange: any;
    shouldShowTextAreaInstead?: boolean
}
const OutlinedInput: React.FC<TOutlinedInputProps> = ({ label, defaultValue = '', onChange, shouldShowTextAreaInstead }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = () => {
        if (!value) setIsFocused(false);
    };

    const handleChange = (e: any) => {
        setValue(e.target.value);
        if (onChange) onChange(e);
    };

    return (
        <div className={`outlined-input ${isFocused || value ? 'focused' : ''}`}>
            <label className="input-label">{label}</label>
            {
                shouldShowTextAreaInstead ? (
                    <textarea
                        ref={textAreaRef}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="input-field"
                        value={value}
                        onChange={handleChange} />
                )

                    :
                    <input
                        type="text"
                        className="input-field"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={value}
                        onChange={handleChange}
                    />
            }
        </div>
    );
}


export default OutlinedInput