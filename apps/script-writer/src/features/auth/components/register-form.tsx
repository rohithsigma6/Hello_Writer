import * as React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Button } from '@/components/ui/button';
import { Form, Input, Select, Label, Switch } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useRegister, registerInputSchema, RegisterInput } from '@/lib/auth';
import { Team } from '@/types/api';
import icon1 from '@/assets/signup/google.svg';
import { useGoogleSignIn } from '../api/google-signin';
import PasswordInput, { Conditions } from './password-input';
import CheckIcon from '@/assets/signup/check.svg';
import EyeOffIcon from '@/assets/signup/eyeOff.svg';
import EyeOnIcon from '@/assets/signup/eyeOn.svg';
import NonCheckIcon from '@/assets/signup/nonCheck.svg';
import { useForm } from 'react-hook-form';
import arrowicon from '@/assets/signup/arrow-right.svg';
import { useSnackbar } from 'notistack';

type RegisterFormProps = {
  setActiveTab: (num: number) => void;
  setFormData: (obj: RegisterInput) => void;
};

export const RegisterForm = ({
  setActiveTab,
  setFormData,
}: RegisterFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectTo = searchParams.get('redirectTo');
  const { mutate } = useGoogleSignIn({
    mutationConfig: {
      onSuccess: () => {
        navigate('/dashboard', { replace: true });
      },
    },
  });
  const [password, setPassword] = React.useState('');
  const [phoneNo, setPhoneNo] = React.useState('');

  // Compute your conditions based on the current password value
  const conditions: Conditions = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const navigateToURL = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <Form className='space-y-6 [@media_(max-width:600px)]:space-y-4'
onSubmit={(values) => {
  if (phoneNo.length < 12) {
    return enqueueSnackbar('Enter correct phone number', {
      variant: 'error',
    });
  }

  // Check if any password condition is false
  const isPasswordInvalid = Object.values(conditions).some(
    (condition) => !condition
  );

  if (isPasswordInvalid) {
    return enqueueSnackbar('Incorrect Password Format', {
      variant: 'error',
    });
  }

  // All validations passed, continue
  console.log('hello');
  setFormData({ ...values, phoneNo, password });
  setActiveTab(2);
}}

        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <div className="flex justify-between gap-5">
              <div className="w-1/2">
                <Input
                  type="text"
                  label="First Name"
                  placeholder='Enter a first name'
                  error={formState.errors['firstName']}
                  className='border border-[#AFB8C7] py-[16px] px-[14px] bg-white rounded-[12px] w-full placeholder:text-[14px] placeholder:text-[#AFB8C7] leading-[17px] font-normal font-poppins'
                  registration={register('firstName')}
                />
              </div>

              <div className="w-1/2">
                <Input
                  type="text"
                  label="Last Name"
                  placeholder='Enter a last name'
                  className='border border-[#AFB8C7] py-[16px] px-[14px] bg-white rounded-[12px] w-full placeholder:text-[14px] placeholder:text-[#AFB8C7] leading-[17px] font-normal font-poppins'
                  error={formState.errors['lastName']}
                  registration={register('lastName')}
                />
              </div>
            </div>

            <Input
              type="email"
              label="Email Address"
              placeholder='name@domain.com'
              className='border border-[#AFB8C7] py-[16px] px-[14px] bg-white rounded-[12px] w-full placeholder:text-[14px] placeholder:text-[#AFB8C7] leading-[17px] font-normal font-poppins'
              error={formState.errors['email']}
              registration={register('email')}
            />
            <div>
              <label className='text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1 block'>
              Phone Number
              </label>
            <PhoneInput
              country="in"
              countryCodeEditable={false}
              placeholder='+91 12345 67890'
              inputStyle={{
                width: '100%',
                height: '51px',
                border: '1px solid #AFB8C7',
                borderRadius: '12px',
                padding:'16px 50px',
              }}
              onChange={(phone) => setPhoneNo(phone)}
            />
</div>
            <PasswordInput
              name="password"
              register={register}
              conditions={conditions}
              checkIcon={CheckIcon}
              noncheckIcon={NonCheckIcon}
              eyeOn={EyeOnIcon}
              eyeOff={EyeOffIcon}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className='border border-[#AFB8C7] py-[16px] px-[14px] bg-white rounded-[12px] w-full placeholder:text-[14px] placeholder:text-[#AFB8C7] leading-[17px] font-normal font-poppins'
            />

            <div>
              <Button
                type="submit"
                className=" bg-[#653EFF] text-white text-[20px] leading-[24px] [@media_(max-width:600px)]:text-[16px] font-semibold py-4 [@media_(max-width:600px)]:rounded-[12px] rounded-[16px] [@media_(min-width:550px)]:w-[440px] flex h-[56px] [@media_(max-width:600px)]:h-[44px] mx-auto login-btn"
              >
                Continue
                <img src={arrowicon} alt="" className='w-[23.11px] h-[24px]' />
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="text-center mt-3">
        <span className="text-[#AFB8C7] font-normal text-[12px] leading-[17px] font-poppins">
          By continuing you agree to the ajastos &nbsp;
        </span>
        <span className="text-[#653EFF] font-semibold text-[12px] leading-[17px] font-poppins underline">
           <a onClick={()=>navigateToURL("https://screenplay.ink/terms-and-conditions")}>terms of service</a>
        </span>
        <span className="text-[#AFB8C7] font-normal text-[12px] leading-[17px] font-poppins">
        &nbsp; and &nbsp;
        </span>
        <span className="text-[#653EFF] font-semibold text-[12px] leading-[17px] font-poppins underline">
         
         <a onClick={()=>navigateToURL("https://screenplay.ink/privacy")}>Privacy policy</a> 
        </span>
      </div>

      <div className="text-center my-6">
        <div className="flex items-center max-w-[295px] mx-auto">
          <hr className="flex-grow border-t border-[#AFB8C7]" />
          <span className="mx-4 text-[#252C34] font-medium sm:text-[16px] text-sm">
            OR
          </span>
          <hr className="flex-grow border-t border-[#AFB8C7]" />
        </div>
      </div>

      <button
          onClick={() => mutate(undefined)}
          className="bg-[#D6CCFF] text-[#653EFF] flex [@media_(max-width:600px)]:text-[16px] text-[20px] leading-[24px] p-2 font-semibold [@media_(max-width:600px)]:rounded-[12px] rounded-[16px] [@media_(min-width:550px)]:w-[440px] h-[56px] [@media_(max-width:600px)]:h-[44px] login-btn justify-between items-center mx-auto"
          type="submit"
        >
     
            <img
              src={icon1}
              alt="google icon"
              className="w-10 h-10 [@media_(max-width:600px)]:h-8 [@media_(max-width:600px)]:w-8"
            />
       
          <p className="mx-auto [@media_(max-width:600px)]:text-[16px] text-[20px] font-semibold leading-[24px]">Login with Google</p>
        </button>
    

      <div className="text-center mt-6">
        <span className="text-[#AFB8C7] font-normal text-[18px] leading-[21px] font-poppins [@media_(max-width:600px)]:text-[14px]">
          Already have an account?{' '}
        </span>
        <Link
          to={paths.auth.login.path}
          className="cursor-pointer text-[#653EFF] font-semibold text-[18px] leading-[21px] underline [@media_(max-width:600px)]:text-[14px]"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};
