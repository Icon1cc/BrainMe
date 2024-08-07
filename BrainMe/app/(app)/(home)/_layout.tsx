import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Link } from "expo-router";
import React from "react";

import Colors from "@/constants/Colors";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          title: "Let's play!",
          headerTitleStyle: {
            fontFamily: "Pacifico",
            color: Colors.primary,
            fontSize: 20,
          },
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            fontFamily: "Pacifico",
            color: Colors.primary,
            fontSize: 34,
          },
          headerLeft: () => (
            <Text
              style={{
                fontFamily: "NiveauGrotesk",
                color: Colors.primary,
                fontSize: 24,
              }}
            >
              Welcome back!
            </Text>
          ),
          headerRight: () => (
            <Link href="/converse" asChild>
              <Pressable hitSlop={25}>
                <Ionicons
                  name="chatbubbles-outline"
                  size={24}
                  color={Colors.primary}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="converse"
        options={{
          title: "Chats",
          headerTitleStyle: {
            color: Colors.primary,
            fontFamily: "NiveauGrotesk",
            fontSize: 20,
          },
          headerLargeTitle: true,
          headerLargeTitleStyle: {
            color: Colors.primary,
            fontFamily: "Pacifico",
            fontSize: 34,
          },
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable hitSlop={25}>
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Link href="/new-chat" asChild>
              <Pressable hitSlop={25}>
                <Ionicons
                  name="people-outline"
                  size={24}
                  color={Colors.primary}
                />
              </Pressable>
            </Link>
          ),
          headerTransparent: true,
          headerBlurEffect: "light",
        }}
      />
      <Stack.Screen
        name="[category]"
        options={{
          headerShadowVisible: false,
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable hitSlop={25}>
                <Ionicons name="arrow-back" size={24} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="new-chat"
        options={{
          title: "New Chat",
          headerTitleStyle: {
            fontFamily: "NiveauGrotesk",
            fontSize: 20,
          },
          headerTransparent: true,
          headerBlurEffect: "light",
          presentation: "modal",
        }}
      />
      <Stack.Screen name="q" options={{ headerShown: false }} />
    </Stack>
  );
}
