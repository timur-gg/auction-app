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
  Container,
  TextInput,
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
];

const badgeColorMap: { [key: string]: any } = {
  "Live Auction": "green",
  upcoming: "#7CB342",
  passed: "orange",
};

type ProfileCardProps = {
  [key: string]: any;
  // lot: number;
  // images: string[];
  // price: number;
  // name: string;
  // address: string;
  // bedroom: number;
  // size: number;
  // status: string;
  // parking: number;
  // builder: string;
  // completionDate: string;
  // locker: number;
  auction: any;
  cardSize: string;
  // auctionDate: Date
};

export function AuctionProfileCard(props: ProfileCardProps) {
  const { classes } = useStyles();
  const auction = props.auction;
  const cardSize = props.cardSize || "full";

  const features = mockdata.map((feature) => (
    <Grid.Col xs={6} md={4} py={5} key={feature.label}>
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

  const Images = auction.images.map((image: any) => (
    <Carousel.Slide key={image.id}>
      <AspectRatio ratio={16 / 10} mx="auto">
        <Image src={image} alt="Image1" width="100%" />
      </AspectRatio>
    </Carousel.Slide>
  ));

  type ConditionalWrapperTypes = {
    condition: boolean;
    wrapper: any;
    children: any;
  };

  const ConditionalWrapper = ({
    condition,
    wrapper,
    children,
  }: ConditionalWrapperTypes) => (condition ? wrapper(children) : children);

  return (
    <div className="AuctionProfileCard">
      <Card
        withBorder
        radius="md"
        className={classes.card}
        maw={1200}
        mx="auto"
      >
        <Card.Section className={classes.section}>
          <Grid>
            <Grid.Col
              {...(cardSize === "full" ? { sm: 12, md: 5 } : { xs: 12 })}
            >
              <Grid>
                <Grid.Col
                  {...(cardSize === "full" ? { xs: 6, md: 12 } : { xs: 7 })}
                >
                  <Flex
                    {...(cardSize === "full"
                      ? { direction: "column" }
                      : { direction: "row", gap: "xl" })}
                  >
                    <Stack align="flex-start" spacing={-2}>
                      <Badge
                        bg={badgeColorMap[auction.status]}
                        size="lg"
                        variant="filled"
                        className={classes.statusBadge}
                      >
                        {auction.status}
                      </Badge>
                      <Text fw={700}>Lot #{auction.lot}</Text>
                      <Text fw={500}>{auction.name}</Text>
                      <Text fz="xs" c="dimmed">
                        {auction.builder}
                      </Text>
                    </Stack>
                    <Space h={10} />
                    <Text
                      {...(cardSize === "mini" ? { maw: 350 } : {})}
                      fz="xs"
                      // c="dimmed"
                      // className={classes.label}
                      align="left"
                      m={"auto"}
                    >
                      Allure Condos is a new condo development located at 250
                      King Street East, Toronto, ON. This project is bringing a
                      modern collection of 509 condo units in a high-rise
                      mixed-use building of 43 storeys. The estimated completion
                      date for occupancy of this property is 2027.
                    </Text>
                  </Flex>
                </Grid.Col>
                <Grid.Col
                  {...(cardSize === "full" ? { xs: 6, md: 12 } : { xs: 5 })}
                >
                  <Group position="apart" mt="md">
                    <Stack spacing={6} mb={-5} align="flex-start">
                      <Text
                        fz="sm"
                        c="dimmed"
                        className={classes.label}
                        align="left"
                      >
                        building details
                      </Text>

                      <Grid>{features}</Grid>
                    </Stack>
                  </Group>
                </Grid.Col>
              </Grid>
            </Grid.Col>

            {cardSize === "full" && (
              <Grid.Col sm={12} md={7}>
                <Carousel
                  slideSize="90%"
                  height={310}
                  slideGap="sm"
                  align="start"
                  loop
                >
                  {Images}
                </Carousel>
              </Grid.Col>
            )}
          </Grid>
        </Card.Section>
      </Card>
    </div>
  );
}

export default AuctionProfileCard;
