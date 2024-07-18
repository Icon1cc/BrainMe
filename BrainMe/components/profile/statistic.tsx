import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

interface StatisticProps {
  type: string;
  stat: number;
  percent?: boolean;
  hashtag?: boolean;
  description: string;
}

enum StatisticType {
  coin = require("@/assets/images/icons/coin.png"),
  joystick = require("@/assets/images/icons/joystick.png"),
  potion = require("@/assets/images/icons/potion.png"),
  skull = require("@/assets/images/icons/skull.png"),
  star = require("@/assets/images/icons/star.png"),
  target = require("@/assets/images/icons/target.png"),
}

export default function Statistic(props: StatisticProps) {
  const isTablet = useWindowDimensions().width > 763;
  // Splits the description into two parts.
  const text = props.description.split(" ");

  // Format the number.
  const numberAbove1000 =
    props.stat > 1000
      ? props.stat.toString()[0] + "," + props.stat.toString().slice(1)
      : props.stat;
  const numberFormatted = props.percent
    ? `${numberAbove1000}%`
    : props.hashtag
      ? `#${numberAbove1000}`
      : numberAbove1000;
  return (
    <View style={[styles.container, { height: isTablet ? 200 : 150 }]}>
      <Image
        source={StatisticType[props.type as keyof typeof StatisticType]}
        style={styles.image}
      />
      <Text style={styles.number}>{numberFormatted}</Text>
      <View style={{ alignItems: "center", gap: 2 }}>
        <Text style={styles.text}>{text[0]}</Text>
        <Text style={styles.text}>{text[1]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    height: 150,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: 32,
    height: 32,
  },
  number: {
    fontFamily: "NiveauGroteskBold",
    color: Colors.primary,
    fontSize: 24,
  },
  text: {
    fontFamily: "NiveauGroteskLight",
    color: Colors.primary,
    fontSize: 16,
  },
});
