import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import UserSearch from "../search/UserSearch";
import UserPanel from "./UserPanel";
import MobilePanel from "./MobilePanel";

const Header = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  return (
    <header className="main-header">
      <h1 className="main-title">
        <Link to="/">Odinbook</Link>
      </h1>
      {!isMobile && <UserSearch />}
      {isMobile ? <MobilePanel /> : <UserPanel />}
    </header>
  );
};

export default Header;
