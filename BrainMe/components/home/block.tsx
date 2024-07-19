import {
  Pressable,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

enum ProviderImage {
  art = require("@/assets/images/categories/art.png"),
  geography = require("@/assets/images/categories/geography.png"),
  history = require("@/assets/images/categories/history.png"),
  music = require("@/assets/images/categories/music.png"),
  science = require("@/assets/images/categories/science.png"),
  knowledge = require("@/assets/images/categories/knowledge.png"),
  movie = require("@/assets/images/categories/movie.png"),
  sport = require("@/assets/images/categories/sport.png"),
  food = require("@/assets/images/categories/food.png"),
  culture = require("@/assets/images/categories/culture.png"),
}

interface BlockProps {
  nav:
    | "Music"
    | "Science"
    | "Geography"
    | "History"
    | "Arts & Literature"
    | "General Knowledge"
    | "Movie"
    | "Sport"
    | "Food"
    | "Culture";
  image: keyof typeof ProviderImage;
}

export default function Block({ nav, image }: BlockProps) {
  const router = useRouter();
  const isTablet = useWindowDimensions().width >= 768;
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          {
            backgroundColor: pressed ? "lightgray" : "transparent",
          },
          [
            styles.button,
            {
              paddingVertical: isTablet ? 17 * 3 : 17,
              gap: isTablet ? 10 * 2 : 10,
            },
          ],
        ];
      }}
      onPress={() => {
        router.push(`/${nav}`);
      }}
    >
      <Image
        source={ProviderImage[image as keyof typeof ProviderImage]}
        style={{ width: isTablet ? 70 : 50, height: isTablet ? 70 : 50 }}
      />
      <Text style={styles.category}>{nav}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
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
