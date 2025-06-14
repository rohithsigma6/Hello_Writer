import { FormEvent, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';

import logo from '@/assets/signup/CompanyLogo.svg';

import logo2 from '@/assets/signup/LoginLogo.svg';
import { paths } from '@/config/paths';
import { useSendResetPasswordLink } from '@/features/auth/api/send-reset-password-link';
import tick from '@/assets/signup/tick.svg';
import PasswordInput, {
  Conditions,
} from '@/features/auth/components/password-input';
import CheckIcon from '@/assets/signup/check.svg';
import EyeOffIcon from '@/assets/signup/eyeOff.svg';
import EyeOnIcon from '@/assets/signup/eyeOn.svg';
import NonCheckIcon from '@/assets/signup/nonCheck.svg';
import { useResetPassword } from '@/features/auth/api/reset-password';
import { useSnackbar } from 'notistack';

interface Params {
  id: string;
  code: string;
}
const ResetPasswordRoute = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const code = searchParams.get('code');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const { mutate: resetPassword, isPending: resetPasswordPending } =
    useResetPassword({
      mutationConfig: {
        onSuccess: () => {
          enqueueSnackbar('Password Reset Successfull', { variant: 'success' });
          navigate(paths.auth.login.path, { replace: true });
        },
        onError: (err) => {
          // @ts-ignore
          if (err?.response?.data) {
            //@ts-ignore
            enqueueSnackbar(err?.response?.data as string, {
              variant: 'error',
            });
          }
        },
      },
    });

  const { mutate, isPending } = useSendResetPasswordLink({
    mutationConfig: {
      onError: (err) => {
        // @ts-ignore
        if (err?.response?.data) {
          //@ts-ignore
          enqueueSnackbar(err?.response?.data as string, {
            variant: 'error',
          });
        }
      },
      onSuccess: () => {
        setStep(2);
      },
    },
  });
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email !== '') {
      mutate(email);
    }
  };

  function ValidationCondition(password: string): Conditions {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPass) {
      return enqueueSnackbar("Password didn't matched", {
        variant: 'error',
      });
    }

    Object.keys(ValidationCondition(password)).forEach((key) => {
      // @ts-ignore
      if (!ValidationCondition(password)[key]) {
        return enqueueSnackbar('Incorrect Password Format', {
          variant: 'error',
        });
      }
    });

    resetPassword({ recoverHash: code!, userId: id!, password });
  };

  return (
    <div className="min-h-screen flex flex-col sm:justify-start justify-between">
      <div className="login-wrapper [@media_(max-width:600px)]:px-6 [@media_(max-width:600px)]:w-full">
        <div className="login-inner font-poppins">
          <div className="sm:flex justify-end mr-11 my-4 hidden fixed top-0 right-0">
            <img alt="logo" src={logo2} className="m-1 w-[141px] h-[40px]" />
          </div>
          <div className="[@media_(min-width:600px)]:w-[600px]">
            <div className="[@media_(min-width:600px)]:w-[600px] bg-white font-poppins">
              <div className="flex justify-center mt-12 sm:mb-12 mb-0 sm:px-0 px-7 font-poppins">
                <div className="w-full bg-white">
                  <div className="flex justify-center mb-4 sm:mt-0 mt-5">
                    <img
                      alt="Screenplay.INK"
                      src={logo}
                      className="min-w-[188px] min-h-[63px]"
                    />
                  </div>
                  <h1 className="text-center text-[#1B1C37] font-poppins text-[40px] font-extrabold [@media_(max-width:600px)]:text-[19px] [@media_(max-width:600px)]:font-semibold">
                    Reset Password
                  </h1>

                  {id && code ? (
                    <>
                      <form onSubmit={handlePasswordChange}>
                        <PasswordInput
                          name="password"
                          label="Password"
                          conditions={ValidationCondition(password)}
                          checkIcon={CheckIcon}
                          noncheckIcon={NonCheckIcon}
                          eyeOn={EyeOnIcon}
                          eyeOff={EyeOffIcon}
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required
                          className="border border-[#AFB8C7] py-[16px] px-[14px] bg-white rounded-[12px] w-full placeholder:text-[14px] placeholder:text-[#AFB8C7] leading-[17px] font-normal font-poppins"
                        />
                        <PasswordInput
                          name="password"
                          label="Confirm Password"
                          placeholder="Confirm password"
                          conditions={ValidationCondition(confirmPass)}
                          checkIcon={CheckIcon}
                          noncheckIcon={NonCheckIcon}
                          eyeOn={EyeOnIcon}
                          eyeOff={EyeOffIcon}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          value={confirmPass}
                          required
                          className="border border-[#AFB8C7] py-[16px] px-[14px] bg-white rounded-[12px] w-full placeholder:text-[14px] placeholder:text-[#AFB8C7] leading-[17px] font-normal font-poppins"
                        />

                        <div className="mb-4 flex justify-center pt-4 w-full">
                          <button
                            type="submit"
                            className={`sm:w-[380px] w-full bg-[#653EFF] text-white sm:text-[18px] text-sm sm:font-[600] font-normal sm:p-3 p-2 flex items-center justify-center border-1  box-shadow-xs sm:rounded-[14px] rounded-xl ${
                              resetPasswordPending &&
                              'opacity-50 cursor-not-allowed'
                            }`}
                          >
                            Reset Password
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      {step == 2 && (
                        <div className="flex justify-center mb-4">
                          <img
                            alt="Screenplay.INK"
                            src={tick}
                            className="sm:w-auto w-10"
                          />
                        </div>
                      )}

                      {step == 1 && (
                        <p className="text-center text-[#8F8F8F] font-normal leading-[21px] mt-2 text-[18px] mb-10 font-poppins [@media_(max-width:600px)]:text-[14px]">
                          We know forgetting passwords happens to the best of
                          us.{' '}
                        </p>
                      )}

                      {step == 2 && (
                        <p className="text-center text-[#8F8F8F] font-normal leading-[21px] mt-2 text-[18px] mb-10 font-poppins [@media_(max-width:600px)]:text-[14px]">
                          We have sent a password reset link to your mail.{' '}
                        </p>
                      )}

                      <form onSubmit={handleSubmit}>
                        {step == 1 && (
                          <div className="mb-4">
                            <label
                              className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="email"
                            >
                              Email
                            </label>

                            <input
                              id="email"
                              className="border border-[#AFB8C7] py-[16px] px-[14px] bg-white rounded-[12px] w-full placeholder:text-[14px] placeholder:text-[#AFB8C7] leading-[17px] font-normal font-poppins"
                              placeholder="Enter your email"
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        )}
                        <div className="mb-4 flex justify-center pt-4 w-full">
                          <button
                            type="submit"
                            className={`bg-[#653EFF] text-white text-[20px] leading-[24px] [@media_(max-width:600px)]:text-[16px] font-semibold py-4 [@media_(max-width:600px)]:rounded-[12px] rounded-[16px] [@media_(min-width:550px)]:w-[440px] h-[56px] justify-center [@media_(max-width:600px)]:h-[44px] mx-auto login-btn ${
                              isPending && 'opacity-50 cursor-not-allowed'
                            }`}
                          >
                            {step == 1 ? 'Reset Password' : 'Resend Link'}
                          </button>
                        </div>
                      </form>
                    </>
                  )}

                  <div className="text-center my-6">
                    <div className="flex items-center max-w-[295px] mx-auto">
                      <hr className="flex-grow border-t border-[#AFB8C7]" />
                      <span className="mx-4 text-[#252C34] font-medium sm:text-[16px] text-sm">
                        OR
                      </span>
                      <hr className="flex-grow border-t border-[#AFB8C7]" />
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <span className="text-[#AFB8C7] font-normal text-[18px] leading-[21px] font-poppins [@media_(max-width:600px)]:text-[14px]">
                      Don't have an account?{' '}
                    </span>
                    <span
                      onClick={() => navigate(paths.auth.register.path)}
                      className="cursor-pointer text-[#653EFF] font-semibold text-[18px] leading-[21px] underline [@media_(max-width:600px)]:text-[14px]"
                     
                    >
                      Create new account
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:hidden my-10 w-full justify-center bottom-0">
            <img alt="logo" src={logo2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRoute;
