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
  Textarea,
  TextInput,
  Select,
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
import { YearPickerInput } from '@mantine/dates';

import RUG from 'react-upload-gallery';
import 'react-upload-gallery/dist/style.css';
import './rug_style.css';
import { auctionsProfileCardEditStyle } from '../../styles/theme.ts';
import { IAuction } from '../../types.ts';

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    auctionsProfileCardEditStyle(theme) as Record<string, CSSObject>
);

const featureGrid = [
  // {
  //   label: "completionDate",
  //   icon: IconCalendarEvent,
  //   desc: "Construction completion date",
  // },
  // {
  //   label: "address",
  //   icon: IconAddressBook,
  //   desc: <Image h={200} w={300} src={mapImg} />,
  // },
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

  const initialGallery = auction.images.map((link: string) => ({
    size: '200kb',
    name: '1',
    source: link,
  }));

  const features = featureGrid.map((feature) => (
    <Grid.Col xs={6} py={5} key={feature.label}>
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
          <Text size="sm">{auction[feature.label] + (feature.unit ? feature.unit : '')}</Text>
        </Group>
      </Tooltip>
    </Grid.Col>
  ));

  const [galleryModalOpened, { open: openGalleryModal, close: closeGalleryModal }] =
    useDisclosure(false);

  const Images = auction.images.map((image: string, ind: number) => (
    <Carousel.Slide key={ind} onClick={openGalleryModal}>
      <AspectRatio ratio={16 / 10} mx="auto">
        <Image src={image} alt="Image1" width="100%" />
      </AspectRatio>
    </Carousel.Slide>
  ));

  const ImagesModal = auction.images.map((image: string, ind: number) => (
    <Carousel.Slide key={ind}>
      <Image src={image} alt="Image1" width="100%" height={440} />
    </Carousel.Slide>
  ));


  const removeImage = (currentImage: string, images: string[]) => {
    const updatedImages = images.filter((image) => image !== currentImage);
    console.log('Updated Images:', updatedImages);
  };

  return (
    <div className="AuctionProfileCard">
      {galleryModalOpened && (
        <Modal opened={galleryModalOpened} onClose={closeGalleryModal} size="xl">
          <Carousel slideSize="95%" slideGap="sm" align="center" loop withIndicators>
            {ImagesModal}
          </Carousel>
        </Modal>
      )}

      <Card.Section className={classes.section}>
        <Grid>
          <Grid.Col {...(cardSize === 'full' ? { sm: 12, md: 5 } : { xs: 12 })}>
            <Grid>
              <Grid.Col {...(cardSize === 'full' ? { xs: 6, md: 12 } : { xs: 7 })}>
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

                      {/* <Badge
                        // bg={badgeColorMap[auction.status]}
                        size="lg"
                        // variant="filled"
                        color="orange"
                        className={classes.statusBadge}
                      >
                        {auction.auctionDate}
                      </Badge> */}
                    </Group>
                    <Text fw={700}>
                      <TextInput defaultValue={auction.name} />
                    </Text>
                    <Space h={10} />
                    <Text fz="xs" c="dimmed">
                      {auction.builder}
                    </Text>
                  </Stack>
                  <Space h={20} />
                  <Textarea
                    w="100%"
                    // {...(cardSize === "mini" ? { maw: 350 } : {})}
                    fz="sm"
                    // c="dimmed"
                    // className={classes.label}
                    m={'auto'}
                    autosize
                    minRows={4}
                    defaultValue="Allure Condos is a new condo development located at 250 King
                    Street East, Toronto, ON. This project is bringing a modern
                    collection of 509 condo units in a high-rise mixed-use
                    building of 43 storeys. The estimated completion date for
                    occupancy of this property is 2027."
                  />
                </Flex>
              </Grid.Col>
              <Grid.Col {...(cardSize === 'full' ? { xs: 6, md: 12 } : { xs: 5 })}>
                <Group position="apart" mt="md">
                  <Stack spacing={6} mb={-5} align="flex-start">
                    <Text fz="sm" c="dimmed" className={classes.label} align="left">
                      building details
                    </Text>

                    <Stack>
                      <Group spacing="1">
                        <IconCalendarEvent size="1.05rem" className={classes.icon} stroke={1.5} />
                        <Select
                          maw={120}
                          defaultValue={auction['completionDate'].substring(
                            0,
                            auction['completionDate'].length - 5
                          )}
                          data={['Fall', 'Winter', 'Spring', 'Summer']}
                        />
                        <Space w={10} />
                        <YearPickerInput
                          placeholder={auction['completionDate'].substring(
                            auction['completionDate'].length - 4,
                            auction['completionDate'].length
                          )}
                          // value={completionValue}
                          // onChange={setCompletionValue}
                        />
                      </Group>

                      <Group spacing="1">
                        <IconAddressBook size="1.05rem" className={classes.icon} stroke={1.5} />
                        <TextInput size="sm" defaultValue={auction['address']} />
                      </Group>
                    </Stack>
                    <Space h={20} />

                    <Grid>{features}</Grid>
                  </Stack>
                </Group>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {cardSize === 'full' && (
            <Grid.Col sm={12} md={7}>
              {/* <Carousel
                slideSize="90%"
                height={310}
                slideGap="sm"
                align="start"
                loop
              >
                {Images}
              </Carousel> */}

              <RUG
                style={{ fontSize: 16 }}
                // action="http://example.com/upload"
                initialState={initialGallery}
                accept={['jpg', 'jpeg', 'png']}
                onChange={(images: string) => {
                  console.log(images);
                  // this.setState({ images }); // save current component
                }}
                onConfirmDelete={(currentImage: string, images: string[]) => {
                  removeImage(currentImage, images);
                }}
                onSuccess={(image: string) => {
                  console.log('ima:ge', image);
                }}
              />
            </Grid.Col>
          )}
        </Grid>
      </Card.Section>
    </div>
  );
}

export default AuctionProfileCard;
