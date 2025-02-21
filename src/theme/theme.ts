import { createTheme } from '@mui/material';

export const themeColors = {
  primary: '#F9F7F3',
  secondary: '#F9F7F3',
  textPrimary: '#F9F7F3',
  textSecondary: '#F9F7F3',
  background: '#101D42'
};

export const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.primary,
      dark: themeColors.primary
    },
    secondary: {
      main: themeColors.secondary,
      dark: themeColors.secondary
    },
    background: {
      default: themeColors.background,
      paper: themeColors.background
    },
    text: {
      primary: themeColors.textPrimary,
      secondary: themeColors.textSecondary
    },
    mode: 'dark'
  },
  typography: {
    fontFamily: 'Roboto'
  }
});
