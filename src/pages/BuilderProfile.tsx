import React from "react";
import { useState, useRef } from "react";
import ExampleDoc from "../assets/terms_conditions.pdf";
import { Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import { Chat } from "../components/Chat";
import { useDisclosure } from "@mantine/hooks";

import {
  Box,
  Stack,
  Text,
  Group,
  Badge,
  Button,
  Grid,
  Space,
  Flex,
  Container,
  Title,
  Dialog,
  createStyles,
  Table,
  Paper,
  ThemeIcon,
  Avatar,
} from "@mantine/core";

import {
  IconPhoneCall,
  IconAt,
  IconGavel,
  IconArchive,
  IconPencil,
  IconMessage,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  tableRow: {
    "&:hover": {
      background: "#efefef",
      cursor: "pointer",
    },
  },

  chatButton: {
    position: "fixed",
    right: "2%",
    bottom: "2%",
    padding: "10px",
    height: "auto",
  },
}));

const UserData = {
  title: "Mr",
  name: "John Doe",
  email: "johndoe@hotmail.com",
  phone: "+16474722634",
  avatar:
    "https://images.unsplash.com/photo-1612833609249-5e9c9b9b0b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwY2FyZCUyMGF1dGhvcml0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
};

const auctions = [
  {
    name: "King West Towers",
    builder: "Developers Inc",
    address: "100 Spadina",
    registered: 60,
    bidders: 42,
    status: "Live",
    bid: "570k",
    lots: 10,
  },
  {
    bid: "1m",
    name: "Condo 223",
    address: "35 Bathurst",
    builder: "Developers Inc",
    registered: 100,
    bidders: 90,
    status: "Finished",
    lots: 20,
  },
  {
    bid: "1m",
    name: "Condo 2290",
    address: "35 Bathurst",
    builder: "Developers Inc",
    status: "Upcoming",
    registered: 59,
    lots: 20,
  },
];

const favourites = [
  {
    name: "King West Towers",
    builder: "Developers Inc",
    address: "100 Spadina",
    status: "Live",
    bid: "570k",
    auctionDate: "Sep 10 2023",
  },

  {
    bid: "1m",
    name: "Condo 229",
    address: "35 Queen",
    builder: "Developers Inc",
    status: "Passed",
  },
];

export default function BuilderProfile() {
  const { classes } = useStyles();

  const auctionRows = auctions.map((element) => (
    <tr key={element.name} className={classes.tableRow}>
      <td>{element.name}</td>
      <td>{element.builder}</td>
      <td>{element.address}</td>
      <td>{element.lots}</td>
      <td>{element.registered}</td>
      <td>{element.bidders}</td>

      <td>
        {element.status === "Live" ? (
          <Badge color="green" size="md" variant="filled">
            {element.status}
          </Badge>
        ) : element.status === "Passed" ? (
          <Badge color="red" size="md" variant="filled">
            {element.status}
          </Badge>
        ) : element.status === "Finished" ? (
          <Badge color="orange" size="md" variant="filled">
            {element.status}
          </Badge>
        ) : element.status === "Upcoming" ? (
          <Badge color="yellow" size="md" variant="filled">
            {element.status}
          </Badge>
        ) : (
          element.status
        )}
      </td>
    </tr>
  ));

  const favouritesRows = favourites.map((element) => (
    <tr key={element.name} className={classes.tableRow}>
      <td>{element.name}</td>
      <td>{element.builder}</td>
      <td>{element.address}</td>
      <td>{element.bid}</td>
      <td>
        {element.status === "Live" ? (
          <Badge color="green" size="md" variant="filled">
            {element.status}
          </Badge>
        ) : element.status === "Passed" ? (
          <Badge color="red" size="md" variant="filled">
            {element.status}
          </Badge>
        ) : (
          element.status
        )}
      </td>
    </tr>
  ));

  const [openedChat, { toggle: toggleChat, close: closeChat }] =
    useDisclosure(false);

  return (
    <>
      <Button className={classes.chatButton} onClick={toggleChat} radius="lg">
        <IconMessage
          stroke={1.5}
          size="3rem"
          color="white"
          className={classes.icon}
        />
      </Button>
      <Dialog
        opened={openedChat}
        withCloseButton
        onClose={closeChat}
        size="lg"
        h={500}
        radius="md"
        px={0}
        style={{
          boxShadow:
            "0 0.0925rem 0.3875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1) 0 1.25rem 1.5625rem -0.25rem, rgba(0, 0, 0, 0.1) 0 0.725rem 0.725rem -0.3125rem",
        }}
      >
        <Text size="sm" mb="xs" weight={500} ml={"20px"}>
          {/* Subscribe to email newsletter */}
        </Text>
        <Container h="calc(100% - 2em);" px={0}>
          <Chat />
        </Container>
      </Dialog>

      <Container size="md">
        <Grid>
          <Grid.Col xs={12} md={5}>
            <Paper
              withBorder
              shadow="md"
              p={15}
              radius="md"
              style={{ height: "100%" }}
            >
              <Grid>
                <Grid.Col xs={12} md={8}>
                  <Group noWrap align="left">
                    <Avatar src={UserData.avatar} size={94} radius="md" />
                    <Stack align="flex-start" spacing={1}>
                      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        {UserData.title}
                      </Text>

                      <Text fz="lg" fw={500} className={classes.name}>
                        {UserData.name}
                      </Text>

                      <Group noWrap spacing={10} mt={3}>
                        <IconAt
                          stroke={1.5}
                          size="1rem"
                          className={classes.icon}
                        />
                        <Text fz="xs" c="dimmed">
                          {UserData.email}
                        </Text>
                      </Group>

                      <Group noWrap spacing={10} mt={5}>
                        <IconPhoneCall
                          stroke={1.5}
                          size="1rem"
                          className={classes.icon}
                        />
                        <Text fz="xs" c="dimmed">
                          {UserData.phone}
                        </Text>
                      </Group>
                    </Stack>
                  </Group>
                  <Box mt={10} style={{ textAlign: "left" }}>
                    <a
                      href={ExampleDoc}
                      download="MyExampleDoc"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <Text color="blue">Terms and Conditions</Text>
                    </a>
                  </Box>
                </Grid.Col>
                <Grid.Col xs={12} md={4}>
                  <Flex justify="flex-end" align="flex-end" direction="column">
                    <Button size="4em">
                      {" "}
                      <IconPencil size="1.7rem" stroke={1} />{" "}
                    </Button>
                  </Flex>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} md={3}>
            <Paper
              withBorder
              shadow="md"
              p={15}
              pt={15}
              radius="md"
              style={{ height: "100%" }}
            >
              <Title order={4} align="left">
                My Company
              </Title>
              <Stack align="flex-start" spacing={1}>
                <Text fz="md" fw={500} className={classes.name}>
                  Constuciton Inc.
                </Text>

                <Group noWrap spacing={10} mt={3}>
                  <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                  <Text fz="xs" c="dimmed">
                    {UserData.email}
                  </Text>
                </Group>

                <Group noWrap spacing={10} mt={5}>
                  <IconPhoneCall
                    stroke={1.5}
                    size="1rem"
                    className={classes.icon}
                  />
                  <Text fz="xs" c="dimmed">
                    {UserData.phone}
                  </Text>
                </Group>
              </Stack>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} md={4}>
            <Paper
              withBorder
              shadow="md"
              p={15}
              pt={15}
              radius="md"
              style={{ height: "100%" }}
            >
              <Grid>
                <Grid.Col xs={12} md={8}>
                  <Title order={4} align="left">
                    Payment
                  </Title>
                  <Group noWrap align="left">
                    <Stack spacing={5} mt={5}>
                      {/* <Group noWrap spacing={10}> */}
                      <Text
                        fz="xs"
                        tt="uppercase"
                        fw={700}
                        c="dimmed"
                        align="left"
                      >
                        Subscribtion
                      </Text>
                      <Text fz="xs" fw={500} align="left">
                        1 Year
                      </Text>
                      {/* </Group>
                    <Group noWrap spacing={10}> */}
                      <Text
                        fz="xs"
                        tt="uppercase"
                        fw={700}
                        c="dimmed"
                        align="left"
                      >
                        Expires on
                      </Text>
                      <Text fz="xs" fw={500} align="left">
                        03 December 2023
                      </Text>
                      {/* </Group> */}
                    </Stack>
                  </Group>
                </Grid.Col>
                <Grid.Col xs={12} md={4}>
                  <Flex justify="flex-end" align="flex-end" direction="row">
                    <Button size="xs">Details</Button>
                  </Flex>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
        </Grid>

        <Space h={20} />

        <Container ta="left" px="10">
          <Link to="/create_auction">
            <Button color="green" mx="0">
              Create Auction +
            </Button>
          </Link>
        </Container>

        <Space h={10} />
        <Paper
          withBorder
          shadow="md"
          p={20}
          pt={15}
          mt={0}
          radius="md"
          style={{ height: "100%" }}
        >
          <Group noWrap align="left">
            <ThemeIcon>
              <IconGavel stroke={1.5} />
            </ThemeIcon>

            <Title order={4} align="left">
              Current Auctions
            </Title>
          </Group>
          <Table style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th>Building</th>
                <th>Builder</th>
                <th>Address</th>
                <th>Lots</th>
                <th>Registered</th>
                <th>Bidders</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{auctionRows}</tbody>
          </Table>
        </Paper>

        <Space h={15} />

        <Paper
          withBorder
          shadow="md"
          p={20}
          pt={15}
          radius="md"
          style={{ height: "100%" }}
        >
          <Group noWrap align="left">
            <ThemeIcon>
              <IconArchive stroke={1.5} />
            </ThemeIcon>
            <Title order={4} align="left">
              Archive Auctions
            </Title>
          </Group>
          <Table style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th>Building</th>
                <th>Builder</th>
                <th>Address</th>
                <th>Current bid</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{favouritesRows}</tbody>
          </Table>
        </Paper>
      </Container>
    </>
  );
}
