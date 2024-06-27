import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import Colors from "@/constants/Colors";

interface HeaderProps {
  title: string;
  onPress: () => void;
}

export default function Header(props: HeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => {}}>
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={Colors.primary}
        />
      </Pressable>
      <Text style={{ fontSize: 20, color: Colors.primary }}>{props.title}</Text>
      <Pressable style={styles.button} onPress={() => {}}>
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={Colors.primary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 17,
  },
  button: {
    padding: 3,
  },
});
