import { createTheme } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: green[500],
    },
  },

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    fontSize: 16, // 글꼴 크기
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
