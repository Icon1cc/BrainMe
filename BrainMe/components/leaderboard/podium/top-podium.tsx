import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

import { Id } from "@/convex/_generated/dataModel";

interface PodiumProps {
  position: 1 | 2 | 3;
  name: string;
  points: number;
  placeholder?: string;
}

function Podium(props: PodiumProps) {
  const isTablet = useWindowDimensions().width >= 768;
  const sides =
    props.position === 1
      ? {
          flex: isTablet ? 4 : 5,
          height: isTablet ? 250 : 200,
          paddingVertical: isTablet ? 20 : 10,
        }
      : {
          flex: isTablet ? 3 : 4,
          height: isTablet ? 200 : 175,
          paddingVertical: isTablet ? 17 : 10,
        };
  const textSize = props.position === 1 ? { fontSize: 24 } : { fontSize: 20 };
  const imageSize =
    props.position === 1
      ? { width: 80, height: 80, borderRadius: 40 }
      : { width: 60, height: 60, borderRadius: 30 };
  const imageSource = props.placeholder
    ? { uri: props.placeholder }
    : require("@/assets/images/user/user.png");
  return (
    <View style={[styles.box, sides]}>
      <Text style={[styles.text, textSize]}>{props.position}</Text>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image source={imageSource} style={imageSize} />
      </View>
      <Text style={[styles.text, { fontSize: 16 }]} numberOfLines={1}>
        {props.name?.split(" ")[0]}
      </Text>
      <Text style={{ fontFamily: "NiveauGroteskLight", fontSize: 16 }}>
        {props.points} points
      </Text>
    </View>
  );
}

interface TopPodiumProps {
  top3users: {
    _id: Id<"user">;
    file?: string | undefined;
    username: string;
    points: number;
  }[];
}

export default function TopPodium({ top3users }: TopPodiumProps) {
  return (
    <View style={styles.container}>
      <Podium
        placeholder={top3users[1]?.file}
        position={2}
        name={top3users[1]?.username}
        points={top3users[1]?.points}
      />
      <Podium
        placeholder={top3users[0]?.file}
        position={1}
        name={top3users[0]?.username}
        points={top3users[0]?.points}
      />
      <Podium
        placeholder={top3users[2]?.file}
        position={3}
        name={top3users[2]?.username}
        points={top3users[2]?.points}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 17,
  },
  box: {
    gap: 7,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: "NiveauGroteskBold",
    color: Colors.primary,
  },
});
