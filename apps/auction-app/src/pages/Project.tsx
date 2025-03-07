import React from "react";
import { useState, useRef } from "react";
import {data} from "../data.js";

import { createStyles, Container, MantineTheme } from '@mantine/core';
import { useParams } from "react-router";
import { AuctionUpcoming } from "../components/AuctionUpcoming/AuctionUpcoming.js";
import { AuctionLive } from "../components/AuctionLive/AuctionLive.js";
import { AuctionPassed } from "../components/AuctionPassed/AuctionPassed.js";
import { projectStyle } from '../styles/theme.ts';

const useStyles = createStyles((theme: MantineTheme) =>
  projectStyle(theme)
);

const Project = (props: any) => {
  const registered = props.registered || false;
  const { id } = useParams();
  const [auctionStep, setAuctionStep] = useState(1);
  const auction =
    data.auctionData.find((x) => x.id === id) || data.auctionData[0];

  return (
    <Container className="Auction" maw={1500}>
      {auction.status === "upcoming" && (
        <AuctionUpcoming
          auction={auction}
          step={auctionStep}
          registered={registered}
        />
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

export default Project;
