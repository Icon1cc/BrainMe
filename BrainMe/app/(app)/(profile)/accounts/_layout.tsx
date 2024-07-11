import { Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerTransparent: true }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle() {
            return (
              <Text style={{ fontFamily: "NiveauGrotesk", fontSize: 20 }}>
                Settings
              </Text>
            );
          },
        }}
      />
      <Stack.Screen
        name="name"
        options={{
          title: "Edit Name",
          headerLeft() {
            return HeaderLeft();
          },
        }}
      />
      <Stack.Screen
        name="family-name"
        options={{
          title: "Edit Family Name",
          headerLeft() {
            return HeaderLeft();
          },
        }}
      />
    </Stack>
  );
}

function HeaderLeft() {
  const router = useRouter();
  return (
    <Pressable onPress={router.back} hitSlop={25}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </Pressable>
  );
}
