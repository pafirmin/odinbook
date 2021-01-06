import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import CreateAccount from "../auth/CreateAccount";
import LogIn from "../auth/LogIn";
import NewsFeed from "../posts/NewsFeed";
import EditProfile from "../profile/EditProfile";
import UserPage from "../profile/UserPage";
import SearchResults from "../search/SearchResults";

const MainContent = () => {
  const { state } = useContext(AuthContext);

  return (
    <div className="main-wrapper">
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/createaccount" component={CreateAccount} />
        <Route path="/user/:userID" component={UserPage} />
        <Route
          exact
          path="/"
          component={state.isAuthenticated ? NewsFeed : LogIn}
        />
        <Route path="/search" component={SearchResults} />
        <Route path="/editprofile" component={EditProfile} />
      </Switch>
    </div>
  );
};

export default MainContent;
