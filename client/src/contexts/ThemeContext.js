import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

export const darkTheme = {
  bodyBg: "rgb(41, 41, 41)",
  cardBg: "#373737",
  mainFontColour: "#c4c4c4",
  secondaryFontColour: "rgb(232, 232, 232)",
  shadowColour: "#0b0b0b",
};

export const lightTheme = {
  bodyBg: "#434343",
  cardBg: "#fff",
  mainFontColour: "#434343",
  secondaryFontColour: "rgb(98, 98, 98)",
  shadowColour: "#9d9d9d",
};

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContext;
