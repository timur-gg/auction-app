import {
  Container,
  Space,
  Card,
  Grid,
  Stack,
  Image,
  Text,
  createStyles,
  rem,
  Button,
  Flex,
  Group,
  Modal,
  List,
  Checkbox,
  Title,
  Tooltip,
  ThemeIcon,
  Center,
} from "@mantine/core";
import AuctionProfileCard from "./AuctionProfileCard";
import AuctionConfirmation from "./AuctionConfirmation";
import { LotPreviewTable } from "./LotPreviewTable";
import { useState } from "react";
import { LotSelectionTable } from "./LotSelectionTable";
import { notifications } from "@mantine/notifications";

import {
  IconArrowLeft,
  IconCalendarEvent,
  IconCircleCheck,
  IconClock,
  IconMoneybag,
} from "@tabler/icons-react";
import { MRT_RowSelectionState } from "mantine-react-table";
import { lots } from "../../data.js";
import text from "../../text.js";

import { useDisclosure } from "@mantine/hooks";
import AuctionProfileCardVert from "./AuctionProfileCardVert";
// import mapImg from;

var mapImg = require("../../img/map.png");

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
  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const mockdata = [
  { label: "auctionDate", icon: IconCalendarEvent, desc: "Auction Date" },
  { label: "deposit", icon: IconMoneybag, desc: "Deposit Amount" },
  { label: "duration", icon: IconClock, unit: "hrs", desc: "Auction Duration" },
];

// const FILTER_MAP: { [char: string]: any } = {
//   All: () => true,
//   priceRange: (auction: any) =>
//     auction.price >= (priceRange[0] + 20) * 12.5 &&
//     auction.price <= (priceRange[1] + 20) * 12.5,

//   size: (auction: any) =>
//     auction.size >= (size[0] + 20) * 12.5 &&
//     auction.size <= (size[1] + 20) * 12.5,
//   bedroom: (auction: any) => {
//     if (bedroom === -1) return true;
//     else if (bedroom === 3) return auction.bedroom >= 3;
//     else return auction.bedroom === bedroom;
//   },
//   floor: (auction: any) =>
//   auction.floor >= floor[0] &&
//   auction.size <= floor[1],
// };

export function AuctionUpcoming(props: any) {
  const { classes } = useStyles();
  const [step, setStep] = useState(1);

  const auction = props.auction;

  const auctionFeatures = mockdata.map((feature) => (
    <Grid.Col xs={4} py={5} key={feature.label}>
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
        <Group spacing="1">
          <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
          <Text size="sm">
            {auction[feature.label] + (feature.unit ? feature.unit : "")}
          </Text>
        </Group>
      </Tooltip>
    </Grid.Col>
  ));

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  console.log(rowSelection);

  const selectedUnits = Object.keys(rowSelection).map((key: string) => (
    <Text size="sm" key={key}>
      Unit {lots[parseInt(key)].unit} - {lots[parseInt(key)].bedroom} bedroom{" "}
    </Text>
  ));

  const conditionText = text.auctionRules.map((rule) => (
    <List.Item>
      <Title order={5}>{rule.title}</Title>
      {rule.text}
    </List.Item>
  ));

  function signUpAction() {
    if (Object.keys(rowSelection).length) {
      console.log(rowSelection.length);
      setStep(3);
    } else {
      notifications.show({
        autoClose: 1500,
        title: "Lots not selected",
        color: "red",
        message: "Please select 1 to 2 lots from the table",
      });
    }
  }

  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  return (
    <Container className="Auction" maw={1200}>
      {step < 3 && (
        <AuctionProfileCard
          auction={auction}
          {...(step === 1 ? { cardSize: "full" } : { cardSize: "mini" })}
        />
      )}

      {step < 3 && <Space h={10} />}

      <Grid justify="center">
        {step === 3 && (
          <Grid.Col xs={10} sm={3}>
            <AuctionProfileCardVert auction={auction} />
          </Grid.Col>
        )}

        {step < 3 && (
          <Grid.Col {...(step === 1 ? { md: 8.5 } : { xs: 12, sm: 8 })}>
            {step === 1 && (
              <Card
                withBorder
                p={15}
                radius="md"
                className={classes.card}
                maw={1200}
                mx="auto"
              >
                {step === 1 && (
                  <Flex direction="row">
                    <Button
                      variant="light"
                      color="blue"
                      mr={"auto"}
                      onClick={() => setStep(2)}
                    >
                      Select Units →
                    </Button>
                  </Flex>
                )}

                <Space h={10} />

                <LotPreviewTable />
              </Card>
            )}

            {step === 2 && (
              <LotSelectionTable
                lots={lots}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                backButtonAction={() => setStep(1)}
              />
            )}
          </Grid.Col>
        )}
        {step === 2 && (
          <Grid.Col xs={10} sm={4}>
            <Card
              withBorder
              p={0}
              radius="md"
              className={classes.card}
              maw={1000}
              mx="auto"
            >
              <Stack spacing={6} mb={-5} align="flex-start" bg="#EFEBE9" p={15}>
                <Text fz="sm" c="dimmed" className={classes.label} align="left">
                  Auction details
                </Text>

                <Grid w={"100%"}>{auctionFeatures}</Grid>
              </Stack>
              <Space h={10} />
              <Stack spacing={6} mb={-5} align="flex-start" p={15}>
                <Text fz="sm" align="left">
                  Select units from the table on the left.
                  <br />
                  You can pick up to 3 units to participate in the auction
                </Text>

                <Space h={7} />

                <Text fz="md" c="dimmed" className={classes.label} align="left">
                  Selected Units
                </Text>

                {selectedUnits.length === 0 && (
                  <Text size="sm">No units selected</Text>
                )}

                {selectedUnits.length > 0 && (
                  <Stack spacing={4}>{selectedUnits}</Stack>
                )}

                <Space h={10} />
                <Button
                  // variant="dark"
                  color="green"
                  mr={"auto"}
                  // onClick={openModal}
                  onClick={signUpAction}
                >
                  Sign Up for Auction
                </Button>

                <Modal
                  opened={modalOpened}
                  onClose={closeModal}
                  title="AuctionRegister"
                >
                  <AuctionConfirmation />
                </Modal>
              </Stack>
            </Card>
          </Grid.Col>
        )}
        {step === 3 && (
          <Grid.Col xs={10} sm={9}>
            <Card
              withBorder
              p={8}
              radius="md"
              className={classes.card}
              maw={1000}
              mx="auto"
              pb={20}
            >
              <Grid bg="#EFEBE9">
                <Grid.Col span={6} p={0}>
                  <Stack spacing={6} align="flex-start" p={15}>
                    <Text
                      fz="sm"
                      c="dimmed"
                      className={classes.label}
                      align="left"
                    >
                      Auction details
                    </Text>
                    <Grid w={"100%"} maw={400}>
                      {auctionFeatures}
                    </Grid>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6} p={0}>
                  <Stack spacing={6} align="flex-start" p={15}>
                    <Text
                      fz="sm"
                      c="dimmed"
                      className={classes.label}
                      align="left"
                    >
                      Selected Units
                    </Text>
                    {selectedUnits.length === 0 && (
                      <Text size="sm">No units selected</Text>
                    )}

                    {selectedUnits.length > 0 && (
                      <Group spacing={15}>{selectedUnits}</Group>
                    )}
                  </Stack>
                </Grid.Col>
              </Grid>

              <Space h={15} />
              <Container p={15} maw={700}>
                <Title order={4}>Auction Rules</Title>
                <Space h={20} />

                <List
                  type="ordered"
                  spacing="xs"
                  size="sm"
                  ta="left"
                  icon={
                    <ThemeIcon color="teal" size={30} radius="xl">
                      <IconCircleCheck size="1.5rem" />
                    </ThemeIcon>
                  }
                >
                  {conditionText}
                </List>
                <Space h={30} />
              </Container>

              <Center>
                <Group spacing={40}>
                  <Button
                    variant="light"
                    color="blue"
                    mr={"10rem"}
                    onClick={() => setStep(2)}
                  >
                    ← Back
                  </Button>
                  <Checkbox size="md" label="I agree to the auction rules" />
                  <Button
                    // variant="dark"
                    color="green"
                    mr={"auto"}
                    // onClick={openModal}
                    onClick={() => setStep(3)}
                  >
                    Confirm & Sign Up
                  </Button>
                </Group>
              </Center>
            </Card>
          </Grid.Col>
        )}

        {step === 1 && (
          <Grid.Col md={3.5}>
            <Card
              withBorder
              p={15}
              radius="md"
              className={classes.card}
              maw={1000}
              mx="auto"
            >
              <Image src={mapImg} />
            </Card>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}
