'use client';

import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Navbar as HeroUINavbar, Link, link as linkStyles, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

import { Icon } from '@/components/Icon';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';
import { useUser } from '@/hooks/useUser';
import { signOut } from '@/lib/auth-client';

export const Navbar = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const t = useTranslations();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      router.push('/');
    }
  };
  // const searchInput = (...);

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#4F46E5" />
              <circle cx="12" cy="12" r="7" fill="#818CF8" />
              <circle cx="12" cy="12" r="4" fill="#C4B5FD" />
              <circle cx="15" cy="9" r="1.5" fill="#FFFFFF" />
              <path d="M7 14L10 11L13 14L17 10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-bold text-inherit">{t('common.appName')}</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map(item => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium',
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <Icon icon="mdi:twitter" className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <Icon icon="ic:baseline-discord" className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <Icon icon="mdi:github" className="text-default-500" />
          </Link> */}
          {/* <LanguageSwitcher /> */}
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
        {/* <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<Icon icon="heroicons:heart-solid" className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem> */}

        {/* 用户认证区域 */}
        <NavbarItem className="flex gap-2">
          {loading
            ? (
                <div className="w-8 h-8 rounded-full bg-default-200 animate-pulse" />
              )
            : user
              ? (
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Avatar
                        className="transition-transform"
                        size="sm"
                        src={user.user_metadata?.avatar_url}
                        name={user.user_metadata?.full_name || user.email}
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label={t('common.login')} variant="flat">

                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">{t('common.login')}</p>
                        <p className="font-semibold">{user.email}</p>
                      </DropdownItem>
                      <DropdownSection showDivider title="Actions">
                        <DropdownItem key="profile1" as={NextLink} href="/profile" startContent={<Icon icon="solar:user-bold-duotone" className="text-lg text-blue-500" />}>
                          {t('common.profile')}
                        </DropdownItem>
                        <DropdownItem key="Generate" as={NextLink} href="/generate" startContent={<Icon icon="solar:magic-stick-3-bold-duotone" className="text-lg text-purple-500" />}>
                          Generate
                        </DropdownItem>
                        <DropdownItem key="gallery" as={NextLink} href="/gallery" startContent={<Icon icon="solar:gallery-bold-duotone" className="text-lg text-green-500" />}>
                          Gallery
                        </DropdownItem>
                      </DropdownSection>
                      {/* <DropdownItem key="settings" as={NextLink} href="/settings">
                        {tCommon('edit')}
                      </DropdownItem> */}
                      <DropdownSection>
                        <DropdownItem key="logout" color="danger" onClick={handleSignOut} startContent={<Icon icon="solar:logout-2-bold-duotone" className="text-lg text-red-500" />}>
                          {t('common.logout')}
                        </DropdownItem>
                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown>
                )
              : (
                  <div className="flex gap-2">
                    <Button
                      as={NextLink}
                      href="/auth/sign-in"
                      variant="ghost"
                      size="sm"
                    >
                      {t('common.login')}
                    </Button>
                    <Button
                      as={NextLink}
                      href="/auth/sign-up"
                      color="primary"
                      size="sm"
                    >
                      {t('common.signup')}
                    </Button>
                  </div>
                )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <Icon icon="mdi:github" className="text-default-500" />
        </Link>
        <ThemeSwitch />

        {/* 移动端用户认证 */}
        {loading
          ? (
              <div className="w-6 h-6 rounded-full bg-default-200 animate-pulse" />
            )
          : user
            ? (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      className="transition-transform"
                      size="sm"
                      src={user.user_metadata?.avatar_url}
                      name={user.user_metadata?.full_name || user.email}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label={t('common.login')} variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">{t('common.login')}</p>
                      <p className="font-semibold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="profile" as={NextLink} href="/profile">
                      {t('common.profile')}
                    </DropdownItem>
                    <DropdownItem key="dashboard" as={NextLink} href="/dashboard">
                      {t('common.dashboard')}
                    </DropdownItem>
                    <DropdownItem key="settings" as={NextLink} href="/settings">
                      {t('common.edit')}
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
                      {t('common.logout')}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )
            : (
                <Button
                  as={NextLink}
                  href="/auth/sign-in"
                  variant="ghost"
                  size="sm"
                >
                  {t('common.login')}
                </Button>
              )}

        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
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
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {/* 移动端菜单中的认证选项 */}
          {!user && (
            <>
              <NavbarMenuItem>
                <Button
                  as={NextLink}
                  href="/auth/sign-in"
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {t('common.login')}
                </Button>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  as={NextLink}
                  href="/auth/sign-up"
                  color="primary"
                  className="w-full justify-start"
                >
                  {t('common.signup')}
                </Button>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

export default Navbar;
