import { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  rem,
  Text,
  ThemeIcon,
  Center,
  Space,
  Menu,
  MantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { IconGavel } from '@tabler/icons-react';
import { headerStyle } from '../styles/theme.ts';

const useStyles = createStyles((theme: MantineTheme) => headerStyle(theme));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));
  const burgerItems = links.map((link) => (
    <Menu.Item key={link.label}>
      <Link
        to={link.link}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={(event) => {
          // event.preventDefault();
          setActive(link.link);
        }}
      >
        {link.label}
      </Link>
    </Menu.Item>
  ));

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Link to="/" style={{ color: 'black' }}>
          <Center inline>
            <ThemeIcon>
              {' '}
              <IconGavel size={28} />{' '}
            </ThemeIcon>
            <Space w={5} />
            <Text fw={700}>Real Xchange</Text>
          </Center>
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Menu shadow="md" width={200} onChange={toggle}>
          <Menu.Target>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
          </Menu.Target>

          <Menu.Dropdown>
            {burgerItems}
            {/* <Menu.Label>Application</Menu.Label> */}
            {/* <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
            <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
            <Menu.Item
              icon={<IconSearch size={14} />}
              rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
            >
              Search
            </Menu.Item>

            <Menu.Divider /> */}
          </Menu.Dropdown>
        </Menu>
      </Container>
    </Header>
  );
}

export default HeaderSimple;
