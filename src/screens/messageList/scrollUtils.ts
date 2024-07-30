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
  itemHeights: React.MutableRefObject<{
    [key: number]: number;
  }>
) => {
  const offset = calculateOffset(index, itemHeights);
  flatListRef.current?.scrollToOffset({
    offset,
    animated: true,
  });
};

export const onScrollToIndexFailed = (
  info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  },
  flatListRef: React.RefObject<any>
) => {
  flatListRef.current?.scrollToOffset({
    offset: info.averageItemLength * info.index,
    animated: true,
  });
  flatListRef.current?.scrollToIndex({
    index: info.index,
    animated: true,
  });
};

