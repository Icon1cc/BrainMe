import { View } from "react-native";
import React from "react";

import Stat from "@/components/profile/statistic";

interface GridProps {
  ranking: number;
  games: number;
  points: number;
  level: number;
  correct: number;
  incorrect: number;
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
        <Stat type="joystick" stat={props.games!} description="Games played" />
        <Stat type="coin" stat={props.points!} description="Points total" />
      </View>
      <View style={{ flexDirection: "row", gap: 17 }}>
        <Stat
          type="potion"
          stat={props.level!}
          percent
          description="Completion rate"
        />
        <Stat
          type="target"
          stat={props.correct!}
          percent
          description="Correct answers"
        />
        <Stat
          type="skull"
          stat={props.incorrect!}
          percent
          description="Incorrect answers"
        />
      </View>
    </View>
  );
}
