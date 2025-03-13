import {
  Card,
  Grid,
  Space,
  Group,
  Stack,
  Text,
  createStyles,
  Center,
  Badge,
  Button,
  Modal,
  CSSObject,
} from '@mantine/core';

import { AuctionProfileCardVert, ShowCounter } from '@auction-app/components';
import {
  IconCalendarEvent,
  IconMoneybag,
  IconClock,
  IconHomeCancel,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { auctionNotStartedStyle } from '../theme/theme.ts';
import { IAuction, ILot, lotMockData as lotsData  } from '@auction-app/models';

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    auctionNotStartedStyle(theme),
);

const auctionMockdata = [
  { label: 'auctionDate', icon: IconCalendarEvent },
  { label: 'deposit', icon: IconMoneybag },
  { label: 'duration', icon: IconClock, unit: 'hrs' },
];

export function AuctionNotStarted({
  auction,
  step,
}: {
  auction: IAuction;
  step: number;
}) {
  const { classes } = useStyles();

  const lots: ILot[] =
    auction.lots?.flatMap(
      (lotId) => lotsData.find((id) => id.id === lotId) || [],
    ) ?? [];

  const navigate = useNavigate();

  const auctionFeatures = auctionMockdata.map((feature) => (
    <Grid.Col xs={4} py={5} key={feature.label}>
      <Group spacing="1">
        <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
        <Text size="sm">
          {auction[feature.label] + (feature.unit ? feature.unit : '')}
        </Text>
      </Group>
    </Grid.Col>
  ));

  const lotRows = lots.map((lot: ILot) => (
    <tr key={lot.id}>
      <td>{lot.unit}</td>
      <td>{lot.bedroom}</td>
      <td>{lot.size}sqft</td>
      <td>${lot.price}k</td>
      <td>
        {lot.soldPrice ?? 0 < 1000
          ? `${lot.soldPrice ?? 0}k`
          : `${lot.soldPrice ?? 0 / 1000}m`}
      </td>
      <td>{lot.bid < 1000 ? `${lot.bid}k` : `${lot.bid / 1000}m`}</td>
      <td>{lot.totalBids}</td>
      <td>{lot.position}</td>

      <td>
        <Badge
          {...(lot.position === 1 ? { color: 'green' } : { color: 'orange' })}
          size="lg"
          variant="filled"
        >
          {lot.position === 1 ? 'Won' : 'Lost'}
        </Badge>
      </td>
    </tr>
  ));

  const [quitModalOpened, { open: openQuitModal, close: closeQuitModal }] =
    useDisclosure(false);

  return (
    <>
      <Modal
        opened={quitModalOpened}
        onClose={closeQuitModal}
        title=""
        centered
      >
        <Text ta="center" size="md" fw={400}>
          Are you sure that you want to remove your registration for the
          auction?
        </Text>

        <Space h={25} />
        <Group>
          <Text>Project:</Text> <Text fw={700}>King West Towers</Text>
        </Group>
        <Group>
          <Text>Lot #:</Text> <Text fw={700}>20212</Text>
        </Group>
        <Space h={30} />
        <Group spacing={30} ml={80}>
          <Button
            radius="sm"
            color="red"
            onClick={() => {
              notifications.show({
                autoClose: 4000,
                title: 'Auction Registration Removed',
                color: 'red',
                message: 'You registration for this auction is removed',
              });
              closeQuitModal();
              // navigate(`/client_profile`);
            }}
          >
            <IconHomeCancel size="1.6rem" stroke={1.5} />
            <Space w={10} />
            Remove Registration
          </Button>

          <Button size="xs" radius="sm" onClick={closeQuitModal}>
            Cancel
          </Button>
        </Group>
        <Space h={10} />
      </Modal>

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
                  <Text
                    fz="lg"
                    c="dimmed"
                    className={classes.label}
                    align="left"
                  >
                    Auction details
                  </Text>
                  <Grid w={'100%'}>{auctionFeatures}</Grid>
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

            <Text fw={400} fz={'lg'}>
              Auction has not started yet!
            </Text>
            <Space h={30} />

            <ShowCounter days={20} hours={10} minutes={5} seconds={10} />
            <Space h={40} />
            <Center>
              <Group mx="auto">
                <Button
                  // variant="dark"
                  color="yellow"
                  onClick={() => navigate(`/choose_units/${auction.id}`)}
                >
                  <IconHomeCancel size="1.2rem" />
                  <Space w={7} />
                  Select Units
                </Button>
                <Button
                  // variant="dark"
                  color="red"
                  onClick={openQuitModal}
                >
                  <IconHomeCancel size="1.2rem" />
                  <Space w={7} />
                  Remove Registration
                </Button>
              </Group>
            </Center>
            <Space h={30} />
          </Card>

          {/* <Grid justify="center">
            {lots.map((lot: any) => (
              <Grid.Col {...(lots.length > 1 ? { md: 6 } : { md: 10 })}>
                <BiddingTab lot={lot} half={lots.length > 1} />
              </Grid.Col>
            ))}
          </Grid> */}
        </Grid.Col>
      </Grid>
    </>
  );
}
