import messagesData from "../../theGist Home Assignment.json";
import { Message } from "../models/Messages";

const MESSAGES: Message[] = messagesData;

export const getMessages = (offset: number, limit: number): Message[] => {
  return MESSAGES.slice(offset, offset + limit);
};

export const getMessageById = (id: number): Message | null => {
  return MESSAGES.find((message) => message.id === id) || null;
};
