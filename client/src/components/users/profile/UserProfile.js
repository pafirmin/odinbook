import React, { useEffect, useContext, useState, useCallback } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../contexts/AuthContext";
import useFriendshipStatus from "../../../hooks/useFriendshipStatus";
import ProfileTop from "./ProfileTop";
import ProfileDetails from "./ProfileDetails";
import ProfileFriends from "./ProfileFriends";
import { useMediaQuery } from "react-responsive";

const ProfileWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: ${({ top }) => top}px;

  & > * + * {
    margin-top: 1rem;
  }
`;

const ProfileSection = styled.section`
  padding: 0.8rem;
  background: ${(props) => props.theme.cardBg};
  border-radius: 8px;
  box-shadow: 0px 1px 2px ${(props) => props.theme.shadowColour};
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 0.8rem;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

const Profile = ({ user }) => {
  const { authState } = useContext(AuthContext);
  const { friendshipStatus } = useFriendshipStatus(authState.userID, user);
  const [friends, setFriends] = useState([]);
  const [stickyTop, setStickyTop] = useState();
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  const filteredFriends = useCallback(() => {
    return user.friends.filter((friend) => friend.status === "accepted");
  }, [user]);

  const stickyRef = useCallback(
    (node) => {
      if (node) {
        setStickyTop(window.innerHeight - node.scrollHeight);
      }
    },
    [friends]
  );

  useEffect(() => {
    setFriends(filteredFriends());
  }, [filteredFriends, isMobile]);

  return (
    <div>
      <ProfileWrapper top={stickyTop} ref={stickyRef}>
        <ProfileTop user={user} friendshipStatus={friendshipStatus} />
        <ProfileSection>
          <ProfileDetails user={user} friendshipStatus={friendshipStatus} />
        </ProfileSection>
        <ProfileSection>
          <ProfileFriends user={user} friends={friends} isMobile={isMobile} />
        </ProfileSection>
        {!isMobile && (
          <footer style={{ textAlign: "center" }}>
            'Odinbook', created by Paul Firmin, 2021
          </footer>
        )}
      </ProfileWrapper>
    </div>
  );
};

export default Profile;
