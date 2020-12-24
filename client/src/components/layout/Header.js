import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import UserPanel from "./UserPanel";

const Header = () => {
  const { state } = useContext(AuthContext);
  return (
    <header className="main-header">
      <h1 className="main-title">Odinbook</h1>
      {state.isAuthenticated && <UserPanel />}
    </header>
  );
};

export default Header;
