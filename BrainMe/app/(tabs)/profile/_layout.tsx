import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle() {
            return (
              <Text
                style={{ fontFamily: "Pacifico", color: "white", fontSize: 24 }}
              >
                Jessica Richman
              </Text>
            );
          },
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
      <Stack.Screen
        name="finder"
        options={{
          headerLeft() {
            return (
              <Link href={"/profile"} asChild>
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
          headerTitle() {
            return (
              <Text
                style={{
                  fontFamily: "Pacifico",
                  color: Colors.primary,
                  fontSize: 24,
                }}
              >
                Friends
              </Text>
            );
          },
        }}
      />
    </Stack>
  );
}
