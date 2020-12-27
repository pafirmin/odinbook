import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UserSearch from "../UserSearch";
import UserPanel from "./UserPanel";

const Header = () => {
  const { state } = useContext(AuthContext);
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
