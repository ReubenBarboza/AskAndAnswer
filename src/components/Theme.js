import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "white",
    secondary: "#6a43e6",
    background: "#100d38",
  },
  fonts: ["Ubuntu", "sans-serif", "Roboto"],
};
const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
export default Theme;
