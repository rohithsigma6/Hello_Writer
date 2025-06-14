import mainOtp from '@/assets/mfa/mfaOtp.svg';
import step3 from '@/assets/mfa/mfaStep3.svg';
import logo2 from '@/assets/signup/LoginLogo.svg';
import { Button } from '@/components/ui/button';
import { usePostMfaSetup } from '@/features/auth/api/auth-mfa';
import { usePost2faVerify } from '@/features/auth/api/verify-otp';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { OtpInput } from 'reactjs-otp-input';

const LoginRoute = () => {
  const [code, setCode] = useState('');
  const handleChange = (code) => setCode(code);
  const { mutate: postMfa } = usePostMfaSetup();
  const { mutate: postVerifyOtp } = usePost2faVerify();
  const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');
    const navigate = useNavigate();

  const handleVerify = () => {
    postVerifyOtp(
      { token: code },
      {
        onSuccess: (response) => {
            navigate(
                    '/dashboard',
                    {
                      replace: true,
                    },
                  );
          console.log('2FA verification successful:', response);
        },
        onError: (err) => {
          console.error('2FA verification failed:', err);
        },
      },
    );
  };
  return (
    <>
      <div className="login-wrapper">
        <div className="login-inner">
          <div className="sm:flex justify-end mr-11 my-4 hidden fixed top-0 right-0">
            <img alt="logo" src={logo2} className="m-1" />
          </div>

          <div className="flex justify-center mt-12 sm:mb-12 mb-0 sm:px-0 px-7">
              <div className=" w-full bg-white font-poppins ">
                <div className="min-h-screen  text-black flex flex-col items-center justify-center p-4">
                  <h2 className="text-3xl font-bold mb-2 text-black">
                    Enable Multi-Factor Authentication (MFA)
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Add an extra layer of security to your account by enabling
                    Multi-Factor Authentication
                  </p>
                  <div className=" rounded-2xl border-2  p-6  max-w-5xl mt-5 w-full flex flex-col md:flex-row gap-8">
                    {/* Left Illustration Section */}
                    <div className="bg-[#EEE6FF] rounded-2xl p-6 flex-1 flex items-center justify-center">
                      <img
                        src={mainOtp}
                        alt="MFA Illustration"
                        className="w-full max-w-sm"
                      />
                    </div>

                    {/* Right Content Section */}
                    <div className="flex-1 text-black">
                      <h3 className="text-xl font-semibold mb-2">
                      Enter Verification Code
                      </h3>
                      
                      <p className="text-gray-400 mb-4">
                      Enter the code displayed on Authenticator App
                      </p>
                      <OtpInput
                        value={code}
                        onChange={handleChange}
                        numInputs={6}
                        separator={<span> </span>}
                        inputStyle={{
                          width: '3rem',
                          height: '3rem',
                          margin: '0 0.5rem',
                          fontSize: '1.5rem',
                          borderRadius: 4,
                          border: '1px solid #ced4da',
                          textAlign: 'center',
                        }}
                        focusStyle={{
                          border: '2px solid #007bff',
                          outline: 'none',
                        }}
                      />

                      <div className="flex gap-4 justify-end mt-6">
                        <Button
                          className="bg-primary-cta hover:bg-violet-700 text-white"
                          onClick={() => handleVerify()}
                        >
                          Done →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <div className="flex sm:hidden my-10 w-full justify-center fixed bottom-0">
            <img alt="logo" src={logo2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRoute;
