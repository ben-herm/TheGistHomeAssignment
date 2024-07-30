import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

interface MessageFooterProps {
  onScrollToMessage: (id: number) => void;
}

const MessageFooter: React.FC<MessageFooterProps> = ({ onScrollToMessage }) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <View style={styles.footer}>
      <TextInput
        style={styles.input}
        placeholder="Enter message ID"
        placeholderTextColor="#888"
        value={inputValue}
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setInputValue(e.nativeEvent.text)
        }
      />
      <Button
        title="Scroll to Message"
        onPress={() => onScrollToMessage(parseInt(inputValue))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#f9f9f9",
    marginRight: 10,
    minWidth: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MessageFooter;
