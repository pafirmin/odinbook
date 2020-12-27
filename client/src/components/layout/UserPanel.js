import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import FriendRequests from "../FriendRequests";
import { Button } from "../Utils";

const UserPanel = () => {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {state.isAuthenticated ? (
        <Fragment>
          <FriendRequests />
          <Link to={`/user/${state.userID}`}>Your profile</Link>
          <Button onClick={() => dispatch({ type: "logout" })}>Sign out</Button>
        </Fragment>
      ) : (
        <Link to="/login">Log in</Link>
      )}
    </div>
  );
};

export default UserPanel;
