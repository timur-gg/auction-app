import {
  Card,
  Image,
  Stack,
  Text,
  Badge,
  createStyles,
  Group,
  Grid,
  Flex,
  Tooltip,
  CSSObject,
} from '@mantine/core';
import {
  IconBedFilled,
  IconRuler,
  IconCalendarEvent,
  IconAddressBook,
  IconCar,
  IconLock,
} from '@tabler/icons-react';
import React from 'react';
import mapImg from '../../assets/map.png';
import { auctionProfileCardVertStyle } from '../theme/theme';
import { IAuction } from '@auction-app/models';

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    auctionProfileCardVertStyle(theme) as Record<string, CSSObject>,
);

const featureGrid = [
  {
    label: 'completionDate',
    icon: IconCalendarEvent,
    desc: 'Construction completion date',
  },
  {
    label: 'address',
    icon: IconAddressBook,
    desc: <Image h={200} w={300} src={mapImg} mb={-23} />,
  },
  { label: 'bedroom', icon: IconBedFilled, desc: 'Number of bedrooms' },
  {
    label: 'size',
    icon: IconRuler,
    unit: 'sqft',
    desc: 'Size of the property',
  },
  { label: 'parking', icon: IconCar, desc: 'Parking spots' },
  { label: 'locker', icon: IconLock, desc: 'Storage lockers' },
];

export function AuctionProfileCardVert({ auction }: { auction: IAuction }) {
  const { classes } = useStyles();

  const features = featureGrid.map((feature) => (
    <Grid.Col xs={10} py={5} key={feature.label}>
      <Tooltip
        multiline
        p={5}
        // h={feature.label === "address" ? 200 : "auto"}
        withArrow
        style={{ cursor: 'pointer' }}
        transitionProps={{ duration: 200 }}
        label={feature.desc}
      >
        <Group spacing="1">
          <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
          <Text size="sm">
            {auction[feature.label] + (feature.unit ? feature.unit : '')}
          </Text>
        </Group>
      </Tooltip>
    </Grid.Col>
  ));

  const badgeColorMap: { [key: string]: string } = {
    'Live Auction': 'green',
    upcoming: 'yellow',
    passed: 'orange',
  };

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
                    color={badgeColorMap[auction.status]}
                    size="lg"
                    variant="filled"
                    className={classes.statusBadge}
                  >
                    {auction.status}
                  </Badge>
                  <Text fw={700}>Auction #{auction.lot}</Text>
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
                  Building details
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
