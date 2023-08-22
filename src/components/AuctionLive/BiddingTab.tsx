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
} from "@mantine/core";
import PricePlot from "./PricePlot";
import { BidSelector } from "./BidSelector";
import ShowCounter from "./ShowCounter";
import { useDisclosure } from "@mantine/hooks";

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
    // borderTop: `${rem(1)} solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
  },
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

  { label: "size", icon: IconRuler, unit: "sqft", sz: 1.6666 },
  { label: "parking", icon: IconCar, sz: 1 },
  { label: "locker", icon: IconLock, sz: 1 },
  { label: "bathroom", icon: IconBath, sz: 1 },
];

export function BiddingTab(props: any) {
  const { classes } = useStyles();

  const [
    confirmModalOpened,
    { open: openConfirmModal, close: closeConfirmModal },
  ] = useDisclosure(false);
  const [quitModalOpened, { open: openQuitModal, close: closeQuitModal }] =
    useDisclosure(false);

  console.log(props);

  const lot = props.lot;

  const currentPlace = lot.place || 2;

  const half = props.half || false;

  const [tempValue, setTempValue] = useState<number | 0>(lot.bid * 1000 * 1.03);
  const [value, setValue] = useState<number | "">(0);

  console.info(lot);

  console.log(lot.bid);

  const unitFeatures = unitMockdata.map((feature) => (
    <Grid.Col
      xs={4}
      {...(!half ? { lg: feature.sz } : { lg: 2.5 })}
      py={5}
      key={feature.label}
    >
      <Group spacing="1">
        <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
        <Text size="sm">
          {lot[feature.label] + (feature.unit ? feature.unit : "")}
        </Text>
      </Group>
    </Grid.Col>
  ));

  const makeBid = () => {
    setValue(tempValue);
    closeConfirmModal();
  };

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
        <Text ta="center" size="xl" fw={400}>
          Are you sure that you want to exit the auction for this lot?
        </Text>
        <Text ta="center" size="xl" fw={400}>
          You will not have an option to participate in this auction again.
        </Text>
        <Space h={25} />
        <Group>
          <Text>Lot #:</Text> <Text fw={700}>20212</Text>
        </Group>

        <Space h={30} />
        <Group spacing={30} ml={110}>
          <Button radius="sm">
            <IconDoorExit color="red" size="1.05rem" stroke={1.5} />
            <Space w={10} />
            Quit Auction
          </Button>
          <Button size="xs" radius="sm" onClick={closeQuitModal}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Card
        withBorder
        p={15}
        radius="md"
        className={classes.card}
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

        <Card.Section className={classes.section} pb={0}>
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
        <Card.Section className={classes.section} bg="#E8F5E9">
          <Grid align="center" justify="center">
            <Grid.Col span={12}>
              <Grid>
                <Grid.Col span={6}>
                  <Space h={10} />
                  {currentPlace === 1 ? (
                    <Text fz="md" c="dimmed" fw={500}>
                      Your bid is winning!
                    </Text>
                  ) : (
                    <Text fz="md" c="dimmed" fw={500}>
                      Winning bid
                    </Text>
                  )}
                  <Space h={10} />
                  <ShowCounter days={-1} hours={-1} minutes={5} seconds={10} />
                </Grid.Col>
                <Grid.Col span={6}>
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
                You can raise your bid in 3% increments
              </Text>
              <Text size={"sm"} mb={10}>
                You bid will be live for <b>15 minutes</b>
              </Text>

              <Stack align="center">
                <BidSelector
                  value={tempValue}
                  setValue={setTempValue}
                  className={classes.bidSelector}
                  lot={lot}
                />
                <Group spacing={30} ml={130}>
                  <Button radius="xl" onClick={openConfirmModal}>
                    Place Your Bid
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    radius="xl"
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
      </Card>
    </>
  );
}
