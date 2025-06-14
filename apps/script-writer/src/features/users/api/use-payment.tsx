import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { MutationConfig } from '@/lib/react-query';
import { api } from '@/lib/api-client';
import { useRazorpay, RazorpayOrderOptions } from 'react-razorpay';
import { useSnackbar } from 'notistack';

export interface PaymentData {
  amount: number;
  paymentFor: string;
  userId: string;
}

export interface PhonePeResponse {
  redirectInfo: { url: string };
}

export interface RazorpayOrder {
  id: string;
  amount: number;
}

export interface RazorpayResponse {
  key: string;
  order: RazorpayOrder;
}

export const phonePePayment = (data: PaymentData): Promise<PhonePeResponse> => {
  return api.post(`/api/payment/phonepe/checkout`, data);
};

export const razorpayPayment = async (
  data: PaymentData,
): Promise<RazorpayResponse> => {
  const { key }: { key: string } = await api.get(
    `/api/payment/razorpay/getkey`,
  );

  const { order }: { order: RazorpayOrder } = await api.post(
    `/api/payment/razorpay/checkout`,
    data,
  );

  return { key, order };
};

// -------------------- usePhonePePayment Hook --------------------
type UsePhonePePaymentOptions = {
  mutationConfig?: MutationConfig<typeof phonePePayment>;
};

export const usePhonePePayment = ({
  mutationConfig,
}: UsePhonePePaymentOptions = {}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: phonePePayment,
    onSuccess: (data, variables, context) => {
      // Invalidate the user query if needed
      queryClient.invalidateQueries({ queryKey: ['user'] });
      // If a redirect URL is provided, navigate there
      if (data?.redirectInfo?.url) {
        window.location.href = data.redirectInfo.url;
      }
      onSuccess?.(data, variables, context);
    },
    onError: () => {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    },
    ...restConfig,
  });
};

// -------------------- useRazorpayPayment Hook --------------------
type UseRazorpayPaymentOptions = {
  mutationConfig?: MutationConfig<typeof razorpayPayment>;
  name: string;
  email: string;
};

export const useRazorpayPayment = ({
  mutationConfig,
  name,
  email,
}: UseRazorpayPaymentOptions) => {
  const queryClient = useQueryClient();
  const { error, isLoading, Razorpay } = useRazorpay();
  const navigate = useNavigate();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: razorpayPayment,
    onSuccess: async (data, variables, context) => {
      // Invalidate user query as needed
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // Set up Razorpay options
      const options: RazorpayOrderOptions = {
        key: data.key,
        amount: data.order.amount,
        currency: 'INR',
        name: 'Beta Plan Access',
        description: 'Beta Plan Access',
        order_id: data.order.id,
        handler: async (response: any) => {
          try {
            await api.post(`/api/payment/razorpay/paymentverification`, {
              response,
            });

            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/dashboard?paymentSuccess=true');
          } catch (error) {
            await api.post(`/api/payment/razorpay/paymentfailure`, {
              order_id: data.order.id,
            });
            enqueueSnackbar('Payment Failed', { variant: 'error' });
            navigate('/dashboard');
          }
        },
        prefill: {
          // Prefill user details; update these values as needed
          name: name,
          email: email,
        },
        theme: {
          color: '#653EFF',
        },
        modal: {
          ondismiss: async () => {
            await api.post(`/api/payment/paymentfailure`, {
              order_id: data.order.id,
            });
            enqueueSnackbar('Payment Failed', { variant: 'error' });
            navigate('/dashboard');
          },
        },
      };

      // Open Razorpay checkout using the SDK instead of window.Razorpay
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();

      onSuccess?.(data, variables, context);
    },
    ...restConfig,
  });
};

// -------------------- Common usePayment Hook --------------------
// Optionally, you can bundle both payment hooks into one common hook.
export const usePayment = (
  name: string,
  email: string,
  options?: {
    phonePeMutationConfig?: MutationConfig<typeof phonePePayment>;
    razorpayMutationConfig?: MutationConfig<typeof razorpayPayment>;
  },
) => {
  const phonePe = usePhonePePayment({
    mutationConfig: options?.phonePeMutationConfig,
  });
  const razorpay = useRazorpayPayment({
    mutationConfig: options?.razorpayMutationConfig,
    name,
    email,
  });
  return { phonePe, razorpay };
};
