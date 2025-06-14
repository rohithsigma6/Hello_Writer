export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  dashboard: {
    root: {
      path: '/dashboard',
      getHref: () => '/dashboard',
    },
  }

} as const;
