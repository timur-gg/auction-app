// https://v5.mantine.dev/theming/theme-object/

import { CSSObject, MantineTheme } from '@mantine/core';
import { rem } from '@mantine/core';

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
