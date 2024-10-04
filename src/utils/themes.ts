import { type ThemeConfig, extendTheme, theme } from "@chakra-ui/react";

const colors = Object.freeze({
  bg: {
    blue: "#4589FF",
    light: "#E0E0E0",
    lightD: "#F4F4F4",
    light1: "#E8F1FF",
    white1: "#0000001A",
    tableH: "#CFCFCF",
    green: "#118C4F",
    darkGreen: "#006400",
    lightBlue: "#0F62FE",
    red: "#DE0D0D",
    darkRed: "#AD0A0A",
  },
  brand: {
    primary: "#065FC8",
    dark: "#0E58E3",
  },
  text: {
    ash: "#525252",
    blue: "#0F62FE",
    dark: "#161616",
    input: "#A8A8A8",
  },
  color: {
    yellow: "#F1C21B",
    light: "#F5F5F5",
    lightBlue: "#0F62FE",
  },
});

const fontSizes = Object.freeze({
  ...theme.fontSizes,
});

const breakpoints = Object.freeze({
  ...theme.breakpoints,
});

const styles = Object.freeze({
  global: {
    body: {
      color: "#000",
      backgroundColor: "#fff",
      fontFamily: "var(--font-ibm-plex-sans)",
      fontSize: "0.85rem",
      lineHeight: "1rem",
      scrollBehavior: "smooth",
    },
    "*, *::before, *::after": {
      margin: "0",
      padding: "0",
      boxSizing: "border-box",
    },
  },
});

const components = Object.freeze({
  // We can update the base styles
  Button: {
    baseStyle: {
      borderRadius: "0",
    },
  },
  Input: {
    baseStyle: {
      borderRadius: "0",
    },
  },
});

const chakraThemes: ThemeConfig = extendTheme({
  breakpoints,
  colors,
  styles,
  fontSizes,
  components,
});

export default chakraThemes;
