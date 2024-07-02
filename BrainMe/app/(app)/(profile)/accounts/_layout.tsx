import { Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack, useRouter } from "expo-router";
import React from "react";

export default function Layout() {
  const router = useRouter();
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
      <Stack.Screen name="family-name" />
      <Stack.Screen name="email-address" />
      <Stack.Screen name="password" />
    </Stack>
  );
}

function HeaderLeft() {
  return (
    <Pressable onPress={router.back}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </Pressable>
  );
}
