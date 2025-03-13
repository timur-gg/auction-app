// https://v5.mantine.dev/theming/theme-object/

import { MantineTheme } from '@mantine/core';
import { rem } from '@mantine/core';

export const auctionLiveStyle = (theme: MantineTheme) => {
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

export const auctionProfileCardVertStyle = (theme: MantineTheme) => {
  return {
    card: {
      backgroundColor: theme.colors.white,
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
    statusBadge: {
      marginBottom: theme.spacing.md,
    },

    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};

export const biddingTabStyle = (theme: MantineTheme) => {
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

export const auctionProfileCardStyle = (theme: MantineTheme) => {
  return {
    card: {
      backgroundColor: theme.colors.white,
    },

    imageSection: {
      padding: theme.spacing.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: `${rem(1)} solid ${theme.colors.gray[3]}`,
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
    statusBadge: {
      marginBottom: theme.spacing.md,
    },

    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};

export const lotPreviewTableStyle = (theme: MantineTheme) => {
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

export const lotSelectionStyle = (theme: MantineTheme) => {
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
    thumb: {
      width: rem(16),
      height: rem(28),
      backgroundColor: theme.white,
      color: theme.colors.gray[5],
      border: `${rem(1)} solid ${theme.colors.gray[3]}`,
    },
    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};

export const auctionsDetailsEditStyle = (theme: MantineTheme) => {
  return {
    card: {
      backgroundColor: theme.colors.white,
    },

    imageSection: {
      padding: theme.spacing.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: `${rem(1)} solid ${theme.colors.gray[3]}`,
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
    statusBadge: {
      marginBottom: theme.spacing.md,
    },

    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};

export const auctionsProfileCardEditStyle = (theme: MantineTheme) => {
  return {
    card: {
      backgroundColor: theme.colors.white,
    },

    imageSection: {
      padding: theme.spacing.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: `${rem(1)} solid ${theme.colors.gray[3]}`,
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
    statusBadge: {
      marginBottom: theme.spacing.md,
    },

    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};

export const unitTableEditStyle = (theme: MantineTheme) => {
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
    thumb: {
      width: rem(16),
      height: rem(28),
      backgroundColor: theme.white,
      color: theme.colors.gray[5],
      border: `${rem(1)} solid ${theme.colors.gray[3]}`,
    },
    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};

export const auctionCardStyle = (theme: MantineTheme) => {
  return {
    card: {
      backgroundColor: theme.colors.white,

      border: '0.0625rem solid #dee2e6',
    },

    imageSection: {
      padding: theme.spacing.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: `${rem(1)} solid ${theme.colors.gray[3]}`,
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

    favButton: {
      position: 'absolute',
      top: '1.5%',
      left: '1.5%',
      transform: 'translate(-2%, -2%)',
      cursor: 'pointer',
      visibility: 'hidden',

      '&:hover': {
        visibility: 'visible',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid #FFCA28',
      },
    },

    favIcon: {
      visibility: 'visible',
      '&:hover': {
        fill: '#FDD835',
      },
    },

    favTag: {
      visibility: 'visible',
    },

    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
    tooltip: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
    selectUnitsButton: {
      flex: 1,
      fontSize: '14px',
      backgroundColor: '#F9A825',
      '&:hover': { backgroundColor: '#FF8F00' },
    },
    selected: { border: '3px solid #1E88E5' },
  };
};
export const headerStyle = (theme: MantineTheme) => {
  return {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
    },

    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },

    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },

    link: {
      display: 'block',
      lineHeight: 1,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.colors.gray[7],

      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colors.gray[0],
      },
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
      },
    },
  };
};

export const inventoryAuctionStyle = (theme: MantineTheme) => {
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

export const builderStyle = (theme: MantineTheme) => {
  return {
    icon: {
      color: theme.colors.gray[5],
    },

    name: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    tableRow: {
      '&:hover': {
        background: '#efefef',
        cursor: 'pointer',
      },
    },

    chatButton: {
      position: 'fixed',
      right: '2%',
      bottom: '2%',
      padding: '10px',
      height: 'auto',
    },
  };
};

export const clientProfileStyle = (theme: MantineTheme) => {
  return {
    icon: {
      color: theme.colors.gray[5],
    },

    name: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  };
};

export const confirmProjectStyles = (theme: MantineTheme) => {
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
  };
};

export const inventoryStyle = (theme: MantineTheme) => {
  return {
    mark: {
      display: 'none',
    },

    markWrapper: {
      marginTop: rem(12),
    },

    thumb: {
      width: rem(16),
      height: rem(28),
      backgroundColor: theme.white,
      color: theme.colors.gray[5],
      border: `${rem(1)} solid ${theme.colors.gray[3]}`,
    },

    pin2: {
      borderRadius: '50%',
      border: '8px solid #fff',
      width: '8px',
      height: '8px',
      backgroundColor: 'red',
    },

    'pin2::after': {
      position: 'absolute',
      content: '',
      width: '0px',
      height: '0px',
      bottom: '-30px',
      left: '-6px',
      border: '10px solid transparent',
      borderTop: '17px solid #fff',
      backgroundColor: 'red',
    },
  };
};

export const landingStyle = (theme: MantineTheme) => {
  return {
    icon: {
      marginRight: theme.spacing.md,
      backgroundImage: `linear-gradient(135deg, ${
        theme.colors[theme.primaryColor][4]
      } 0%, ${theme.colors[theme.primaryColor][6]} 100%)`,
      backgroundColor: 'transparent',
    },
    item: {
      backgroundColor: theme.white,
      borderBottom: 0,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg,
      overflow: 'hidden',
    },

    gradient: {
      backgroundImage: `radial-gradient(${
        theme.colors[theme.primaryColor][6]
      } 0%, ${theme.colors[theme.primaryColor][5]} 100%)`,
    },

    faq: {
      backgroundImage: `radial-gradient(${
        theme.colors[theme.primaryColor][6]
      } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
    },
  };
};

export const projectStyle = (theme: MantineTheme) => {
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

export const auctionDetailsStyle = (theme: MantineTheme) => {
  return {
    card: {
      backgroundColor: theme.colors.white,
    },

    imageSection: {
      padding: theme.spacing.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: `${rem(1)} solid ${theme.colors.gray[3]}`,
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
    statusBadge: {
      marginBottom: theme.spacing.md,
    },

    icon: {
      marginRight: rem(5),
      color: theme.colors.gray[5],
    },
  };
};
