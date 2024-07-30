import { useState, useEffect, useCallback } from "react";
import Toast from "react-native-toast-message";
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
        scrollToPosition(index, flatListRef, itemHeights);
        setIsLoading(false);
      } else {
        setTargetMessageId(id);
        await loadMessageById(id);
      }
    },
    [loadMessageById]
  );

  useEffect(() => {
    if (targetMessageId) {
      const index = messages.findIndex(
        (message) => message.id === targetMessageId
      );
      if (index !== -1) {
        scrollToPosition(index, flatListRef, itemHeights);
        setTargetMessageId(null);
        setIsLoading(false);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Message ID not found",
        });
        setIsLoading(false);
      }
    }
  }, [messages, targetMessageId, scrollToPosition]);

  return {
    isLoading,
    handleScrollToMessage,
  };
};
