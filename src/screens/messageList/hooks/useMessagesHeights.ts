import { useRef, useCallback } from "react";

export const ITEM_VERTICAL_MARGIN = 8;

export const useItemHeights = () => {
  const itemHeights = useRef<{ [key: number]: number }>({});

  const onItemLayout = useCallback((index: number, height: number) => {
    itemHeights.current[index] = height;
  }, []);

  const calculateOffset = useCallback((index: number) => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += itemHeights.current[i] || 0;
      offset += ITEM_VERTICAL_MARGIN * 2;
    }
    return offset;
  }, []);

  return { itemHeights, onItemLayout, calculateOffset };
};
