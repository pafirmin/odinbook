import React from "react";
import { Link } from "react-router-dom";
import UserSearch from "../search/UserSearch";
import UserPanel from "./UserPanel";

const Header = () => {
  return (
    <header className="main-header">
      <h1 className="main-title">
        <Link to="/">Odinbook</Link>
      </h1>
      <UserSearch />
      <UserPanel />
    </header>
  );
};

export default Header;
