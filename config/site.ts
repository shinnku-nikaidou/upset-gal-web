export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Next.js + HeroUI',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: '文档',
      href: '/docs',
    },
    // {
    //   label: '博客',
    //   href: '/blog',
    // },
    {
      label: '关于',
      href: '/about',
    },
    {
      label: '目录',
      href: '/files',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/shinnku-nikaidou/upset-gal-web/tree/develop',
    docs: 'https://docs.shinnku.com',
    files: '/files',
  },
}
