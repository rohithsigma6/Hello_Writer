import { LoginForm } from '@/features/auth/components/login-form';
import logo from '@/assets/signup/CompanyLogo.svg';
import logo2 from '@/assets/signup/LoginLogo.svg';
import mainImg from '@/assets/mfa/mainMfa.svg';
import mainDownload from '@/assets/mfa/mfaDownload.svg';
import tick from '@/assets/signup/tick.svg';
import mainOtp from '@/assets/mfa/mfaOtp.svg';
import step1 from '@/assets/mfa/mfaStep1.svg';
import step2 from '@/assets/mfa/mfaStep2.svg';
import step3 from '@/assets/mfa/mfaStep3.svg';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { usePostMfaSetup } from '@/features/auth/api/auth-mfa';
import { OtpInput } from 'reactjs-otp-input';
import { usePost2faVerify } from '@/features/auth/api/verify-otp';
import { useNavigate, useSearchParams } from 'react-router';

const LoginRoute = () => {
  const [mfaStep, setMfaStep] = useState(0);
  const [mfaQR, setMfaQR] = useState(null);
  const [code, setCode] = useState('');
  const handleChange = (code) => setCode(code);
  const { mutate: postMfa } = usePostMfaSetup();
  const { mutate: postVerifyOtp } = usePost2faVerify();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };
  const handleVerify = () => {
    postVerifyOtp(
      { token: code },
      {
        onSuccess: (response) => {
          setMfaStep(4);
          // navigate(
          //         '/dashboard',
          //         {
          //           replace: true,
          //         },
          //       );
          console.log('2FA verification successful:', response);
        },
        onError: (err) => {
          console.error('2FA verification failed:', err);
        },
      },
    );
  };
  const getQR = () => {
    postMfa(
      {},
      {
        onSuccess: (response) => {
          console.log('MFA setup successful:', response?.body?.qrCodeData);
          setMfaQR(response?.body?.qrCodeData);
          setMfaStep(2);
        },
        onError: (error) => {
          console.error('MFA setup failed:', error);
        },
      },
    );
  };
  const handleSkip = () => {
    localStorage.setItem('isSkip', rememberMe);
    navigate('/dashboard', {
      replace: true,
    });
  };
  return (
    <>
      <div className="login-wrapper">
        <div className="login-inner">
          <div className="sm:flex justify-end mr-11 my-4 hidden fixed top-0 right-0">
            <img alt="logo" src={logo2} className="m-1" />
          </div>

          {mfaStep === 0 ? (
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
                        src={mainImg}
                        alt="MFA Illustration"
                        className="w-full max-w-sm"
                      />
                    </div>

                    {/* Right Content Section */}
                    <div className="flex-1 text-black">
                      <h3 className="text-xl font-semibold mb-2">
                        Start by Getting the App
                      </h3>
                      <p className="text-gray-400 mb-4">
                        With MFA enabled, anyone trying to access your account
                        will need to provide an additional verification code
                        after entering the password. This helps protect your
                        screenplay drafts, production data, and personal info
                        from unauthorized access.
                      </p>

                      <ul className="mb-6 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="bg-white text-black w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
                            1
                          </span>
                          <span>Download the Authenticator App.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-white text-black w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
                            2
                          </span>
                          <span>Setup the Account by scanning QR Code.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-white text-black w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
                            3
                          </span>
                          <span>Enter Verification Code.</span>
                        </li>
                      </ul>

                      <div className="flex gap-4 justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            type="checkbox"
                            className="mr-2"
                            checked={rememberMe}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="text-[#5E6B7D] font-medium text-sm leading-5"
                            htmlFor="remember-me"
                          >
                            Don’t ask me again
                          </label>
                        </div>
                        <div>
                          <Button
                            className="bg-white text-black hover:bg-gray-200 mr-2"
                            onClick={() => handleSkip()}
                          >
                            Not Now
                          </Button>
                          <Button
                            className="bg-primary-cta hover:bg-violet-700 text-white"
                            onClick={() => setMfaStep(1)}
                          >
                            Setup MFA →
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : mfaStep == 1 ? (
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
                  <div>
                    <img src={step1} />
                  </div>
                  <div className=" rounded-2xl border-2  p-6  max-w-5xl mt-5 w-full flex flex-col md:flex-row gap-8">
                    {/* Left Illustration Section */}
                    <div className="bg-[#EEE6FF] rounded-2xl max-w-[280px] p-6 flex-1 flex items-center justify-center">
                      <img
                        src={mainDownload}
                        alt="MFA Illustration"
                        className="w-full max-w-[240px]"
                      />
                    </div>

                    {/* Right Content Section */}
                    <div className="flex-1 text-black">
                      <h3 className="text-xl font-semibold mb-2">
                        Download the App
                      </h3>

                      <ul className="mb-6 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="bg-white text-black w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
                            1
                          </span>
                          <span>
                            On your phone install the Authenticator app.
                            Download now.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-white text-black w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
                            2
                          </span>
                          <span>
                            Once you’ve installed the Autheticator app on your
                            device click “Next”.
                          </span>
                        </li>
                      </ul>

                      <div className="flex gap-4 justify-end">
                        <Button
                          className="bg-primary-cta hover:bg-violet-700 text-white"
                          onClick={() => getQR()}
                        >
                          Next →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : mfaStep == 2 ? (
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
                  <div>
                    <img src={step2} />
                  </div>
                  <div className=" rounded-2xl border-2  p-6  max-w-5xl mt-5 w-full flex flex-col md:flex-row gap-8">
                    {/* Left Illustration Section */}
                    <div className="bg-[#EEE6FF] rounded-2xl p-6 flex-1 flex items-center justify-center">
                      <img
                        src={mfaQR}
                        alt="MFA Illustration"
                        className="w-full max-w-sm"
                      />
                    </div>

                    {/* Right Content Section */}
                    <div className="flex-1 text-black">
                      <h3 className="text-xl font-semibold mb-2">
                        Scan QR Code
                      </h3>
                      <ul className="mb-6 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="bg-white text-black w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
                            1
                          </span>
                          <span>
                            Scan the QR code below with your authenticator app.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-white text-black w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
                            2
                          </span>
                          <span>
                            After Scanning, enter the verification code
                            generated by the app.
                          </span>
                        </li>
                      </ul>

                      <div className="flex gap-4 justify-end">
                        <Button
                          className="bg-primary-cta hover:bg-violet-700 text-white"
                          onClick={() => setMfaStep(3)}
                        >
                          I’ve Scanned it →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : mfaStep == 3 ? (
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
                  <div>
                    <img src={step3} />
                  </div>
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
          ) : (
            <div>
              <div className="sm:max-w-2xl w-full bg-white rounded-2xl border-[2px] md:p-8 p-6">
                <div className="flex justify-center mb-4">
                  <img
                    alt="Screenplay.INK"
                    src={tick}
                    className="sm:w-auto w-10"
                  />
                </div>

                <h2 className="text-center text-[#282210] sm:font-bold font-semibold sm:text-3xl text-xl sm:mb-2 mb-1">
                  Multi-Factor Authentication Enabled
                </h2>

                <p className="text-center text-[#454545] font-medium sm:text-normal text-sm leading-[21px]">
                  Extra layer of security added to your account
                </p>

                <div className="sm:mt-10 mt-6">
                  <button
                    className={`w-full bg-[#653EFF] text-white sm:text-[18px] text-sm sm:font-[600] font-normal sm:p-3 p-2 flex items-center justify-center border-1 box-shadow-xs sm:rounded-[14px] rounded-xl`}
                    onClick={() => navigate('/dashboard', { replace: true })}
                  >
                    Go to DashBoard
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex sm:hidden my-10 w-full justify-center fixed bottom-0">
            <img alt="logo" src={logo2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRoute;
