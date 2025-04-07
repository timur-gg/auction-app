import { CSSObject, MantineTheme } from '@mantine/core';

export const clientProfileStyle = (
  theme: MantineTheme,
): Record<string, CSSObject> => {
  return {
    icon: {
      color: theme.colors.gray[5],
    },

    name: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  };
};
