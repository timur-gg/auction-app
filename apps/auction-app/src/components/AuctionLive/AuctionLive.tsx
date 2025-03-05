import {
  Card,
  Grid,
  Space,
  Group,
  Stack,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import ShowCounter from "./ShowCounter.js";
import AuctionProfileCardVert from "./AuctionProfileCardVert.js";
import {
  IconCalendarEvent,
  IconMoneybag,
  IconClock,
} from "@tabler/icons-react";
import { lots as lotsData } from "../../data.js";
import { BiddingTab } from "./BiddingTab.js";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  bidSelector: {
    minWidth: rem(245),
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
    // borderTop: `${rem(1)} solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
  },
  bidButton: {
    marginTop: rem(30),
  },
  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const auctionMockdata = [
  { label: "auctionDate", icon: IconCalendarEvent },
  { label: "deposit", icon: IconMoneybag },
  { label: "duration", icon: IconClock, unit: "hrs" },
];

export function AuctionLive(props: any) {
  const { classes } = useStyles();

  const auction = props.auction;

  const lots = auction.lots.map((lotId: number) =>
    lotsData.find((id) => id.id === lotId)
  );

  const auctionFeatures = auctionMockdata.map((feature) => (
    <Grid.Col xs={4} py={5} key={feature.label}>
      <Group spacing="1">
        <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
        <Text size="sm">
          {auction[feature.label] + (feature.unit ? feature.unit : "")}
        </Text>
      </Group>
    </Grid.Col>
  ));

  return (
    <Grid justify="center" className="Auction" maw={1500}>
      <Grid.Col xs={10} md={2}>
        <AuctionProfileCardVert auction={auction} />
      </Grid.Col>

      <Grid.Col xs={10} md={9}>
        <Card
          withBorder
          radius="md"
          className={classes.card}
          // maw={900}
          p={20}
          mx="auto"
        >
          <Grid>
            <Grid.Col xs={12} md={6}>
              <Stack spacing={6} mb={-5} align="flex-start" p={0}>
                <Text fz="sm" c="dimmed" className={classes.label} align="left">
                  Auction details
                </Text>
                <Grid w={"100%"}>{auctionFeatures}</Grid>
              </Stack>
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <Stack spacing={6} mb={-5} align="flex-start" p={0}>
                <Text fz="sm" c="dimmed" className={classes.label} align="left">
                  Duration
                </Text>

                <ShowCounter days={20} hours={10} minutes={5} seconds={10} />
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>
        <Space h={10} />

        <Grid justify="center">
          {lots.map((lot: any) => (
            <Grid.Col {...(lots.length > 1 ? { md: 6 } : { md: 10 })}>
              <BiddingTab lot={lot} half={lots.length > 1} />
            </Grid.Col>
          ))}
        </Grid>
      </Grid.Col>
    </Grid>
  );
}
