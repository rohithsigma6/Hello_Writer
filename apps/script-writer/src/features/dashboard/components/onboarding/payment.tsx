import * as React from 'react';
import { useNavigate,  } from 'react-router';
import { useSnackbar } from 'notistack';
import { useUser } from '@/features/users/api/get-user';
import { PaymentData, usePayment } from '@/features/users/api/use-payment';

interface PaymentSubModalProps {
  open: boolean;
  handleClose: () => void;
}

// -------------------- Payment Header Component --------------------
const PaymentHeader: React.FC = () => (
  <h2 className="text-xl font-semibold mb-4">Payment Options:</h2>
);

// -------------------- Payment Method Buttons Component --------------------
interface PaymentMethodButtonsProps {
  handlePhonePe: () => void;
  handleRazorpay: () => void;
}
const PaymentMethodButtons: React.FC<PaymentMethodButtonsProps> = ({
  handlePhonePe,
  handleRazorpay,
}) => (
  <>
    <button
      onClick={handlePhonePe}
      className="text-lg text-blue-500 hover:text-blue-700 w-full text-left mb-4"
    >
      Pay with PhonePe
    </button>
    <button
      onClick={handleRazorpay}
      className="text-lg text-blue-500 hover:text-blue-700 w-full text-left"
    >
      Pay with Razorpay
    </button>
  </>
);

// -------------------- Payment Close Button Component --------------------
interface PaymentCloseButtonProps {
  handleClose: () => void;
}
const PaymentCloseButton: React.FC<PaymentCloseButtonProps> = ({
  handleClose,
}) => (
  <button
    onClick={handleClose}
    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
  >
    &times;
  </button>
);

// -------------------- Payment Modal Content Component --------------------
interface PaymentModalContentProps {
  handlePhonePe: () => void;
  handleRazorpay: () => void;
  handleClose: () => void;
}
const PaymentModalContent: React.FC<PaymentModalContentProps> = ({
  handlePhonePe,
  handleRazorpay,
  handleClose,
}) => (
  <div className="bg-white p-6 rounded-lg w-96 relative">
    <PaymentHeader />
    <PaymentMethodButtons
      handlePhonePe={handlePhonePe}
      handleRazorpay={handleRazorpay}
    />
    <PaymentCloseButton handleClose={handleClose} />
  </div>
);

// -------------------- Main PaymentSubModal Component --------------------
const PaymentModal: React.FC<PaymentSubModalProps> = ({
  open,
  handleClose,
}) => {
  const navigate = useNavigate();

  const { data: userData } = useUser({});
  const { phonePe, razorpay } = usePayment(
    userData?.user?.firstName!+" "+userData?.user?.lastName!,
    userData?.user?.email!,
  );

  const { enqueueSnackbar } = useSnackbar();

  const paymentData: PaymentData = {
    amount: 2999,
    paymentFor: 'subscription',
    userId: userData?.user?._id!,
  };

  const handlePhonePe = async () => {
    phonePe.mutate(paymentData);
  };

  const handleRazorpay = async () => {
    razorpay.mutate(paymentData);
  };

  return (
    <div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <PaymentModalContent
            handlePhonePe={handlePhonePe}
            handleRazorpay={handleRazorpay}
            handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
