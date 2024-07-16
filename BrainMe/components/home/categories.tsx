import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";
import Block from "./block";

export default function Categories() {
  return (
    <View style={{ gap: 10, flex: 1 }}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 17 }}
      >
        <View style={styles.container}>
          <Block nav="History" image="history" />
          <Block nav="Geography" image="geography" />
        </View>
        <View style={styles.container}>
          <Block nav="Music" image="music" />
          <Block nav="Arts & Literature" image="art" />
        </View>
        <View style={styles.container}>
          <Block nav="Science" image="science" />
          <Block nav="General Knowledge" image="knowledge" />
        </View>
        <View style={styles.container}>
          <Block nav="Sport" image="sport" />
          <Block nav="Food" image="food" />
        </View>
        <View style={styles.container}>
          <Block nav="Movie" image="movie" />
          <Block nav="Culture" image="culture" />
        </View>
      </ScrollView>
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
