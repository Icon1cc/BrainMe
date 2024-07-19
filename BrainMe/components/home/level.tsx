import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

interface LevelProps {
  level: number;
  points: number;
  nextLevelPoints: number;
}

export default function Level(props: LevelProps) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 5 }}>
          <Text style={styles.level}>Level {props.level}</Text>
          <Text style={styles.leveleft}>
            +{props.nextLevelPoints} points left till next level
          </Text>
        </View>
        <Image
          source={require("@/assets/images/icons/coin.png")}
          style={{ width: 24, height: 24 }}
        />
      </View>
      <View style={styles.progression}>
        <View
          style={[
            styles.progressionbar,
            {
              width: `${(props.points / (props.points + props.nextLevelPoints)) * 100}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 17,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    gap: 17,
  },
  level: {
    fontFamily: "NiveauGrotesk",
    color: "white",
    fontSize: 20,
  },
  leveleft: {
    fontFamily: "NiveauGrotesk",
    color: "white",
    fontSize: 14,
  },
  progression: {
    height: 17,
    backgroundColor: "white",
    borderRadius: 12,
  },
  progressionbar: {
    height: 17,
    backgroundColor: "#006989",
    borderRadius: 12,
  },
});
