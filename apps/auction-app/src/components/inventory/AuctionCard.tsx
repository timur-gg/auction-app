import {
  Card,
  Image,
  Stack,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  rem,
  Tooltip,
  Space,
  MantineTheme,
  CSSObject,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import {
  IconBedFilled,
  IconRuler,
  IconCalendarEvent,
  IconStar,
  IconMoneybag,
  IconAddressBook,
  IconBath,
  IconCar,
  IconLock,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

import mapImg from '../../img/map.png';
import { auctionCardStyle } from '../../styles/theme.ts';
import { IAuction } from '../../types.ts';

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    auctionCardStyle(theme) as Record<string, CSSObject>,
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
    desc: <Image h={200} w={300} src={mapImg} mb={47} />,
  },
  { label: 'bedroom', icon: IconBedFilled, desc: 'Number of bedrooms' },
  {
    label: 'parking',
    icon: IconCar,
    desc: 'Parking spots',
  },
  {
    label: 'size',
    icon: IconRuler,
    unit: 'sqft',
    desc: 'Size of the property',
  },
  {
    label: 'deposit',
    icon: IconMoneybag,
    desc: 'Preconstruction deposit by year',
  },
  {
    label: 'bathroom',
    icon: IconBath,
    desc: '# of bathrooms',
  },

  {
    label: 'locker',
    icon: IconLock,
    desc: 'Lockers',
  },
];

export function AuctionCard({
  auction,
  selected,
  image,
  price,
  bedroomFilter,
}: {
  auction: IAuction;
  selected?: boolean;
  image?: string;
  bedroomFilter?: number;
  price?: number;
}) {
  const { classes } = useStyles();
  const features = featureGrid.map((feature) => (
    <Tooltip
      key={feature.label}
      multiline
      p={5}
      // h={feature.label === "address" ? 256 : "auto"}
      // h={500}
      style={{ cursor: 'pointer' }}
      transitionProps={{ duration: 200 }}
      label={feature.desc}
    >
      <Center className={classes.tooltip}>
        <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
        <Text size="sm">
          {auction[feature.label] + (feature.unit ? feature.unit : '')}
        </Text>
      </Center>
    </Tooltip>
  ));

  const navigate = useNavigate();

  const { hovered, ref } = useHover();

  const hoverStyle = {
    background: '#F5F5F5',
    cursor: 'pointer',
  };

  const addToFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();
    notifications.show({
      autoClose: 1500,
      title: 'Saved!',
      color: 'yellow',
      message: 'Project is saved in Favorites',
    });
  };

  return (
    <Card
      ref={ref}
      radius="md"
      onClick={() => navigate(`/auction/${auction.id}`)}
      style={{
        ...(hovered ? hoverStyle : null),
      }}
      className={classes.card + ' ' + (selected ? classes.selected : '')}
    >
      <Card.Section>
        <Image src={image} alt="Tesla Model S" height={250} />

        <Button
          className={classes.favButton}
          size="md"
          pl={10}
          fw={400}
          onClick={addToFavorites}
        >
          <IconStar
            className={classes.favIcon}
            color="Gold"
            size={35}
            stroke={1.5}
            style={{ visibility: 'visible' }}
          />
          <Space w={10} />
          Add to Favorites
        </Button>
      </Card.Section>

      <Group position="apart" mt="md">
        <Stack align="flex-start" spacing={-2}>
          <Text fw={500}>{auction.name}</Text>
          <Text fz="xs" c="dimmed">
            {auction.builder}
          </Text>
        </Stack>

        {auction.auctionDate === 'Live' ? (
          <Badge variant="filled" color="green" size="lg">
            {auction.auctionDate}
          </Badge>
        ) : (
          <Badge variant="outline" color="orange" size="lg">
            {auction.auctionDate}
          </Badge>
        )}
      </Group>

      <Card.Section className={classes.section} mt="sm" pb={0}>
        <Text fz="xs" align="left" m={'auto'}>
          Allure Condos is a new condo development located at 250 King Street
          East, Toronto, ON
        </Text>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Lot details
        </Text>

        <Group spacing={17} mb={-5} style={{ rowGap: '0.6rem' }}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={20}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ${price}k
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              {bedroomFilter || 0 >= 0
                ? bedroomFilter || 0 === 0
                  ? 'studios starting from'
                  : `${bedroomFilter} bedroom starting from`
                : 'starting price'}
            </Text>
          </div>

          <Group ml="auto">
            {auction.status === 'upcoming' && (
              <Button
                radius="md"
                size="xs"
                className={classes.selectUnitsButton}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  navigate(`/project/${auction.id}`);
                }}
              >
                Select Units
              </Button>
            )}

            <Button
              size="xs"
              radius="md"
              style={{ flex: 1, fontSize: '14px' }}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                navigate(`/auction/${auction.id}`);
              }}
            >
              Go to Auction
            </Button>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default AuctionCard;
