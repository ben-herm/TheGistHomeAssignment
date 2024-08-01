import { Message } from "../../models/Messages";
import { ITEM_VERTICAL_MARGIN } from "./hooks/useMessagesHeights";

export const calculateOffset = (
  index: number,
  itemHeights: React.MutableRefObject<{
    [key: number]: number;
  }>
) => {
  let offset = 0;
  for (let i = 0; i < index; i++) {
    offset += itemHeights.current[i] || 0;
    offset += ITEM_VERTICAL_MARGIN * 2;
  }
  return offset;
};

export const scrollToPosition = (
  index: number,
  flatListRef: any,
  messages: Message[],
  targetedId?: number
) => {
  const item = messages[index];
  if (targetedId && item?.id !== targetedId) {
    const correctIndex =
      messages.length &&
      messages.findIndex((message) => message?.id || -1 === targetedId);
    if (correctIndex !== -1) {
      index = correctIndex;
    }
  }

  flatListRef.current?.scrollToIndex({
    index,
    animated: true,
  });
};

// if scrolling failed we want to scroll to relative offset so the flatlist can measure it's height and then scroll to its index.

export const handleScrollToIndexFailed = (
  error: any,
  flatListRef: React.MutableRefObject<any>,
  items: Array<any>
) => {
  flatListRef.current.scrollToOffset({
    offset: error.averageItemLength * error.index,
    animated: true,
  });
  setTimeout(() => {
    if (items.length !== 0 && flatListRef.current !== null) {
      flatListRef.current.scrollToIndex({
        index: error.index,
        animated: true,
      });
    }
  }, 100);
};
