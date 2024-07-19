import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";
import ImageViewer from "../image-viewer";

import { Id } from "@/convex/_generated/dataModel";

interface FriendsProps {
  number: number;
  friends: {
    _id: Id<"user">;
    file?: string;
  }[];
}

export default function Friends({ number, friends }: FriendsProps) {
  const isTablet = useWindowDimensions().width > 763;
  // For the navigation.
  const router = useRouter();
  return (
    <View style={{ gap: isTablet ? 10 : 5 }}>
      <Text style={[styles.text, { fontSize: isTablet ? 24 : 20 }]}>
        Friends ({number})
      </Text>
      <View style={styles.container}>
        <FlatList
          data={friends}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => Math.random().toString() + item}
          renderItem={({ item }) => (
            <View style={{ marginRight: -5 }}>
              <ImageViewer
                size={isTablet ? 80 : 50}
                selectedImage={item.file}
              />
            </View>
          )}
        />
        <Pressable
          onPress={() => {
            router.push("/(app)/(profile)/f/finder");
          }}
          style={({ pressed }) => {
            return [
              {
                opacity: pressed ? 0.75 : 1,
              },
              [
                styles.button,
                { height: isTablet ? 60 : 40, width: isTablet ? 175 : 125 },
              ],
            ];
          }}
        >
          <Text style={[styles.buttonText, { fontSize: isTablet ? 24 : 16 }]}>
            Find friends
          </Text>
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
