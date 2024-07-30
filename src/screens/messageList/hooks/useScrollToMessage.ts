import { useState, useEffect, useCallback } from "react";
import Toast from "react-native-toast-message";
import { Message } from "../../../models/Messages";

export const useScrollToMessage = (
  scrollToPosition: (index: number) => void,
  messages: Message[],
  loadMessageById: (index: number) => void,
) => {
  const [targetLoading, setTargetLoading] = useState<boolean>(false);
  const [targetMessageId, setTargetMessageId] = useState<number | null>(null);

  const handleScrollToMessage = useCallback(
    async (id: number) => {
      setTargetLoading(true);
      const index = messages.findIndex((message) => message.id === id);
      if (index !== -1) {
        scrollToPosition(index);
        setTargetLoading(false);
      } else {
        setTargetMessageId(id);
        await loadMessageById(id);
      }
    },
    [loadMessageById, scrollToPosition]
  );

  useEffect(() => {
    if (targetMessageId !== null) {
      const index = messages.findIndex((message) => message.id === targetMessageId);
      if (index !== -1) {
        scrollToPosition(index);
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
