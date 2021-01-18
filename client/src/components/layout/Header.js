import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import UserSearch from "../search/UserSearch";
import UserPanel from "./UserPanel";
import styled from "styled-components";

const MainTitle = styled.h1`
  font-size: 2rem;
  flex: 1;
  color: ${(props) => props.theme.mainTitleColour};
  text-shadow: ${(props) => props.theme.mainTitleGlow};
  position: relative;
  display: flex;
  align-items: center;
`;

const Subtitle = styled.span`
  font-size: 0.9rem;
  position: absolute;
  left: 20px;
  top: 27px;
  color: #ecddff;
  text-shadow: 0px 0px 8px #ff56fc, 0px 0px 16px #f97beb, 0px 0px 24px #ff90fd,
    0px 0px 32px #eea9f0;
  transform: rotate(-10deg);
  display: ${(props) => props.theme.subtitleDisplay};
  font-family: "Hachi Maru Pop", cursive;
`;

const MainHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.headerColour};
  color: #fff;
  padding: 12px;
  height: 60px;
  z-index: 2;
`;

const ThemeSwitch = styled.i`
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 40px;
`;

const Header = ({ toggleTheme }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  return (
    <MainHeader>
      <MainTitle>
        <Link to="/">Odinbook</Link>
        <Subtitle>After dark</Subtitle>
        <ThemeSwitch
          className="fas fa-lightbulb"
          onClick={toggleTheme}
        ></ThemeSwitch>
      </MainTitle>
      {!isMobile && <UserSearch />}
      <UserPanel />
    </MainHeader>
  );
};

export default Header;
