import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Title,
  UnstyledButton,
  Menu,
  Avatar,
  Text,
  rem
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDashboard,
  IconPill,
  IconUsers,
  IconUser,
  IconLogout,
  IconChevronDown
} from '@tabler/icons-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { label: 'Dashboard', icon: IconDashboard, path: '/' },
  { label: 'Prescriptions', icon: IconPill, path: '/prescriptions' },
  { label: 'Patients', icon: IconUsers, path: '/patients' }
];

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={3}>ZenMed</Title>
          </Group>

          <Menu
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton>
                <Group gap={7}>
                  <Avatar
                    src={null}
                    alt={user?.name}
                    radius="xl"
                    size={30}
                  >
                    {user?.name[0]}
                  </Avatar>
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user?.name}
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => navigate('/profile')}
              >
                Profile
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                onClick={logout}
                color="red"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            label={item.label}
            leftSection={<item.icon style={{ width: rem(16), height: rem(16) }} />}
            onClick={() => handleNavigation(item.path)}
            active={location.pathname === item.path}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}