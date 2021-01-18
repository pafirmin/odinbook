import React, { Fragment, useState } from "react";
import MessageForm from "./MessageForm";
import { Button } from "../../utils/Utils";
import styled from "styled-components";
import AddFriendBtn from "./AddFriendBtn";

const ProfilePic = styled.div`
  height: auto;
  background-image: url("${({ src }) => src}");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 70%;
  padding: 8px;
  box-shadow: 0px 1px 2px ${(props) => props.theme.shadowColour};
  border-radius: 50%;
  align-self: center;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const UserInteraction = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  width: 70%;
  align-self: center;
`;

const MessageButton = styled(Button)`
  padding: 2px 8px;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileTop = ({ user, friendshipStatus }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);

  const toggleMessageForm = () => {
    setShowMessageForm(!showMessageForm);
  };

  return (
    <Fragment>
      <ProfilePic src={user.profilePic} />
      <h2 className="bold" style={{ textAlign: "center" }}>
        {user.fullName}
      </h2>
      <UserInteraction>
        <AddFriendBtn user={user} />
        {friendshipStatus !== "isUser" && (
          <MessageButton onClick={toggleMessageForm}>
            <i className="fas fa-envelope" /> Message
          </MessageButton>
        )}
      </UserInteraction>
      {showMessageForm && <MessageForm recipientID={user._id} />}
    </Fragment>
  );
};

export default ProfileTop;
