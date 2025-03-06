import {
  IconBath,
  IconBedFilled,
  IconCar,
  IconCurrencyDollarCanadian,
  IconHash,
  IconLock,
  IconRuler,
  IconGavel,
  IconDoorExit,
  IconSunHigh,
} from "@tabler/icons-react";
import { useState, useRef } from "react";
import {
  Card,
  Grid,
  Space,
  Group,
  Stack,
  Button,
  Text,
  createStyles,
  rem,
  Center,
  Modal,
  Title,
  NumberInputHandlers,
} from "@mantine/core";
import PricePlot from "./PricePlot";
import { BidSelector } from "./BidSelector";
import ShowCounter from "./ShowCounter";
import { useDisclosure } from "@mantine/hooks";
import Countdown from "react-countdown";
import { ILot } from "../../data";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border: "0.0625rem solid #dee2e6",
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
    // borderTop: `${rem(1)} solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
  },

  cardWinning: {
    border: "2px solid #64DD17",
    // borderTop: `${rem(1)} solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
  },

  // sectionWinning: {
  //   padding: theme.spacing.md,
  //   backgroundColor: "#fafafa",
  //   border: "2px solid #8BC34A",
  //   // borderTop: `${rem(1)} solid ${
  //   //   theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
  //   // }`,
  // },

  bidButton: {
    marginTop: rem(30),
  },
  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const unitMockdata = [
  { label: "unit", icon: IconHash, sz: 1.5 },
  { label: "bedroom", icon: IconBedFilled, sz: 1 },
  { label: "facing", icon: IconSunHigh, sz: 1 },

  { label: "size", icon: IconRuler, unit: "sqft", sz: 1.666 },
  { label: "parking", icon: IconCar, sz: 1 },
  { label: "locker", icon: IconLock, sz: 1 },
  { label: "bathroom", icon: IconBath, sz: 1 },
];



export function BiddingTab( lot: ILot, half:boolean = false ) {
  const { classes } = useStyles();

  const [
    confirmModalOpened,
    { open: openConfirmModal, close: closeConfirmModal },
  ] = useDisclosure(false);
  const [quitModalOpened, { open: openQuitModal, close: closeQuitModal }] =
    useDisclosure(false);

  const currentPlace = lot.place || 2;

  const [tempValue, setTempValue] = useState<number | 0>(lot.bid * 1000);
  const [value, setValue] = useState<number | "">(0);

  const [status, setStatus] = useState("live");
  const [betTime, setBetTime] = useState(-1);
  const [remainingTime, setRemainingTime] = useState(lot.timeLeft);

  console.log(remainingTime);

  console.info(lot);

  console.log(lot.bid);

  const unitFeatures = unitMockdata.map((feature) => (
    <Grid.Col
      xs={3}
      {...(!half ? { lg: feature.sz } : { lg: 2.66 })}
      py={5}
      key={feature.label}
    >
      <Group spacing="1">
        <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
        <Text size="sm">
          {(lot as any)[feature.label] + (feature.unit ? feature.unit : "")}
        </Text>
      </Group>
    </Grid.Col>
  ));

  const makeBid = () => {
    setValue(tempValue);
    setRemainingTime(30000);
    closeConfirmModal();
  };

  console.log(tempValue, lot.bid * 1000, tempValue === lot.bid * 1000);

  const valueChanged = tempValue !== lot.bid * 1000;
  const increment = lot.bid * 1000 * 0.01;

  type countdownProps = {
    [key: string]: any;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  };

  // Renderer callback with condition
  // const renderer = ({ hours, minutes, seconds, completed }: countdownProps) => {
  //   if (completed) {
  //     // Render a complete state
  //     return <Completionist />;
  //   } else {
  //     // Render a countdown
  //     return (
  //       <span>
  //         {hours}:{minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };

  return (
    <>
      <Modal
        opened={confirmModalOpened}
        onClose={closeConfirmModal}
        title="Bid Confirmation"
        centered
      >
        <Space h={15} />
        <Text ta="center" size="xl" fw={400}>
          Are you sure about your bid ?
        </Text>
        <Space h={25} />
        <Group>
          <Text>Lot #:</Text> <Text fw={700}>{lot.unit}</Text>
        </Group>
        <Group>
          <Text>Bid amount:</Text> <Text fw={700}>{tempValue || lot.bid}</Text>
          <Group spacing={2}>
            {"("}
            <Text fw={700} color="green" mx={0}>
              +{increment}
            </Text>
            {")"}
          </Group>
        </Group>

        <Space h={30} />
        <Group spacing={30} ml={110}>
          <Button radius="sm" onClick={makeBid}>
            <IconGavel size="1.05rem" stroke={1.5} />
            <Space w={10} />
            Place Your Bid
          </Button>
          <Button size="xs" color="red" radius="sm" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Modal
        opened={quitModalOpened}
        onClose={closeQuitModal}
        title="Confirm Auction Exit"
        centered
      >
        <Space h={15} />
        <Text ta="left" size="lg" fw={500}>
          Are you sure that you want to exit the auction for this lot?
        </Text>
        <Space h={15} />
        <Text ta="left" size="lg" fw={500}>
          You will not have the option to participate in this auction again.
        </Text>
        <Space h={25} />
        <Group>
          <Text>Lot #:</Text> <Text fw={700}>20212</Text>
        </Group>

        <Space h={30} />
        <Group spacing={30} ml={130}>
          <Button
            radius="sm"
            color="red"
            onClick={() => {
              setStatus("finished");
              closeQuitModal();
            }}
          >
            <IconDoorExit size="1.05rem" stroke={1.5} />
            <Space w={10} />
            Quit Auction
          </Button>
          <Button size="xs" radius="sm" onClick={closeQuitModal}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Card
        p={15}
        radius="md"
        // className={classes.card}
        {...(status === "finished"
          ? { className: classes.cardWinning }
          : { className: classes.card })}
        maw={900}
        mx="auto"
      >
        <Card.Section className={classes.section} p={20} bg={"#F5F5F5"}>
          <Stack spacing={6} align="flex-start">
            <Grid w={"100%"} maw={750}>
              <Grid.Col xs={12} {...(!half ? { lg: 2 } : { lg: 4 })}>
                <Text fz="sm" c="dimmed" className={classes.label} align="left">
                  Unit details
                </Text>
              </Grid.Col>
              {unitFeatures}
            </Grid>
          </Stack>
        </Card.Section>

        {status === "live" && (
          <Card.Section className={classes.section}  >
            <Grid align="center" justify="center">
              <Grid.Col span="auto">
                <Grid>
                  <Grid.Col xs={6} sm={10} {...(half ? { md: 6 } : { md: 12 })}>
                    <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                      ${(value || (lot.price + 100) * 1000).toLocaleString()}
                    </Text>
                    <Text
                      fz="sm"
                      c="dimmed"
                      fw={500}
                      sx={{ lineHeight: 1 }}
                      mt={3}
                    >
                      current bid
                    </Text>
                  </Grid.Col>

                  <Grid.Col xs={6} sm={10} {...(half ? { md: 6 } : { md: 12 })}>
                    <Text fz="lg" fw={500} sx={{ lineHeight: 1 }}>
                      ${(lot.price * 1000).toLocaleString()}
                    </Text>
                    <Text
                      fz="sm"
                      c="dimmed"
                      fw={400}
                      sx={{ lineHeight: 1 }}
                      mt={3}
                    >
                      starting price
                    </Text>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
              <Grid.Col span="auto">
                <Center>
                  <PricePlot />
                </Center>
              </Grid.Col>

            </Grid>
          </Card.Section>
        )}

        {status === "finished" && (
          <Card.Section className={classes.section}>
            <Space h={10} />
            <Title order={4} h={55}>
              {lot.place === 1
                ? `You are the winner of the lot #${lot.unit}!` +
                  "\r\n" +
                  "Congratulations!"
                : lot.place === 2
                ? "You finished on 2nd place!" +
                  "\r\n" +
                  "You can become the winner of the auction if the winner resigns"
                : ""}
            </Title>
            <Space h={15} />
            <Text>
              You will receive an email with further instructions shortly
            </Text>

            <Space h={20} />

            <Group>
              <Text fz="md" c="dimmed" fw={500}>
                Starting price
              </Text>
              <Text fz="lg" fw={500} sx={{ lineHeight: 1 }}>
                ${(lot.price * 1000).toLocaleString()}
              </Text>
            </Group>
            <Group>
              <Text fz="md" c="dimmed" fw={500}>
                Winning bid
              </Text>
              <Text fz="lg" fw={700}>
                ${(value || (lot.price + 100) * 1000).toLocaleString()}
              </Text>
            </Group>

            {lot.place !== 1 && (
              <Group>
                <Text fz="md" c="dimmed" fw={500}>
                  Your bid
                </Text>
                <Text fz="lg" fw={700}>
                  ${(lot.bid * 1000).toLocaleString()}
                </Text>
              </Group>
            )}
          </Card.Section>
        )}

        {status === "live" && (
          <Card.Section className={classes.section} bg="#E8F5E9">
            <Grid align="center" justify="center">
              <Grid.Col span={12}>
                <Grid>
                  <Grid.Col xs={12} lg={6}>
                    <Space h={10} />
                    {currentPlace === 1 ? (
                      <Text fz="md" c="dimmed" fw={500}>
                        Your bid is winning!
                      </Text>
                    ) : (
                      <Text fz="md" c="dimmed" fw={500}>
                        Winning bid: $
                        {(value || (lot.price + 100) * 1000).toLocaleString()}
                      </Text>
                    )}
                    <Space h={10} />
                    <Countdown
                      date={Date.now() + remainingTime}
                      renderer={ShowCounter}
                      onComplete={() => setStatus("finished")}
                      onTick={({ total }) => {
                        setRemainingTime(total);
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col xs={12} lg={6}>
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
                            Participants
                          </Text>
                        </Group>
                      </Stack>
                      <Stack spacing="3" align="center">
                        <Group>
                          <Text fz="lg" fw={700}>
                            ${(value || lot.bid * 1000).toLocaleString()}
                          </Text>
                        </Group>
                        <Group>
                          <Text fz="md" fw={700}>
                            {currentPlace}
                          </Text>
                        </Group>
                        <Group>
                          <Text fz="md" fw={700}>
                            5
                          </Text>
                        </Group>
                      </Stack>
                    </Group>
                  </Grid.Col>
                </Grid>
              </Grid.Col>

              <Grid.Col span={12}>
                <Text size={"sm"} mb={4}>
                  You can raise your bid in 1% increments
                </Text>
                <Text size={"sm"} mb={10}>
                  You bid will be live for <b>15 minutes</b>
                </Text>

                <Stack align="center" spacing={5}>
                  {valueChanged ? (
                    <Text color="green" fw={700} fz={17}>
                        + {lot.bid * 1000 * 0.01}
                      </Text>
                  ) : (
                    <Space h={26.64} />
                  )}

                  <BidSelector
                    value={tempValue}
                    setValue={setTempValue}
                    className={classes.bidSelector}
                    lot={lot}
                    step={lot.bid * 1000 * 0.01}
                    incrementActive={!valueChanged}
                    decrementActive={valueChanged}
                  />
                  <Space h={10} />
                  <Group spacing={30} ml={135}>
                    <Button radius="lg" onClick={openConfirmModal}>
                      Place Your Bid
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      radius="lg"
                      onClick={openQuitModal}
                    >
                      Quit Auction
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>
            {/* </Paper> */}
          </Card.Section>
        )}
      </Card>
    </>
  );
}
