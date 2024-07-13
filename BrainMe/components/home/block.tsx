import { Pressable, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

enum ProviderImage {
  coin = require("@/assets/images/icons/coin.png"),
}

interface BlockProps {
  nav:
    | "Music"
    | "Science"
    | "Geography"
    | "History"
    | "Arts & Literature"
    | "General Knowledge";
  image: keyof typeof ProviderImage;
}

export default function Block({ nav, image }: BlockProps) {
  const router = useRouter();
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          {
            backgroundColor: pressed ? "lightgray" : "transparent",
          },
          styles.button,
        ];
      }}
      onPress={() => {
        router.push(`/${nav}`);
      }}
    >
      <Image
        source={ProviderImage[image as keyof typeof ProviderImage]}
        style={{ width: 60, height: 60 }}
      />
      <Text style={styles.category}>{nav}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 17,
    borderWidth: 1,
    borderRadius: 12,
    gap: 12,
    borderColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    fontFamily: "NiveauGroteskBold",
    color: Colors.primary,
    fontSize: 16,
  },
});
