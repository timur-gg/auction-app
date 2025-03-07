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
  Space, MantineTheme
} from '@mantine/core';
import { useHover } from "@mantine/hooks";
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
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

import mapImg from "../../img/map.png";
import { auctionCardStyle } from '../../styles/theme.ts';

const useStyles = createStyles((theme: MantineTheme ) =>
  auctionCardStyle(theme)
);

const mockdata = [
  {
    label: "completionDate",
    icon: IconCalendarEvent,
    desc: "Construction completion date",
  },
  {
    label: "address",
    icon: IconAddressBook,
    desc: <Image h={200} w={300} src={mapImg} mb={47} />,
  },
  { label: "bedroom", icon: IconBedFilled, desc: "Number of bedrooms" },
  {
    label: "parking",
    icon: IconCar,
    desc: "Parking spots",
  },
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
  {
    label: "bathroom",
    icon: IconBath,
    desc: "# of bathrooms",
  },

  {
    label: "locker",
    icon: IconLock,
    desc: "Lockers",
  },
];

type CardProps = {
  [key: string]: any;
  id: string;
  image: string;
  price: number;
  name: string;
  address: string;
  bedroom: string;
  size: string;
  status: string;
  // project: string,
  builder: string;
  completionDate: string;
  auctionDate: string;
  deposit: string;
  bedroomFilter?: number;
  selected?: boolean;
};

export function AuctionCard(props: CardProps) {
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Tooltip
      key={feature.label}
      multiline
      p={5}
      // h={feature.label === "address" ? 256 : "auto"}
      // h={500}
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

  const navigate = useNavigate();

  const { hovered, ref } = useHover();

  const hoverStyle = {
    background: "#F5F5F5",
    cursor: "pointer",
  };

  const addToFavorites = (e: any) => {
    e.stopPropagation();
    notifications.show({
      autoClose: 1500,
      title: "Saved!",
      color: "yellow",
      message: "Project is saved in Favorites",
    });
  };

  return (
    <Card
      ref={ref}
      radius="md"
      onClick={() => navigate(`/auction/${props.id}`)}
      style={{
        ...(hovered ? hoverStyle : null),
      }}
      className={classes.card + " " + (props.selected ? classes.selected : "")}
    >
      <Card.Section>
        <Image src={props.image} alt="Tesla Model S" height={250} />

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
            style={{ visibility: "visible" }}
          />
          <Space w={10} />
          Add to Favorites
        </Button>
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

      <Card.Section className={classes.section} mt="sm" pb={0}>
        <Text fz="xs" align="left" m={"auto"}>
          Allure Condos is a new condo development located at 250 King Street
          East, Toronto, ON
        </Text>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Lot details
        </Text>

        <Group spacing={17} mb={-5} style={{ rowGap: "0.6rem" }}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={20}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ${props.price}k
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              {props.bedroomFilter || 0 >= 0
                ? props.bedroomFilter || 0 === 0
                  ? "studios starting from"
                  : `${props.bedroomFilter} bedroom starting from`
                : "starting price"}
            </Text>
          </div>

          <Group ml="auto">
            {props.status === "upcoming" && (
              <Button
                radius="md"
                size="xs"
                className={classes.selectUnitsButton}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/project/${props.id}`);
                }}
              >
                Select Units
              </Button>
            )}

            <Button
              size="xs"
              radius="md"
              style={{ flex: 1, fontSize: "14px" }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/auction/${props.id}`);
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
