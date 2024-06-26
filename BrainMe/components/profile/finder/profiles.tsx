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
        style={styles.image}
      />
      <Text style={styles.username}>{props.username}</Text>
      <Text style={styles.points}>{props.points} points</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    gap: 17,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  username: {
    flex: 1,
    fontFamily: "NiveauGroteskBold",
    fontSize: 20,
  },
  points: {
    fontFamily: "NiveauGroteskLight",
    fontSize: 16,
  },
});
