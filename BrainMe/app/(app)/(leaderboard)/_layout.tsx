import { Text, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

import Colors from "@/constants/Colors";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerTransparent: true }}>
      <Stack.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          headerTitle() {
            return (
              <Text
                style={{
                  fontFamily: "Pacifico",
                  fontSize: 24,
                  color: Colors.primary,
                }}
              >
                Leaderboard
              </Text>
            );
          },
        }}
      />
      <Stack.Screen
        name="[profile]"
        options={{
          headerLeft() {
            return (
              <Link href="/leaderboard" asChild>
                <Pressable>
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={Colors.primary}
                  />
                </Pressable>
              </Link>
            );
          },
        }}
      />
    </Stack>
  );
}
