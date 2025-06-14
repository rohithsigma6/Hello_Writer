import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from '@/lib/auth';
import { PasswordInput } from '@/components/ui/form/passwordInput';
import icon1 from '@/assets/signup/google.svg';
import { useGoogleSignIn } from '../api/google-signin';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import arrowicon from '@/assets/signup/arrow-right.svg';
type LoginFormProps = {};

export const LoginForm = ({}: LoginFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const navigate = useNavigate();
  const login = useLogin({
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], { user });

      if (user?.isVerified) {
        console.log(redirectTo);
        console.log(decodeURIComponent(redirectTo!));
        if(localStorage.getItem('isSkip')=="true"){
          navigate(
            redirectTo && redirectTo.length > 3 ? redirectTo : '/dashboard',
            { replace: true },
          );
        }else{
          navigate(
            '/auth/mfa',
            { replace: true },
          );
        }
      } else {
        navigate(
          redirectTo
            ? `/auth/register?redirectTo=${redirectTo}`
            : '/auth/register',
          {
            replace: true,
          },
        );
      }
    },
    onError: (err) => {
      // @ts-ignore
      let message = err?.response?.data;
      console.log(err?.response?.status);
      
      if (err?.response?.status==403) {
        navigate(
          '/auth/mfaotp',
          { replace: true },
        );
      }else{
        enqueueSnackbar(message, { variant: 'error' });

      }
    },
  });

  const { mutate } = useGoogleSignIn({
    mutationConfig: {
      onSuccess: () => {
        navigate(redirectTo ? redirectTo : '/dashboard', { replace: true });
      },
    },
  });

  return (
    <div>
      <Form
        onSubmit={(values) => {
          login.mutate(values);
        }}
        schema={loginInputSchema}
        className='flex flex-col gap-5'
      >
        {({ register, formState }) => (
          <>
            <Input
              placeholder="Enter your Email"
              id="email"
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <PasswordInput
              id="password"
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="mr-2" />
                  <label
                    className="text-[#5E6B7D] font-medium text-sm leading-5"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <p
                  onClick={() => {
                    navigate(paths.auth.resetPassword.path);
                  }}
                  className="cursor-pointer text-[#F88390] font-semibold text-sm leading-5"
                >
                  Forgot password
                </p>
              </div>
              <Button
                isLoading={login.isPending}
                type="submit"
                className="bg-[#653EFF] text-white text-[20px] leading-[24px] [@media_(max-width:600px)]:text-[16px] font-semibold py-4 [@media_(max-width:600px)]:rounded-[12px] rounded-[16px] [@media_(min-width:550px)]:w-[440px] flex h-[56px] [@media_(max-width:600px)]:h-[44px] mx-auto login-btn"
              >
                Login
                <img src={arrowicon} alt="" className='w-[23.11px] h-[24px]' />
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="text-center my-6">
        <div className="flex items-center max-w-[295px] mx-auto">
          <hr className="flex-grow border-t border-[#AFB8C7]" />
          <span className="mx-4 text-[#252C34] font-medium sm:text-[16px] text-sm">
            OR
          </span>
          <hr className="flex-grow border-t border-[#AFB8C7]" />
        </div>
      </div>

      <div className="mb-4 flex justify-center">
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
       
          <p className="w-[90%]">Login with Google</p>
        </button>
      </div>

      <div className="text-center pt-1">
        <span className="text-[#AFB8C7] sm:font-[400] font-medium sm:text-[15px] text-sm leading-5">
          Don't have an account?{' '}
        </span>
        <Link
          to={paths.auth.register.getHref(redirectTo)}
        
          className="cursor-pointer text-[#653EFF] sm:font-semibold font-medium sm:text-[18px] text-sm leading-5 underline"
          style={{ textDecorationColor: '#1B1C37' }} 
        >
          Create new account
        </Link>
      </div>
    </div>
  );
};