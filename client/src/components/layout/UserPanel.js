import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../utils/Utils";
import { useMediaQuery } from "react-responsive";
import FriendRequests from "../notifications/FriendRequests";
import Notifications from "../notifications/Notifications";
import Messages from "../notifications/Messages";
import MobileMenuIcon from "./MobileMenuIcon";
import styled from "styled-components";

const PanelWrapper = styled.nav`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > * + * {
    margin-left: 1rem;
  }
`;

const UserPanel = (props) => {
  const { authState, dispatch } = useContext(AuthContext);
  const [activeDropdown, setActiveDropdown] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <PanelWrapper>
      {authState.isAuthenticated ? (
        <Fragment>
          <Messages
            aria-label="Messages"
            activeDropdown={activeDropdown}
            toggleDropdown={() =>
              setActiveDropdown(activeDropdown === 1 ? 0 : 1)
            }
          />
          <Notifications
            aria-label="Notifications"
            activeDropdown={activeDropdown}
            toggleDropdown={() =>
              setActiveDropdown(activeDropdown === 2 ? 0 : 2)
            }
          />
          <FriendRequests
            aria-label="Friend Requests"
            activeDropdown={activeDropdown}
            toggleDropdown={() =>
              setActiveDropdown(activeDropdown === 3 ? 0 : 3)
            }
          />
          {isMobile ? (
            <MobileMenuIcon
              aria-label="Menu"
              toggleTheme={props.toggleTheme}
              activeDropdown={activeDropdown}
              toggleDropdown={() =>
                setActiveDropdown(activeDropdown === 4 ? 0 : 4)
              }
            />
          ) : (
            <Fragment>
              <Link to={`/user/${authState.userID}`}>{authState.userName}</Link>
              <Button onClick={() => dispatch({ type: "logout" })}>
                Sign out
              </Button>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Link to="/login">Log in</Link>
      )}
    </PanelWrapper>
  );
};

export default UserPanel;
