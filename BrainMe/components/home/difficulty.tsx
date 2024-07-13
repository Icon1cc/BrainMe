import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface DifficultyProps {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
}

export default function Difficulty({
  difficulty,
  setDifficulty,
}: DifficultyProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => {
          return [
            {
              opacity: pressed ? 0.5 : 1,
            },
            difficulty === "easy" ? styles.selected : styles.unselected,
          ];
        }}
        onPress={() => setDifficulty("easy")}
      >
        <Image
          source={require("@/assets/images/icons/coin.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.text}>Easy</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => {
          return [
            {
              opacity: pressed ? 0.5 : 1,
            },
            difficulty === "medium" ? styles.selected : styles.unselected,
          ];
        }}
        onPress={() => setDifficulty("medium")}
      >
        <Image
          source={require("@/assets/images/icons/coin.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.text}>Medium</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => {
          return [
            {
              opacity: pressed ? 0.5 : 1,
            },
            difficulty === "hard" ? styles.selected : styles.unselected,
          ];
        }}
        onPress={() => setDifficulty("hard")}
      >
        <Image
          source={require("@/assets/images/icons/coin.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.text}>Hard</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  unselected: {
    flex: 1,
    gap: 17,
    paddingVertical: 17,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "lightgray",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    flex: 1,
    gap: 17,
    paddingVertical: 17,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#00FF0A",
    backgroundColor: "#A2FF86",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "NiveauGroteskLight",
    fontSize: 16,
    color: Colors.primary,
  },
});
