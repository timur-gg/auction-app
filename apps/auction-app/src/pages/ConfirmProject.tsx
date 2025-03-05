import React, { FormEvent, useEffect } from "react";
import { useState, useRef } from "react";
import ExampleDoc from "../assets/terms_conditions.pdf";
import "react-chat-widget/lib/styles.css";
import {
  Button,
  Card,
  Grid,
  Group,
  Space,
  Tabs,
  ThemeIcon,
  Text,
  createStyles,
  rem,
  Image,
  Container,
} from "@mantine/core";
import { ref } from "firebase/database";
import { database } from "../db/firebase.js";

import {
  useDatabaseSnapshot,
  useDatabaseUpdateMutation,
} from "@react-query-firebase/database";

import { IconCheck, IconFileDatabase, IconPencil } from "@tabler/icons-react";
import AuctionProfileCardEdit from "../components/Confirm/AuctionProfileCardEdit.js";
import {data} from "../data.js";
import { useParams } from "react-router-dom";
import AuctionProfileCard from "../components/AuctionUpcoming/AuctionProfileCard.js";
import AuctionDetails from "../components/AuctionUpcoming/AuctionDetails.js";
import AuctionDetailsEdit from "../components/Confirm/AuctionDetailsEdit.js";
import { LotSelectionTable } from "../components/AuctionUpcoming/LotSelectionTable.js";
import { UnitTableEdit } from "../components/Confirm/UnitTableEdit.js";
import { lots } from "../data.js";
import FileDrop from "../components/signup/FileDrop.js";
import { Carousel } from "@mantine/carousel";
import RUG from "react-upload-gallery";
import "../components/Confirm/rug_style.css";
import AuctionCard from "../components/inventory/AuctionCard.js";

import floorPlan1 from "../assets/floorPlan1.png";
import floorPlan2 from "../assets/floorPlan2.png";
import floorPlan3 from "../assets/floorPlan3.png";
import floorPlan4 from "../assets/floorPlan4.png";
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
}));

const floorPlans = [
floorPlan1,
floorPlan2,
floorPlan3,
floorPlan4,

];

const tabs = ["overview", "details", "units", "plans", "card"];

export default function ConfirmProject(props: any) {
  const { classes } = useStyles();
  const { id } = useParams();

  const [editAction, setEditAction] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const auction =
    data.auctionData.find((x) => x.id === id) || data.auctionData[0];

  const initialPlanGallery = floorPlans.map((link: string) => ({
    size: "200kb",
    name: "1",
    source: link,
  }));

  const removeImage = (currentImage: any, images: any) => {};
  const [plansGalleryOpen, setPlansGalleryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("overview");

  const [confirmedTabs, setConfirmedTabs] = useState<string[]>([]);

  const plansImagesModal = floorPlans.map((image: any) => (
    <Carousel.Slide key={1}>
      <Image src={image} alt="Image1" width="100%" height={340} />
    </Carousel.Slide>
  ));

  const onTabChange = (tab: string) => {
    setEditAction(false);
    setActiveTab(tab);
  };

  const allTabsConfirmed = tabs.every((tab) => confirmedTabs.includes(tab));

  useEffect(() => {
    const allTabsConfirmed = tabs.every((tab) => confirmedTabs.includes(tab));

    if (allTabsConfirmed && submitStatus !== "Ready for Auction") {
      setActiveTab("final");
    }
  }, [confirmedTabs]);

  const confirmAction = (tab: string) => {
    console.log("CONFIRMING", tab);
    setEditAction(false);
    setConfirmedTabs([...confirmedTabs, tab]);

    const allTabsConfirmed = tabs.every((tab) => confirmedTabs.includes(tab));
    if (!allTabsConfirmed) {
      const nextTab = (tabs.indexOf(tab) + 1) % tabs.length;
      setActiveTab(tabs[nextTab]);
    }
  };

  const dbRef = ref(database, `projects/${id}`);
  const mutation = useDatabaseUpdateMutation(dbRef);

  useDatabaseSnapshot(
    [`projects/${id}`],
    dbRef,
    { subscribe: true },
    {
      onSuccess(snapshot: any) {
        const proj = snapshot.val();

        console.log(proj.status);
        setSubmitStatus(proj.status);

        if (
          proj.status === "Ready for Auction" ||
          proj.status === "In Review"
        ) {
          setSubmitted(true);
          setConfirmedTabs(tabs);
          setActiveTab("overview");
        }
      },
      onError(error: any) {
        console.log(error);
      },
    }
  );

  const submitAuction = () => {
    console.log("submitting");
    mutation.mutate({
      status: "Ready for Auction",
    });
  };

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      maw={1200}
      mx="auto"
      pt="0"
    >
      <Tabs
        defaultValue="overview"
        pt="15px"
        value={activeTab}
        // onChange={setActiveTab}
      >
        <Tabs.List>
          <Tabs.Tab
            fz="large"
            px="xl"
            fw={500}
            value="overview"
            onClick={() => {
              onTabChange("overview");
            }}
            icon={
              <ThemeIcon
                radius="xl"
                size="xs"
                color={confirmedTabs.includes("overview") ? "green" : "gray"}
              >
                <IconCheck />
              </ThemeIcon>
            }
          >
            Overview
          </Tabs.Tab>
          <Tabs.Tab
            fz="large"
            px="xl"
            fw={500}
            value="details"
            onClick={() => {
              onTabChange("details");
            }}
            icon={
              <ThemeIcon
                radius="xl"
                size="xs"
                color={confirmedTabs.includes("details") ? "green" : "gray"}
              >
                <IconCheck />
              </ThemeIcon>
            }
          >
            Details
          </Tabs.Tab>
          <Tabs.Tab
            fw={500}
            px="xl"
            value="units"
            fz="large"
            onClick={() => {
              onTabChange("units");
            }}
            icon={
              <ThemeIcon
                radius="xl"
                size="xs"
                color={confirmedTabs.includes("units") ? "green" : "gray"}
              >
                <IconCheck />
              </ThemeIcon>
            }
          >
            Units
          </Tabs.Tab>
          <Tabs.Tab
            fw={500}
            px="xl"
            value="plans"
            onClick={() => {
              onTabChange("plans");
              setPlansGalleryOpen(true);
            }}
            fz="large"
            icon={
              <ThemeIcon
                radius="xl"
                size="xs"
                color={confirmedTabs.includes("plans") ? "green" : "gray"}
              >
                <IconCheck />
              </ThemeIcon>
            }
          >
            Floor Plans
          </Tabs.Tab>
          <Tabs.Tab
            fw={500}
            px="xl"
            value="card"
            onClick={() => {
              onTabChange("card");
            }}
            fz="large"
            //   onClick={() => setPlansGalleryOpen(true)}
            icon={
              <ThemeIcon
                radius="xl"
                size="xs"
                color={confirmedTabs.includes("card") ? "green" : "gray"}
              >
                <IconCheck />
              </ThemeIcon>
            }
          >
            Project Card
          </Tabs.Tab>

          {allTabsConfirmed && (
            <Tabs.Tab
              fw={500}
              px="xl"
              value="final"
              onClick={() => {
                onTabChange("final");
              }}
              fz="large"
              //   onClick={() => setPlansGalleryOpen(true)}
              bg="#DCEDC8"
            >
              {submitStatus === "Ready for Auction"
                ? "Ready for Auction"
                : "Submit"}
            </Tabs.Tab>
          )}
        </Tabs.List>

        <Space h={30} />
        <Tabs.Panel value="overview" pt="0">
          {editAction ? (
            <AuctionProfileCardEdit auction={auction} cardSize="full" />
          ) : (
            <AuctionProfileCard auction={auction} cardSize="full" />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="details" pt="0">
          {editAction ? (
            <AuctionDetailsEdit auction={auction} />
          ) : (
            <AuctionDetails auction={auction} />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="units" pt="0">
          {editAction ? (
            <Grid>
              <Grid.Col xs={12} md={10} lg={9}>
                <UnitTableEdit
                  lots={lots}
                  rowSelection={{}}
                  setRowSelection={() => {}}
                  // rowSelection={rowSelection}
                  // setRowSelection={setRowSelection}
                  // backButtonAction={() => setStep(1)}
                />
              </Grid.Col>
              <Grid.Col xs={11} md={2} lg={3}>
                <Grid>
                  <Grid.Col xs={6} md={12} mb={30}>
                    <Space h={50} />

                    <Button>
                      <IconFileDatabase stroke={1.5} />
                      <Space w={10} />
                      Donwload Units table
                    </Button>
                  </Grid.Col>
                  <Grid.Col xs={6} md={12}>
                    <Text size="lg">Upload new Units table</Text>
                    <Space h={10} />

                    <FileDrop />
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          ) : (
            <LotSelectionTable
              lots={lots}
              rowSelection={{}}
              setRowSelection={() => {}}
              // rowSelection={rowSelection}
              // setRowSelection={setRowSelection}
              // backButtonAction={() => setStep(1)}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="plans" pt="0">
          {editAction ? (
            plansGalleryOpen && (
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
                {plansImagesModal}
              </Carousel>
            )
          ) : (
            <Container maw={900}>
              <RUG
                // action="http://example.com/upload"
                initialState={initialPlanGallery}
                accept={["jpg", "jpeg", "png"]}
                onChange={(images: any) => {
                  console.log(images);
                  // this.setState({ images }); // save current component
                }}
                onConfirmDelete={(currentImage: any, images: any) => {
                  removeImage(currentImage, images);
                }}
                onSuccess={(image: any) => {
                  console.log("ima:ge", image);
                }}
              />
            </Container>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="card" pt="0">
          <Container maw={600}>
            <AuctionCard
              status={auction.status}
              id={auction.id}
              image={auction.images[0].toString()}
              size={auction.size.toString()}
              price={auction.price[0] || auction.minPrice}
              name={auction.name}
              address={auction.address}
              bedroom={auction.bedroom}
              builder={auction.builder}
              completionDate={auction.completionDate}
              auctionDate={auction.auctionDate}
              deposit={auction.deposit}
              bathroom={auction.bathroom}
              parking={auction.parking}
              locker={auction.locker}
            />
          </Container>
        </Tabs.Panel>
        <Tabs.Panel value="final" pt="0">
          <Space h={30} />

          {!submitted ? (
            <>
              <Text size="lg" fw="500">
                Do you want to confirm all the details of the project?
              </Text>

              <Space h={30} />

              <Button
                size="lg"
                color="green"
                onClick={() => {
                  submitAuction();
                  setSubmitted(true);
                }}
              >
                Submit Project
                <Space w={10} />
                <IconCheck size={20} />
              </Button>
            </>
          ) : (
            <>
              {submitStatus === "Ready for Auction" ? (
                <Text size="lg" fw="500">
                  Your project is ready for the upcoming auction!
                </Text>
              ) : (
                <Text size="lg" fw="500">
                  Project is submitted for review!
                </Text>
              )}
              <Space h={30} />
              <a href="/builder_profile">
                <Button color="blue">Go to My Profile</Button>
              </a>
            </>
          )}
        </Tabs.Panel>
        <Space h={30} />

        {activeTab != "final" && !submitted && (
          <Group>
            <Button size="lg" onClick={() => setEditAction(true)}>
              Edit Overview <Space w={10} />
              <IconPencil size={20} />
            </Button>

            {(editAction ||
              (activeTab && !confirmedTabs.includes(activeTab))) && (
              <Button
                size="lg"
                color="green"
                onClick={() => (activeTab ? confirmAction(activeTab) : "")}
              >
                Confirm{" "}
                {activeTab &&
                  activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                <Space w={10} />
                <IconCheck size={20} />
              </Button>
            )}
          </Group>
        )}
      </Tabs>
    </Card>
  );
}
