import { useCallback, useEffect, useState } from "react";

const useIsLiked = (likes, userID) => {
  const [isLiked, setIsLiked] = useState(false);

  const checkLiked = useCallback(() => {
    return likes.map((like) => like.user).includes(userID);
  }, [likes, userID]);

  useEffect(() => {
    setIsLiked(checkLiked());
  }, [likes]);

  return isLiked;
};
export default useIsLiked;
