import { useState } from "react";
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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";
import { Link } from "react-router-dom";
import React from "react";
import { IconGavel } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link
      key={link.label}
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
        <Center inline>
          <ThemeIcon>
            {" "}
            <IconGavel size={28} />{" "}
          </ThemeIcon>
          <Space w={5} />
          <Text fw={700}>Toronto PreCon Auctions</Text>
        </Center>
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
