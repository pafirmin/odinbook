import { useEffect, useState } from "react";

const useFriendShipStatus = (currentUserID, user) => {
  const [friendshipStatus, setFriendshipStatus] = useState(null);

  useEffect(() => {
    if (isCurrentUserProfile) {
      setFriendshipStatus("isUser");
    } else if (userIsFriend) {
      setFriendshipStatus("isFriend");
    } else if (requestIsPending) {
      setFriendshipStatus("isPending");
    }
  }, [user]);

  const isCurrentUserProfile = currentUserID === user._id;

  const userIsFriend = user.friends.some(
    (friend) =>
      friend.user._id === currentUserID && friend.status === "accepted"
  );

  const requestIsPending = user.friends.some(
    (friend) =>
      friend.user._id === currentUserID && friend.status === "recieved"
  );

  return [friendshipStatus, setFriendshipStatus];
};

export default useFriendShipStatus;
