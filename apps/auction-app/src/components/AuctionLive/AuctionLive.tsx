import {
  Card,
  Grid,
  Space,
  Group,
  Stack,
  Text,
  createStyles,
  CSSObject,
} from '@mantine/core';
import ShowCounter from './ShowCounter.js';
import AuctionProfileCardVert from './AuctionProfileCardVert.js';
import { lotMockData as lotsData } from '@mocks/auction.tsx';
import { BiddingTab } from './BiddingTab.js';
import { auctionLiveStyle } from '../../styles/theme';
import {
  IconCalendarEvent,
  IconClock,
  IconMoneybag,
} from '@tabler/icons-react';
import { IAuction, ILot } from '@auction-app/models';

export const featureGrid = [
  { label: 'auctionDate', icon: IconCalendarEvent },
  { label: 'deposit', icon: IconMoneybag },
  { label: 'duration', icon: IconClock, unit: 'hrs' },
];

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    auctionLiveStyle(theme) as Record<string, CSSObject>,
);

export function AuctionLive({ auction }: { auction: IAuction; step: number }) {
  const { classes } = useStyles();

  const lots: ILot[] =
    auction.lots?.flatMap(
      (lotId) => lotsData.find((id) => id.id === lotId) || [],
    ) ?? [];

  const auctionFeatures = featureGrid.map((feature) => (
    <Grid.Col xs={4} py={5} key={feature.label}>
      <Group spacing="1">
        <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
        <Text size="sm">
          {auction[feature.label] + (feature.unit ? feature.unit : '')}
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
                <Grid w={'100%'}>{auctionFeatures}</Grid>
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
          {lots.map((lot: ILot, inx: number) => (
            <Grid.Col key={inx} {...(lots.length > 1 ? { md: 6 } : { md: 10 })}>
              <BiddingTab lot={lot} half={lots.length > 1} />
            </Grid.Col>
          ))}
        </Grid>
      </Grid.Col>
    </Grid>
  );
}
