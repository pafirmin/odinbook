import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../utils/Utils";
import { useMediaQuery } from "react-responsive";
import FriendRequests from "../notifications/FriendRequests";
import Notifications from "../notifications/Notifications";
import Messages from "../notifications/Messages";
import MobileMenuIcon from "./MobileMenuIcon";

const PanelWrapper = styled.nav`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
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
          {isMobile ? (
            <MobileMenuIcon
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
