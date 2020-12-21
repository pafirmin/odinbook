import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import CreateAccount from "./auth/CreateAccount";
import LogIn from "./auth/LogIn";
import NewsFeed from "./NewsFeed";

const MainContent = () => {
  const { state } = useContext(AuthContext);

  return (
    <Switch>
      <div className="main-wrapper">
        <Route path="/login" component={LogIn} />
        <Route path="/createaccount" component={CreateAccount} />
        {state.isAuthenticated && <Route exact path="/" component={NewsFeed} />}
      </div>
    </Switch>
  );
};

export default MainContent;
