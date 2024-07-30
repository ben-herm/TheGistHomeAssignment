import React, { useRef, useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { Message } from "../../models/Messages";
import { useItemHeights } from "./hooks/useMessagesHeights";
import { useScrollToMessage } from "./hooks/useScrollToMessage";
import { useMessages } from "./hooks/useMessages";
import CustomHeader from "../../components/CustomHeader";
import MessageItem from "./components/MessageItem";
import MessageFooter from "./components/MessageFooter";
import ScrollToBottomButton from "./components/ScrollToBottomButton";
import { useShowScrollToBottomButton } from "./hooks/useShowScrollToBottomButton";
import { onScrollToIndexFailed as onScrollToIndexFailedUtil } from "./scrollUtils";
import { useScrollToEnd } from "./hooks/useScrollToEnd";
import CustomLoader from "../../components/CustomLoader";

const MessageListScreen: React.FC = () => {
  const flatListRef = useRef<FlatList<Message>>(null);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);

  const { onItemLayout, getItemLayout, itemHeights } = useItemHeights();

  const { messages, loadMessageById, loadMoreMessages, hasMoreMessages } =
    useMessages();

  const { isLoading, handleScrollToMessage } = useScrollToMessage(
    messages,
    loadMessageById,
    flatListRef,
    itemHeights
  );

  const { scrollToEnd, handleEndReached } = useScrollToEnd(
    flatListRef,
    loadMoreMessages,
    setHasReachedEnd,
    hasMoreMessages
  );

  const { showScrollToBottomButton, shouldShowBottomButton } =
    useShowScrollToBottomButton(hasReachedEnd);

  const onScrollToIndexFailed = useCallback(
    (info: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }) => {
      onScrollToIndexFailedUtil(info, flatListRef);
    },
    [flatListRef]
  );

  return (
    <View style={styles.container}>
      <CustomHeader />
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <MessageItem
            message={item}
            onLayout={(height) => onItemLayout(index, height)}
          />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 60 }}
        onScroll={shouldShowBottomButton}
        onScrollToIndexFailed={onScrollToIndexFailed}
        getItemLayout={getItemLayout}
      />
      <MessageFooter onScrollToMessage={handleScrollToMessage} />
      <ScrollToBottomButton
        onPress={scrollToEnd}
        visible={showScrollToBottomButton}
      />
      {isLoading && <CustomLoader size={"large"} />}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessageListScreen;
