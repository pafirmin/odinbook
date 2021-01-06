import React, { Fragment, useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";
import Loader from "react-loader-spinner";

const LoadingSpinner = () => {
  const { loading } = useContext(LoadingContext);

  if (loading)
    return (
      <Loader
        style={{
          display: "fixed",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />
    );

  return <Fragment />;
};

export default LoadingSpinner;
