import {
  Card,
  Image,
  Stack,
  Text,
  Badge,
  createStyles,
  Group,
  Button,
  Grid,
  Space,
  Flex,
  rem,
  AspectRatio,
  Center,
  Tooltip,
} from "@mantine/core";
import {
  IconBedFilled,
  IconRuler,
  IconCalendarEvent,
  IconAddressBook,
  IconCar,
  IconLock,
  IconTemperature,
  IconBuildingCircus,
  IconPropeller,
} from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import React from "react";
var mapImg = require("../../img/map.png");

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  statusBadge: {
    marginBottom: theme.spacing.md,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const mockdata = [
  {
    label: "completionDate",
    icon: IconCalendarEvent,
    desc: "Construction completion date",
  },
  {
    label: "address",
    icon: IconAddressBook,
    desc: <Image h={200} w={300} src={mapImg} />,
  },
  { label: "bedroom", icon: IconBedFilled, desc: "Number of bedrooms" },
  {
    label: "size",
    icon: IconRuler,
    unit: "sqft",
    desc: "Size of the property",
  },
  { label: "parking", icon: IconCar, desc: "Parking spots" },
  { label: "locker", icon: IconLock, desc: "Storage lockers" },
  { label: "amenities", icon: IconBuildingCircus, desc: "Amenities" },
  { label: "heating", icon: IconTemperature, desc: "Heating" },
  { label: "cooling", icon: IconPropeller, desc: "Cooling" },
];

const badgeColorMap: { [key: string]: any } = {
  "Live Auction": "green",
  upcoming: "#7CB342",
  passed: "orange",
};

export function AuctionDetails(props: any) {
  const { classes } = useStyles();
  const auction = props.auction;

  const features = mockdata.map((feature) => (
    <Grid.Col xs={6} sm={12} py={5} key={feature.label}>
      <Tooltip
        key={feature.label}
        multiline
        p={5}
        h={feature.label === "address" ? 256 : "auto"}
        // h={500}
        withArrow
        style={{ cursor: "pointer" }}
        transitionProps={{ duration: 200 }}
        label={feature.desc}
      >
        <Group spacing="1">
          <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
          <Text size="sm">
            {auction[feature.label] + (feature.unit ? feature.unit : "")}
          </Text>
        </Group>
      </Tooltip>
    </Grid.Col>
  ));

  return (
    <Card.Section p="2rem" px="3rem">
      <Grid>
        <Grid.Col xs={10} sm={3}>
          <Stack spacing={6} align="flex-start">
            <Text fz="sm" c="dimmed" className={classes.label} align="left">
              building details
            </Text>

            <Grid>{features}</Grid>
          </Stack>
        </Grid.Col>
        <Grid.Col xs={10} sm={9}>
          <Text fz="md" ta="left">
            West Queen West, Parkdale, Little Portugal & Liberty Village just
            outside your doorstep! This 1 bedroom & rarely offered 2 washroom
            condo with parking & locker is what 1st time buyers, professionals &
            investors have been waiting for. Bright, South facing wall2wall
            windows w/ walk out to balcony floods the suite with natural light.
            Open concept & versatile layout makes efficient use of every square
            inch. Amenities galore w/ gym, party room, concierge, visitor
            parking, rooftop garden plus steps to all of downtown West
            restaurants, bars, clubs, gyms, immediate TTC access and more! Open
            concept & versatile layout makes efficient use of every square inch.
            Amenities galore w/ gym, party room, concierge, visitor parking,
            rooftop garden plus steps to all of downtown West restaurants, bars,
            clubs, gyms, immediate TTC access and more!Floorplans & Feature
            sheet with inclusions attached. See Virtual tour link for multimedia
            access. Highlights of the area include the Drake Hotel, Gladstone
            Hotel, Bar Poet, & Levetto
          </Text>
        </Grid.Col>
      </Grid>
    </Card.Section>
  );
}

export default AuctionDetails;
