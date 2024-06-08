import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Separator() {
  return (
    <View style={styles.separator}>
      <View style={styles.separator_line} />
      <Text style={{ fontFamily: "NiveauGroteskLight", color: "gray" }}>
        or sign up with
      </Text>
      <View style={styles.separator_line} />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  separator_line: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    flex: 1,
    marginTop: 3,
  },
});
