import { Pressable } from "react-native";
import { Stack, Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
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
            return <Header navigation="settings" />;
          },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          presentation: "modal",
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
    </Stack>
  );
}

interface HeaderProps {
  navigation: "f/finder" | "profile" | "settings" | "[profile]";
}

function Header(props: HeaderProps) {
  return (
    <Link href={`/${props.navigation}`} asChild>
      <Pressable>
        <AntDesign name="arrowleft" size={24} color="white" />
      </Pressable>
    </Link>
  );
}
