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
  const [targetLoading, setTargetLoading] = useState<boolean>(false);
  const [targetMessageId, setTargetMessageId] = useState<number | null>(null);

  const handleScrollToMessage = useCallback(
    async (id: number) => {
      setTargetLoading(true);
      const index = messages.findIndex((message) => message.id === id);
      if (index !== -1) {
        scrollToPosition(index, flatListRef, itemHeights);
        setTargetLoading(false);
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
        setTargetLoading(false);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Message ID not found",
        });
        setTargetLoading(false);
      }
    }
  }, [messages, targetMessageId, scrollToPosition]);

  return {
    targetLoading,
    handleScrollToMessage,
  };
};
