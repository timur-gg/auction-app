// https://v5.mantine.dev/theming/theme-object/

import { CSSObject, MantineTheme } from '@mantine/core';
import { rem } from '@mantine/core';

export const auctionsDetailsEditStyle = (
  theme: MantineTheme,
): Record<string, CSSObject> => {
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

export const auctionsProfileCardEditStyle = (
  theme: MantineTheme,
): Record<string, CSSObject> => {
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

export const confirmProjectStyles = (
  theme: MantineTheme,
): Record<string, CSSObject> => {
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

export const unitTableEditStyle = (
  theme: MantineTheme,
): Record<string, CSSObject> => {
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
