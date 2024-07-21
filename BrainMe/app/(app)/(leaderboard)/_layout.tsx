import { Text, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

import Colors from "@/constants/Colors";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="leaderboard"
        options={{
          headerShadowVisible: false,
          title: "Ranking",
          headerTitleStyle: {
            fontFamily: "Pacifico",
            fontSize: 24,
            color: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="[profile]"
        options={{
          headerTransparent: true,
          headerLeft() {
            return (
              <Pressable
                hitSlop={25}
                onPress={() => {
                  router.back();
                }}
              >
                <AntDesign name="arrowleft" size={24} color="white" />
              </Pressable>
            );
          },
        }}
      />
    </Stack>
  );
}
