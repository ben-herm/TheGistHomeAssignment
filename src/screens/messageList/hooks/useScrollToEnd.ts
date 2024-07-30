import { useCallback, RefObject, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Message } from "../../../models/Messages";

export const useScrollToEnd = (
  flatListRef: RefObject<FlatList<Message>>,
  loadMoreMessages: () => void,
  hasMoreMessages: boolean
) => {
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);

  useEffect(() => {
    if (!hasMoreMessages) {
      setHasReachedEnd(true);
    }
  }, [hasMoreMessages]);

  const handleEndReached = useCallback(() => {
    if (hasMoreMessages) {
      loadMoreMessages();
    } else {
      setHasReachedEnd(true);
    }
  }, [hasMoreMessages, loadMoreMessages]);

  const scrollToEnd = useCallback(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [flatListRef]);

  return { scrollToEnd, handleEndReached, hasReachedEnd };
};
