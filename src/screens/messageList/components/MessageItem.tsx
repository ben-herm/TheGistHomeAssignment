import React from "react";
import { View, Text, StyleSheet, LayoutChangeEvent } from "react-native";
import { Message } from "../../../models/Messages";

interface MessageItemProps {
  message: Message;
  onLayout: (height: number) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onLayout }) => {
  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    onLayout(height);
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Text style={styles.id}>{message.id}</Text>
      <Text style={styles.text}>{message.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    marginVertical: 8,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  id: {
    fontWeight: "800",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "center",
    padding: 16,
  },
});

export default MessageItem;
