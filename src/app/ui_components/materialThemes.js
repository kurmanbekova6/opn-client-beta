import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#0053c9",
      light: "#7fadff",
      main: "#3d7efd",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    h5: {
      fontFamily: `"Montserrat", sans-serif`,
      fontSize: "24px",
      fontWeight: 600,
      letterSpacing: "0.3px",
      lineHeight: "28px",
    },
    h6: {
      fontFamily: `"Montserrat", sans-serif`,
      fontSize: "20px",
      fontWeight: 600,
      letterSpacing: "0.3px",
      lineHeight: "24px",
    },
    caption: {
      fontFamily: `"Montserrat", sans-serif`,
      fontSize: "0.63rem",
      fontWeight: 400,
      letterSpacing: 0.42,
      lineHeight: 1.66,
    },
    overline: {
      fontFamily: `"Montserrat", sans-serif`,
      fontSize: "10px",
      letterSpacing: "1px",
    },
    subtitle2: {
      fontFamily: `"Montserrat", sans-serif`,
      fontSize: "0.875rem",
      fontWeight: 600,
      letterSpacing: "0.2px",
      lineHeight: 1.57,
    },
    button: {
      fontFamily: `"Montserrat", sans-serif`,
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.02857em",
      lineHeight: 1.75,
      textTransform: "uppercase",
    },
  },
});
console.log("%c THEME: ", "color: orange", theme);
