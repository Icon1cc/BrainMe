import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
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
  const isTablet = useWindowDimensions().width >= 768;
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
              difficulty === "easy"
                ? [
                    [
                      styles.selected,
                      { borderColor: "#00FF0A", backgroundColor: "#A2FF86" },
                    ],
                    {
                      paddingVertical: isTablet ? 17 * 2 : 17,
                      gap: isTablet ? 17 * 2 : 17,
                    },
                  ]
                : [
                    styles.unselected,
                    {
                      paddingVertical: isTablet ? 17 * 2 : 17,
                      gap: isTablet ? 17 * 2 : 17,
                    },
                  ],
            ];
          }}
          onPress={() => setDifficulty("easy")}
        >
          <Image
            source={require("@/assets/images/difficulties/easy.png")}
            style={{ width: isTablet ? 40 : 30, height: isTablet ? 40 : 30 }}
          />
          <Text style={styles.text}>Easy</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => {
            return [
              {
                opacity: pressed ? 0.5 : 1,
              },
              difficulty === "medium"
                ? [
                    styles.selected,
                    { borderColor: "#DFE400", backgroundColor: "#FBFF2B" },
                    {
                      paddingVertical: isTablet ? 17 * 2 : 17,
                      gap: isTablet ? 17 * 2 : 17,
                    },
                  ]
                : [
                    styles.unselected,
                    {
                      paddingVertical: isTablet ? 17 * 2 : 17,
                      gap: isTablet ? 17 * 2 : 17,
                    },
                  ],
              ,
            ];
          }}
          onPress={() => setDifficulty("medium")}
        >
          <Image
            source={require("@/assets/images/difficulties/medium.png")}
            style={{ width: isTablet ? 40 : 30, height: isTablet ? 40 : 30 }}
          />
          <Text style={styles.text}>Medium</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => {
            return [
              {
                opacity: pressed ? 0.5 : 1,
              },
              difficulty === "hard"
                ? [
                    styles.selected,
                    { borderColor: "#FF1E1E", backgroundColor: "#FF6C6C" },
                    {
                      paddingVertical: isTablet ? 17 * 2 : 17,
                      gap: isTablet ? 17 * 2 : 17,
                    },
                  ]
                : [
                    styles.unselected,
                    {
                      paddingVertical: isTablet ? 17 * 2 : 17,
                      gap: isTablet ? 17 * 2 : 17,
                    },
                  ],
              ,
            ];
          }}
          onPress={() => setDifficulty("hard")}
        >
          <Image
            source={require("@/assets/images/difficulties/hard.png")}
            style={{ width: isTablet ? 40 : 30, height: isTablet ? 40 : 30 }}
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
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "NiveauGroteskMedium",
    fontSize: 16,
    color: Colors.primary,
  },
});
