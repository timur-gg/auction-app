import React from "react";
import AuctionProfileCard from "../components/auction/AuctionProfileCard";
import ShowCounter from "../components/auction/ShowCounter";

import PricePlot from "../components/auction/PricePlot";

import { useState, useRef } from "react";
import data from "../data.js";

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
  Center,
  Container,
  Paper,
} from "@mantine/core";
import { useParams } from "react-router";
import { AuctionUpcoming } from "../components/auction/AuctionUpcoming";
import { AuctionLive } from "../components/auction/AuctionLive";



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

const Auction = () => {
  const { id } = useParams();
  const { classes } = useStyles();
  
  const [auctionStep, setAuctionStep] = useState(1);
  const auction =
    data.auctionData.find((x) => x.id === id) || data.auctionData[0];

  return (
    <Container className="Auction" maw={1500}>

      {auction.status === "upcoming" && (
        <AuctionUpcoming auction={auction} step={auctionStep}/>
      )}
      
      {auction.status === "Live Auction" && (
        <AuctionLive auction={auction} step={auctionStep} />
      )}

      
    </Container>
  );
};

export default Auction;
