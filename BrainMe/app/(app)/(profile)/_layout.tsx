import { Text, Pressable } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Stack, Link } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="profile"
        options={{
          headerRight() {
            return <Header navigation="accounts" />;
          },
        }}
      />
      <Stack.Screen
        name="[profile]"
        options={{
          headerLeft() {
            return <Header navigation="f/finder" />;
          },
        }}
      />
      <Stack.Screen
        name="accounts"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

interface HeaderProps {
  navigation: "f/finder" | "profile" | "accounts" | "[profile]";
}

function Header(props: HeaderProps) {
  return (
    <Link href={`/${props.navigation}`} asChild>
      <Pressable>
        {props.navigation === "accounts" ? (
          <Ionicons name="settings-outline" size={24} color="white" />
        ) : (
          <AntDesign name="arrowleft" size={24} color="white" />
        )}
      </Pressable>
    </Link>
  );
}
