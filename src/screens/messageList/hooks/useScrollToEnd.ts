import { useCallback, useEffect, useState } from "react";

export const useScrollToEnd = (
  loadMoreMessages: () => void,
  hasMoreMessages: boolean
) => {
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);

  useEffect(() => {
    if (!hasMoreMessages) setHasReachedEnd(true);
  }, [hasMoreMessages]);

  const handleEndReached = useCallback(() => {
    if (hasMoreMessages) {
      loadMoreMessages();
      return;
    }

    setHasReachedEnd(true);
  }, [hasMoreMessages, loadMoreMessages]);

  return { handleEndReached, hasReachedEnd };
};
