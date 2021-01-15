import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../utils/Utils";
import FriendRequests from "../notifications/FriendRequests";
import Notifications from "../notifications/Notifications";
import Messages from "../notifications/Messages";

const UserPanel = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const [activeDropdown, setActiveDropdown] = useState(0);

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
          <Messages
            activeDropdown={activeDropdown}
            toggleDropdown={() =>
              setActiveDropdown(activeDropdown === 1 ? 0 : 1)
            }
          />
          <Notifications
            activeDropdown={activeDropdown}
            toggleDropdown={() =>
              setActiveDropdown(activeDropdown === 2 ? 0 : 2)
            }
          />
          <FriendRequests
            activeDropdown={activeDropdown}
            toggleDropdown={() =>
              setActiveDropdown(activeDropdown === 3 ? 0 : 3)
            }
          />
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
