import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

interface ProfilePros {
  username: string;
  points: number;
}

export default function Profiles(props: ProfilePros) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/user/smiling-woman.jpeg")}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
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
