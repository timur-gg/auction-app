import {
  Container,
  Card,
  Grid,
  Paper,
  Space,
  Group,
  Stack,
  Text,
  createStyles,
  rem,
  Center,
  Table,
  Badge,
} from "@mantine/core";
import ShowCounter from "../AuctionLive/ShowCounter";
import AuctionProfileCardVert from "../AuctionLive/AuctionProfileCardVert";
import {
  IconCalendarEvent,
  IconMoneybag,
  IconClock,
} from "@tabler/icons-react";
import { lots as lotsData } from "../../data.js";
import { BiddingTab } from "../AuctionLive/BiddingTab";

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

export function AuctionPassed(props: any) {
  const { classes } = useStyles();

  const auction = props.auction;

  console.log(auction);

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

  const lotRows = lots.map((lot: any) => (
    <tr key={lot.id}>
      <td>{lot.unit}</td>
      <td>{lot.bedroom}</td>
      <td>{lot.size}sqft</td>
      <td>${lot.price}k</td>
      <td>
        {lot.soldPrice < 1000
          ? `${lot.soldPrice}k`
          : `${lot.soldPrice / 1000}m`}
      </td>
      <td>{lot.bid < 1000 ? `${lot.bid}k` : `${lot.bid / 1000}m`}</td>
      <td>{lot.totalBids}</td>
      <td>{lot.position}</td>

      <td>
        <Badge
          {...(lot.position === 1 ? { color: "green" } : { color: "orange" })}
          size="lg"
          variant="filled"
        >
          {lot.position === 1 ? "Won" : "Lost"}
        </Badge>
      </td>
    </tr>
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
                <Text fz="lg" c="dimmed" className={classes.label} align="left">
                  Auction details
                </Text>
                <Grid w={"100%"}>{auctionFeatures}</Grid>
              </Stack>
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              {/* <Stack spacing={6} mb={-5} align="flex-start" p={0}>
                <Text fz="sm" c="dimmed" className={classes.label} align="left">
                  Duration
                </Text>

                <ShowCounter days={20} hours={10} minutes={5} seconds={10} />
              </Stack> */}
            </Grid.Col>
          </Grid>
          <Space h={50} />
          <Text fz="lg" c="dimmed" className={classes.label} align="left">
            Auction Results
          </Text>
          <Grid justify="center">
            <Grid.Col xs={12} md={11}>
              <Stack spacing={6} mb={-5} align="flex-start" p={0}>
                <Table style={{ textAlign: "left" }}>
                  <thead>
                    <tr>
                      <th>Unit #</th>
                      <th>Bedroom</th>
                      <th>Size</th>
                      <th>Starting price</th>

                      <th>Sold at</th>
                      <th>My bid</th>

                      <th>Total bids</th>
                      <th>My Position</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>{lotRows}</tbody>
                </Table>
              </Stack>
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
              <Stack spacing={6} mb={-5} align="flex-start" p={0}></Stack>
            </Grid.Col>
          </Grid>
        </Card>
        <Space h={10} />

        {/* <Grid justify="center">
          {lots.map((lot: any) => (
            <Grid.Col {...(lots.length > 1 ? { md: 6 } : { md: 10 })}>
              <BiddingTab lot={lot} half={lots.length > 1} />
            </Grid.Col>
          ))}
        </Grid> */}
      </Grid.Col>
    </Grid>
  );
}
