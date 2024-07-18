import { View } from "react-native";
import React from "react";

import Stat from "@/components/profile/statistic";

interface GridProps {
  ranking: number;
  gamesPlayed: number;
  points: number;
  completionRate: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export default function Grid(props: GridProps) {
  return (
    <View style={{ gap: 17, flex: 1, justifyContent: "center" }}>
      <View style={{ flexDirection: "row", gap: 17 }}>
        <Stat
          type="star"
          stat={props.ranking}
          hashtag
          description="World rank"
        />
        <Stat
          type="joystick"
          stat={props.gamesPlayed!}
          description="Games played"
        />
        <Stat type="coin" stat={props.points!} description="Points total" />
      </View>
      <View style={{ flexDirection: "row", gap: 17 }}>
        <Stat
          type="potion"
          stat={props.completionRate!}
          percent
          description="Completion rate"
        />
        <Stat
          type="target"
          stat={props.correctAnswers!}
          percent
          description="Correct answers"
        />
        <Stat
          type="skull"
          stat={props.wrongAnswers!}
          percent
          description="Incorrect answers"
        />
      </View>
    </View>
  );
}
