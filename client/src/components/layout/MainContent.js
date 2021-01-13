import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import CreateAccount from "../auth/CreateAccount";
import LogIn from "../auth/LogIn";
import NewsFeed from "../posts/NewsFeed";
import PostPage from "../posts/PostPage";
import EditProfile from "../users/profile/EditProfile";
import UserPage from "../users/profile/UserPage";
import SearchResults from "../search/SearchResults";
import Friends from "../users/Friends";

const MainContent = () => {
  const { authState } = useContext(AuthContext);

  return (
    <div className="main-wrapper">
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/createaccount" component={CreateAccount} />
        <Route path="/user/:userID" component={UserPage} />
        <Route path="/users/:userID/friends" component={Friends} />
        <Route
          exact
          path="/"
          component={authState.isAuthenticated ? NewsFeed : LogIn}
        />
        <Route path="/search" component={SearchResults} />
        <Route path="/editprofile" component={EditProfile} />
        <Route path="/posts/:postID" component={PostPage} />
      </Switch>
    </div>
  );
};

export default MainContent;
