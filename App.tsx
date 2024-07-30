import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import MessageListScreen from "./src/screens/messageList/MessageListScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <MessageListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
