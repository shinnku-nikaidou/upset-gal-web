import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@heroui/navbar'
import { Link } from '@heroui/link'
import { link as linkStyles } from '@heroui/theme'
import NextLink from 'next/link'

import { cn } from '@/utils/cn'
import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { GithubIcon, Logo } from '@/components/icons'

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth='xl' position='sticky'>
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='max-w-fit gap-3'>
          <NextLink className='flex items-center justify-start gap-1' href='/'>
            <Logo />
            <p className='font-bold text-inherit'>真红小站</p>
          </NextLink>
        </NavbarBrand>
        <ul className='ml-2 hidden justify-start gap-4 lg:flex'>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={cn(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:font-medium data-[active=true]:text-primary',
                )}
                color='foreground'
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className='hidden basis-1/5 sm:flex sm:basis-full'
        justify='end'
      >
        <NavbarItem className='hidden gap-2 sm:flex'>
          <Link isExternal aria-label='Github' href={siteConfig.links.github}>
            <GithubIcon className='text-default-500' />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className='hidden md:flex'>
          <Button
            isExternal
            as={Link}
            className='text-sm font-normal text-default-600 bg-default-100'
            href={'https://github.com/shinnku-nikaidou/upset-gal-web'}
            startContent={<HeartFilledIcon className='text-danger' />}
            variant='flat'
          >
            Sponsor
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent className='basis-1 pl-4 sm:hidden' justify='end'>
        <Link isExternal aria-label='Github' href={siteConfig.links.github}>
          <GithubIcon className='text-default-500' />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href='#'
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  )
}
