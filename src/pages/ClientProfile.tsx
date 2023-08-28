import React from "react";
import { useState, useRef } from "react";
import ExampleDoc from "../assets/terms_conditions.pdf";

import { auctionData, lots } from "../data.js";

import {
  Box,
  Stack,
  Text,
  Group,
  Button,
  Grid,
  Flex,
  Container,
  Title,
  createStyles,
  Table,
  Paper,
  ThemeIcon,
  Avatar,
  ActionIcon,
  Tabs,
  Space,
} from "@mantine/core";

import {
  IconPhoneCall,
  IconAt,
  IconGavel,
  IconStar,
  IconPencil,
} from "@tabler/icons-react";
import FavoritesTable from "../components/ClientProfile/FavoritesTable";
import AuctionsTable from "../components/ClientProfile/AuctionsTable";
import ProjectsTable from "../components/ClientProfile/ProjectsTable";

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

const auctionIds = ["1", "2", "3"];
let auctions = auctionData.filter((a) => auctionIds.includes(a.id));

let favorites = [
  {
    id: 1,
    name: "King West Towers",
    builder: "Developers Inc",
    address: "100 Spadina",
    status: "Live",
    bid: "570k",
    auctionDate: "Sep 10 2023",
    bedroom: 1,
    bathroom: 1,
    size: "550sqft",
    auction: 3,
    unit: 2290,
  },
  {
    id: 2,
    name: "King West Towers",
    builder: "Developers Inc",
    address: "100 Spadina",
    status: "Live",
    bid: "570k",
    auctionDate: "Sep 10 2023",
    bedroom: 1,
    bathroom: 1,
    size: "570sqft",
    auction: 3,
    unit: 2294,
  },
  {
    id: 3,
    bid: "660k",
    name: "Condo 223",
    address: "35 Bathurst",
    builder: "Developers Inc",
    status: "Sep 10 2023",
    bedroom: "1+1",
    size: "600sqft",
    unit: 2234,
    bathroom: 1,
    auction: 2,
  },
  {
    id: 4,
    bid: "660k",
    name: "Condo 223",
    address: "35 Bathurst",
    builder: "Developers Inc",
    status: "Sep 10 2023",
    bedroom: "1+1",
    size: "600sqft",
    unit: 2236,
    bathroom: 1,
    auction: 2,
  },
  // {
  //   id: 5,
  //   bid: "1m",
  //   name: "Condo 229",
  //   address: "35 Queen",
  //   builder: "Developers Inc",
  //   status: "Passed",
  //   bedroom: "1+1",
  //   bathroom: 2,
  //   size: "620sqft",
  //   auction: 7,
  //   unit: 6675,
  // },
];

export default function ClientProfile() {
  const { classes } = useStyles();

  const [removedFaveRows, setRemovedFaveRows] = useState<Number[]>([]);
  const [removedFaveProjectRows, setRemovedFaveProjectRows] = useState<
    Number[]
  >([]);

  const [removedAuctionRows, setRemovedAuctionRows] = useState<String[]>([]);

  const deleteFave = (lot: any) => {
    setRemovedFaveRows([...removedFaveRows, lot.id]);
    console.info("deleteFave", lot);
  };

  const deleteFaveProject = (lot: any) => {
    setRemovedFaveProjectRows([...removedFaveProjectRows, lot.id]);
    console.info("deleteFave", lot);
  };

  const quitAuction = (lot: any) => {
    setRemovedAuctionRows([...removedAuctionRows, lot.id]);
    console.info("deleteFave", lot);
  };

  favorites = favorites.filter((fave) => !removedFaveRows.includes(fave.id));
  auctions = auctions.filter((a: any) => !removedAuctionRows.includes(a.id));
  let projects = auctions.filter(
    (a: any) => !removedFaveProjectRows.includes(a.id)
  );

  console.log(favorites);

  const statusOrder = ["Live Auction", "upcoming", "passed"];

  auctions = auctions.sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

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
              My Authorized Person
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

        <Grid.Col xs={12} md={12} pt="0px">
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
                <IconGavel stroke={1.5} />{" "}
              </ThemeIcon>

              <Title order={4} align="left">
                My Auctions
              </Title>
            </Group>
            <AuctionsTable auctions={auctions} removeAuction={quitAuction} />
          </Paper>
        </Grid.Col>

        <Grid.Col xs={12} md={12} pt="0px">
          <Paper
            withBorder
            shadow="md"
            p={20}
            pt={15}
            mt={0}
            radius="md"
            style={{ height: "100%" }}
          >
            <Tabs
              defaultValue="projects"
              color="yellow"
              // variant="outline"
              // pl="20px"
            >
              <Group noWrap align="left">
                <Group>
                  <ThemeIcon color="gold">
                    <IconStar stroke={1.5} />
                  </ThemeIcon>
                  <Title order={4} align="left">
                    Favourites
                  </Title>
                </Group>
                <Tabs.List pt={0} ml="20px">
                  <Tabs.Tab fz="md" px="xl" pt="10px" fw={400} value="projects">
                    Projects
                  </Tabs.Tab>
                  <Tabs.Tab fz="md" px="xl" pt="10px" fw={400} value="lots">
                    Saved Lots
                  </Tabs.Tab>
                </Tabs.List>
              </Group>

              <Space h={15} />

              <Tabs.Panel value="projects">
                <ProjectsTable
                  auctions={projects}
                  deleteFave={deleteFaveProject}
                />
              </Tabs.Panel>
              <Tabs.Panel value="lots">
                <FavoritesTable favorites={favorites} deleteFave={deleteFave} />
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
