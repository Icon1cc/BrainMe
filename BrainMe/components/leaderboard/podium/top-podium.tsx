import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface PodiumProps {
  position: 1 | 2 | 3;
  name: string;
  rank: number;
}

function Podium(props: PodiumProps) {
  const sides =
    props.position === 1
      ? { width: 125, height: 200 }
      : { flex: 1, height: 175 };
  return (
    <View style={[styles.box, sides]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text
          style={[
            styles.text,
            props.position === 1 ? { fontSize: 24 } : { fontSize: 20 },
          ]}
        >
          {props.position}
        </Text>
      </View>
      <Image
        source={require("@/assets/images/user/user.png")}
        style={
          props.position === 1
            ? { width: 90, height: 90, borderRadius: 45 }
            : { width: 60, height: 60, borderRadius: 30 }
        }
      />
      <Text style={[styles.text, { fontSize: 16 }]}>{props.name}</Text>
      <Text style={{ fontFamily: "NiveauGroteskLight", fontSize: 16 }}>
        {props.rank} points
      </Text>
    </View>
  );
}

interface TopPodiumProps {
  users: { name: string; rank: number; placeholder: string }[];
}

export default function TopPodium(props: TopPodiumProps) {
  return (
    <View style={styles.container}>
      <Podium position={2} name="Alex B." rank={200} />
      <Podium position={1} name="Richi T." rank={500} />
      <Podium position={3} name="Maxime L." rank={150} />
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
    gap: 5,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "NiveauGroteskBold",
    color: Colors.primary,
  },
});
