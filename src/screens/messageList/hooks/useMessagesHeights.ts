import { useRef, useCallback } from "react";
import { calculateOffset } from "../scrollUtils";

export const ITEM_VERTICAL_MARGIN = 8;

export const useItemHeights = () => {
  const itemHeights = useRef<{ [key: number]: number }>({});

  const onItemLayout = useCallback((index: number, height: number) => {
    itemHeights.current[index] = height;
  }, []);

  const getItemLayout = useCallback(
    (data: any, index: number) => {
      const length = itemHeights.current[index] || 0;
      const offset = calculateOffset(index, itemHeights);
      return { length, offset, index };
    },
    [calculateOffset]
  );

  return { itemHeights, onItemLayout, calculateOffset, getItemLayout };
};
