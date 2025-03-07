import { useState, useRef } from "react";
import {data} from "../data";

import {
  createStyles,
  Container,
} from '@mantine/core';
import { useParams } from "react-router";
import { AuctionLive } from "../components/AuctionLive/AuctionLive.js";
import { AuctionPassed } from "../components/AuctionPassed/AuctionPassed.js";
import { AuctionNotStarted } from "../components/AuctionUpcoming/AuctionNotStarted.js";
import { inventoryAuctionStyle } from '../styles/theme.ts';

const useStyles = createStyles((theme: MantineTheme ) =>
  inventoryAuctionStyle(theme)
);

const Auction = () => {
  const { id } = useParams();
  const { classes } = useStyles();

  const [auctionStep, setAuctionStep] = useState(1);
  const auction =
    data.auctionData.find((x) => x.id === id) || data.auctionData[0];

  return (
    <Container className="Auction" maw={1500}>
      {auction.status === "upcoming" && (
        <AuctionNotStarted auction={auction} step={auctionStep} />
      )}

      {auction.status === "Live Auction" && (
        <AuctionLive auction={auction} step={auctionStep} />
      )}

      {auction.status === "passed" && (
        <AuctionPassed auction={auction} step={auctionStep} />
      )}
    </Container>
  );
};

export default Auction;
