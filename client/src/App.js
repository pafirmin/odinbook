import React from "react";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/Header";
import Alerts from "./components/utils/Alerts";
import MainContent from "./components/layout/MainContent";
import ScrollToTop from "./components/utils/ScrollToTop";
import LoadingSpinner from "./components/utils/LoadingSpinner";
import GlobalStyle from "./GlobalStyle";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import useTheme from "./hooks/useTheme";

axios.defaults.headers.common = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};
axios.defaults.headers.post = {
  "Content-Type": "application/json",
};

export const darkTheme = {
  bodyBg: "rgb(41, 41, 41)",
  cardBg: "#373737",
  secondaryBg: "#4d4d4d",
  mainFontColour: "#c4c4c4",
  secondaryFontColour: "rgb(232, 232, 232)",
  shadowColour: "#0b0b0b",
  borderColour: "#0c0c0c",
  headerColour: "rgb(54, 70, 87)",
  mainTitleColour: "#9ef2ff",
  mainTitleGlow:
    "0px 0px 8px #56e7ff, 0px 0px 16px #7be1f9, 0px 0px 24px #90eaff, 0px 0px 32px #a9e6f0",
  subtitleDisplay: "static",
};

export const lightTheme = {
  bodyBg: "#f5f5f5",
  cardBg: "#fff",
  secondaryBg: "#f3f3f3",
  mainFontColour: "#434343",
  secondaryFontColour: "rgb(98, 98, 98)",
  shadowColour: "#9d9d9d",
  borderColour: "#c6c6c6",
  headerColour: "rgb(62, 133, 209)",
  mainTitleColour: "#fff",
  mainTitleGlow: "",
  subtitleDisplay: "none",
};

const App = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <AuthProvider>
      <AlertProvider>
        <LoadingProvider>
          <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyle />
            <Router>
              <ScrollToTop />
              <LoadingSpinner />
              <Alerts />
              <Header toggleTheme={toggleTheme} />
              <MainContent />
            </Router>
          </ThemeProvider>
        </LoadingProvider>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
