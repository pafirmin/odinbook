import React, { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";
import { AlertContainer, Alert } from "./Utils";

const Alerts = () => {
  const { alerts } = useContext(AlertContext);
  console.log(alerts);
  return (
    <AlertContainer>
      {alerts.map((alert, i) => (
        <Alert key={i} variant={alert.type}>
          {alert.text}
        </Alert>
      ))}
    </AlertContainer>
  );
};

export default Alerts;
