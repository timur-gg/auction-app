import React from "react";
import AuctionProfileCard from "../components/AuctionProfileCard";
import ShowCounter from "../components/ShowCounter";

import { useState, useRef } from "react";

import {
  Card,
  Box,
  Stack,
  Text,
  Group,
  Badge,
  Button,
  Grid,
  Space,
  Flex,
  rem,
  Container,
  Title,
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
  IconStar,
  IconPencil,
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
    position: 2,
    status: "Live",
    bid: "570k",
  },
  {
    bid: "1m",
    name: "Condo 223",
    address: "35 Bathurst",
    builder: "Developers Inc",
    position: 10,
    status: "Passed",
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
    name: "Condo 223",
    address: "35 Bathurst",
    builder: "Developers Inc",
    status: "Sep 10 2023",
  },
  {
    bid: "1m",
    name: "Condo 229",
    address: "35 Queen",
    builder: "Developers Inc",
    status: "Passed",
  },
];

export default function ClientProfile() {
  const { classes } = useStyles();

  const auctionRows = auctions.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.builder}</td>
      <td>{element.address}</td>
      <td>{element.bid}</td>
      <td>{element.position}</td>

      <td>
        {element.status === "Live" ? (
          <Badge color="green" size="md" variant="filled">
            {element.status}
          </Badge>
        ) : (
            element.status === "Passed" ? (
                <Badge color="red" size="md" variant="filled">
                  {element.status}
                </Badge>
              ) : (
                element.status
              )
        )}
      </td>
    </tr>
  ));

  const favouritesRows = favourites.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.builder}</td>
      <td>{element.address}</td>
      <td>{element.bid}</td>
      <td>
        {element.status === "Live" ? (
          <Badge color="green" size="md" variant="filled">
            {element.status}
          </Badge>
        ) : (
            element.status === "Passed" ? (
                <Badge color="red" size="md" variant="filled">
                  {element.status}
                </Badge>
              ) : (
                element.status
              )
        )}
      </td>
    </tr>
  ));

  return (
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
                <Box mt={10} style={{textAlign: 'left'}}>
                <Text color='blue'>Terms and Conditions</Text>


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
              My Realtor
            </Title>
            <Stack align="flex-start" spacing={1}>
              <Text fz="md" fw={500} className={classes.name}>
                Alex James
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
        <Grid.Col xs={12} md={12}>
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
                {" "}
                <IconGavel stroke={1.5} />{" "}
              </ThemeIcon>

              <Title order={4} align="left">
                My Auctions
              </Title>
            </Group>
            <Table style={{ textAlign: "left" }}>
              <thead>
                <tr>
                  <th>Building</th>
                  <th>Builder</th>
                  <th>Address</th>
                  <th>My bid</th>
                  <th>My Position</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{auctionRows}</tbody>
            </Table>
          </Paper>
        </Grid.Col>

        <Grid.Col xs={12} md={12}>
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
              <ThemeIcon color="gold">
                {" "}
                <IconStar stroke={1.5} />{" "}
              </ThemeIcon>
              <Title order={4} align="left">
                Favourites
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
        </Grid.Col>
      </Grid>
    </Container>
  );
}
