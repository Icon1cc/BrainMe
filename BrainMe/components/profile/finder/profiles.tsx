import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";
import ImageViewer from "@/components/image-viewer";

interface ProfilePros {
  username: string;
  points: number;
}

export default function Profiles(props: ProfilePros) {
  return (
    <View style={styles.container}>
      <ImageViewer size={40} />
      <Text style={{ flex: 1, fontSize: 20 }}>{props.username}</Text>
      <Text style={{ fontFamily: "NiveauGroteskLight", fontSize: 16 }}>
        {props.points} points
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    gap: 17,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
});
