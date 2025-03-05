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
  Tabs,
  Table,
} from "@mantine/core";
import AuctionProfileCard from "./AuctionProfileCard.js";
import AuctionConfirmation from "./AuctionConfirmation.js";
import AuctionDetails from "./AuctionDetails.js";

import { LotPreviewTable } from "./LotPreviewTable.js";
import { useState } from "react";
import { LotSelectionTable } from "./LotSelectionTable.js";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";

import {
  IconWriting,
  IconCalendarEvent,
  IconCircleCheck,
  IconClock,
  IconMoneybag,
  IconBed,
  IconRuler,
  IconHomeCancel,
} from "@tabler/icons-react";
import { MRT_RowSelectionState } from "mantine-react-table";
import { lots } from "../../data.js";
import {text} from "../../text.js";

import { useDisclosure } from "@mantine/hooks";
import AuctionProfileCardVert from "../AuctionLive/AuctionProfileCardVert.js";
import { Carousel } from "@mantine/carousel";
// import mapImg from;

const mapImg = require("../../img/map.png");

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

const distanceToMouse = (pt: any, mousePos: any): number => {
  if (pt && mousePos) {
    // return distance between the marker and mouse pointer
    return Math.sqrt(
      (pt.x - mousePos.x) * (pt.x - mousePos.x) +
        (pt.y - mousePos.y) * (pt.y - mousePos.y)
    );
  } else return 0;
};

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

const floorPlans = [
  require("../../assets/floorPlan1.png"),
  require("../../assets/floorPlan2.png"),
  require("../../assets/floorPlan3.png"),
  require("../../assets/floorPlan4.png"),
];

export function AuctionUpcoming(props: any) {
  const { classes } = useStyles();

  const [plansGalleryOpen, setPlansGalleryOpen] = useState(false);

  const auction = props.auction;
  const registered = props.registered || false;
  const pickedUnits = props.pickedUnits || ["2012", "1510"];

  const navigate = useNavigate();

  console.log(props);

  const [step, setStep] = useState(registered ? 2 : 1);

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

  console.log(registered);

  const pickedUnitsSelection: { [key: number]: any } = {};

  if (registered) {
    pickedUnits.forEach((num: string) => {
      lots.forEach((lot, i) => {
        if (lot.unit === num) {
          console.log(num, i);
          pickedUnitsSelection[i] = true;
        }
      });
    });
  }

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  if (registered && Object.keys(rowSelection).length === 0) {
    setRowSelection(pickedUnitsSelection);
  }

  console.log(pickedUnitsSelection, rowSelection);

  const selectedUnits = Object.keys(rowSelection).map((key: string) => (
    <Text size="sm" key={key}>
      Unit {lots[parseInt(key)].unit} - {lots[parseInt(key)].bedroom} bedroom{" "}
    </Text>
  ));

  const selectedUnitRows = Object.keys(rowSelection).map((key: string) => (
    <tr key={lots[parseInt(key)].id}>
      <td>{lots[parseInt(key)].unit}</td>
      <td>{lots[parseInt(key)].bedroom}</td>
      <td>{lots[parseInt(key)].size}sqft</td>
      <td>{lots[parseInt(key)].registeredTotal}</td>
    </tr>
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
        autoClose: 3000,
        title: "Lots not selected",
        color: "red",
        message: "Please select 1 to 2 lots from the table",
      });
    }
  }
  function saveLotsAction() {
    if (Object.keys(rowSelection).length) {
      notifications.show({
        autoClose: 3000,
        title: "Saved!",
        color: "yellow",
        message: "Lots are saved to Favorites",
      });
    } else {
      notifications.show({
        autoClose: 3000,
        title: "Lots not selected",
        color: "red",
        message: "Please select 1 to 2 lots from the table",
      });
    }
  }

  const Marker = ({ text, id, selected }: any) => {
    return (
      <div
        style={{
          width: "35px",
          height: "50px",
        }}
        // className={"pin2"}
        // onClick={(e) => handleClick(e, id)}
      >
        {/* <span className="circleText" title={id}>
          {text}
        </span> */}
        <img
          style={{
            width: "100%",
            height: "100%",
            filter: selected ? "contrast(150%)" : "",
          }}
          src={require("../../assets/pin.png")}
          alt="logo"
        />
      </div>
    );
  };

  const ImagesModal = floorPlans.map((image: any) => (
    <Carousel.Slide key={1}>
      <Image src={image} alt="Image1" width="100%" height={340} />
    </Carousel.Slide>
  ));

  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const [quitModalOpened, { open: openQuitModal, close: closeQuitModal }] =
    useDisclosure(false);

  return (
    <Container className="Auction" maw={1200}>
      {step < 3 && (
        <Card
          withBorder
          radius="md"
          className={classes.card}
          maw={1200}
          mx="auto"
          pt="0"
        >
          {step === 1 && (
            <Tabs defaultValue="gallery" pt="15px">
              <Tabs.List>
                <Tabs.Tab fz="large" px="xl" fw={500} value="gallery">
                  Overview
                </Tabs.Tab>
                <Tabs.Tab
                  fz="large"
                  px="xl"
                  fw={500}
                  value="messages"
                  // icon={<IconMessageCircle size="0.8rem" />}
                >
                  Details
                </Tabs.Tab>
                <Tabs.Tab
                  fw={500}
                  px="xl"
                  value="settings"
                  fz="large"
                  // icon={<IconSettings size="0.8rem" />}
                >
                  Deposit / Incentives
                </Tabs.Tab>
                <Tabs.Tab
                  fw={500}
                  px="xl"
                  value="plans"
                  fz="large"
                  onClick={() => setPlansGalleryOpen(true)}
                  // icon={<IconSettings size="0.8rem" />}
                >
                  Floor Plans
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="gallery" pt="0">
                {step < 3 && (
                  <AuctionProfileCard
                    auction={auction}
                    {...(step === 1
                      ? { cardSize: "full" }
                      : { cardSize: "mini" })}
                  />
                )}
              </Tabs.Panel>

              <Tabs.Panel value="messages" pt="0">
                <AuctionDetails auction={auction} />
              </Tabs.Panel>

              <Tabs.Panel value="plans" pt="lg" ta="left" p="2rem">
                {plansGalleryOpen && (
                  <Carousel
                    maw={750}
                    mah={350}
                    mx="auto"
                    slideSize="95%"
                    slideGap="sm"
                    align="center"
                    withIndicators
                    loop
                  >
                    {ImagesModal}
                  </Carousel>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="settings" pt="lg" ta="left" p="2rem">
                <Grid>
                  <Grid.Col span={6}>
                    <Text
                      fz="sm"
                      c="dimmed"
                      className={classes.label}
                      align="left"
                    >
                      Deposit structure
                    </Text>
                    <Text>
                      <List>
                        <List.Item>
                          5% Deposit structure on podium and standard suites
                        </List.Item>
                        <List.Item>
                          $10,000 on - Signing Balance to 5% in 30 Days 15% on
                          Occupancy
                        </List.Item>
                        <List.Item>
                          10% - extended deposit structure on penthouse suites
                        </List.Item>
                        <List.Item>$10,000 on signing</List.Item>
                        <List.Item>
                          Balance to 5% in 30 days 2.5% in 180 days 2.5% in 365
                          days 5% on Occupancy
                        </List.Item>
                      </List>
                    </Text>
                    <Space h={20} />
                    <Text size="xs">
                      * Certain terms and conditions may apply. Assignment Right
                      is subject to an additional $1,000.00 plus HST for
                      Vendor’s solicitor fees and processing fees and subject to
                      conditions at Vendor’s sole discretion. See Sales Rep for
                      details.
                    </Text>
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <Text
                      fz="sm"
                      c="dimmed"
                      className={classes.label}
                      align="left"
                    >
                      Incentives
                    </Text>
                    <List>
                      <List.Item>
                        <Title order={5}>
                          Special incentive program for your free assignment
                        </Title>
                      </List.Item>
                      <List.Item>Regular Assignment Fee of $10,000</List.Item>
                      <List.Item>
                        Permission to lease during occupancy* capped development
                        charges
                      </List.Item>
                      <List.Item>
                        $12,500 plus hst for 1 bedroom+den and smaller
                      </List.Item>
                      <List.Item>
                        $18,000 plus hst for 2 bedroom and larger limited time
                        Offer!
                      </List.Item>
                    </List>
                  </Grid.Col>
                </Grid>

                <Space h={30} />
              </Tabs.Panel>
            </Tabs>
          )}
          {step === 2 && (
            <AuctionProfileCard auction={auction} cardSize="mini" />
          )}
        </Card>
      )}

      <Space h={10} />

      <Grid justify="center">
        {step >= 3 && (
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
                  You can pick up to 2 units to participate in the auction
                </Text>

                <Space h={7} />

                <Text fz="md" c="dimmed" className={classes.label} align="left">
                  Selected Units
                </Text>

                {selectedUnits.length === 0 && (
                  <Text size="sm">No units selected</Text>
                )}

                {selectedUnits.length > 0 && (
                  // <Stack spacing={4}>{selectedUnits}</Stack>

                  <Table style={{ textAlign: "left" }}>
                    <thead>
                      <tr>
                        <th>Unit</th>
                        <th>
                          <IconBed size="1.2rem" />
                        </th>
                        <th>
                          <IconRuler size="1.2rem" />
                        </th>
                        <th style={{ maxWidth: "105px" }}>
                          Registered Participants
                        </th>
                      </tr>
                    </thead>
                    <tbody>{selectedUnitRows}</tbody>
                  </Table>
                )}

                <Modal
                  opened={quitModalOpened}
                  onClose={closeQuitModal}
                  title=""
                  centered
                >
                  <Text ta="center" size="md" fw={400}>
                    Are you sure that you want to remove your registration for
                    the auction?
                  </Text>

                  <Space h={25} />
                  <Group>
                    <Text>Project:</Text> <Text fw={700}>King West Towers</Text>
                  </Group>
                  <Group>
                    <Text>Lot #:</Text> <Text fw={700}>20212</Text>
                  </Group>
                  <Space h={30} />
                  <Group spacing={30} ml={80}>
                    <Button
                      radius="sm"
                      color="red"
                      onClick={() => {
                        // closeQuitModal();
                        notifications.show({
                          autoClose: 4000,
                          title: "Auction Registration Removed",
                          color: "red",
                          message:
                            "You registration for this auction is removed",
                        });
                        navigate(`/client_profile`);
                      }}
                    >
                      <IconHomeCancel size="1.6rem" stroke={1.5} />
                      <Space w={10} />
                      Remove Registration
                    </Button>

                    <Button size="xs" radius="sm" onClick={closeQuitModal}>
                      Cancel
                    </Button>
                  </Group>
                  <Space h={10} />
                </Modal>

                <Space h={10} />
                <Group spacing={10}>
                  <Button
                    // variant="dark"
                    color="green"
                    mr={"auto"}
                    onClick={signUpAction}
                  >
                    <IconWriting size="1.2rem" />
                    <Space w={7} />

                    {registered ? "Confirm Change" : "Sign Up for Auction"}
                  </Button>
                  {/* {!registered && selectedUnits.length > 0 && (
                    <Button
                      // variant="dark"
                      color="yellow"
                      mr={"auto"}
                      // onClick={openModal}
                      onClick={saveLotsAction}
                    >
                      <IconStar size="1.2rem" />
                      <Space w={7} />
                      Save
                    </Button>
                  )} */}
                  {registered && (
                    <Button
                      // variant="dark"
                      color="red"
                      mr={"auto"}
                      // onClick={openModal}
                      onClick={openQuitModal}
                    >
                      <IconHomeCancel size="1.2rem" />
                      <Space w={7} />
                      Remove Registration
                    </Button>
                  )}
                </Group>

                <Modal
                  opened={modalOpened}
                  onClose={closeModal}
                  title="Auction Registration"
                >
                  <AuctionConfirmation />
                </Modal>
              </Stack>
            </Card>
          </Grid.Col>
        )}
        {step >= 3 && (
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
              {step === 3 && (
                <>
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
                      <Checkbox
                        size="md"
                        label="I agree to the auction rules"
                      />
                      <Button
                        // variant="dark"
                        color="green"
                        mr={"auto"}
                        // onClick={openModal}
                        onClick={() => setStep(4)}
                      >
                        Confirm & Sign Up
                      </Button>
                    </Group>
                  </Center>
                </>
              )}
              {step === 4 && (
                <Container p={15} maw={700}>
                  <Title order={4}>Auction Registration</Title>

                  <Space h={20} />
                  <Text fw={500} size="xl">
                    Your registration is confirmed!
                  </Text>

                  <Space h={20} />
                </Container>
              )}
            </Card>
          </Grid.Col>
        )}

        {step === 1 && (
          <Grid.Col md={3.5}>
            <Card
              hidden={step != 1}
              withBorder
              p={15}
              radius="md"
              className={classes.card}
              maw={1000}
              mx="auto"
              h="400px"
            >
              {/* <Image src={mapImg} /> */}
              <GoogleMapReact
                bootstrapURLKeys={{
                  // remove the key if you want to fork
                  key: "AIzaSyB-iyAn3z8aIS8iMxHZaUwg8IWCkY_2Vh8",
                  language: "en",
                  region: "US",
                }}
                defaultCenter={{ lat: auction.lat, lng: auction.lng }}
                defaultZoom={15}
                distanceToMouse={distanceToMouse}
              >
                <Marker
                  key={auction.id}
                  lat={auction.lat}
                  lng={auction.lng}
                  text={auction.id}
                  id={auction.id}
                  icon={require("../../assets/pin.png")}
                  // selected={selectedAuction.toString() === id}
                />
              </GoogleMapReact>
            </Card>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}
