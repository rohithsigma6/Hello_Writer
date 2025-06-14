import React, { Fragment, useState } from 'react'

import { IoMdClose } from 'react-icons/io';
import { Dialog, Transition } from '@headlessui/react';
import { OtpInput } from 'reactjs-otp-input';
import { usePostMfaSetup } from '@/features/auth/api/auth-mfa';
import { useNavigate } from 'react-router';
import { usePost2faVerify } from '@/features/auth/api/verify-otp';
const TwoFactorAuthPopUp = ({setupNow, setSetupNow,setSetupConfirm}:any) => {
   const [code, setCode] = useState('');
    const handleChange = (code) => setCode(code);
    const { mutate: postMfa } = usePostMfaSetup();
    const { mutate: postVerifyOtp } = usePost2faVerify();
      const navigate = useNavigate();
  
    const handleVerify = () => {
      postVerifyOtp(
        { token: code },
        {
          onSuccess: (response) => {
              // navigate(
              //         '/dashboard',
              //         {
              //           replace: true,
              //         },
              //       );
            // console.log('2FA verification successful:', response);
            
            setSetupNow(false);
            setSetupConfirm(true)
          },
          onError: (err) => {
            console.error('2FA verification failed:', err);
          },
        },
      );
    };
  return (
    <div><Transition.Root show={true} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-[999999]"
            onClose={() => {
            //   setTemplatesPopup(false);
            }}
          >
            {/* Backgdrop of the dialog */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative font-poppins z-[9999] transform overflow-hidden bg-white text-left shadow-xl transition-all rounded-3xl w-[560px]">
                    <div className=''>
                     
                     
                      <p className="text-base font-normal border-t text-[#212131] border-b border-solid border-[#9999a072] py-[26px]">
                        
                          {status!=='finalize'&& <>
                            <p className="text-[#212131] text-base font-normal py-2 border-b border-solid border-[#9999a072]  px-[40px]">
                            Disable Multi Factor Authentication
                        </p>
                        <div className="flex-1 text-black  px-[40px]">
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

                    </div>
                      </>
                      }
    
                      </p>
                    
                      <div className="flex gap-2 px-[24px] py-[12px] justify-end">
                        <button
                          type={'button'}
                          onClick={() => {
                            setSetupNow(false);
                          }}
                          className={'w-[160px] py-[18px] px-[52px] border border-solid border-[#9999A0] rounded-2xl text-[#9999A0] text-center'}
                        >
                          Cancel
                        </button>
                        <button
                          className={'w-[160px] py-[18px] px-[48px] text-white rounded-2xl bg-primary-blue border border-gray-300 hover:border-[#9999A0] hover:bg-white hover:text-[#9999A0]'}
                          //   disabled={isDisabled}
                          onClick={() => {
                            // setProceed(true);
                            handleVerify()
                          }}
                          type={'button'}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root></div>
  )
}

export default TwoFactorAuthPopUp