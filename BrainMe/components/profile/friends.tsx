import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";
import ImageViewer from "../image-viewer";

interface FriendsProps {
  number: number;
  friends: string[];
}

export default function Friends({ number, friends }: FriendsProps) {
  // For the navigation.
  const router = useRouter();
  return (
    <View style={{ gap: 5 }}>
      <Text style={styles.text}>Friends ({number})</Text>
      <View style={styles.container}>
        <FlatList
          data={friends}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => Math.random().toString() + item}
          renderItem={({ item }) => (
            <View style={{ marginRight: -5 }}>
              <ImageViewer size={50} />
            </View>
          )}
        />
        <Pressable
          onPress={() => {
            router.push("/(app)/(profile)/f/finder");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Find friends</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "NiveauGroteskBold",
    color: Colors.primary,
    fontSize: 20,
  },
  button: {
    height: 40,
    width: 125,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006989",
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: "NiveauGroteskBold",
    color: "white",
    fontSize: 16,
  },
});
