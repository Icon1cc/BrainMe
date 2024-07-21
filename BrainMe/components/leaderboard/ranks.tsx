import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";
import Swipeable from "@/components/swipeable-row";

import { useQuery, useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface RanksProps {
  userId: string;
  position: number;
  username: string;
  rank: number;
  placeholder?: string;
}

export default function Ranks(props: RanksProps) {
  const user = useQuery(api.user.retrieve);
  const router = useRouter();
  const convex = useConvex();
  const isTablet = useWindowDimensions().width >= 768;
  const imageSource = props.placeholder
    ? { uri: props.placeholder }
    : require("@/assets/images/user/user.png");

  const onPressMessage = async () => {
    if (user) {
      const chat = await convex.query(api.chats.retrieveByUserIds, {
        user_1: user._id,
        user_2: props.userId as Id<"user">,
      });
      if (chat) {
        router.push({
          pathname: "/(leaderboard)/t/[chat]",
          params: { chat: chat._id },
        });
      } else {
        await convex.mutation(api.chats.insert, {
          user_1: user._id,
          user_2: props.userId as Id<"user">,
          last_comment: "Start a new conversation!",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });
        const newChat = await convex.query(api.chats.retrieveByUserIds, {
          user_1: user._id,
          user_2: props.userId as Id<"user">,
        });
        if (newChat) {
          router.push({
            pathname: "/(leaderboard)/t/[chat]",
            params: { chat: newChat._id },
          });
        }
      }
    }
  };
  return (
    <View
      style={{ borderWidth: 1, borderColor: Colors.border, borderRadius: 5 }}
    >
      <Swipeable
        onPressMessage={() => {
          onPressMessage();
        }}
        onPressUser={() => {
          router.push({
            pathname: "/(app)/(leaderboard)/[profile]",
            params: { profile: props.userId },
          });
        }}
      >
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
