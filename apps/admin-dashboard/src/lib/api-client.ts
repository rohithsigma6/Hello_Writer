import Axios, { InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';

// import { useNotifications } from '@/components/ui/notifications';
// import { paths } from '@/config/paths';
// import { User } from '@/types/api';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
    const user = JSON.parse(localStorage.getItem('user') as string);

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user?.token}`;
    }
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);

    if (error?.response?.data !== 'User not verified') {
      // const message = error.response?.data?.message || error.message;
      // useNotifications.getState().addNotification({
      //   type: 'error',
      //   title: 'Error',
      //   message,
      // });
    }

    // if (error.response?.status === 401) {
    //   const searchParams = new URLSearchParams();
    //   const redirectTo =
    //     searchParams.get('redirectTo') || window.location.pathname;
    //   window.location.href = paths.auth.login.getHref(redirectTo);
    // }

    return Promise.reject(error);
  },
);
