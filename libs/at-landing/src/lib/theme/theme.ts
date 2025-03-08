import {MantineTheme} from "@mantine/core";

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
