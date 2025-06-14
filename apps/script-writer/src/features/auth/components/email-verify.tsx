import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import tick from '@/assets/signup/tick.svg';
import { useResendEmail } from '../api/resend-email';
import { enqueueSnackbar, useSnackbar } from 'notistack';

interface EmailVerificationProps {
  email: string;
}

const TIMER_DURATION = 120; // in seconds
const TIMER_KEY = 'resendDisabledUntil';

const EmailVerification: React.FC<EmailVerificationProps> = ({ email }) => {
  const { enqueueSnackbar } = useSnackbar();
  const timerRef = useRef();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const { mutate, isPending } = useResendEmail({
    mutationConfig: {
      onError: (err) => {
        // @ts-ignore
        if (err?.response?.data) {
          // @ts-ignore
          enqueueSnackbar(err?.response?.data, { variant: 'error' });
        }

        clearInterval(timerRef.current);
        setTimeLeft(0);
      },
      onSuccess: () => {
        enqueueSnackbar('Email sent!', { variant: 'success' });
      },
    },
  });

  // Helper: calculate remaining time (in seconds) based on stored timestamp.
  const getRemainingTime = (): number => {
    const stored = localStorage.getItem(TIMER_KEY);
    if (stored) {
      const disableUntil = Number(stored);
      const diff = Math.floor((disableUntil - Date.now()) / 1000);
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  // On mount, check if there's an active timer in localStorage.
  useEffect(() => {
    const remaining = getRemainingTime();
    setTimeLeft(remaining);

    if (remaining > 0) {
      // @ts-ignore
      timerRef.current = setInterval(() => {
        const newRemaining = getRemainingTime();
        setTimeLeft(newRemaining);
        if (newRemaining <= 0) {
          clearInterval(timerRef.current);
          localStorage.removeItem(TIMER_KEY);
        }
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, []);

  // Handle button click
  const handleButtonClick = async () => {
    // If the button is disabled, do nothing.
    if (timeLeft > 0 || isPending) return;

    // Set the new timer in localStorage.
    const disableUntil = Date.now() + TIMER_DURATION * 1000;
    localStorage.setItem(TIMER_KEY, disableUntil.toString());
    setTimeLeft(TIMER_DURATION);

    // @ts-ignore
    timerRef.current = setInterval(() => {
      const newRemaining = getRemainingTime();
      setTimeLeft(newRemaining);
      if (newRemaining <= 0) {
        clearInterval(timerRef.current);
        localStorage.removeItem(TIMER_KEY);
      }
    }, 1000);

    try {
      mutate(email);
    } catch (error) {
      console.error('Error resending email:', error);
      // Optionally, clear timer on error or leave it as-is.
    }
  };

  return (
    <div>
      <div className="sm:max-w-lg w-full bg-white rounded-2xl border-[2px] md:p-8 p-6">
        <div className="flex justify-center mb-4">
          <img alt="Screenplay.INK" src={tick} className="sm:w-auto w-10" />
        </div>

        <h2 className="text-center text-[#282210] sm:font-bold font-semibold sm:text-3xl text-xl sm:mb-2 mb-1">
          Verify Your Email Address
        </h2>

        <p className="text-center text-[#454545] font-medium sm:text-normal text-sm leading-[21px]">
          Please enter via link sent in the email
        </p>

        <div className="sm:mt-10 mt-6">
          <button
            disabled={isPending || timeLeft > 0}
            onClick={handleButtonClick}
            className={`w-full bg-[#653EFF] text-white sm:text-[18px] text-sm sm:font-[600] font-normal sm:p-3 p-2 flex items-center justify-center border-1 box-shadow-xs sm:rounded-[14px] rounded-xl ${
              (isPending || timeLeft > 0) && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isPending ? (
              // Loader state when API call is in progress.
              <span>Loading...</span>
            ) : timeLeft > 0 ? (
              // Show timer countdown when disabled.
              <span>Resend verification Link ({timeLeft}s)</span>
            ) : (
              <span>Resend verification Link</span>
            )}
          </button>
        </div>
      </div>

      <p className="md:text-base text-center text-sm text-[#653EFF] font-semibold mt-6">
        You will be redirected once verification is complete!
      </p>
    </div>
  );
};

export default EmailVerification;
