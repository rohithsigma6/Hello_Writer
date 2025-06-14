import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { paths } from '@/config/paths';
import { ProtectedRoute } from '@/lib/auth';
import Dashboard from './routes/dashboard/dashboard'; 
import Mfa from './routes/auth/mfa';
import MfaOtp from './routes/auth/mfaotp';

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from './routes/app/root';
import FileRoot from './routes/file/root';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.auth.register.path,
      lazy: () => import('./routes/auth/signup').then(convert(queryClient)),
    },
   
    {
      path: paths.auth.mfa.path,
      element: <Mfa />,
    },
    {
      path: paths.auth.mfaotp.path,
      element: <MfaOtp />,
    },
    {
      path: paths.auth.login.path,
      lazy: () => import('./routes/auth/login').then(convert(queryClient)),
    },
    {
      path: paths.auth.resetPassword.path,
      lazy: () =>
        import('./routes/auth/reset-password').then(convert(queryClient)),
    },
    {
      path: paths.home.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: null,
      children: [
        {
          path: paths.file.root.path,
          element: <FileRoot />,
          ErrorBoundary: null,
          children: [
            {
              path: paths.file.screenplay.path,
              lazy: () =>
                import('./routes/file/screenplay').then(convert(queryClient)),
            },
            // {
            //   path: paths.file.scriptLining.path,
            //   lazy: () =>
            //     import('./routes/file/scriptLining').then(convert(queryClient)),
            // },
            {
              path: paths.file.logline.path,
              lazy: () =>
                import('./routes/file/logline').then(convert(queryClient)),
            },
            {
              path: paths.file.theme.path,
              lazy: () =>
                import('./routes/file/theme').then(convert(queryClient)),
            },
            {
              path: paths.file.storyworld.path,
              lazy: () =>
                import('./routes/file/storyworld').then(convert(queryClient)),
            },
            {
              path: paths.file.location.path,
              lazy: () =>
                import('./routes/file/location').then(convert(queryClient)),
            },
            {
              path: paths.file.characters.path,
              lazy: () =>
                import('./routes/file/characters').then(convert(queryClient)),
            },

            {
              path: paths.file.editCharacter.path,
              lazy: () =>
                import('./routes/file/characters').then(convert(queryClient)),
            },
            {
              path: paths.file.relationship.path,
              lazy: () =>
                import('./routes/file/relationship').then(convert(queryClient)),
            },
            {
              path: paths.file.plot.path,
              lazy: () =>
                import('./routes/file/plot').then(convert(queryClient)),
            },
            {
              path: paths.file.plotTemplate.path,
              lazy: () =>
                import('./routes/file/plotTemplate').then(convert(queryClient)),
            },

            {
              path: paths.file.plotActStructure.path,
              lazy: () =>
                import('./routes/file/plotActStructure').then(
                  convert(queryClient),
                ),
            },
            {
              path: paths.file.treatment.path,
              lazy: () =>
                import('./routes/file/treatment').then(convert(queryClient)),
            },
            {
              path: paths.file.storybeats.path,
              lazy: () =>
                import('./routes/file/storyBeats').then(convert(queryClient)),
            },
            {
              path: paths.file.scenecards.path,
              lazy: () =>
                import('./routes/file/scenecards').then(convert(queryClient)),
            },
            {
              path: paths.file.sceneCardsTemplateFreeform.path,
              lazy: () =>
                import('./routes/file/sceneCardsFreeform').then(convert(queryClient)),
            },
            {
              path: paths.file.sceneCardsTemplate.path,
              lazy: () =>
                import('./routes/file/sceneCardTemplates').then(
                  convert(queryClient),
                ),
            },
            {
              path: paths.file.sceneCardEssentials.path,
              lazy: () =>
                import('./routes/file/sceneCardEssentials').then(
                  convert(queryClient),
                ),
            },
            {
              path: paths.file.scene.path,
              lazy: () =>
                import('./routes/file/scene').then(
                  convert(queryClient),
                ),
            },
            {
              path: paths.file.stroryarc.path,
              lazy: () =>
                import('./routes/file/storyarc').then(convert(queryClient)),
            },
            {
              path: paths.file.characterArc.path,
              lazy: () =>
                import('./routes/file/character-arc').then(convert(queryClient)),
            },
          ],
        },
        {
          path: paths.file.scriptLining.path,
          lazy: () =>
            import('./routes/file/scriptLining').then(convert(queryClient)),
        },
       
        {
          path: paths.dashboard.root.path,
          element: <Dashboard />,
        },
        {
          path: paths.dashboard.myScreenplays.path,
          lazy: () =>
            import('./routes/my-screenplays/my-screenplays').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.dashboard.sharedWithMe.path,
          lazy: () =>
            import('./routes/shared-with-me/shared-with-me').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.dashboard.folder.path,
          lazy: () =>
            import('./routes/folder/folder').then(convert(queryClient)),
        },
        {
          path: paths.dashboard.archives.path,
          lazy: () =>
            import('./routes/archives/archives').then(convert(queryClient)),
        },
        {
          path: paths.dashboard.trash.path,
          lazy: () => import('./routes/trash/trash').then(convert(queryClient)),
        },
      ],
    },
    {
      path: paths.file.scriptBreakdown.path,
      lazy: () =>
        import('./routes/file/script-breakdown').then(convert(queryClient)),
    },
    
    {
      path: '*',
      lazy: () => import('./routes/not-found').then(convert(queryClient)),
    },

  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
