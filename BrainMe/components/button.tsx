import { Pressable, Text, StyleSheet } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export default function Button({ text, onPress }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          {
            opacity: pressed ? 0.75 : 1,
          },
          styles.container,
        ];
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontSize: 16, letterSpacing: 2 }}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 15,
  },
});
