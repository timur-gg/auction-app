import { CSSObject, MantineTheme, rem } from '@mantine/core';


export const auctionUpcomingStyle = (theme: MantineTheme): Record<string, CSSObject>  => {
  return {
    card: {
      backgroundColor: theme.colors.white,
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
      textTransform: 'uppercase',
    },

    section: {
      padding: theme.spacing.md,
      borderTop: `${rem(1)} solid ${theme.colors.gray[3]}`,
    },
    bidButton: {
      marginTop: rem(30),
    },
    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};


export const auctionNotStartedStyle = (theme: MantineTheme): Record<string, CSSObject>  => {
  return {
    card: {
      backgroundColor: theme.colors.white,
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
      textTransform: 'uppercase',
    },

    section: {
      padding: theme.spacing.md,
    },
    bidButton: {
      marginTop: rem(30),
    },
    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};


export const auctionPassedStyle = (theme: MantineTheme): Record<string, CSSObject>  => {
  return {
    card: {
      backgroundColor: theme.colors.white,
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
      textTransform: 'uppercase',
    },

    section: {
      padding: theme.spacing.md,
    },
    bidButton: {
      marginTop: rem(30),
    },
    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};

export const auctionLiveStyle = (theme: MantineTheme): Record<string, CSSObject> => {
  return {
    card: {
      backgroundColor: theme.white,
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
      textTransform: 'uppercase',
    },
    section: {
      padding: theme.spacing.md,
    },
    bidButton: {
      marginTop: rem(30),
    },
    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};

export const inventoryAuctionStyle = (theme: MantineTheme): Record<string, CSSObject> => {
  return {
    card: {
      backgroundColor: theme.colors.white,
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
      textTransform: 'uppercase',
    },

    section: {
      padding: theme.spacing.md,
      borderTop: `${rem(1)} solid ${theme.colors.gray[3]}`,
    },
    bidButton: {
      marginTop: rem(30),
    },
  };
};

export const biddingTabStyle = (theme: MantineTheme): Record<string, CSSObject>  => {
  return {
    card: {
      backgroundColor: theme.colors.white,

      border: '0.0625rem solid #dee2e6',
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
      textTransform: 'uppercase',
    },

    section: {
      padding: theme.spacing.md,
    },

    cardWinning: {
      border: '2px solid #64DD17',
    },

    bidButton: {
      marginTop: rem(30),
    },
    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};

export const projectStyle = (theme: MantineTheme): Record<string, CSSObject>  => {
  return {
    card: {
      backgroundColor: theme.colors.white,
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
      textTransform: 'uppercase',
    },

    section: {
      padding: theme.spacing.md,
      borderTop: `${rem(1)} solid ${theme.colors.gray[3]}`,
    },
    bidButton: {
      marginTop: rem(30),
    },
  };
};


