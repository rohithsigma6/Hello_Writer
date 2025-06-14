import PlotActStructure from '@/features/file/plot/components/PlotActStructure';
import ScriptBreakdown from '@/features/script-breakdown/components';

export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''
        }`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''
        }`,
    },
    mfa: {
      path: '/auth/mfa',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/mfa${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''
        }`,
    },
    mfaotp: {
      path: '/auth/mfaotp',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/mfaotp${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''
        }`,
    },
    resetPassword: {
      path: '/auth/reset-password',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/reset-password${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''
        }`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '',
      getHref: () => '/app',
    },
    discussions: {
      path: 'discussions',
      getHref: () => '/app/discussions',
    },
    discussion: {
      path: 'discussions/:discussionId',
      getHref: (id: string) => `/app/discussions/${id}`,
    },
    users: {
      path: 'users',
      getHref: () => '/app/users',
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
  },

  dashboard: {
    root: {
      path: '/dashboard',
      getHref: () => '/dashboard',
    },
    myScreenplays: {
      path: '/my-screenplays',
      getHref: () => '/my-screenplays',
    },
    sharedWithMe: {
      path: '/shared-with-me',
      getHref: () => '/shared-with-me',
    },
    folder: {
      path: '/folder/:folderId',
      getHref: () => '/folder/:folderId',
    },
    archives: {
      path: '/archives',
      getHref: () => '/archives',
    },
    trash: {
      path: '/trash',
      getHref: () => '/trash',
    },
  },

  folder: {
    root: {
      path: '/folder/:folderId',
      getHref: (folderId: string) => `/folder/${folderId}`,
    },
  },

  file: {
    root: {
      path: '/file',
      getHref: () => '/file',
    },

    logline: {
      path: ':fileId/logline',
      getHref: (fileId: string) => `/file/${fileId}/logline`,
    },
    scriptLining: {
      path: ':fileId/script-lining',
      getHref: (fileId: string) => `/${fileId}/script-lining`,
    },
    theme: {
      path: ':fileId/theme',
      getHref: (fileId: string) => `/file/${fileId}/theme`,
    },
    storyworld: {
      path: ':fileId/storyworld',
      getHref: (fileId: string) => `/file/${fileId}/storyworld`,
    },
    location: {
      path: ':fileId/storyworld/:locationId',
      getHref: (fileId: string,locationId:string) => `/file/${fileId}/storyworld/${locationId}`,
    },
    characters: {
      path: ':fileId/characters',
      getHref: (fileId: string) => `/file/${fileId}/characters`,
    },
    relationship: {
      path: ':fileId/characters/relationship',
      getHref: (fileId: string, charId: string) => `/file/${fileId}/characters/relationship`,
    },
    editCharacter: {
      path: ':fileId/characters/:charId',
      getHref: (fileId: string, charId: string) =>
        `/file/${fileId}/characters/${charId}`,
    },
    scriptBreakdown:{
      path: ':fileId/script-breakdown',
      getHref: (fileId: string) => `/${fileId}/script-breakdown`,

    },
    plot: {
      path: ':fileId/plot',
      getHref: (fileId: string) => `/file/${fileId}/plot`,
    },
    plotTemplate: {
      path: ':fileId/plot/template',
      getHref: (fileId: string) => `/file/${fileId}/plot/template`,
    },
    plotActStructure: {
      path: `:fileId/plot/template/:selectedTemplate`,
      getHref: (fileId: string, selectedTemplate: string) =>
        `/file/${fileId}/plot/template/${selectedTemplate}`,
    },
    scenecards: {
      path: ':fileId/scenecards',
      getHref: (fileId: string) => `/file/${fileId}/scenecards`,
    },
    sceneCardsTemplate: {
      path: ':fileId/scenecards/template',
      getHref: (fileId: string) => `/file/${fileId}/scenecards/template`,
    },
    sceneCardEssentials: {
      path: ':fileId/scenecards/template/scene-essentials',
      getHref: (fileId: string) =>
        `/file/${fileId}/scenecards/template/scene-essentials`,
    },
    scene: {
      path: ':fileId/scenecards/template/scenes/:sceneId',  
      getHref: (fileId: string, scene: any, characterId?: string) =>
        characterId
          ? `/file/${fileId}/scenecards/template/scenes/${scene?._id}?characterId=${characterId}`
          : `/file/${fileId}/scenecards/template/scenes/${scene?._id}`,
    }
    ,
    sceneCardsTemplateFreeform: {
      path: ':fileId/scenecards/template/freeform',
      getHref: (fileId: string) => `/file/${fileId}/scenecards/template/freeform`,
    },
    treatment: {
      path: ':fileId/treatment',
      getHref: (fileId: string) => `/file/${fileId}/treatment`,
    },
    storybeats: {
      path: ':fileId/treatment/storybeats',
      getHref: (fileId: string) => `/file/${fileId}/treatment/storybeats`,
    },
    stroryarc: {
      path: ':fileId/storyarc',
      getHref: (fileId: string) => `/file/${fileId}/storyarc`,
    },
    screenplay: {
      path: ':fileId/screenplay',
      getHref: (fileId: string) => `/file/${fileId}/screenplay`,
    },
    characterArc: {
      path: ':fileId/character-arc',
      getHref: (fileId: string) => `/file/${fileId}/character-arc`,
    },
  },
} as const;
