import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProfileDetails = ({ user, friendshipStatus }) => {
  const { location, occupation, bio } = user.profile;
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h4>Location</h4>
          <p>{location}</p>
        </div>
        {friendshipStatus === "isUser" && (
          <Link
            style={{ color: "#6a6a6a", fontSize: ".9rem" }}
            to="/editprofile"
          >
            Edit profile
          </Link>
        )}
      </div>

      <div>
        <h4>Occupation</h4>
        <p>{occupation}</p>
      </div>
      <div>
        <h4>Bio</h4>
        <p>{bio}</p>
      </div>
    </Fragment>
  );
};

export default ProfileDetails;
