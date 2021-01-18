import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UserSearch from "../search/UserSearch";
import { Button, DropDown } from "../utils/Utils";
import styled from "styled-components";

const MenuContainer = styled(DropDown)`
  height: auto;
`;

const MobileMenu = ({ toggleTheme }) => {
  const { authState, dispatch } = useContext(AuthContext);
  return (
    <MenuContainer>
      <ul
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: ".6rem",
        }}
      >
        <li>
          <UserSearch />
        </li>
        <li>
          <Link to={`/user/${authState.userID}`}>Your profile</Link>
        </li>
        <li style={{ cursor: "pointer" }} onClick={toggleTheme}>
          Switch theme
        </li>
        <li style={{ textAlign: "right" }}>
          <Button onClick={() => dispatch({ type: "logout" })}>Sign out</Button>
        </li>
      </ul>
    </MenuContainer>
  );
};

export default MobileMenu;
