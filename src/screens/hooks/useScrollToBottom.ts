import { useCallback, useState } from "react";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { OFF_SET_FROM_BOTTOM } from "../constants";

export const useScrollToBottom = (hasReachedEnd: boolean) => {
  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState<boolean>(false);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const contentHeight = event.nativeEvent.contentSize.height;
      const layoutHeight = event.nativeEvent.layoutMeasurement.height;
      const distanceFromBottom = contentHeight - offsetY - layoutHeight;
      const shouldShowScrollDownArrowButton =
        distanceFromBottom <= OFF_SET_FROM_BOTTOM;

      if (shouldShowScrollDownArrowButton) {
        setShowScrollToBottomButton(false);
        return;
      }

      if (hasReachedEnd) {
        setShowScrollToBottomButton(true);
        return;
      }

      setShowScrollToBottomButton(false);
    },
    [hasReachedEnd]
  );

  return {
    showScrollToBottomButton,
    handleScroll,
  };
};
