import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#fcf5e3",
    secondary: "#3f51b5",
    background: "#100d38",
    background2: "#dbddff",
  },
  fonts: ["Ubuntu", "sans-serif", "Roboto"],
  fontSize: {
    logoTitle: "40px",
    label: "20px",
  },
  screenSize: {
    xs: "480px",
    sm: "768px",
    md: "1024px",
    lg: "1200px",
  },
};
const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
export default Theme;
