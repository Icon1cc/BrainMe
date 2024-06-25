import { View } from "react-native";
import React from "react";

import Stat from "@/components/profile/statistic";

interface GridProps {}

export default function Grid({}: GridProps) {
  return (
    <View style={{ gap: 17 }}>
      <View style={{ flexDirection: "row", gap: 17 }}>
        <Stat type="star" stat={3} hashtag description="World rank" />
        <Stat type="joystick" stat={3} description="Games played" />
        <Stat type="coin" stat={3} description="Points total" />
      </View>
      <View style={{ flexDirection: "row", gap: 17 }}>
        <Stat type="potion" stat={3} percent description="Completion rate" />
        <Stat type="target" stat={3} percent description="Correct answers" />
        <Stat type="skull" stat={3} percent description="Incorrect answers" />
      </View>
    </View>
  );
}
