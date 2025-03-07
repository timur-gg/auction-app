import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  Container,
  Grid,
  Group,
  Paper,
  Space,
  TextInput,
  Title,
  ThemeIcon,
  Button,
  Center,
  Text,
  Stack, MantineTheme
} from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { Route, useLocation } from "react-router-dom";
import { createStyles, RangeSlider, rem } from "@mantine/core";
import {
  IconSearch,
  IconCoins,
  IconBook2,
  IconPlus,
  IconGavel,
  IconLicense,
} from "@tabler/icons-react";
import { auctionData } from "../data";
import AuctionCard from "../components/inventory/AuctionCard";
import { GetInTouchSimple } from "../components/inventory/GetInTouchSimple";
import ComicPic from "../components/Landing/ComicPic";
import img1 from "../assets/1B/1B.png";
import img2 from "../assets/1B/1B.png";
import img3 from "../assets/1B/1B.png";
import img4 from "../assets/1B/1B.png";
import { landingStyle } from '../styles/theme.ts';

const sampleIds = ["1", "2", "3", "4"];

interface auctionType {
  [key: string]: any;
}

const auctionSamples: auctionType[] = auctionData.filter((a) =>
  sampleIds.includes(a.id)
);

const Row1 = [
  img1,
  img2,
  img3,
  img4,
];

const useStyles = createStyles((theme: MantineTheme ) =>
  landingStyle(theme)
);

// "url(https://images.unsplash.com/photo-1559869824-929df9dab35e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2639&q=80)",

const bgImg =
  "url(https://images.unsplash.com/photo-1603466182843-75f713ba06b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80)";

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export default function Landing() {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change

  return (
    <>
      <Paper
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: bgImg,
        }}
        withBorder
        shadow="sm"
        w="100%"
        h={400}
        p={15}
        radius="xs"
      >
        <Center>
          <Group mt="150px">
            <TextInput
              miw="400px"
              size="xl"
              placeholder="Search for your new condo"
            />
            <Button
              // style={{ backgroundColor: "#1A237E" }}
              size="xl"
              onClick={() => navigate("/inventory")}
            >
              <IconSearch stroke="0.2rem" />
            </Button>
          </Group>
        </Center>
      </Paper>
      <Space h={17} />
      <Paper
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundImage: bgImg,
          // background: "rgb(148,204,221)",
        }}
        withBorder
        shadow="sm"
        // w="100%"
        h="auto"
        // p={25}
        // pt={30}
        radius="xs"
        bg="#B4DDE9"
      >
        <ComicPic ind={0} />
        {/* <Center>
          <ComicPic ind={0} />
        </Center> */}
      </Paper>
      <Space h={10} />

      <Paper withBorder shadow="md" w="100%" p={15} radius="xs">
        <Space h={10} />
        <Title ta="left" order={2} color="#212121">
          Upcoming Auctions
        </Title>
        <Space h={30} />
        <Grid>
          {auctionSamples.map((auction) => (
            <Grid.Col xs={4} sm={3}>
              <AuctionCard
                status={auction.status}
                id={auction.id}
                image={auction.images[0]}
                size={auction.minSize}
                price={auction.minPrice}
                name={auction.name}
                address={auction.address}
                bedroom={auction.bedroom}
                builder={auction.builder}
                completionDate={auction.completionDate}
                auctionDate={auction.auctionDate}
                deposit={auction.deposit}
                bathroom={auction.bathroom}
                parking={auction.parking}
                locker={auction.locker}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Paper>
      <Space h={10} />
      <Paper withBorder shadow="md" w="100%" p={15} py={25} radius="sm">
        <Title ta="left" order={2} color="#212121">
          Why Choose TorontoPreCon?
        </Title>
        <Space h={40} />

        <Grid justify="space-around">
          <Grid.Col xs={5.5}>
            <Paper bg="#ECEFF1" p="15px">
              <Text size="xl" weight={700} ta="left">
                For Builders
              </Text>
              <Space h={25} />

              <Stack>
                <Grid>
                  <Grid.Col xs={2}>
                    <ThemeIcon size={40} radius="md" className={classes.icon}>
                      <IconCoins size="1.5rem" />
                    </ThemeIcon>
                  </Grid.Col>
                  <Grid.Col xs={10}>
                    <Text fz="16px" ta="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col xs={2}>
                    <ThemeIcon size={40} radius="md" className={classes.icon}>
                      <IconGavel size="1.5rem" />
                    </ThemeIcon>
                  </Grid.Col>
                  <Grid.Col xs={10}>
                    <Text fz="16px" ta="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col xs={2}>
                    <ThemeIcon size={40} radius="md" className={classes.icon}>
                      <IconBook2 size="1.5rem" />
                    </ThemeIcon>
                  </Grid.Col>
                  <Grid.Col xs={10}>
                    <Text fz="16px" ta="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </Text>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={5.5}>
            <Paper bg="#ECEFF1" p="15px">
              <Text size="xl" weight={700} ta="left">
                For Builders
              </Text>
              <Space h={25} />

              <Stack>
                <Grid>
                  <Grid.Col xs={2}>
                    <ThemeIcon size={40} radius="md" className={classes.icon}>
                      <IconLicense size="1.5rem" />
                    </ThemeIcon>
                  </Grid.Col>
                  <Grid.Col xs={10}>
                    <Text fz="16px" ta="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col xs={2}>
                    <ThemeIcon size={40} radius="md" className={classes.icon}>
                      <IconCoins size="1.5rem" />
                    </ThemeIcon>
                  </Grid.Col>
                  <Grid.Col xs={10}>
                    <Text fz="16px" ta="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col xs={2}>
                    <ThemeIcon size={40} radius="md" className={classes.icon}>
                      <IconCoins size="1.5rem" />
                    </ThemeIcon>
                  </Grid.Col>
                  <Grid.Col xs={10}>
                    <Text fz="16px" ta="left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </Text>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
      <Space h={10} />
      <Paper
        id="faq"
        withBorder
        shadow="md"
        w="100%"
        p={15}
        pt={25}
        pb={35}
        radius="sm"
        className={classes.faq}
      >
        <Title ta="left" order={2} color="#FAFAFA">
          About Our System
        </Title>
        <Space h={40} />
        <Accordion
          chevronPosition="right"
          defaultValue="reset-password"
          chevronSize={50}
          variant="separated"
          disableChevronRotation
          chevron={
            <ThemeIcon radius="xl" className={classes.gradient} size={32}>
              <IconPlus size="1.05rem" stroke={1.5} />
            </ThemeIcon>
          }
        >
          <Accordion.Item className={classes.item} value="reset-password">
            <Accordion.Control>
              <Text fw={700} fz={18}>
                How do auctions work?
              </Text>
            </Accordion.Control>
            <Accordion.Panel>{placeholder}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="another-account">
            <Accordion.Control>
              <Text fw={700} fz={18}>
                How do I sign up for auction?
              </Text>
            </Accordion.Control>
            <Accordion.Panel>{placeholder}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="newsletter">
            <Accordion.Control>
              <Text fw={700} fz={18}>
                How does your subscription work?
              </Text>
            </Accordion.Control>
            <Accordion.Panel>{placeholder}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="credit-card">
            <Accordion.Control>
              <Text fw={700} fz={18}>
                How do I sign the purchase agreement?{" "}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>{placeholder}</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>
      <Space h={10} />
      <Paper
        id="contact"
        withBorder
        shadow="md"
        w="100%"
        p={15}
        pt={25}
        pb={35}
        radius="sm"
      >
        <Title fw={800} ta="left" order={2} color="#212121">
          Contact Us
        </Title>
        <Space h={40} />
        <Container>
          <GetInTouchSimple />
        </Container>
      </Paper>
    </>
  );
}
