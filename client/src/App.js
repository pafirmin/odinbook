import React from "react";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/Header";
import Alerts from "./components/Alerts";
import MainContent from "./components/layout/MainContent";

const App = () => {
  return (
    <AuthProvider>
      <AlertProvider>
        <Router>
          <Alerts />
          <Header />
          <MainContent />
        </Router>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
