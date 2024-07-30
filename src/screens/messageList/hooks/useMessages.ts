import { useState } from "react";
import { getMessages, getMessageById } from "../../../services/messageService";
import { Message } from "../../../models/Messages";

export const useMessages = (initialLoad: number = 20) => {
  const [messages, setMessages] = useState<Message[]>(
    getMessages(0, initialLoad)
  );
  const [offset, setOffset] = useState<number>(initialLoad);
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true);
  const [uniqueIds, setUniqueIds] = useState<Set<number>>(
    new Set(messages.map((m) => m.id))
  );

  const loadMoreMessages = (limit: number = 20) => {
    const newMessages = getMessages(offset, limit);
    if (newMessages.length === 0) {
      setHasMoreMessages(false);
    } else {
      const uniqueNewMessages = newMessages.filter((m) => !uniqueIds.has(m.id));
      setMessages((prevMessages) => [...prevMessages, ...uniqueNewMessages]);
      setUniqueIds(
        (prevIds) =>
          new Set([...prevIds, ...uniqueNewMessages.map((m) => m.id)])
      );
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const loadMessageById = async (id: number): Promise<Message | null> => {
    const newMessage = getMessageById(id);
    if (newMessage && !uniqueIds.has(newMessage.id)) {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        updatedMessages.sort((a, b) => a.id - b.id);
        return updatedMessages;
      });
      setUniqueIds((prevIds) => new Set([...prevIds, newMessage.id]));
      return newMessage;
    }
    return null;
  };

  return {
    messages,
    loadMoreMessages,
    loadMessageById,
    hasMoreMessages,
  };
};
