import React, { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from 'utils/misc';


interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    required?: boolean;
    children?: ReactNode;
    labelClassName?: string;
    inputClassName?: string;
    containerClassName?:string

}

const InputLabel: React.FC<InputFieldProps> = ({ label, name, required = false, labelClassName, children, inputClassName="", containerClassName,...props  }) => {
    const baseInputClassName = '';
    return (
       
            <div className={cn("flex  text-input-label text-xs flex-col gap-1 text-left", containerClassName)}>
                <span className={cn("font-normal whitespace-nowrap", labelClassName)}>{label}</span>
                <input
                    name={name}
                    required={required}
                    className={cn(`rounded-xl border-[1px] border-border-input p-2 min-h-[42px] text-black`, inputClassName)}
                    {...props}
                />
                {children}
            </div>
    );
};


export default InputLabel;
