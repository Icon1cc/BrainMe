import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import React, { useState } from "react";

import Colors from "@/constants/Colors";

import Difficulty from "@/components/home/difficulty";
import ActionButton from "@/components/auth/action-button";

enum ProviderImage {
  "Arts & Literature" = require("@/assets/images/categories/art.png"),
  Geography = require("@/assets/images/categories/geography.png"),
  History = require("@/assets/images/categories/history.png"),
  Music = require("@/assets/images/categories/music.png"),
  Science = require("@/assets/images/categories/science.png"),
  "General Knowledge" = require("@/assets/images/categories/knowledge.png"),
}

export default function Category() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  console.log(category);
  const [difficulty, setDifficulty] = useState("");
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
      <View style={styles.container}>
        <Image
          source={ProviderImage[category as keyof typeof ProviderImage]}
          style={{ width: 60, height: 60 }}
        />
      </View>
      <Text
        style={{
          fontFamily: "NiveauGroteskBold",
          fontSize: 24,
          color: Colors.primary,
        }}
      >
        Select your difficulty
      </Text>
      <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />
      <Text style={styles.text}>
        Become the best and fastest player of quiz of the week worldwide and win
        50$!
      </Text>
      <Text style={[styles.text, { flex: 1 }]} numberOfLines={4}>
        This quiz is about design tools for non-designers. Challenge yourself
        and your friends! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
      </Text>
      <ActionButton
        text="Start Challenge"
        onPress={() => {
          if (difficulty === "") {
            Alert.alert("Please select a difficulty");
            return;
          } else {
            router.push({ pathname: "/q", params: { category, difficulty } });
          }
          // Navigate to the quiz screen
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 17 * 3,
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
