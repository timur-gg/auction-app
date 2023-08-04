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

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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
  { label: "completionDate", icon: IconCalendarEvent },
  { label: "address", icon: IconAddressBook },
  { label: "bedroom", icon: IconBedFilled },
  { label: "size", icon: IconRuler, unit: "sqft" },
  { label: "parking", icon: IconCar },
  { label: "locker", icon: IconLock },
];

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
  // auctionDate: Date
};

export function AuctionProfileCardVert(props: ProfileCardProps) {
  const { classes } = useStyles();
  const auction = props.auction;

  const features = mockdata.map((feature) => (
    <Grid.Col xs={10} py={5} key={feature.label}>
      <Group spacing="1">
        <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
        <Text size="sm">
          {auction[feature.label] + (feature.unit ? feature.unit : "")}
        </Text>
      </Group>
    </Grid.Col>
  ));

  return (
    <div className="AuctionProfileCardVert">
      <Card
        withBorder
        radius="md"
        className={classes.card}
        maw={1200}
        mx="auto"
      >
        <Card.Section className={classes.section}>
          <Grid gutter="lg">
            <Grid.Col xs={6} sm={12}>
              <Flex direction="column">
                <Stack align="flex-start" spacing={-2}>
                  <Badge
                    color="green"
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
              </Flex>
            </Grid.Col>

            <Grid.Col xs={6} sm={12} mt={20}>
              <Stack spacing={6} mb={-5} align="flex-start">
                <Text fz="sm" c="dimmed" className={classes.label} align="left">
                  Lot details
                </Text>

                <Grid>{features}</Grid>
              </Stack>
            </Grid.Col>
          </Grid>

        </Card.Section>
      </Card>
    </div>
  );
}

export default AuctionProfileCardVert;
