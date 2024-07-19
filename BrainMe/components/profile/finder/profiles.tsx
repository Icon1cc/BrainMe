import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";
import ImageViewer from "@/components/image-viewer";

interface ProfilePros {
  username: string;
  selectedImage: string | undefined;
  points: number;
  _id: string;
}

export default function Profiles(props: ProfilePros) {
  return (
    <Link
      href={{
        pathname: "/(app)/(profile)/[profile]",
        params: { profile: props._id },
      }}
      asChild
    >
      <Pressable style={{ flexDirection: "row", gap: 10 }}>
        <ImageViewer size={50} selectedImage={props.selectedImage} />
        <View style={styles.container}>
          <Text style={{ flex: 1, fontSize: 20 }}>{props.username}</Text>
          <Text style={{ fontFamily: "NiveauGroteskLight", fontSize: 16 }}>
            {props.points} points
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
});
