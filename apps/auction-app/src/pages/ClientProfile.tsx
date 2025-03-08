import React from 'react';
import { useState } from 'react';
import ExampleDoc from '../assets/terms_conditions.pdf';
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
  Paper,
  ThemeIcon,
  Avatar,
  Tabs,
  Space,
  MantineTheme,
} from '@mantine/core';
import {
  IconPhoneCall,
  IconAt,
  IconGavel,
  IconStar,
  IconPencil,
} from '@tabler/icons-react';
import FavoritesTable from '../components/ClientProfile/FavoritesTable.js';
import AuctionsTable from '../components/ClientProfile/AuctionsTable.js';
import ProjectsTable from '../components/ClientProfile/ProjectsTable.js';
import { clientProfileStyle } from '../styles/theme.ts';
import { auctionData, builderUserData as UserData, clientFavoriteLotData } from '@mocks/auction.tsx';
import { IAuction, ILot } from '../types.ts';

const useStyles = createStyles((theme: MantineTheme) =>
  clientProfileStyle(theme)
);

const auctionIds = ['1', '2', '3'];
const projectIds = ['1', '2', '7'];

let auctions = auctionData.filter((a) =>
  auctionIds.includes(a.id)
);
let projects = auctionData.filter((a) =>
  projectIds.includes(a.id)
);

export default function ClientProfile() {
  const { classes } = useStyles();

  const [removedFaveRows, setRemovedFaveRows] = useState<
    number[]
  >([]);
  const [
    removedFaveProjectRows,
    setRemovedFaveProjectRows,
  ] = useState<number[]>([]);

  const [removedAuctionRows, setRemovedAuctionRows] =
    useState<string[]>([]);

  const deleteFave = (lot: ILot) => {
    setRemovedFaveRows([...removedFaveRows, lot.id]);
    console.info('deleteFave', lot);
  };

  const deleteFaveProject = (lot: IAuction) => {
    setRemovedFaveProjectRows([
      ...removedFaveProjectRows,
      Number(lot.id),
    ]);
    console.info('deleteFave', lot);
  };

  const quitAuction = (lot: IAuction) => {
    setRemovedAuctionRows([...removedAuctionRows, lot.id]);
    console.info('deleteFave', lot);
  };

  const favorites = clientFavoriteLotData.filter(
    (fave) => !removedFaveRows.includes(fave.id)
  );
  auctions = auctions.filter(
    (a: IAuction) => !removedAuctionRows.includes(a.id)
  );
  projects = projects.filter(
    (a: IAuction) => !removedFaveProjectRows.includes(Number(a.id))
  );

  console.log(favorites);

  const statusOrder = [
    'Live Auction',
    'upcoming',
    'passed',
  ];

  auctions = auctions.sort(
    (a, b) =>
      statusOrder.indexOf(a.status) -
      statusOrder.indexOf(b.status)
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
            style={{ height: '100%' }}
          >
            <Grid>
              <Grid.Col xs={12} md={8}>
                <Group noWrap align="left">
                  <Avatar
                    src={UserData.avatar}
                    size={94}
                    radius="md"
                  />
                  <Stack align="flex-start" spacing={1}>
                    <Text
                      fz="xs"
                      tt="uppercase"
                      fw={700}
                      c="dimmed"
                    >
                      {UserData.title}
                    </Text>

                    <Text
                      fz="lg"
                      fw={500}
                      className={classes.name}
                    >
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
                <Box mt={10} style={{ textAlign: 'left' }}>
                  <a
                    href={ExampleDoc}
                    download="MyExampleDoc"
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                    rel="noreferrer"
                  >
                    <Text color="blue">
                      Terms and Conditions
                    </Text>
                  </a>
                </Box>
              </Grid.Col>
              <Grid.Col xs={12} md={4}>
                <Flex
                  justify="flex-end"
                  align="flex-end"
                  direction="column"
                >
                  <Button size="4em">
                    {' '}
                    <IconPencil
                      size="1.7rem"
                      stroke={1}
                    />{' '}
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
            style={{ height: '100%' }}
          >
            <Title order={4} align="left">
              My Authorized Person
            </Title>
            <Stack align="flex-start" spacing={1}>
              <Text
                fz="md"
                fw={500}
                className={classes.name}
              >
                Alex James
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
          </Paper>
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <Paper
            withBorder
            shadow="md"
            p={15}
            pt={15}
            radius="md"
            style={{ height: '100%' }}
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
                <Flex
                  justify="flex-end"
                  align="flex-end"
                  direction="row"
                >
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
            style={{ height: '100%' }}
          >
            <Group noWrap align="left">
              <ThemeIcon>
                <IconGavel stroke={1.5} />{' '}
              </ThemeIcon>

              <Title order={4} align="left">
                My Auctions
              </Title>
            </Group>
            <AuctionsTable
              auctions={auctions}
              removeAuction={quitAuction}
            />
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
            style={{ height: '100%' }}
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
                  <Tabs.Tab
                    fz="md"
                    px="xl"
                    pt="10px"
                    fw={400}
                    value="projects"
                  >
                    Projects
                  </Tabs.Tab>
                  <Tabs.Tab
                    fz="md"
                    px="xl"
                    pt="10px"
                    fw={400}
                    value="lots"
                  >
                    Units
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
                <FavoritesTable
                  favorites={favorites}
                  deleteFave={deleteFave}
                />
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
