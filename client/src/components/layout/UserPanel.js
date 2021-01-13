import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../utils/Utils";
import FriendRequests from "../notifications/FriendRequests";
import Notifications from "../notifications/Notifications";
import Messages from "../notifications/Messages";

const UserPanel = () => {
  const { authState, dispatch } = useContext(AuthContext);

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
      {authState.isAuthenticated ? (
        <Fragment>
          <Messages />
          <Notifications />
          <FriendRequests />
          <Link to={`/user/${authState.userID}`}>{authState.userName}</Link>
          <Button onClick={() => dispatch({ type: "logout" })}>Sign out</Button>
        </Fragment>
      ) : (
        <Link to="/login">Log in</Link>
      )}
    </div>
  );
};

export default UserPanel;
