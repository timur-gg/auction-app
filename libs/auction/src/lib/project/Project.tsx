import React from 'react';
import { useState } from 'react';
import { auctionData, IAuction } from '@auction-app/models';
import { createStyles, Container, CSSObject } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { AuctionUpcoming } from '../AuctionUpcoming/AuctionUpcoming.js';
import { AuctionLive } from '../AuctionLive/AuctionLive.js';
import { AuctionPassed } from '../AuctionPassed/AuctionPassed.js';
import { projectStyle } from '../theme/theme.ts';

const useStyles = createStyles(
  (theme): Record<string, CSSObject> => projectStyle(theme),
);

export function Project({ registered = false }: { registered?: boolean }) {
  const { id } = useParams();
  const [auctionStep, setAuctionStep] = useState(1);
  const auction =
    auctionData.find((x: IAuction) => x.id === id) || auctionData[0];

  return (
    <Container className="Auction" maw={1500}>
      {auction.status === 'upcoming' && (
        <AuctionUpcoming
          auction={auction}
          step={auctionStep}
          registered={registered}
        />
      )}

      {auction.status === 'Live Auction' && (
        <AuctionLive auction={auction} step={auctionStep} />
      )}

      {auction.status === 'passed' && (
        <AuctionPassed auction={auction} step={auctionStep} />
      )}
    </Container>
  );
}

export default Project;
