import { Input } from '@/components/ui/form';
import React, { forwardRef, useState, InputHTMLAttributes } from 'react';

export interface Conditions {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  conditions: Conditions;
  checkIcon: string;
  noncheckIcon: string;
  eyeOn: string;
  eyeOff: string;
  register?: any;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      name,
      label = 'Password',
      conditions,
      checkIcon,
      noncheckIcon,
      eyeOn,
      eyeOff,
      register,
      ...rest
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
      <div className="mb-4">
        <label
          className="block text-[#252C34] font-medium text-sm mb-2 leading-5"
          htmlFor={name}
        >
          {label}
        </label>

        <div className="relative w-full">
          <Input
            {...(register
              ? register('password', { required: 'Password is required' })
              : {})}
            ref={ref}
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Enter password"
            className="border text-sm flex p-2 items-center gap-8 border-1 border-[#DDDAD0] bg-white box-shadow-xs rounded-xl w-full placeholder:text-[14px] placeholder:text-[#AFB8C7]"
            {...rest}
            onFocus={(e) => {
              setIsPopoverOpen(true);
              rest.onFocus && rest.onFocus(e);
            }}
            onBlur={(e) => {
              setIsPopoverOpen(false);
              rest.onBlur && rest.onBlur(e);
            }}
          />
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <img
              src={isPasswordVisible ? eyeOff : eyeOn}
              alt="Toggle Password Visibility"
              className="w-5 h-5"
            />
          </div>
          {isPopoverOpen && (
            <div className="absolute z-10 bg-white shadow-lg rounded-lg p-4 mt-2 w-max bottom-14 -right-1/3">
              {/* Triangle (Caret) */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[14px] border-l-transparent border-r-transparent border-t-white"></div>

              <ul className="space-y-2 text-sm">
                <li className="flex gap-1">
                  <img
                    src={conditions.minLength ? checkIcon : noncheckIcon}
                    alt="minLength check"
                  />
                  The password has to be at least 8 characters long.
                </li>
                <li className="flex gap-1">
                  <img
                    src={conditions.hasUppercase ? checkIcon : noncheckIcon}
                    alt="uppercase check"
                  />
                  The password has to contain one uppercase character.
                </li>
                <li className="flex gap-1">
                  <img
                    src={conditions.hasLowercase ? checkIcon : noncheckIcon}
                    alt="lowercase check"
                  />
                  The password has to contain one lowercase character.
                </li>
                <li className="flex gap-1">
                  <img
                    src={conditions.hasNumber ? checkIcon : noncheckIcon}
                    alt="number check"
                  />
                  The password has to contain one number.
                </li>
                <li className="flex gap-1">
                  <img
                    src={conditions.hasSpecialChar ? checkIcon : noncheckIcon}
                    alt="special char check"
                  />
                  The password has to contain one special character.
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="w-full flex justify-end gap-1 mt-2">
          <span
            className={`rounded-full px-2 text-sm ${
              conditions.minLength
                ? 'bg-primary-green text-white'
                : 'text-slate-400'
            }`}
          >
            ***8
          </span>
          <span
            className={`rounded-full px-2 text-sm ${
              conditions.hasUppercase
                ? 'bg-primary-green text-white'
                : 'text-slate-400'
            }`}
          >
            A-Z
          </span>
          <span
            className={`rounded-full px-2 text-sm ${
              conditions.hasLowercase
                ? 'bg-primary-green text-white'
                : 'text-slate-400'
            }`}
          >
            a-z
          </span>
          <span
            className={`rounded-full px-2 text-sm ${
              conditions.hasNumber
                ? 'bg-primary-green text-white'
                : 'text-slate-400'
            }`}
          >
            0-9
          </span>
          <span
            className={`rounded-full px-2 text-sm ${
              conditions.hasSpecialChar
                ? 'bg-primary-green text-white'
                : 'text-slate-400'
            }`}
          >
            !.?
          </span>
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;
