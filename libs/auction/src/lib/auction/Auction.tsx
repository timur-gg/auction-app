import { useState, useRef } from 'react';
import { createStyles, Container, CSSObject } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { AuctionLive } from '../AuctionLive/AuctionLive.tsx';
import { AuctionPassed } from '../AuctionPassed/AuctionPassed.tsx';
import { AuctionNotStarted } from '../AuctionNotStarted/AuctionNotStarted.tsx';
import { inventoryAuctionStyle } from '../theme/theme.ts';
import { auctionData } from '@auction-app/models';

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
