import {
  Card,
  Image,
  Stack,
  Text,
  Badge,
  createStyles,
  Group,
  Grid,
  Space,
  Flex,
  AspectRatio,
  Tooltip,
  Modal,
  MantineTheme,
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
import { Carousel } from '@mantine/carousel';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import mapImg from '../../img/map.png';
import { auctionProfileCardStyle } from '../../styles/theme.ts';
import { IAuction } from '../../types.ts';

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    auctionProfileCardStyle(theme) as Record<string, CSSObject>,
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
    desc: <Image h={200} w={300} src={mapImg} />,
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

const badgeColorMap: { [key: string]: string } = {
  'Live Auction': 'green',
  upcoming: '#7CB342',
  passed: 'orange',
};

export function AuctionProfileCard({
  auction,
  cardSize = 'full',
}: {
  auction: IAuction;
  cardSize: string;
}) {
  const { classes } = useStyles();

  const features = featureGrid.map((feature) => (
    <Grid.Col xs={6} md={4} py={5} key={feature.label}>
      <Tooltip
        key={feature.label}
        multiline
        p={5}
        h={feature.label === 'address' ? 256 : 'auto'}
        // h={500}
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

  const [
    galleryModalOpened,
    { open: openGalleryModal, close: closeGalleryModal },
  ] = useDisclosure(false);

  const Images = auction.images.map((image: string, index) => (
    <Carousel.Slide key={index} onClick={openGalleryModal}>
      <AspectRatio ratio={16 / 10} mx="auto">
        <Image src={image} alt="Image1" width="100%" />
      </AspectRatio>
    </Carousel.Slide>
  ));

  const ImagesModal = auction.images.map((image: string, index) => (
    <Carousel.Slide key={index}>
      <Image src={image} alt="Image1" width="100%" height={440} />
    </Carousel.Slide>
  ));

  // type ConditionalWrapperTypes = {
  //   condition: boolean;
  //   wrapper: any;
  //   children: any;
  // };
  // const ConditionalWrapper = ({ condition, wrapper, children }: ConditionalWrapperTypes) =>
  //   condition ? wrapper(children) : children;

  return (
    <div className="AuctionProfileCard">
      {galleryModalOpened && (
        <Modal
          opened={galleryModalOpened}
          onClose={closeGalleryModal}
          size="xl"
        >
          <Carousel
            slideSize="95%"
            slideGap="sm"
            align="center"
            loop
            withIndicators
          >
            {ImagesModal}
          </Carousel>
        </Modal>
      )}

      <Card.Section className={classes.section}>
        <Grid>
          <Grid.Col {...(cardSize === 'full' ? { sm: 12, md: 5 } : { xs: 12 })}>
            <Grid>
              <Grid.Col
                {...(cardSize === 'full' ? { xs: 6, md: 12 } : { xs: 7 })}
              >
                <Flex
                  {...(cardSize === 'full'
                    ? { direction: 'column' }
                    : { direction: 'row', gap: 'xl' })}
                >
                  <Stack align="flex-start" spacing={-2}>
                    <Group>
                      <Badge
                        bg={badgeColorMap[auction.status]}
                        size="lg"
                        variant="filled"
                        className={classes.statusBadge}
                      >
                        {auction.status}
                      </Badge>

                      <Badge
                        // bg={badgeColorMap[auction.status]}
                        size="lg"
                        // variant="filled"
                        color="orange"
                        className={classes.statusBadge}
                      >
                        {auction.auctionDate}
                      </Badge>
                    </Group>
                    <Text fw={700}>Project #{auction.lot}</Text>
                    <Text fw={500}>{auction.name}</Text>
                    <Text fz="xs" c="dimmed">
                      {auction.builder}
                    </Text>
                  </Stack>
                  <Space h={10} />
                  <Text
                    {...(cardSize === 'mini' ? { maw: 350 } : {})}
                    fz="sm"
                    // c="dimmed"
                    // className={classes.label}
                    align="left"
                    m={'auto'}
                  >
                    Allure Condos is a new condo development located at 250 King
                    Street East, Toronto, ON. This project is bringing a modern
                    collection of 509 condo units in a high-rise mixed-use
                    building of 43 storeys. The estimated completion date for
                    occupancy of this property is 2027.
                  </Text>
                </Flex>
              </Grid.Col>
              <Grid.Col
                {...(cardSize === 'full' ? { xs: 6, md: 12 } : { xs: 5 })}
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

          {cardSize === 'full' && (
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
    </div>
  );
}

export default AuctionProfileCard;
