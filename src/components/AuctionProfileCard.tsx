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
} from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";

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
  { label: "completionDate", icon: IconCalendarEvent },
  { label: "address", icon: IconAddressBook },
  { label: "bedroom", icon: IconBedFilled },
  { label: "size", icon: IconRuler, unit: "sqft" },
  { label: "parking", icon: IconCar },
];

type ProfileCardProps = {
  [key: string]: any;
  lot: number;
  images: string[];
  price: number;
  name: string;
  address: string;
  bedroom: number;
  size: number;
  status: string;
  parking: number;
  builder: string;
  completionDate: string,
  // auctionDate: Date
};

export function AuctionProfileCard(props: ProfileCardProps) {
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="sm">
        {props[feature.label] + (feature.unit ? feature.unit : "")}
      </Text>
    </Center>
  ));

  const Images = props.images.map((image) => (
    <Carousel.Slide>
        <AspectRatio ratio={16 / 10}  mx="auto">
      <Image src={image} alt="Image1" width="100%" />
      </AspectRatio>
    </Carousel.Slide>
  ));

  return (
    <div className="AuctionProfileCard">
      <Card withBorder radius="md" className={classes.card} maw={1200} mx='auto'>
        <Card.Section className={classes.section}>
          <Grid>
            <Grid.Col sm={12} md={2.5}>
              <Grid>
                <Grid.Col xs={6} md={12}>
                  {/* <Group mt="md"> */}
                    
                    <Stack align="flex-start" spacing={-2}>
                    <Badge color="green" size="lg" variant="filled" className={classes.statusBadge}>
                      {props.status}
                    </Badge>
                      <Text fw={700}>Lot #{props.lot}</Text>
                      <Text fw={500}>{props.name}</Text>
                      <Text fz="xs" c="dimmed">
                        {props.builder}
                      </Text>
                    </Stack>
                  {/* </Group> */}
                </Grid.Col>
                <Space h={40} />

                <Grid.Col xs={6} md={12}>
                  <Group position="apart" mt="md">
                    

                    <Stack spacing={6} mb={-5} align="flex-start">
                    <Text
                      fz="sm"
                      c="dimmed"
                      className={classes.label}
                      align="left"
                    >
                      Lot details
                    </Text>
                      {features}
                    </Stack>
                  </Group>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col sm={12} md={9.5}>
              <Carousel
                slideSize="70%"
                height={330}
                slideGap="sm"
                align="start"
                loop
              >
                {Images}
              </Carousel>
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </div>
  );
}

export default AuctionProfileCard;
