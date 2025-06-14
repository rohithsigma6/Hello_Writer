import { ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "utils/misc";


interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    required?: boolean;
    children?: ReactNode;
    labelClassName?: string;
    containerClassName?:string
}


const TextAreaLabel: React.FC<TextAreaFieldProps> = ({ label, name, required = false, labelClassName, containerClassName, children, ...props }) => {
    const baseInputClassName = 'rounded-xl border-thin border-border-input p-2 text-black';
    return (
        <div className={cn("flex text-input-label flex-col gap-1 text-left", containerClassName)}>
            <span className={cn("font-normal whitespace-nowrap", labelClassName)}>{label}</span>
            <textarea
                name={name}
                required={required}
                className={`${baseInputClassName} w-full`}
                rows={3}
                {...props}
            />
            {children}
        </div>
    );
};


export default TextAreaLabel