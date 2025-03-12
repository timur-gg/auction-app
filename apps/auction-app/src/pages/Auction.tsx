import { useState, useRef } from 'react';
import { createStyles, Container, CSSObject } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { AuctionLive } from '../components/AuctionLive/AuctionLive.js';
import { AuctionPassed } from '../components/AuctionPassed/AuctionPassed.js';
import { AuctionNotStarted } from '../components/AuctionUpcoming/AuctionNotStarted.js';
import { inventoryAuctionStyle } from '../styles/theme.ts';
import { auctionData } from '@mocks/auction.tsx';

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    inventoryAuctionStyle(theme) as Record<string, CSSObject>,
);

const Auction = () => {
  const { id } = useParams();
  const { classes } = useStyles();

  const [auctionStep, setAuctionStep] = useState(1);
  const auction = auctionData.find((x) => x.id === id) || auctionData[0];

  return (
    <Container className="Auction" maw={1500}>
      {auction.status === 'upcoming' && (
        <AuctionNotStarted auction={auction} step={auctionStep} />
      )}

      {auction.status === 'Live Auction' && (
        <AuctionLive auction={auction} step={auctionStep} />
      )}

      {auction.status === 'passed' && (
        <AuctionPassed auction={auction} step={auctionStep} />
      )}
    </Container>
  );
};

export default Auction;
