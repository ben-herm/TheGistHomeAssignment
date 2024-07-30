import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import MessageItem from "../components/MessageItem";
import MessageFooter from "../components/MessageFooter";
import ScrollToBottomButton from "../components/ScrollToBottomButton";
import { Message } from "../models/Messages";
import { useItemHeights } from "./hooks/useMessagesHeights";
import { useScrollToBottom } from "./hooks/useScrollToBottom";
import { useScrollToMessage } from "./hooks/useScrollToMessage";
import { useMessages } from "./hooks/useMessages";

const MessageListScreen: React.FC = () => {
  const flatListRef = useRef<FlatList<Message>>(null);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);
  const { onItemLayout, calculateOffset } = useItemHeights();
  const { showScrollToBottomButton, handleScroll } =
    useScrollToBottom(hasReachedEnd);

  const scrollToPosition = useCallback(
    (index: number) => {
      const offset = calculateOffset(index);
      flatListRef.current?.scrollToOffset({
        offset,
        animated: true,
      });
    },
    [calculateOffset]
  );

  const {
    messages,
    loadMessageById,
    loadMoreMessages,
    hasMoreMessages,
  } = useMessages();

  const { targetLoading, handleScrollToMessage } = useScrollToMessage(
    scrollToPosition,
    messages,
    loadMessageById,
  );

  const scrollToEnd = useCallback(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);

  useEffect(() => {
    if (!hasMoreMessages) {
      setHasReachedEnd(true);
    }
  }, [hasMoreMessages]);

  const handleEndReached = useCallback(() => {
    if (hasMoreMessages) {
      loadMoreMessages();
    } else {
      setHasReachedEnd(true);
    }
  }, [hasMoreMessages, loadMoreMessages]);

  const onScrollToIndexFailed = useCallback(
    (info: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }) => {
      flatListRef.current?.scrollToOffset({
        offset: info.averageItemLength * info.index,
        animated: true,
      });
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    },
    []
  );

  return (
    <View style={styles.container}>
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
        onScroll={handleScroll}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
      <MessageFooter onScrollToMessage={handleScrollToMessage} />
      <ScrollToBottomButton
        onPress={scrollToEnd}
        visible={showScrollToBottomButton}
      />
      {targetLoading && (
        <ActivityIndicator style={styles.loadingIndicator} size="large" />
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default MessageListScreen;
