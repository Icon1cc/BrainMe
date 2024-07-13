import { View, Text, StyleSheet } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";
import Block from "./block";

export default function Categories() {
  return (
    <View style={{ gap: 17 }}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.container}>
        <Block nav="History" image="coin" />
        <Block nav="Geography" image="coin" />
      </View>
      <View style={styles.container}>
        <Block nav="Music" image="coin" />
        <Block nav="Arts & Literature" image="coin" />
      </View>
      <View style={styles.container}>
        <Block nav="Science" image="coin" />
        <Block nav="General Knowledge" image="coin" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontFamily: "NiveauGroteskBold",
  },
});
