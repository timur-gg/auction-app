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
  Tabs,
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
          <Tabs defaultValue="ceil" mt="-10px">
            <Tabs.List>
              <Tabs.Tab fz="sm" px="sm" fw={400} value="ceil">
                Ceilings / Floors / Paint
              </Tabs.Tab>
              <Tabs.Tab fz="sm" px="sm" fw={400} value="doors">
                Doors / Hardware / Carpentry
              </Tabs.Tab>
              <Tabs.Tab fw={400} px="sm" value="kitchen" fz="sm">
                Kitchen
              </Tabs.Tab>
              <Tabs.Tab fw={400} px="sm" value="appliances" fz="sm">
                Appliances
              </Tabs.Tab>
              <Tabs.Tab fw={400} px="sm" value="bathroom" fz="sm">
                Bathrooms
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="ceil" pt="15px" ta="left">
              • Approximately 9 ft. ceiling heights in principal rooms, defined
              as the Living Room and Dining Room.
              <Space h={10} />
              • Approximately 9 ft. ceiling heights at upper level of two-storey
              walkouts. Where bulkheads or dropped ceilings are required. The
              height of the ceiling will be less than 9 ft. All measurements are
              calculated from the finished concrete slab floor to the underside
              of the concrete slab or finished ceiling above.
              <Space h={10} />
              • Approximately 10 ft. ceiling heights in principal rooms, defined
              as the Living Room and Dining Room for suites on Levels 2 and 3.
              Where bulkheads or dropped ceilings are required, the height of
              the ceiling will be less than 10 ft. All measurements are
              calculated from the finished concrete slab floor to the underside
              of the concrete slab or finished ceiling above.
              <Space h={10} />
              • Smooth ceilings throughout.
              <Space h={10} />
              • Porcelain tile floor and baseboard in Bathroom(s).
              <Space h={10} />
              • Ceramic tile floor and baseboard in Laundry Closet.
              <Space h={10} />
              • Laminate flooring in all other areas.
              <Space h={10} />
              • Semi-gloss, off-white latex paint in Bathroom(s), Laundry
              Closet, and on all trim.
              <Space h={10} />• Flat, off-white latex paint on all other walls
              and ceilings.
            </Tabs.Panel>
            <Tabs.Panel value="doors" pt="15px" ta="left">
              • Entry door to be solid core, with door viewer.
              <Space h={10} />
              • Interior swing doors to be hollow-core, flat panel.
              <Space h={10} />
              • Closet sliding door(s) to be framed and mirrored (as per
              Schedule A, if applicable).
              <Space h={10} />
              • Internal Bedroom to have clear glass partition and/or clear
              glass sliding door (as per Schedule A, if applicable).
              <Space h={10} />
              • Dark bronze lever hardware on entry door and brushed chrome
              lever hardware interior swing doors.
              <Space h={10} />
              • Privacy lock on all Bathroom doors.
              <Space h={10} />
              • 4” baseboards in all areas where laminate or vinyl flooring is
              located.
              <Space h={10} />
              • 2” casings throughout.
              <Space h={10} />• Stairs in two-storey walkouts with stained
              treads to coordinate with laminate floors, with white painted
              risers. Black metal pickets with stained handrail to coordinate
              with laminate floors (as per Schedule A, if applicable).
            </Tabs.Panel>
            <Tabs.Panel value="kitchen" pt="15px" ta="left">
              • Custom-designed cabinetry with soft-close hardware.
              <Space h={10} />
              • Quartz countertop.
              <Space h={10} />
              • Islands with dining accommodations (as per Schedule A, if
              applicable).
              <Space h={10} />
              • Single bowl, stainless steel, undermount sink.
              <Space h={10} />
              • Single lever, chrome faucet.
              <Space h={10} />• Ceramic tile backsplash.
            </Tabs.Panel>
            <Tabs.Panel value="appliances" pt="15px" ta="left">
              • Studio, one-bedroom, one-bedroom + den, two- bedroom, and
              two-bedroom + den units to receive:
              <Space h={10} />
              • 24” stainless steel refrigerator.
              <Space h={10} />
              • 24” cooktop and wall oven with over-the-range microwave.
              <Space h={10} />
              • 24” panelized dishwasher.
              <Space h={10} />
              • 24” stacked, front-load washer and ventless heat pump dryer.
              <Space h={10} />
              • Three-bedroom and two-storey walkouts to receive:
              <Space h={10} />
              • 30” stainless steel refrigerator.
              <Space h={10} />
              • 30” cooktop and wall oven with over-the-range microwave.
              <Space h={10} />
              • 24” panelized dishwasher.
              <Space h={10} />• 27” stacked, front-load washer and ventless heat
              pump dryer.
            </Tabs.Panel>
            <Tabs.Panel value="bathroom" pt="15px" ta="left">
              • Custom-designed vanity cabinetry with soft-close hardware.
              <Space h={10} />
              • Surface-mounted, frameless mirror.
              <Space h={10} />
              • Off-white quartz countertop with single edge profile.
              <Space h={10} />
              • Single bowl, white porcelain, undermount sink.
              <Space h={10} />
              • Single lever, chrome faucet.
              <Space h={10} />
              • Low consumption toilet.
              <Space h={10} />
              • Chrome accessories (towel bar or ring, toilet paper holder, robe
              hook).
              <Space h={10} />
              • Shower to have:
              <Space h={10} />
              • Full-height tile surround.
              <Space h={10} />
              • Fixed-mount chrome shower head, single lever control handle, and
              spout.
              <Space h={10} />
              • Frameless glass shower enclosure with pre-formed base.
              <Space h={10} />
              • Acrylic deep soaker tub to have:
              <Space h={10} />
              • Full-height tile surround.
              <Space h={10} />
              • Fixed-mount chrome shower head, single lever control handle, and
              spout.
              <Space h={10} />• Shower rod
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Card.Section>
  );
}

export default AuctionDetails;
