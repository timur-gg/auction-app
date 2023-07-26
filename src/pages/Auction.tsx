import React from "react";
import AuctionProfileCard from "../components/AuctionProfileCard";
import ShowCounter from "../components/ShowCounter";

import PricePlot from "../components/PricePlot";

import { useState, useRef } from "react";

import {
  Card,
  Stack,
  Text,
  Group,
  Button,
  Grid,
  Space,
  rem,
  createStyles,
  NumberInput,
  ActionIcon,
  Center,
  Container,
  NumberInputHandlers,
  Paper,
  Box,
} from "@mantine/core";
import { IconCurrencyDollarCanadian } from "@tabler/icons-react";
import { useParams } from "react-router";

function BidSelector(props: any) {
  const [value, setValue] = useState<number | "">(props.auction.price * 1000);
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group spacing={5} className={props.className}>
      <ActionIcon
        size={42}
        variant="default"
        onClick={() => handlers.current?.decrement()}
      >
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onChange={(val) => setValue(val)}
        handlersRef={handlers}
        max={1000000}
        min={props.auction.price}
        step={10000}
        styles={{ input: { width: rem(150) } }}
        icon={<IconCurrencyDollarCanadian size="1rem" />}
      />

      <ActionIcon
        size={42}
        variant="default"
        onClick={() => handlers.current?.increment()}
      >
        +
      </ActionIcon>
    </Group>
  );
}

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
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  bidButton: {
    marginTop: rem(30),
  },
}));



const auctionData = [
  {
    id: '1',
    images: [
      "https://www.easyprecon.com/wp-content/uploads/2022/12/2022_09_06_01_54_27_centricity_aerial-1066x600.webp",
      "https://www.easyprecon.com/wp-content/uploads/2022/12/2021_12_21_09_55_10_241_church_street_4-1066x600.webp",
      "https://cache15.housesigma.com/file/pix-exclusive/HSE03041/33bfa_5ea6c.jpg?e224ad04",
      "https://www.easyprecon.com/wp-content/uploads/2022/12/2021_12_21_09_55_18_241_church_street_5-872x600.webp",
    ],
    price: 550,
    name: "The Condominimums",
    address: "50 Richmond W",
    bedroom: 0,
    size: 490,
    builder: "Toronto Building Corp",
    completionDate: "Dec 2025",
    auctionDate: "Live",
    status: "Live Auction",
    lot: 5552,
    parking: 1,

  },

  {
    id: '2',
    images: [
      "https://www.easyprecon.com/wp-content/uploads/2022/12/2022_09_06_01_54_27_centricity_aerial-1066x600.webp",
      "https://www.easyprecon.com/wp-content/uploads/2022/12/2021_12_21_09_55_10_241_church_street_4-1066x600.webp",
      "https://cache15.housesigma.com/file/pix-exclusive/HSE03041/33bfa_5ea6c.jpg?e224ad04",
      "https://www.easyprecon.com/wp-content/uploads/2022/12/2021_12_21_09_55_18_241_church_street_5-872x600.webp",
    ],
    price: 600,
    name: "Condo 223",
    address: "35 Bathurst",
    bedroom: 1,
    size: 590,
    builder: "Developers Inc",
    completionDate: "June 2026",
    auctionDate: "1 Oct 2023",
    status: "upcoming",
    lot: 5554,
    parking: 0,


  },

  {
    id: '3',
    images: [
      "https://www.easyprecon.com/wp-content/uploads/2022/12/2022_09_06_01_54_27_centricity_aerial-1066x600.webp",
      "https://www.easyprecon.com/wp-content/uploads/2022/12/2021_12_21_09_55_10_241_church_street_4-1066x600.webp",
      "https://cache15.housesigma.com/file/pix-exclusive/HSE03041/33bfa_5ea6c.jpg?e224ad04",
      "https://www.easyprecon.com/wp-content/uploads/2022/12/2021_12_21_09_55_18_241_church_street_5-872x600.webp",
    ],
    price: 900,
    name: "King West Towers",
    address: "100 Spadina",
    bedroom: 2,
    size: 750,
    builder: "Developers Inc",
    completionDate: "August 2024",
    auctionDate: "1 Jul 2023",
    status: "passed",
    lot: 5555,
    parking: 2,


  },
];


// const auction = {
//   images: [
//     "https://www.easyprecon.com/wp-content/uploads/2022/12/2022_09_06_01_54_27_centricity_aerial-1066x600.webp",
//     "https://www.easyprecon.com/wp-content/uploads/2022/12/2021_12_21_09_55_10_241_church_street_4-1066x600.webp",
//     "https://cache15.housesigma.com/file/pix-exclusive/HSE03041/33bfa_5ea6c.jpg?e224ad04",
//     "https://www.easyprecon.com/wp-content/uploads/2022/12/2021_12_21_09_55_18_241_church_street_5-872x600.webp",
//   ],
//   price: 550,
//   name: "The Condominimums",
//   address: "50 Richmond W",
//   bedroom: 0,
//   size: 490,
//   builder: "Toronto Building Corp",
//   status: "Live Auction",
//   lot: 5552,
//   parking: 1,
//   completionDate: "December 2023",
// };

const Auction = () => {
  const { id } = useParams();
  const { classes } = useStyles();

  const auction = auctionData.find(x => (x.id === id)) || auctionData[0];


  return (
    <Container className="Auction" maw={1500} >
      
      <AuctionProfileCard
      
        status={auction.status}
        images={auction.images}
        size={auction.size}
        price={auction.price}
        name={auction.name}
        address={auction.address}
        bedroom={auction.bedroom}
        builder={auction.builder}
        lot={auction.lot}
        parking={auction.parking}
        completionDate={auction.completionDate}
      />
      <Space h={15} />
      {/* <Stack align="center" > */}

      <Card withBorder p={15} radius="md" className={classes.card} maw={1000} mx='auto'>
        <Card.Section className={classes.section}>
        <Grid align='center' justify='center'>
          <Grid.Col xs={12} md={5} >
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ${auction.price + 100},000
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              current bid
            </Text>
            <Space h={20} />
            <Text fz="lg" fw={500} sx={{ lineHeight: 1 }}>
              ${auction.price},000
            </Text>
            <Text fz="sm" c="dimmed" fw={400} sx={{ lineHeight: 1 }} mt={3}>
              starting price
            </Text>
          </Grid.Col>
          <Grid.Col xs={12} md={7}>

            <Center> <PricePlot /></Center>

           
          
          </Grid.Col>

        </Grid>

        
        </Card.Section>
      </Card>
      <Space h={15} />

      
      <Card withBorder radius="md" className={classes.card} maw={1000} p={15} mx='auto'>
        <Card.Section className={classes.section}>
          {/* <Flex gap="md"
        mih={50}

        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"> */}

          <Grid columns={24} align="center" justify="center">
            <Grid.Col xs={20} md={10} >
              <Paper shadow="md" p="md" bg="#dcedc8">
                <ShowCounter days={20} hours={10} minutes={5} seconds={10} />
                <Space h={15} />

                <Group position="center">
                  <Stack spacing="3" align="left">
                    <Group>
                      <Text fz="sm" c="dimmed" fw={500}>
                        Your bid
                      </Text>
                    </Group>
                    <Group>
                      <Text fz="sm" c="dimmed" fw={500}>
                        Your place
                      </Text>
                    </Group>
                    <Group>
                      <Text fz="sm" c="dimmed" fw={500}>
                        Total bids
                      </Text>
                    </Group>
                  </Stack>
                  <Stack spacing="3" align="center">
                    <Group>
                      <Text fz="lg" fw={700}>
                        {/* ${auction.price + 100},000 */}
                        $570,000

                      </Text>
                    </Group>
                    <Group>
                      <Text fz="md" fw={700}>
                        2
                      </Text>
                    </Group>
                    <Group>
                      <Text fz="md" fw={700}>
                        5
                      </Text>
                    </Group>
                  </Stack>
                </Group>
              </Paper>
            </Grid.Col>

            <Grid.Col xs={20} md={10} >
              {/* <Grid justify="center"> */}
              {/* <Grid.Col xs={10} md={8}> */}
              <Stack align="center">
                {/* <Text fz="sm" fw={500} sx={{ lineHeight: 1 }}>
                        Make a bid
                      </Text> */}

                <BidSelector className={classes.bidSelector} auction={auction}/>
                <Button radius="xl">Place Your Bid</Button>
              </Stack>
              {/* </Grid.Col> */}

              {/* <Grid.Col xs={10} md={4}> */}
              {/* <Button radius="xl" >
                      Place Your Bid
                    </Button> */}
              {/* </Grid.Col> */}
              {/* </Grid> */}
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
      {/* </Stack> */}
    </Container>
  );
};

export default Auction;
