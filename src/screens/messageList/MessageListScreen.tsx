import React, { useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Message } from "../../models/Messages";
import { useItemHeights } from "./hooks/useMessagesHeights";
import { useScrollToMessage } from "./hooks/useScrollToMessage";
import { useMessages } from "./hooks/useMessages";
import CustomHeader from "../../components/CustomHeader";
import MessageItem from "./components/MessageItem";
import MessageFooter from "./components/MessageFooter";
import { useScrollToEnd } from "./hooks/useScrollToEnd";
import CustomLoader from "../../components/CustomLoader";
import { handleScrollToIndexFailed } from "./scrollUtils";

const MessageListScreen: React.FC = () => {
  const flatListRef = useRef<FlatList<Message>>(null);

  const { messages, loadMessageById, loadMoreMessages, hasMoreMessages } =
    useMessages();

  const { onItemLayout, getItemLayout, itemHeights } = useItemHeights();

  const { isLoading, handleScrollToMessage } = useScrollToMessage(
    messages,
    loadMessageById,
    flatListRef,
    itemHeights
  );

  const { handleEndReached } = useScrollToEnd(
    loadMoreMessages,
    hasMoreMessages
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
        decelerationRate={0.6}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 60 }}
        onScrollToIndexFailed={(error) =>
          handleScrollToIndexFailed(error, flatListRef, messages)
        }
        getItemLayout={getItemLayout}
      />
      <MessageFooter onScrollToMessage={handleScrollToMessage} />
      {isLoading && <CustomLoader size={"large"} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessageListScreen;
