import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import React, { useState } from "react";

import Colors from "@/constants/Colors";

import Difficulty from "@/components/home/difficulty";
import ActionButton from "@/components/auth/action-button";

import CategoryData from "@/assets/data/categories.json";

enum ProviderImage {
  "Arts & Literature" = require("@/assets/images/categories/art.png"),
  Geography = require("@/assets/images/categories/geography.png"),
  History = require("@/assets/images/categories/history.png"),
  Music = require("@/assets/images/categories/music.png"),
  Science = require("@/assets/images/categories/science.png"),
  "General Knowledge" = require("@/assets/images/categories/knowledge.png"),
  Movie = require("@/assets/images/categories/movie.png"),
  Sport = require("@/assets/images/categories/sport.png"),
  Food = require("@/assets/images/categories/food.png"),
  Culture = require("@/assets/images/categories/culture.png"),
}

export default function Category() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const [difficulty, setDifficulty] = useState("");
  const isTablet = useWindowDimensions().width >= 768;

  const handleOnPress = () => {
    if (difficulty === "") {
      Alert.alert("Please select a difficulty");
      return;
    } else {
      router.push({ pathname: "/q", params: { category, difficulty } });
    }
  };
  return (
    <View style={{ flex: 1, padding: 17, paddingBottom: 17 * 2, gap: 17 * 2 }}>
      <Stack.Screen
        options={{
          title: `${category}`,
          headerTitleStyle: {
            fontFamily: "NiveauGrotesk",
            color: Colors.primary,
            fontSize: 24,
          },
        }}
      />
      <View
        style={[
          styles.container,
          {
            paddingVertical: isTablet ? 17 * 5 : 17 * 3,
          },
        ]}
      >
        <Image
          source={ProviderImage[category as keyof typeof ProviderImage]}
          style={{ width: isTablet ? 90 : 60, height: isTablet ? 90 : 60 }}
        />
      </View>
      <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />
      <ScrollView
        contentContainerStyle={{ gap: 17 * 2 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <Text style={styles.text}>
          {CategoryData[category as keyof typeof CategoryData].header}
        </Text>
        <Text style={styles.text}>
          {CategoryData[category as keyof typeof CategoryData].description}
        </Text>
      </ScrollView>
      <ActionButton
        activity={false}
        text="Start Challenge"
        onPress={() => handleOnPress()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "NiveauGrotesk",
    color: Colors.primary,
    fontSize: 16,
  },
});
