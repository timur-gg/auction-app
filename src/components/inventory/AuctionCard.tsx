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
} from "@mantine/core";
import {
  IconBedFilled,
  IconRuler,
  IconCalendarEvent,
  IconStar,
  IconMoneybag,
  IconStarFilled,
  IconAddressBook,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

var mapImg = require("../../img/map.png");

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

  favButton: {
    position: "absolute",
    top: "2%",
    left: "2%",
    transform: "translate(-2%, -2%)",
    cursor: "pointer",
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
  tooltip: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const mockdata = [
  {
    label: "completionDate",
    icon: IconCalendarEvent,
    desc: "Construction completion date",
  },
  {
    label: "address",
    icon: IconAddressBook,
    desc: <Image h={200} w={300} src={mapImg} />,
  },
  { label: "bedroom", icon: IconBedFilled, desc: "Number of bedrooms" },
  {
    label: "size",
    icon: IconRuler,
    unit: "sqft",
    desc: "Size of the property",
  },
  {
    label: "deposit",
    icon: IconMoneybag,
    desc: "Preconstruction deposit by year",
  },
];

type CardProps = {
  [key: string]: any;
  image: string;
  price: number;
  name: string;
  address: string;
  bedroom: number;
  size: number;
  // status: string,
  // project: string,
  builder: string;
  completionDate: string;
  auctionDate: string;
  deposit: string;
};

export function AuctionCard(props: CardProps) {
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Tooltip
      key={feature.label}
      multiline
      p={5}
      h={feature.label === "address" ? 256 : "auto"}
      // h={500}
      withArrow
      style={{ cursor: "pointer" }}
      transitionProps={{ duration: 200 }}
      label={feature.desc}
    >
      <Center className={classes.tooltip}>
        <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
        <Text size="sm">
          {props[feature.label] + (feature.unit ? feature.unit : "")}
        </Text>
      </Center>
    </Tooltip>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Image src={props.image} alt="Tesla Model S" height={250} />
        <IconStar
          className={classes.favButton}
          color="Gold"
          size={30}
          stroke={1.5}
        />
      </Card.Section>

      <Group position="apart" mt="md">
        <Stack align="flex-start" spacing={-2}>
          <Text fw={500}>{props.name}</Text>
          <Text fz="xs" c="dimmed">
            {props.builder}
          </Text>
        </Stack>

        {props.auctionDate === "Live" ? (
          <Badge variant="filled" color="green" size="lg">
            {props.auctionDate}
          </Badge>
        ) : (
          <Badge variant="outline" color="orange" size="lg">
            {props.auctionDate}
          </Badge>
        )}
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Lot details
        </Text>

        <Group spacing={20} mb={-5}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ${props.price}k
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              starting price
            </Text>
          </div>

          <Link to={`/auction/${props.id}`} style={{ marginLeft: "auto" }}>
            <Button radius="xl" style={{ flex: 1 }}>
              Go to Auction
            </Button>
          </Link>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default AuctionCard;
