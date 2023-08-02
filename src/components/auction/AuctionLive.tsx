import {
  Container,
  Card,
  Grid,
  Paper,
  Space,
  Group,
  Stack,
  Button,
  Text,
  createStyles,
  rem,
  Center,
} from "@mantine/core";
import { BidSelector } from "./BidSelector";
import ShowCounter from "./ShowCounter";
import PricePlot from "./PricePlot";


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
  

export function AuctionLive(props: any) {
  const { classes } = useStyles();

  const auction = props.auction;

  return (
    <Container className="Auction" maw={1500}>
      <Card
        withBorder
        radius="md"
        className={classes.card}
        maw={1000}
        p={15}
        mx="auto"
      >
        <Card.Section className={classes.section}>
          <Grid columns={24} align="center" justify="center">
            <Grid.Col xs={20} md={10}>
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

            <Grid.Col xs={20} md={10}>
              <Stack align="center">
                <BidSelector
                  className={classes.bidSelector}
                  auction={auction}
                />
                <Button radius="xl">Place Your Bid</Button>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
      <Space h={15} />
      <Card
          withBorder
          p={15}
          radius="md"
          className={classes.card}
          maw={1000}
          mx="auto"
        >
          <Card.Section className={classes.section}>
            <Grid align="center" justify="center">
              <Grid.Col xs={12} md={5}>
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
                <Center>
                  {" "}
                  <PricePlot />
                </Center>
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
    </Container>
  );
}
