import { CSSObject, MantineTheme } from '@mantine/core';


export const builderStyle = (theme: MantineTheme): Record<string, CSSObject>  => {
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
