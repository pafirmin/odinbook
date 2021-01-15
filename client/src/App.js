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
import axios from "axios";

axios.defaults.headers.common = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};
axios.defaults.headers.post = {
  "Content-Type": "application/json",
};

const App = () => {
  return (
    <AuthProvider>
      <AlertProvider>
        <LoadingProvider>
          <Router>
            <ScrollToTop />
            <LoadingSpinner />
            <Alerts />
            <Header />
            <MainContent />
          </Router>
        </LoadingProvider>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
