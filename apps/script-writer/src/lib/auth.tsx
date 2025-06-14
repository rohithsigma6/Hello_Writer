import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation, useParams } from 'react-router';
import { z } from 'zod';
import { paths } from '@/config/paths';
import { AuthResponse, User } from '@/types/api';
import { api } from './api-client';
import { useFile } from '@/features/file/screenplay/api/get-file-by-id';
import { useUser } from '@/features/users/api/get-user';
import { useEditorStore } from '@/store/editor';
import { FilePermission } from '@/store/editor/slices/editor';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return { data: null };
};

const logout = (): Promise<void> => {
  // return
  localStorage.removeItem('user');
  return new Promise((resolve) => {
    resolve();
  });
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (
  data: LoginInput,
): Promise<{ body: { user: User } }> => {
  return api.post('/api/auth/login', data);
};

export const registerInputSchema = z.object({
  email: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  phoneNo: z.string().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  lifetimeRegistered: z.boolean().default(true).optional(),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/api/auth/register', data);
};

const authConfig = {
  userFn: () => null,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    localStorage.setItem('user', JSON.stringify(response?.body?.user));
    return response?.body?.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    if (response?.body?.user) {
      localStorage.setItem('user', JSON.stringify(response?.body?.user));
    }
    return response.body.user;
  },

  logoutFn: logout,
};

export const { useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: userData, refetch } = useUser({
    queryConfig: {
      enabled: true,
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const { fileId } = useParams();
  const { data: fileData } = useFile({
    fileId: fileId!,
    queryConfig: {
      enabled: !!fileId,
    },
  });
  const updateFilePermission = useEditorStore.getState().updateFilePermission;
  const user: User = JSON.parse(localStorage.getItem('user') as string) ?? {};
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, []);

  if (!user?.token) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  if (!user?.isVerified) {
    return (
      <Navigate to={paths.auth.register.getHref(location.pathname)} replace />
    );
  }

  if (location.pathname == '/') {
    return <Navigate to={'/dashboard'} replace />;
  }

  if (!user?.isEligible && location.pathname?.includes('/file/')) {
    return <Navigate to={'/dashboard'} replace />;
  }

  if (fileData?.file?.permissionType) {
    let permissionType: FilePermission | string =
      fileData?.file?.permissionType.toUpperCase();
    updateFilePermission(permissionType);

    if (permissionType == FilePermission.GUEST) {
      enqueueSnackbar('You are not authorized', { variant: 'error' });
      return <Navigate to={'/dashboard'} replace />;
    }
  }

  return children;
};
