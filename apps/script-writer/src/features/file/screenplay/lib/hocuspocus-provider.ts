import { useMemo } from 'react';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { enqueueSnackbar } from 'notistack';

import { env } from '@/config/env';


interface ProviderOptions {
  fileId: string;
  token: string;
  versionName: string;
  versionColor: string;
  editStatus: string;
  versionIndex: number | null;
  document: any;
}
export function hocuspocusProvider({
  fileId,
  token,
  versionName,
  versionColor,
  editStatus,
  versionIndex,
  document,
}: ProviderOptions) {
  if (!fileId || !token) return null;

  const provider = new HocuspocusProvider({
    url: env.COLLAB_URL!,
    name: `${fileId}-${versionName}-${versionColor}-${editStatus}-${isNaN(versionIndex!) ? 'final' : versionIndex}`,
    token: token,
    parameters: {
      versionName: versionName || 'V1',
      versionColor: versionColor || 'White',
      editStatus: editStatus || 'PERSONAL DRAFT',
      versionIndex,
    },
    preserveConnection: false,
    document,
    onSynced: ({ state }) => {},
    onConnect: () => {
      enqueueSnackbar('Connected to editor', { variant: 'success' });
    },
    onAwarenessUpdate: ({ states }) => {
      // updateActiveUsers(states);
    },
  });

  return provider;
}
