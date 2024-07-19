import { View, Animated, StyleSheet, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useEffect, useState } from "react";

interface TimeBarProps {
  timeUp: boolean;
  setTimeUp: (finish: boolean) => void;
}

export default function TimeBar({ timeUp, setTimeUp }: TimeBarProps) {
  const isTablet = useWindowDimensions().width >= 768;
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  const [reactiveValue, setReactiveValue] = useState(10);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 10,
      useNativeDriver: true,
    }).start();

    const interval = setInterval(() => {
      // 0.01875 represent 30 seconds. 0.0375 represents 15 seconds. 0.05 represents 10 seconds. 0.1 represents 5 seconds.
      setReactiveValue((prev) => prev - 0.075);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * reactiveValue) / 10);
    if (reactiveValue <= 0) setTimeUp(true);
  }, [reactiveValue, width]);

  useEffect(() => {
    if (!timeUp) {
      setReactiveValue(10);
    }
  }, [timeUp]);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: isTablet ? 17 * 2 : 17,
        gap: 17,
      }}
    >
      <Ionicons name="time-outline" size={24} color="white" />
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={styles.timeBarContainer}
      >
        <Animated.View
          onLayout={(e) => {
            const newWidth = e.nativeEvent.layout.width;
            setWidth(newWidth);
          }}
          style={[
            styles.fill,
            {
              transform: [{ translateX: animatedValue }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeBarContainer: {
    flex: 1,
    height: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "white",
    overflow: "hidden",
  },
  fill: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: 12,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
