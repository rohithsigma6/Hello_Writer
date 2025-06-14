import * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';

import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import eyeOn from '@/assets/signup/eyeOn.svg';
import eyeOff from '@/assets/signup/eyeOff.svg';
export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
  };

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, label, error, registration, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    return (
      <FieldWrapper label={label} error={error}>
        <div className="relative w-full">
          <input
            required
            id="password"
            className={cn(
              'border border-[#AFB8C7] py-[16px] px-[14px] bg-white rounded-[12px] w-full placeholder:text-[14px] placeholder:text-[#AFB8C7] leading-[17px] font-normal font-poppins',
              className,
            )}
            placeholder="********"
            type={isPasswordVisible ? 'text' : 'password'}
            {...registration}
          />
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <img
              src={isPasswordVisible ? eyeOff : eyeOn} // Replace with the "eye-on" icon path
              alt="Hide Password"
              className="w-5 h-5"
            />
          </div>
        </div>
      </FieldWrapper>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
