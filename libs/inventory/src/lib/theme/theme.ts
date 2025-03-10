// https://v5.mantine.dev/theming/theme-object/

import { CSSObject, MantineTheme } from '@mantine/core';
import { rem } from '@mantine/core';

export const inventoryStyle = (
  theme: MantineTheme,
): Record<string, CSSObject> => {
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
