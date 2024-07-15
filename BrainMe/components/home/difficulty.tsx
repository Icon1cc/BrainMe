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
    <View style={{ gap: 10 }}>
      <Text style={styles.difficulty}>Select your difficulty</Text>
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
            source={require("@/assets/images/difficulties/easy.png")}
            style={{ width: 30, height: 30 }}
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
            source={require("@/assets/images/difficulties/medium.png")}
            style={{ width: 30, height: 30 }}
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
            source={require("@/assets/images/difficulties/hard.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text style={styles.text}>Hard</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  difficulty: {
    fontFamily: "NiveauGroteskBold",
    fontSize: 24,
    color: Colors.primary,
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
