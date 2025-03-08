import React from 'react';
import { useState, useRef } from 'react';
import { auctionData } from '@mocks/auction.tsx';
import { createStyles, Container, CSSObject } from '@mantine/core';
import { useParams } from 'react-router';
import { AuctionUpcoming } from '../components/AuctionUpcoming/AuctionUpcoming.js';
import { AuctionLive } from '../components/AuctionLive/AuctionLive.js';
import { AuctionPassed } from '../components/AuctionPassed/AuctionPassed.js';
import { projectStyle } from '../styles/theme.ts';

const useStyles = createStyles(
  (theme): Record<string, CSSObject> =>
    projectStyle(theme) as Record<string, CSSObject>,
);

const Project = ({ registered = false }: { registered: boolean }) => {
  const { id } = useParams();
  const [auctionStep, setAuctionStep] = useState(1);
  const auction = auctionData.find((x) => x.id === id) || auctionData[0];

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
};

export default Project;
