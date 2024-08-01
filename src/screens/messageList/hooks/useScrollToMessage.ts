import { useState, useEffect, useCallback } from "react";
import { Message } from "../../../models/Messages";
import { scrollToPosition } from "../scrollUtils";

export const useScrollToMessage = (
  messages: Message[],
  loadMessageById: (index: number) => void,
  flatListRef: any,
  itemHeights: React.MutableRefObject<{
    [key: number]: number;
  }>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [targetMessageId, setTargetMessageId] = useState<number | null>(null);

  const handleScrollToMessage = useCallback(
    async (id: number) => {
      setIsLoading(true);
      const index = messages.findIndex((message) => message.id === id);
      if (index !== -1) {
        scrollToPosition(index, flatListRef, messages, id);
        setIsLoading(false);
      } else {
        await loadMessageById(id);
        setTargetMessageId(id);
      }
    },
    [loadMessageById, messages, flatListRef, itemHeights]
  );

  useEffect(() => {
    if (targetMessageId) {
      const index = messages.findIndex(
        (message) => message.id === targetMessageId
      );
      if (index !== -1) {
        scrollToPosition(index, flatListRef, messages, targetMessageId);
        setTargetMessageId(null);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  }, [messages, targetMessageId, flatListRef, itemHeights]);

  return {
    isLoading,
    handleScrollToMessage,
  };
};
