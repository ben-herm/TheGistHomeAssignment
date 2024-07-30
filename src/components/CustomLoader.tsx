import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
} from "react-native";
import React from "react";

const CustomLoader: React.FC<ActivityIndicatorProps> = ({ size }) => {
  return <ActivityIndicator style={styles.loadingIndicator} size={size} />;
};

const styles = StyleSheet.create({
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default CustomLoader;
