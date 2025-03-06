// https://v5.mantine.dev/theming/theme-object/

import { MantineTheme } from "@mantine/core";
import { rem } from "@mantine/core";
import {CSSObject} from "@emotion/react";

export const auctionLiveStyle = (theme: MantineTheme) => {
  return {
    card: {
      backgroundColor: theme.colors.pink,
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
      textTransform: "uppercase",
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
}
