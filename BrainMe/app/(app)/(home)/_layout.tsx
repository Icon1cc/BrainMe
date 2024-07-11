import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Link } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Write something here",
          headerTitleStyle: {
            fontFamily: "NiveauGrotesk",
            fontSize: 20,
          },
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontFamily: "NiveauGrotesk",
            fontSize: 34,
          },
          headerRight: () => (
            <Link href="/converse" asChild>
              <Pressable hitSlop={25}>
                <Ionicons name="chatbubbles-outline" size={24} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="converse"
        options={{
          title: "Chats",
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            color: "black",
            fontFamily: "NiveauGrotesk",
            fontSize: 34,
          },
          headerTitleStyle: {
            color: "black",
            fontFamily: "NiveauGrotesk",
            fontSize: 20,
          },
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable hitSlop={25}>
                <Ionicons name="arrow-back" size={24} />
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Link href="/new-chat" asChild>
              <Pressable hitSlop={25}>
                <Ionicons name="people-outline" size={24} />
              </Pressable>
            </Link>
          ),
          headerTransparent: true,
          headerBlurEffect: "light",
        }}
      />
      <Stack.Screen
        name="new-chat"
        options={{
          headerTransparent: true,
          headerBlurEffect: "light",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
