import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
interface ScrollToBottomButtonProps {
  onPress: () => void;
  visible: boolean;
}

const ScrollToBottomButton: React.FC<ScrollToBottomButtonProps> = ({
  onPress,
  visible,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [translateY, visible]);

  return visible ? (
    <Animated.View
      style={[styles.buttonContainer, { transform: [{ translateY }] }]}
    >
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="arrow-downward" size={30} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ScrollToBottomButton;
