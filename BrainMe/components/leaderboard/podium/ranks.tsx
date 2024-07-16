import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";

import Colors from "@/constants/Colors";
import Swipeable from "@/components/swipeable-row";

interface RanksProps {
  userId: string;
  position: number;
  username: string;
  rank: number;
  placeholder?: string;
}

export default function Ranks(props: RanksProps) {
  const isTablet = useWindowDimensions().width >= 768;
  const imageSource = props.placeholder
    ? { uri: props.placeholder }
    : require("@/assets/images/user/user.png");
  return (
    <View
      style={{ borderWidth: 1, borderColor: Colors.border, borderRadius: 5 }}
    >
      <Swipeable>
        <View style={[styles.container, { height: isTablet ? 70 : 60 }]}>
          <Text style={styles.position}>{props.position}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              source={imageSource}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <Text style={styles.username}>{props.username}</Text>
          </View>
          <Text style={styles.rank}>{props.rank} points</Text>
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    gap: 17,
    paddingLeft: 17,
    flexDirection: "row",
    alignItems: "center",
  },
  position: {
    fontFamily: "NiveauGroteskBold",
    color: Colors.primary,
    fontSize: 20,
  },
  username: {
    fontFamily: "NiveauGroteskBold",
    fontSize: 16,
  },
  rank: {
    fontFamily: "NiveauGroteskLight",
    fontSize: 16,
    marginRight: 17,
  },
});
