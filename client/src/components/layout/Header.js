import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../Utils";
import UserPanel from "./UserPanel";

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <header className="main-header">
      <Link to="/">
        <h1 className="main-title">Odinbook</h1>
      </Link>
      {state.isAuthenticated && <UserPanel />}
      <Button onClick={() => dispatch({ action: { type: "logout" } })}>
        Sign out
      </Button>
    </header>
  );
};

export default Header;
