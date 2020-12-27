import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import CreateAccount from "../auth/CreateAccount";
import LogIn from "../auth/LogIn";
import NewsFeed from "../posts/NewsFeed";
import UserPage from "../profile/UserPage";
import SearchResults from "../SearchResults";

const MainContent = () => {
  const { state } = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/login" component={LogIn} />
      <Route path="/createaccount" component={CreateAccount} />
      <div className="main-wrapper">
        <Route path="/user/:userID" component={UserPage} />
        <Route
          exact
          path="/"
          component={state.isAuthenticated ? NewsFeed : LogIn}
        />
        <Route path="/search" component={SearchResults} />
      </div>
    </Switch>
  );
};

export default MainContent;
